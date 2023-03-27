import { LitElement, html, css, nothing, PropertyValueMap} from "lit";
import { customElement, state, property } from "lit/decorators.js";
import '../components/form-header';
import '../components/radio-input';
import '../components/custom-button';
import '../components/text-input';
import '../components/date-input';
import '../components/Form/employer-section';
import '../components/Form/reporter-section';
import '../components/Form/unit-status-section';
import '../components/Form/raises-section.js';
import '../components/Form/form-nav';
import '../components/Form/special-section.js'
import '../components/Form/comment-section.js'
import {Unit, Reporter, Employer, UnitStatus, wageEvent} from '../interfaces/interfaces';

@customElement('form-section')
export class FormSection extends LitElement {
    static styles = css`
        #form-container{
            //height: calc(80vh - (2em + 2px));
            height: 100%;
            overflow-y: auto;
            width: 100%;
        }

        #form-container::-webkit-scrollbar{
            width: 2px;
        }

        #form-container::-webkit-scrollbar-track{
            box-shadow: inset 0 0 6px 6px rgba(var(--white), 0.25);
        }

        #form-container::-webkit-scrollbar-thumb{
            background: rgb(var(--blue));
        }


        form{
            padding: 1em;
            display: flex;
            flex-direction: column;
        } 

        custom-button{
            align-self: flex-end;
            margin-top: 1em;
        }

        radio-input{
            margin-bottom: 1em;
        }

        #member-num{
            max-width: 20%;
        }

        .unit-info{
            display: grid;
            grid-template-columns: 140px 280px 240px;
            grid-column-gap: 2em;
            align-items: end;
        }
    `

    @property()
    currForm!: number;

    @property()
    totalForms!: number; 

    @property()
    unitData!: Unit;

    @property()
    updatedUnitData!: Unit;

    @state()
    _employerSection!: {}

    @state()
    _unitStatusSection!: UnitStatus;

    @state()
    _regularWageIncreases!: Array<wageEvent>;

    @state()
    _specialWageIncreases!: Array<wageEvent>;


    
    render() {
        const {master, unit_name, name, local, subunit, contact, number_of_members, agreement_eff_date, agreement_exp_date, inactive_unit='No', wage_adjustment=undefined, in_negotiation=undefined} = this.unitData;
        //const updatedUnitData = {...this.unitData, inactive_unit, wage_adjustment};
        console.log(this.unitData)
        return html`
            <div id="form-container">
                <form-nav totalForms=${this.totalForms} currForm=${this.currForm}></form-nav>
                <form>
                    <employer-section employer=${master && unit_name === "(master)" ? name : unit_name} 
                                    local=${local}
                                    subunit=${subunit}
                                    @employer-field-values=${this._setEmployerFieldValues}>
                    </employer-section>

                    <reporter-section .contact=${contact}
                                      @reporter-field-values=${this._setReporterFieldValues}>
                    </reporter-section>

                    <unit-status-section .memberNumber=${number_of_members}
                                         .effectiveFrom=${agreement_eff_date}
                                         .effectiveTo=${agreement_exp_date}
                                         @unit-status-values=${this.  _setUnitStatusFieldValues}
                                         .inactive_unit_option=${inactive_unit}
                                         .wage_adjustment_option=${wage_adjustment}
                                         .in_negotiation_option=${in_negotiation}> 
                    </unit-status-section>

                    ${inactive_unit === 'No' && wage_adjustment === 'Yes'?
                        html`<raises-section @get-wage-event=${this._setRegularWageIncreases}></raises-section>
                            <special-section @get-wage-event=${this._setSpecialWageIncreases}></special-section>
                            <comment-section @get-comment=${this._setComment}></comment-section>
                            ` 
                        : nothing
                    }
                </form>
            </div>
        `
    }

    
    _setEmployerFieldValues = (e: {detail: Employer}) => {
        this.unitData = {...this.unitData, unit_name: e.detail.employer, local: e.detail.local, subunit: e.detail.subunit}
    }

    _setReporterFieldValues = (e: {detail: Reporter}) => {
        this.unitData = {...this.unitData, contact: {...this.unitData.contact, name: e.detail.name, email: e.detail.email, phone: e.detail.phone}}
    }

    
    _setUnitStatusFieldValues = (e: {detail: UnitStatus}) => {
        this.unitData = {...this.unitData, 
                            inactive_unit: e.detail.inactive_unit,
                            wage_adjustment: e.detail.wage_adjustment,    
                            in_negotiation: e.detail.in_negotiation!,
                            number_of_members: Number(e.detail.memberCount), 
                            agreement_eff_date: e.detail.cbaEffectiveDates?.From as string,  
                            agreement_exp_date: e.detail.cbaEffectiveDates?.To as string,
                            cbaFile: e.detail.fileUpload} 
    }


    _setRegularWageIncreases = (e: {detail: []}) => {
        this.unitData = {...this.unitData, regular_raise_events: e.detail}
    }

    _setSpecialWageIncreases = (e: {detail: []}) => {
        this.unitData = {...this.unitData, special_raise_events: e.detail}
    }

    _setComment = (e: {detail: string}) => {
        this.unitData = {...this.unitData, comment: e.detail}
    }

}

declare global {
    interface HTMLElementTagName {
        'form-section': FormSection;
    }
}
