import { LitElement, html, css, nothing, TemplateResult, PropertyValueMap } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import '../components/form-header';
import '../components/radio-input';
import '../components/custom-button';
import '../components/text-input';
import '../components/date-input';
import '../components/raise-container';
import '../components/Form/employer-section';
import '../components/Form/reporter-section';
import '../components/Form/unit-status-section';
import {Unit, Reporter} from '../interfaces/interfaces';
import { formValidator } from "../utilities/formValidator";

interface FormData {
    contact: Reporter | {}
}
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
    _activeStatus = 'Yes'

    @state()
    _bargainStatus = 'No';

    @property()
    generalRaises!: TemplateResult[];

    @state()
    _specialRaiseSelection!: string;

    @property()
    specialRaises!: TemplateResult[];

    @state()
    _warnings!: {contact: {}};

    _activeStatusHandler = () => {
        if(this._activeStatus === 'No'){
            return html`
            <custom-button warning .buttonText=${"Submit for Review"} .icon=${html`<iconify-icon icon="ant-design:cloud-upload-outlined" style="color: white;" width="24" height="24"></iconify-icon>`}></custom-button>`
        } 

        if (this._activeStatus === 'Yes'){
            return html`
            <radio-input .prompt=${'Is the unit in bargaining in the period 8/1/22-7/31/23?'} .labels=${['Yes', 'No']} defaultCheck=${this._bargainStatus} @retrieve-selection=${this._getBargainingStatus}></radio-input>`
        }
    }

    _bargainStatusHandler = () => {
        if (this._bargainStatus === 'Yes' && this._activeStatus === 'Yes'){
            return html`
                <text-input id="member-num" lightMode .type=${"number"} label=${"Number of Members:"} .value=${this._unitData['number_of_members'] ? this._unitData['number_of_members'] : ''}></text-input>
                <custom-button warning .buttonText=${"Submit for Review"} .icon=${html`<iconify-icon icon="ant-design:cloud-upload-outlined" style="color: white;" width="24" height="24"></iconify-icon>`}></custom-button> 
            `
        }

        if (this._bargainStatus === 'No' && this._activeStatus === 'Yes'){
            return html`
                <div class="unit-info">
                    <text-input lightMode .type=${"number"} label=${"Number of Members:"} .value=${this._unitData['number_of_members'] ? this._unitData['number_of_members'] : ''}></text-input>
                    <date-input 
                                .type=${'date-range'}
                                .labelFrom=${'CBA Effective From:'}
                                .labelTo=${'CBA Effective To:'}
                                .valueFrom=${this._unitData['agreement_eff_date'] ? this._unitData['agreement_eff_date'] : ''}
                                .valueTo=${this._unitData['agreement_exp_date'] ? this._unitData['agreement_exp_date'] : ''}>
                    </date-input>
                    <text-input lightmode .type=${"file"} label=${"Upload CBA:"}></text-input>
                </div>
            `
        }
    }

    _generalRaisesTemplate = () => {
        return html`
            <div class='general'>
                <raise-container typeOfRaise=${'GENERAL'}></raise-container>
                <span @click=${this._removeATBRaise}>&#x2715;</span>
            </div>
        `
    }

    _specialRaisesTemplate = () => {
        return html`
            <div class='special'>
                <raise-container typeOfRaise=${'SPECIAL'}></raise-container>
                <span @click=${this._removeSpecialRaise}>&#x2715;</span>
            </div>
        `
    }

    _specialRaiseHandler = () => {
        if(this._specialRaiseSelection === 'No'){
            return html`<custom-button warning .buttonText=${"Submit for Review"} .icon=${html`<iconify-icon icon="ant-design:cloud-upload-outlined" style="color: white;" width="24" height="24"></iconify-icon>`}></custom-button>`
        } 

        else if(this._specialRaiseSelection === 'Yes'){
            return html `
                    ${this._specialRaisesTemplate()}
                    ${this.specialRaises.map(item => item)}
                    <div id="special-raise-btns">
                        <custom-button id="add-raise" 
                                       secondary 
                                       .buttonText=${'Add Special Raise'}
                                       .icon=${html`<iconify-icon icon="ant-design:folder-add-outlined" style="color: white;" height="24px" width="24px" ></iconify-icon>`}
                                       @click=${this._addSpecialRaise}>
                        </custom-button>
                        <custom-button warning .buttonText=${"Submit for Review"} .icon=${html`<iconify-icon icon="ant-design:cloud-upload-outlined" style="color: white;" width="24" height="24"></iconify-icon>`}></custom-button>
                    </div>
                    
                `
        }

        else{
            return nothing
        }
    }

    constructor(){
        super()
        this.generalRaises = []
        this.specialRaises = [] 
        this._warnings = {contact: {}}
    }

    

    render() {
        //console.log(`Original data`, {contact: {...this._unitData['contact']}})
        

        return html`
            <form id="unit-form" >
                <employer-section employer=${this._unitData['employer']} 
                                  local=${this._unitData['local']} 
                                  subunit=${this._unitData['subunit']}>
                </employer-section>

                <reporter-section .contact=${this._unitData['contact']}
                                  .warnings=${this._warnings}
                                  @reporter-field-values=${this._setReporterFieldValues}>
                </reporter-section>

                <unit-status-section .memberNumber=${this._unitData['number_of_members']}
                                     .effectiveFrom=${this._unitData['agreement_eff_date']}
                                     .effectiveTo=${this._unitData['agreement_exp_date']}
                                     @unit-status-values=${true}> 
                </unit-status-section>

                <!--<form-header .title=${'Unit Status'}></form-header>
                    <radio-input .prompt=${'Is the unit active in the period 8/1/22-7/31/23?:'} .labels=${['Yes', 'No']} defaultCheck=${this._activeStatus} @retrieve-selection=${this._getActiveStatus}></radio-input>

                ${this._activeStatusHandler()}
                ${this._bargainStatusHandler()}-->

                ${(this._bargainStatus === 'No' && this._activeStatus === 'Yes') ? html`<form-header id="atb" .title=${'Across the Board Raises'}></form-header>
                     ${this._generalRaisesTemplate()}
                     ${this.generalRaises.map(item => item)}
                    <custom-button id="add-raise" secondary .icon=${html`<iconify-icon icon="ant-design:folder-add-outlined" style="color: white;" height="24px" width="24px" ></iconify-icon>`} .buttonText=${'Add General Raise'} @click=${this._addGeneralRaise}></custom-button>
                
                ` : nothing} 

                ${(this._bargainStatus === 'No' && this._activeStatus === 'Yes') ? html`<form-header .title=${'Special Raises'}></form-header>
                     <radio-input dirColumn .prompt=${'Did any part of the unit receive special pay increases in addition to the across the board raises increases reported above?'} 
                                            .labels=${['Yes', 'No']} @retrieve-selection=${this._getSpecialRaiseSelection}></radio-input> ${this._specialRaiseHandler()}` : nothing}
            </form>
        `
    }

    _setReporterFieldValues = (e: {detail: Reporter}) => {
        const originalData = Object.keys({...this._unitData.contact}).length === 0 ? {name: '', email: '', phone: ''} : {...this._unitData.contact}
        this._unitData.contact = Object.assign(originalData, e.detail)

        
        //this._warnings = {contact: {...formValidator(this._unitData.contact, 'reporter-section')}}

       
        //console.log(`Warnings:`, this._warnings)

        
        this.requestUpdate()        

        
    }

    _getActiveStatus = (e: { detail: string; }) => {
        this._activeStatus = e.detail;
    }


    _getBargainingStatus = (e: { detail: string; }) => {
        this._bargainStatus = e.detail
    }

    _addGeneralRaise = () => {
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
    }
}

declare global {
    interface HTMLElementTagName {
        'form-section': FormSection;
    }
}
