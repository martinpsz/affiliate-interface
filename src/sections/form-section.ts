import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/form-header';
import '../components/radio-input';
import '../components/custom-button';
import '../components/text-input';
import '../components/date-input';

interface Person {
    name: string,
    email: string,
    phone: string
}
interface Unit {
    employer: string,
    local: number,
    contact: Person
}

interface UnitList extends Array<Unit>{}
@customElement('form-section')
export class FormSection extends LitElement {
    static styles = css`
        form{
            padding: 1em;
            display: flex;
            flex-direction: column;
        }

        #employerID{
            display: grid;
            grid-template-columns: 1fr 15%;
            grid-column-gap: 0.5em;
        }

        #reporter{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 0.5em;
        }

        custom-button{
            align-self: flex-end;
            margin: 1em 0;
        }

    `
    @state()
    _unitData!: UnitList

    @state()
    _activeStatus = 'Yes'

    @state()
    _bargainStatus = 'No';

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
                    <radio-input .prompt=${'Is the unit active in the period 8/1/22-7/31/23?:'} .labels=${['Yes', 'No']} defaultCheck=${'Yes'} @retrieve-selection=${this._getActiveStatus}></radio-input>

                    ${this._activeStatus === 'No' ? 
                        html`
                        <custom-button warning .buttonText=${"Submit for Review"}></custom-button>` : 
                        html`
                        <radio-input .prompt=${'Is the unit in bargaining in the period 8/1/22-7/31/23?'} .labels=${['Yes', 'No']} @retrieve-selection=${this._getBargainingStatus}></radio-input>
                        `
                    }

                    ${this._bargainStatus !== 'No' && this._activeStatus !== 'No' ?
                        html`
                        <custom-button warning .buttonText=${"Submit for Review"}></custom-button>` : 
                        html`
                        
                        <date-input .prompt=${"Contract Effective:"} 
                                    .type=${'date-range'}
                                    .labelFrom=${'From:'}
                                    .labelTo=${'To:'}>
                        </date-input>
                        `
                    }
            </form>
        `
    }

    _getActiveStatus = (e: { detail: string; }) => {
        this._activeStatus = e.detail;
    }

    _getBargainingStatus = (e: { detail: string; }) => {
        this._bargainStatus = e.detail
    }
}

declare global {
    interface HTMLElementTagName {
        'form-section': FormSection;
    }
}
