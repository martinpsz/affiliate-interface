var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
let TextField = class TextField extends LitElement {
    constructor() {
        super();
        this._captureInput = () => {
            this._enteredText = this.renderRoot.querySelector('input').value;
            this.dispatchEvent(new CustomEvent('entered-text', { detail: this._enteredText, bubbles: true, composed: true }));
        };
        this.defaultText = '';
    }
    render() {
        return html `
            <label for=${this.label}>${this.label}</label>
            <input placeholder=${this.placeholder} @input=${this._captureInput} .value=${this._enteredText ? this._enteredText : this.defaultText}/>
        `;
    }
};
TextField.styles = css `
        :host{
            display: flex;
            flex-direction: column;
        }


        label{
            font-family: var(--font);
            font-size: 0.8em;
            text-transform: uppercase;
        }

        input{
            outline: transparent;
            padding: 0.5em 0 0.5em 0.25em;
            border: none;
            border-bottom: 1px solid rgba(var(--black), 0.3);
        }

        input::placeholder{
            font-family: var(--font);
        }
   
    `;
__decorate([
    property()
], TextField.prototype, "label", void 0);
__decorate([
    property()
], TextField.prototype, "placeholder", void 0);
__decorate([
    property()
], TextField.prototype, "defaultText", void 0);
__decorate([
    state()
], TextField.prototype, "_enteredText", void 0);
TextField = __decorate([
    customElement('text-field')
], TextField);
export { TextField };
