var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
let RadioInput = class RadioInput extends LitElement {
    constructor() {
        super(...arguments);
        this.darkMode = false;
        this._getInput = () => {
            let selection;
            const inputs = this.renderRoot.querySelectorAll('input');
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].checked) {
                    selection = inputs[i].id;
                }
            }
            this.dispatchEvent(new CustomEvent('retrieve-selection', {
                detail: selection,
                composed: true,
                bubbles: true,
            }));
        };
    }
    render() {
        var _a;
        const classes = { darkMode: this.darkMode };
        return html `
            <div class="radio-input ${classMap(classes)}">
                <p>${this.prompt}</p>
                <div>
                    ${((_a = this.labels) === null || _a === void 0 ? void 0 : _a.length) > 1 && this.labels.map(label => {
            var _a;
            return html `
                            ${label.toLowerCase() === ((_a = this.defaultCheck) === null || _a === void 0 ? void 0 : _a.toLowerCase()) ? html `
                                <input id=${label} type="radio" name="options" checked @input=${this._getInput}/>
                                <label for=${label}>${label}</label>` :
                html `
                                <input id=${label} type="radio" name="options" @input=${this._getInput}/>
                                <label for=${label}>${label}</label>      
                        `}
                        `;
        })}
                </div>
            </div>
        `;
    }
};
RadioInput.styles = css `
        .radio-input{
            display: flex;
            font-family: var(--font);
        }

        .radio-input p{
            margin: 0;
            margin-right: 0.5em;

        }

        .darkMode {
            color: rgb(var(--white));
            flex-direction: column;
        }

        .darkMode p{
            margin-right: 0;
            margin-bottom: 0.25em;
            text-transform: uppercase;
        }

        .darkMode label{
            font-size: 1em;
        }

        .darkMode input{
            margin: 0;
            accent-color: rgb(var(--red));
        }

        

        

    
    `;
__decorate([
    property()
], RadioInput.prototype, "prompt", void 0);
__decorate([
    property()
], RadioInput.prototype, "labels", void 0);
__decorate([
    property()
], RadioInput.prototype, "defaultCheck", void 0);
__decorate([
    property({ type: Boolean })
], RadioInput.prototype, "darkMode", void 0);
RadioInput = __decorate([
    customElement('radio-input')
], RadioInput);
export { RadioInput };
