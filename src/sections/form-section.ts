import { LitElement, html, css, nothing, TemplateResult, PropertyValueMap } from "lit";
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
import {Unit, Reporter, Employer, UnitStatus} from '../interfaces/interfaces';

@customElement('form-section')
export class FormSection extends LitElement {
    static styles = css`
        form{
            padding: 1em;
            display: flex;
            flex-direction: column;
            height: calc(80vh - (2em + 2px));
            overflow-y: auto;
        } 

        form::-webkit-scrollbar{
            width: 0.25em;
        }

        form::-webkit-scrollbar-track{
            box-shadow: inset 0 0 6px rgba(var(--white), 0.25);
        }

        form::-webkit-scrollbar-thumb{
            background: rgb(var(--blue));
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

        .general, .special{
            display: grid;
            grid-template-columns: 1fr 5%;
            margin-bottom: 1em;
        }

        .general{
            padding: 0.25em 0 0.75em;
        }

        .special{
            padding: 0.5em;
            margin: 1em auto;
            width: 95%;
        }

        .general span, .special span{
            align-self: start;
            justify-self: center;
            cursor: pointer;
            padding: 0.25em;
        }

        .general:nth-of-type(2n+1), .special:nth-of-type(2n+1){
            background: rgb(var(--blue), 0.1);
        }

        #special-raise-btns{
            margin-left: auto;
        }
        
        
    `
    @state()
    _unitData!: Unit

    @state()
    _activeStatus = 'Yes' // remove

    @state()
    _bargainStatus = 'No'; // remove

    @property()
    generalRaises!: TemplateResult[];

    @state()
    _specialRaiseSelection!: string;

    @property()
    specialRaises!: TemplateResult[];

    @state()
    _employerSection!: {}

    @state()
    _unitStatusSection!: UnitStatus;


    constructor(){
        super()
        this.generalRaises = []
        this.specialRaises = [] 

        this._unitStatusSection = {'activeStatus': 'Yes', 
                                   'bargainStatus': undefined,
                                   'wageStatus': undefined,
                                   'cbaEffectiveDates': undefined,
                                   'fileUpload': undefined,
                                   'memberCount': undefined}
    }

    render() {
        return html`
            <form id="unit-form" >
                <employer-section employer=${this._unitData['employer']} 
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
                        <!--add special raises section here-->
                        ` 
                    : nothing
                }
            </form>
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


    _getActiveStatus = (e: { detail: string; }) => {
        this._activeStatus = e.detail;
    }


    _getBargainingStatus = (e: { detail: string; }) => {
        this._bargainStatus = e.detail
    }

    /*_addGeneralRaise = () => {
        this.generalRaises.push(html`${this._generalRaisesTemplate()}`)
        this.requestUpdate();
    }

    _addSpecialRaise = () => {
        this.specialRaises.push(html`${this._specialRaisesTemplate()}`)
        this.requestUpdate()
    }
  

    _removeATBRaise = () => {
        if(this.renderRoot.querySelectorAll('.general').length >= 2){
            this.renderRoot.querySelector('.general')?.remove()
        } else {
            this.renderRoot.querySelector('#atb')?.setAttribute('warning', 'At least one increase needs to be recorded.')
            setTimeout(() => {
                this.renderRoot.querySelector('#atb')?.removeAttribute('warning')
            }, 3500); 
        }
    }

    _removeSpecialRaise = () => {
        this.renderRoot.querySelector('.special')?.remove()
    }

    _getSpecialRaiseSelection = (e: { detail: any; }) => {
        this._specialRaiseSelection = e.detail;
    }*/
}

declare global {
    interface HTMLElementTagName {
        'form-section': FormSection;
    }
}
