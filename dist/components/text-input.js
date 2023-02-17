var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
let TextInput = class TextInput extends LitElement {
    constructor() {
        super(...arguments);
        this.lightMode = false;
        this._textInputEmitter = () => {
            var _a;
            const inputText = (_a = this.renderRoot.querySelector('input')) === null || _a === void 0 ? void 0 : _a.value;
            this.dispatchEvent(new CustomEvent('retrieve-input', {
                detail: inputText === null || inputText === void 0 ? void 0 : inputText.trim().toLowerCase(),
                bubbles: true,
                composed: true,
            }));
        };
    }
    render() {
        const classes = { lightMode: this.lightMode };
        return html `
            <div class=${classMap(classes)}>
                <label for=${this.label}>${this.label}</label>
                <input id=${this.label} type=${this.type} placeholder=${this.placeholder} name=${this.label.replace(/:$/g, '')} @input=${this._textInputEmitter}/>
            </div>
        `;
    }
};
TextInput.styles = css `
        div{
            display: flex;
            flex-direction: column;
        }

        label, input::placeholder, input{
            font-family: var(--font);
        }

        label{
            text-transform: uppercase;
            color: rgb(var(--white));
            margin-bottom: 0.25em;
        }

        input{
            padding: 0.5em 0 0.5em 0.25em;
            border: none;
            border-radius: 4px;
        }

        input:focus{
            outline: transparent;
        }

        input::placeholder{
            color: rgba(var(--black), 0.5);
        }

        .lightMode label{
            color: rgb(var(--black));
        }

        .lightMode input{
            border: 1px solid rgba(var(--black), 0.5);
        }
    
    `;
__decorate([
    property()
], TextInput.prototype, "label", void 0);
__decorate([
    property()
], TextInput.prototype, "placeholder", void 0);
__decorate([
    property()
], TextInput.prototype, "type", void 0);
__decorate([
    property({ type: Boolean })
], TextInput.prototype, "lightMode", void 0);
TextInput = __decorate([
    customElement('text-input')
], TextInput);
export { TextInput };
