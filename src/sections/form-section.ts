import { LitElement, html, css, nothing} from "lit";
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
import '../components/Input/input-field'
import {Unit, Reporter, Employer, UnitStatus} from '../interfaces/interfaces';

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
    @state()
    _unitData!: Unit

    @state()
    _employerSection!: {}

    @state()
    _unitStatusSection!: UnitStatus;


    constructor(){
        super()
 
        this._unitStatusSection = {'activeStatus': 'Yes', 
                                   'bargainStatus': undefined,
                                   'wageStatus': undefined,
                                   'cbaEffectiveDates': undefined,
                                   'fileUpload': undefined,
                                   'memberCount': undefined}
    }

    render() {
        return html`
            <div id="form-container">
                <form-nav></form-nav>
                <form>
                    <employer-section employer=${this._unitData['unit_name']} 
                                    local=${this._unitData['local']} 
                                    subunit=${this._unitData['subunit']}
                                    @employer-field-values=${this._setEmployerFieldValues}>
                    </employer-section>

                    <reporter-section .contact=${this._unitData['contact']}
                                    @reporter-field-values=${this._setReporterFieldValues}>
                    </reporter-section>

                    <unit-status-section memberNumber=${this._unitData['number_of_members']}
                                        .effectiveFrom=${this._unitData['agreement_eff_date']}
                                        .effectiveTo=${this._unitData['agreement_exp_date']}
                                        @unit-status-values=${this._setUnitStatusFieldValues}> 
                    </unit-status-section>

                    ${this._unitStatusSection.activeStatus === 'No' && this._unitStatusSection.wageStatus === 'Yes'?
                        html`<raises-section></raises-section>
                            <special-section></special-section>
                            ` 
                        : nothing
                    }
                </form>
            </div>
        `
    }

    _setEmployerFieldValues = (e: {detail: Employer}) => {
        const originalData = {employer: this._unitData['employer'], local: this._unitData['local'], subunit: this._unitData['subunit']}
        
        this._unitData.employer = originalData.employer !== e.detail.employer ? e.detail.employer : originalData.employer
        this._unitData.local = originalData.local !== e.detail.local ? e.detail.local : originalData.local
        this._unitData.subunit = originalData.subunit !== e.detail.subunit ? e.detail.subunit: originalData.subunit

        this.requestUpdate()
    }

    _setReporterFieldValues = (e: {detail: Reporter}) => {
        const originalData = Object.keys({...this._unitData.contact}).length === 0 ? {name: '', email: '', phone: ''} : {...this._unitData.contact}
        this._unitData.contact = Object.assign(originalData, e.detail)
        
        this.requestUpdate()        
    }

    _setUnitStatusFieldValues = (e: {detail: UnitStatus}) => {
        this._unitStatusSection = e.detail;
    }


}

declare global {
    interface HTMLElementTagName {
        'form-section': FormSection;
    }
}
