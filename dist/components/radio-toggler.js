var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
let RadioToggler = class RadioToggler extends LitElement {
    constructor() {
        super(...arguments);
        this._checkedItem = () => {
            var _a;
            const inputOptions = Array.from((_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.option input'));
            let selection = inputOptions.filter(val => val.checked && val)[0].id;
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
            html `
                                <input id=${label} type="radio" @input=${this._checkedItem} checked name="option"/>` :
            html `
                                <input id=${label} type="radio" @input=${this._checkedItem} name="option"/>`}
                        </div>
                    `)}
                </div>
            </div>

        `;
    }
};
RadioToggler.styles = css `
        div{
            display: flex;
        }

        .vertical{
            flex-direction: column;
        }

        .vertical span{
            margin-bottom: 0.25em;
        }

        .radio-options{
            display: inline-flex;
        }

        .option input{
            margin: 0;
            border: 1px solid var(--blue);
            appearance: none;
            background: white;
            width: 100%;
            height: 2em;
            padding: 0 2em;
            position: relative;
        }

        .option input:checked{
            background: var(--blue);
            color: white;
        }

        span {
            font-family: var(--font);
            color: var(--black);
            font-size: 0.8em;
            text-transform: uppercase;
        }
    `;
__decorate([
    property()
], RadioToggler.prototype, "prompt", void 0);
RadioToggler = __decorate([
    customElement('radio-toggler')
], RadioToggler);
export { RadioToggler };
