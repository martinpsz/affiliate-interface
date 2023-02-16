var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
let RadioToggle = class RadioToggle extends LitElement {
    constructor() {
        super(...arguments);
        this._checkedItem = () => {
            var _a;
            const inputOptions = Array.from((_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.option input'));
            let _selection = inputOptions.filter(val => val.checked && val)[0].id;
            this.dispatchEvent(new CustomEvent('status-selection', {
                detail: _selection,
                bubbles: true,
                composed: true
            }));
        };
    }
    render() {
        return html `
            <div class = ${this.columnDirection === "vertical" ? "vertical" : nothing}>
                <span>${this.prompt}</span>
                <div class="radio-options">
                    ${this.labels.map(label => html `
                        <div class="option">
                            ${label === this.defaultChecked ?
            html `<input id=${label} type="radio" @input=${this._checkedItem} checked name="option"/>` :
            html `<input id=${label} type="radio" @input=${this._checkedItem} name="option"/>`}
                            <label for=${label}>${label}</label>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }
};
RadioToggle.styles = css `
        div{
            display: flex;
        }

        .vertical{
            flex-direction: column;
        }

        .radio-options{
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        .option{
            display: flex;
            align-items: center;
        }

        .option input{
            margin: 0 0.25em 0 0;
            appearance: none;
            background: rgb(var(--black));
            border: 1px solid rgb(var(--white));
            height: 0.8em;
            width: 0.8em;
            
        }

        .option input:checked{
            background: rgb(var(--red));
        }

        span, label{
            font-family: var(--font);
            color: rgb(var(--white));
            font-size: 0.8em;
            text-transform: uppercase;
        }

    `;
__decorate([
    property()
], RadioToggle.prototype, "prompt", void 0);
RadioToggle = __decorate([
    customElement('radio-toggle')
], RadioToggle);
export { RadioToggle };
