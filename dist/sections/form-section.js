var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/form-header';
import '../components/radio-input';
import '../components/custom-button';
import '../components/text-input';
import '../components/date-input';
let FormSection = class FormSection extends LitElement {
    render() {
        return html `
            <form id="unit-form">
                <div id="employerID">
                    <text-input lightMode .type=${"text"} label=${"Unit/Employer:"}></text-input>
                    <text-input lightMode .type=${"number"} label=${"Local:"}></text-input>
                </div>
                <form-header .title=${'Reporting for Unit'}></form-header>
                <div id="reporter">
                    <text-input lightMode .type=${"text"} label=${"Full Name:"}></text-input>
                    <text-input lightMode .type=${"email"} label=${"Email:"}></text-input>
                    <text-input lightMode .type=${"tel"} label=${"Phone:"}></text-input>
                </div>
                <form-header .title=${'Unit Status'}></form-header>
                    <radio-input .prompt=${'Is the unit active in the period 8/1/22-7/31/23?:'} .labels=${['Yes', 'No']} defaultCheck=${'Yes'}></radio-input>
            </form>
        `;
    }
};
FormSection.styles = css `
        form{
            padding: 1em;
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

    `;
__decorate([
    state()
], FormSection.prototype, "_unitData", void 0);
FormSection = __decorate([
    customElement('form-section')
], FormSection);
export { FormSection };
