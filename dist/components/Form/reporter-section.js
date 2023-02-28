var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../form-header";
let ReporterSection = class ReporterSection extends LitElement {
    render() {
        let { name: fullName, phone, email } = this.contact || {};
        return html `
            <form-header .title=${'Reporting for Unit'}></form-header>
            <div>
                <text-input lightMode .type=${"text"} label=${"Full Name:"} .value=${fullName ? fullName : ''}></text-input>
                <text-input lightMode .type=${"email"} label=${"Email:"} .value=${email ? email : ''}></text-input>
                <text-input lightMode .type=${"tel"} label=${"Phone:"} .value=${phone ? phone : ''}></text-input>
            </div>
        
        `;
    }
};
ReporterSection.styles = css `
        div{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 0.5em;
        }
    `;
__decorate([
    property()
], ReporterSection.prototype, "contact", void 0);
ReporterSection = __decorate([
    customElement('reporter-section')
], ReporterSection);
export { ReporterSection };
