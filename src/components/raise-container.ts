import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import '../components/date-input';
import '../components/radio-input';
import '../components/text-input';


type RaiseType = 'GENERAL' | 'SPECIAL';

@customElement('raise-container')
export class RaiseContainer extends LitElement{
    static styles = css`
        #general-raise{
            //display: flex;
            //column-gap: 3em;
            //align-items: flex-end;
            //justify-content: center;
            display: grid;
            grid-template-columns: 140px 280px 140px;
            grid-column-gap: 2em;
            align-items: end;
            justify-content: center;

        }

        #special-raise{
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            grid-column-gap: 0.5em;
            grid-row-gap: 1em;
            align-items: end;
            justify-content: center;
            grid-template-areas:
                'effective raiseType raiseAmt '
                'numAffected titlesAffected titlesAffected';
                
        }

        #special-raise #effective{
            grid-area: effective;
        }

        #special-raise #raiseType{
            grid-area: raiseType;  
        }

        #special-raise #raiseAmt{
            grid-area: raiseAmt;
        }

        #special-raise #numAffected{
            grid-area: numAffected;
        }

        #special-raise #titlesAffected{
            grid-area: titlesAffected;
        }
    `

    @property()
    typeOfRaise!: RaiseType

    @state()
    _selectedRaiseType!: string;

    _commonRaiseFields = () => {
        return html`
            <date-input id="effective" .type=${'date'} labelFrom=${"Effective From:"}></date-input>
            <radio-input raiseSelection id="raiseType" dirColumn .labels=${['Percent', 'Hourly', 'Annually']} prompt=${'Type of increase:'} @retrieve-selection=${this._getRaiseType}></radio-input>
            ${this._selectedRaiseType && html`<text-input id='raiseAmt' lightMode label=${'Amount of raise:'} type=${'number'}></text-input>
            `}
        `
    }
    
    render() {
        return html`
            ${this.typeOfRaise === 'GENERAL' ? html`
                <div id='general-raise'>
                    ${this._commonRaiseFields()}
                </div>
            `:html`
                <div id='special-raise'>
                    ${this._commonRaiseFields()}
                    <text-input id='numAffected' lightMode .type=${'number'} label=${'# of workers affected:'}></text-input>
                    <text-input id='titlesAffected' lightMode .type=${'text'} label=${'Titles receiving special raise:'}></text-input>
                </div>
            `}
        `
    }

    _getRaiseType = (e: { detail: string; }) => {
        this._selectedRaiseType = e.detail;
    }
}

declare global {
    interface HTMLElementTagName {
        'raise-container': RaiseContainer;
    }
}