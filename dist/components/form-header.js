var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let FormHeader = class FormHeader extends LitElement {
    render() {
        return html `
            <h2>${this.title}</h2>
            <p>${this.warning}</p>
        `;
    }
};
FormHeader.styles = css `
        h2{
            font-family: var(--font);
            font-size: 1.1em;
            font-weight: 200;
            text-transform: uppercase;
            color: rgb(var(--blue));
            border-bottom: 4px solid rgb(var(--green));
        }
    
    `;
__decorate([
    property()
], FormHeader.prototype, "title", void 0);
__decorate([
    property()
], FormHeader.prototype, "warning", void 0);
FormHeader = __decorate([
    customElement('form-header')
], FormHeader);
export { FormHeader };
