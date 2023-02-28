var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let EmployerSection = class EmployerSection extends LitElement {
    render() {
        return html `
            <div>
                <text-input lightMode .type=${"text"} label=${"Employer:"} .value=${this.employer ? this.employer : ''}></text-input>
                <text-input lightMode .type=${"number"} label=${"Local:"} .value=${this.local ? this.local : ''}></text-input>
                <text-input lightMode .type=${"text"} label=${"Subunit:"} .value=${this.subunit ? this.subunit : ''}></text-input>
            </div>
        `;
    }
};
EmployerSection.styles = css `
        div{
            display: grid;
            grid-template-columns: 1fr 10% 10%;
            grid-column-gap: 0.5em;
        }
    `;
__decorate([
    property()
], EmployerSection.prototype, "employer", void 0);
__decorate([
    property()
], EmployerSection.prototype, "local", void 0);
__decorate([
    property()
], EmployerSection.prototype, "subunit", void 0);
EmployerSection = __decorate([
    customElement('employer-section')
], EmployerSection);
export { EmployerSection };
