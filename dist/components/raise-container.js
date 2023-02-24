var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import '../components/date-input';
import '../components/radio-input';
import '../components/text-input';
let RaiseContainer = class RaiseContainer extends LitElement {
    constructor() {
        super(...arguments);
        this._commonRaiseFields = () => {
            return html `
            <date-input id="effective" .type=${'date'} labelFrom=${"Effective From:"}></date-input>
            <radio-input raiseSelection id="raiseType" dirColumn .labels=${['Percent', 'Hourly', 'Annually']} prompt=${'Type of increase:'} @retrieve-selection=${this._getRaiseType}></radio-input>
            ${this._selectedRaiseType && html `<text-input id='raiseAmt' lightMode label=${'Amount of raise:'} type=${'number'}></text-input>
            `}
        `;
        };
        this._getRaiseType = (e) => {
            this._selectedRaiseType = e.detail;
        };
    }
    render() {
        return html `
            ${this.typeOfRaise === 'GENERAL' ? html `
                <div id='general-raise'>
                    ${this._commonRaiseFields()}
                </div>
            ` : html `
                <div id='special-raise'>
                    ${this._commonRaiseFields()}
                    <text-input id='numAffected' lightMode .type=${'number'} label=${'# of workers affected:'}></text-input>
                    <text-input id='titlesAffected' lightMode .type=${'text'} label=${'Titles receiving special raise:'}></text-input>
                </div>
            `}
        `;
    }
};
RaiseContainer.styles = css `
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
            grid-template-columns: 140px 280px 164px 164px;
            grid-column-gap: 0.5em;
            grid-row-gap: 1em;
            align-items: end;
            justify-content: center;
            grid-template-areas:
                'effective raiseType raiseAmt numAffected'
                'titlesAffected titlesAffected titlesAffected titlesAffected';
                
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
    `;
__decorate([
    property()
], RaiseContainer.prototype, "typeOfRaise", void 0);
__decorate([
    state()
], RaiseContainer.prototype, "_selectedRaiseType", void 0);
RaiseContainer = __decorate([
    customElement('raise-container')
], RaiseContainer);
export { RaiseContainer };
