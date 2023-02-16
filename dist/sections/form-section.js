var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
let FormSection = class FormSection extends LitElement {
    render() {
        return html `

            <form></form>
        `;
    }
};
FormSection.styles = css `
        section{
            
        }
    `;
__decorate([
    state()
], FormSection.prototype, "_unitData", void 0);
FormSection = __decorate([
    customElement('form-section')
], FormSection);
export { FormSection };
