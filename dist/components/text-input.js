var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import { debounce } from "../utilities/searchDebounce";
let TextInput = class TextInput extends LitElement {
    constructor() {
        super(...arguments);
        this.lightMode = false;
        this._textInputEmitter = () => {
            var _a;
            let inputText = (_a = this.renderRoot.querySelector('input')) === null || _a === void 0 ? void 0 : _a.value.trim().toLowerCase();
            this.dispatchEvent(new CustomEvent('entered-input', {
                detail: inputText,
                bubbles: true,
                composed: true
            }));
        };
    }
    render() {
        const classes = { lightMode: this.lightMode };
        return html `
            <div class=${classMap(classes)}>
                <label for=${this.label}>${this.label}</label>
                <input id=${this.label} type=${this.type} placeholder=${this.placeholder} name=${this.label.replace(/:$/g, '')} @input=${debounce(this._textInputEmitter, 750)}
                value=${this.value}/>
            </div>
        `;
    }
};
TextInput.styles = css `
        div{
            display: inline-flex;
            flex-direction: column;
            width: 100%;
        }

        label, input::placeholder, input{
            font-family: var(--font);
        }

        label{
            text-transform: uppercase;
            color: rgb(var(--white));
            margin-bottom: 0.25em;
            font-size: 0.8em;
        }

        input{
            padding: 0.25em 0 0.25em 0.5em;
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

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        }

        input[type=number] {
        -moz-appearance: textfield;
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
    property()
], TextInput.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], TextInput.prototype, "lightMode", void 0);
TextInput = __decorate([
    customElement('text-input')
], TextInput);
export { TextInput };
//# sourceMappingURL=text-input.js.map