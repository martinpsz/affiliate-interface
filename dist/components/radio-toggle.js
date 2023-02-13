var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let RadioToggle = class RadioToggle extends LitElement {
    constructor() {
        super();
        this.columnDirection = false;
        this.prompt = '';
        this.checked = 'All';
    }
    render() {
        console.log(this.labels);
        return html `
            <div class = ${this.columnDirection ? "vertical" : ''}>
                <span>${this.prompt}</span>
                ${this.labels.map(label => html `
                    <input id=${label} type="radio" ${label === this.checked && 'checked'} name="radio-options"/>
                    <label for=${label}>${label}</label>
                `)}
            </div>

        `;
    }
};
RadioToggle.styles = css `
        display: flex;


        .vertical {
            flex-direction: column;
        }
    
    `;
__decorate([
    property()
], RadioToggle.prototype, "prompt", void 0);
RadioToggle = __decorate([
    customElement('radio-toggle')
], RadioToggle);
export { RadioToggle };
