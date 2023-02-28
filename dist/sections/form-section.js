var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { LitElement, html, css, nothing } from "lit";
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
let FormSection = class FormSection extends LitElement {
    constructor() {
        super();
        this._activeStatus = 'Yes';
        this._bargainStatus = 'No';
        this._activeStatusHandler = () => {
            if (this._activeStatus === 'No') {
                return html `
            <custom-button warning .buttonText=${"Submit for Review"} .icon=${html `<iconify-icon icon="ant-design:cloud-upload-outlined" style="color: white;" width="24" height="24"></iconify-icon>`}></custom-button>`;
            }
            if (this._activeStatus === 'Yes') {
                return html `
            <radio-input .prompt=${'Is the unit in bargaining in the period 8/1/22-7/31/23?'} .labels=${['Yes', 'No']} defaultCheck=${this._bargainStatus} @retrieve-selection=${this._getBargainingStatus}></radio-input>`;
            }
        };
        this._bargainStatusHandler = () => {
            if (this._bargainStatus === 'Yes' && this._activeStatus === 'Yes') {
                return html `
                <text-input id="member-num" lightMode .type=${"number"} label=${"Number of Members:"} .value=${this._unitData['number_of_members'] ? this._unitData['number_of_members'] : ''}></text-input>
                <custom-button warning .buttonText=${"Submit for Review"} .icon=${html `<iconify-icon icon="ant-design:cloud-upload-outlined" style="color: white;" width="24" height="24"></iconify-icon>`}></custom-button> 
            `;
            }
            if (this._bargainStatus === 'No' && this._activeStatus === 'Yes') {
                return html `
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
            `;
            }
        };
        this._generalRaisesTemplate = () => {
            return html `
            <div class='general'>
                <raise-container typeOfRaise=${'GENERAL'}></raise-container>
                <span @click=${this._removeATBRaise}>&#x2715;</span>
            </div>
        `;
        };
        this._specialRaisesTemplate = () => {
            return html `
            <div class='special'>
                <raise-container typeOfRaise=${'SPECIAL'}></raise-container>
                <span @click=${this._removeSpecialRaise}>&#x2715;</span>
            </div>
        `;
        };
        this._specialRaiseHandler = () => {
            if (this._specialRaiseSelection === 'No') {
                return html `<custom-button warning .buttonText=${"Submit for Review"} .icon=${html `<iconify-icon icon="ant-design:cloud-upload-outlined" style="color: white;" width="24" height="24"></iconify-icon>`}></custom-button>`;
            }
            else if (this._specialRaiseSelection === 'Yes') {
                return html `
                    ${this._specialRaisesTemplate()}
                    ${this.specialRaises.map(item => item)}
                    <div id="special-raise-btns">
                        <custom-button id="add-raise" 
                                       secondary 
                                       .buttonText=${'Add Special Raise'}
                                       .icon=${html `<iconify-icon icon="ant-design:folder-add-outlined" style="color: white;" height="24px" width="24px" ></iconify-icon>`}
                                       @click=${this._addSpecialRaise}>
                        </custom-button>
                        <custom-button warning .buttonText=${"Submit for Review"} .icon=${html `<iconify-icon icon="ant-design:cloud-upload-outlined" style="color: white;" width="24" height="24"></iconify-icon>`}></custom-button>
                    </div>
                    
                `;
            }
            else {
                return nothing;
            }
        };
        this._getActiveStatus = (e) => {
            this._activeStatus = e.detail;
        };
        this._getBargainingStatus = (e) => {
            this._bargainStatus = e.detail;
        };
        this._addGeneralRaise = () => {
            this.generalRaises.push(html `${this._generalRaisesTemplate()}`);
            this.requestUpdate();
        };
        this._addSpecialRaise = () => {
            this.specialRaises.push(html `${this._specialRaisesTemplate()}`);
            this.requestUpdate();
        };
        this._removeATBRaise = () => {
            var _a, _b;
            if (this.renderRoot.querySelectorAll('.general').length >= 2) {
                (_a = this.renderRoot.querySelector('.general')) === null || _a === void 0 ? void 0 : _a.remove();
            }
            else {
                (_b = this.renderRoot.querySelector('#atb')) === null || _b === void 0 ? void 0 : _b.setAttribute('warning', 'At least one increase needs to be recorded.');
                setTimeout(() => {
                    var _a;
                    (_a = this.renderRoot.querySelector('#atb')) === null || _a === void 0 ? void 0 : _a.removeAttribute('warning');
                }, 3500);
            }
        };
        this._removeSpecialRaise = () => {
            var _a;
            (_a = this.renderRoot.querySelector('.special')) === null || _a === void 0 ? void 0 : _a.remove();
        };
        this._getSpecialRaiseSelection = (e) => {
            this._specialRaiseSelection = e.detail;
        };
        this.generalRaises = [];
        this.specialRaises = [];
    }
    render() {
        let _a = this._unitData, { employer, local, subunit, contact, agreement_eff_date, agreement_exp_date, number_of_members } = _a, rest = __rest(_a, ["employer", "local", "subunit", "contact", "agreement_eff_date", "agreement_exp_date", "number_of_members"]);
        return html `
            <form id="unit-form">
                <employer-section employer=${employer} 
                                  local=${local} 
                                  subunit=${subunit}>
                </employer-section>

                <reporter-section .contact=${contact}></reporter-section>

                <unit-status-section .memberNumber=${number_of_members}
                                     .effectiveFrom=${agreement_eff_date}
                                     .effectiveTo=${agreement_exp_date}>
                </unit-status-section>

                <form-header .title=${'Unit Status'}></form-header>
                    <radio-input .prompt=${'Is the unit active in the period 8/1/22-7/31/23?:'} .labels=${['Yes', 'No']} defaultCheck=${this._activeStatus} @retrieve-selection=${this._getActiveStatus}></radio-input>

                ${this._activeStatusHandler()}
                ${this._bargainStatusHandler()}

                ${(this._bargainStatus === 'No' && this._activeStatus === 'Yes') ? html `<form-header id="atb" .title=${'Across the Board Raises'}></form-header>
                     ${this._generalRaisesTemplate()}
                     ${this.generalRaises.map(item => item)}
                    <custom-button id="add-raise" secondary .icon=${html `<iconify-icon icon="ant-design:folder-add-outlined" style="color: white;" height="24px" width="24px" ></iconify-icon>`} .buttonText=${'Add General Raise'} @click=${this._addGeneralRaise}></custom-button>
                
                ` : nothing} 

                ${(this._bargainStatus === 'No' && this._activeStatus === 'Yes') ? html `<form-header .title=${'Special Raises'}></form-header>
                     <radio-input dirColumn .prompt=${'Did any part of the unit receive special pay increases in addition to the across the board raises increases reported above?'} 
                                            .labels=${['Yes', 'No']} @retrieve-selection=${this._getSpecialRaiseSelection}></radio-input> ${this._specialRaiseHandler()}` : nothing}
            </form>
        `;
    }
};
FormSection.styles = css `
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
            //margin-bottom: 1em;
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
        
        
    `;
__decorate([
    state()
], FormSection.prototype, "_unitData", void 0);
__decorate([
    state()
], FormSection.prototype, "_activeStatus", void 0);
__decorate([
    state()
], FormSection.prototype, "_bargainStatus", void 0);
__decorate([
    property()
], FormSection.prototype, "generalRaises", void 0);
__decorate([
    state()
], FormSection.prototype, "_specialRaiseSelection", void 0);
__decorate([
    property()
], FormSection.prototype, "specialRaises", void 0);
FormSection = __decorate([
    customElement('form-section')
], FormSection);
export { FormSection };
