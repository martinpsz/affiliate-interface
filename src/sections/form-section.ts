import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import '../components/form-header';
import '../components/radio-input';
import '../components/custom-button';
import '../components/text-input';
import '../components/date-input';
import '../components/raise-container';
import { RaiseContainer } from "../components/raise-container";

interface Person {
    name: string,
    email: string,
    phone: string
}
interface Unit {
    employer: string,
    local: number | null,
    contact: Person | null,
    number_of_members: number | null,
    agreement_eff_date: string | null,
    agreement_exp_date: string | null,
}

interface UnitList extends Array<Unit>{}
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

        #employerID{
            display: grid;
            grid-template-columns: 1fr 10%;
            grid-column-gap: 0.5em;
        }

        #reporter{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 0.5em;
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
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            column-gap: 1em;
        }

        .raise{
            display: grid;
            grid-template-columns: 1fr 5%;
            padding: 0.25em 0 0.75em;

        }

        .raise span{
            align-self: start;
            justify-self: center;
            cursor: pointer;
            padding: 0.25em;
        }

        .raise:first-of-type{
            background: red;
        }

        .raise:nth-of-type(2n+1){
            background: rgb(var(--blue), 0.1);
        }

        
        
        
    `
    @state()
    _unitData!: UnitList

    @state()
    _activeStatus = 'Yes'

    @state()
    _bargainStatus = 'No';

    @property()
    generalRaises!: TemplateResult[];

    _activeStatusHandler = () => {
        if(this._activeStatus === 'No'){
            return html`
            <custom-button warning .buttonText=${"Submit for Review"}></custom-button>`
        } 

        if (this._activeStatus === 'Yes'){
            return html`
            <radio-input .prompt=${'Is the unit in bargaining in the period 8/1/22-7/31/23?'} .labels=${['Yes', 'No']} defaultCheck=${this._bargainStatus} @retrieve-selection=${this._getBargainingStatus}></radio-input>`
        }
    }

    _bargainStatusHandler = () => {
        if (this._bargainStatus === 'Yes' && this._activeStatus === 'Yes'){
            return html`
                <text-input id="member-num" lightMode .type=${"number"} label=${"Number of Members:"} .value=${this._unitData[0]['number_of_members'] ? this._unitData[0]['number_of_members'] : ''}></text-input>
                <custom-button warning .buttonText=${"Submit for Review"}></custom-button> 
            `
        }

        if (this._bargainStatus === 'No' && this._activeStatus === 'Yes'){
            return html`
                <div class="unit-info">
                    <text-input lightMode .type=${"number"} label=${"Number of Members:"} .value=${this._unitData[0]['number_of_members'] ? this._unitData[0]['number_of_members'] : ''}></text-input>
                    <date-input 
                                .type=${'date-range'}
                                .labelFrom=${'CBA Effective From:'}
                                .labelTo=${'CBA Effective To:'}
                                .valueFrom=${this._unitData[0]['agreement_eff_date'] ? this._unitData[0]['agreement_eff_date'] : ''}
                                .valueTo=${this._unitData[0]['agreement_exp_date'] ? this._unitData[0]['agreement_exp_date'] : ''}>
                    </date-input>
                    <text-input lightmode .type=${"file"} label=${"Upload CBA:"}></text-input>
                </div>
            `
        }
    }

    _raisesHandler = (typeOfRaise:string) => {
        return html`
            <div class="raise">
                <raise-container typeOfRaise=${typeOfRaise}></raise-container>
                <span @click=${this._removeRaise}>&#x2715;</span>
            </div>
        `
    }

    constructor(){
        super()
        this.generalRaises = []
    }

    render() {
        return html`
            <form id="unit-form">
                <div id="employerID">
                    <text-input lightMode .type=${"text"} label=${"Unit/Employer:"} .value=${this._unitData[0]['employer']}></text-input>
                    <text-input lightMode .type=${"number"} label=${"Local:"} .value=${this._unitData[0]['local']}></text-input>
                </div>

                <form-header .title=${'Reporting for Unit'}></form-header>
                <div id="reporter">
                    <text-input lightMode .type=${"text"} label=${"Full Name:"} .value=${this._unitData[0]['contact'] === null ? '' : this._unitData[0]['contact']['name']}></text-input>
                    <text-input lightMode .type=${"email"} label=${"Email:"} .value=${this._unitData[0]['contact'] === null ? '' : this._unitData[0]['contact']['email']}></text-input>
                    <text-input lightMode .type=${"tel"} label=${"Phone:"} .value=${this._unitData[0]['contact'] === null ? '' : this._unitData[0]['contact']['phone']}></text-input>
                </div>

                <form-header .title=${'Unit Status'}></form-header>
                    <radio-input .prompt=${'Is the unit active in the period 8/1/22-7/31/23?:'} .labels=${['Yes', 'No']} defaultCheck=${this._activeStatus} @retrieve-selection=${this._getActiveStatus}></radio-input>

                ${this._activeStatusHandler()}
                ${this._bargainStatusHandler()}

                ${(this._bargainStatus === 'No' && this._activeStatus === 'Yes') ? html`<form-header id="atb" .title=${'Across the Board Raises'}></form-header>
                     ${this._raisesHandler("GENERAL")}
                     ${this.generalRaises.map(item => item)}
                    <custom-button id="add-raise" secondary .buttonText=${'Add Raise'} @click=${this._addGeneralRaise}></custom-button>
                
                ` : nothing} 

                ${(this._bargainStatus === 'No' && this._activeStatus === 'Yes') ? html`<form-header .title=${'Special Raises'}></form-header>
                     <radio-input dirColumn .prompt=${'Did any part of the unit receive special pay increases in addition to the across the board raises increases reported above?'} .labels=${['Yes', 'No']}></radio-input>
                ` : nothing}
            </form>
        `
    }

    _getActiveStatus = (e: { detail: string; }) => {
        this._activeStatus = e.detail;
    }

    _getBargainingStatus = (e: { detail: string; }) => {
        this._bargainStatus = e.detail
    }

    _addGeneralRaise = () => {
        this.generalRaises.push(html`${this._raisesHandler('GENERAL')}`)
        this.requestUpdate();
    }

    _removeRaise = () => {
        if(this.renderRoot.querySelectorAll('.raise').length >= 2){
            this.renderRoot.querySelector('.raise')?.remove()
        } else {
            this.renderRoot.querySelector('#atb')?.setAttribute('warning', 'At least one increase needs to be recorded.')
            setTimeout(() => {
                this.renderRoot.querySelector('#atb')?.removeAttribute('warning')
            }, 3500); 
        }
    }

    

}

declare global {
    interface HTMLElementTagName {
        'form-section': FormSection;
    }
}
