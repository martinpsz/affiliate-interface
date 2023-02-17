var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let DateInput = class DateInput extends LitElement {
    constructor() {
        super(...arguments);
        this._dateInputEmitter = () => {
            var _a, _b, _c;
            const dateFormatter = (date) => {
                let [year, month, day] = date.split('-');
                return [month, day, year].join('/');
            };
            let dateValue = {};
            if (this.type === 'date-range') {
                const FromDate = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`${'#' + this.labelFrom}`);
                const ToDate = (_b = this.renderRoot) === null || _b === void 0 ? void 0 : _b.querySelector(`${'#' + this.labelTo}`);
                dateValue = { 'From': dateFormatter(FromDate.value),
                    'To': dateFormatter(ToDate.value) };
            }
            if (this.type === 'date') {
                const FromDate = (_c = this.renderRoot) === null || _c === void 0 ? void 0 : _c.querySelector(`${'#' + this.labelFrom}`);
                dateValue = { 'From': dateFormatter(FromDate.value) };
            }
            this.dispatchEvent(new CustomEvent('retrieve-dates', {
                detail: dateValue,
                bubbles: true,
                composed: true,
            }));
        };
    }
    render() {
        return html `
            <div class="date-input">
                ${this.prompt && html `<p>${this.prompt}</p>`}
                ${this.type === 'date-range' ? html `
                    <div class="date">
                        <label for=${this.labelFrom}>${this.labelFrom}</label>
                        <input id=${this.labelFrom} type="date" @input=${this._dateInputEmitter}/>
                    </div>
                    <div class="date">
                        <label for=${this.labelTo}>${this.labelTo}</label>
                        <input id=${this.labelTo} type="date" @input=${this._dateInputEmitter}/>
                    </div>
                ` : html `
                    <div class="date">
                        <label for=${this.labelFrom}>${this.labelFrom}</label>
                        <input id=${this.labelFrom} type="date" @input=${this._dateInputEmitter}/>
                    </div>
                `}
            </div>
        `;
    }
};
DateInput.styles = css `
        .date-input{
            display: inline-block;
            font-family: var(--font);
            color: rgb(var(--black));
        }

        .date-input p{
            margin: 0;
            margin-bottom: 0.25em;
            font-size: 0.8em;
        }

        .date{
            display: inline-flex;
            flex-direction: column;
        }

        label{
            text-transform: uppercase;
            font-size: 0.8em;
        }

        input{
            padding: 0.5em 0 0.5em 0.25em;
            font-family: inherit;
            border: 1px solid rgba(var(--black), 0.5);
            border-radius: 4px;
            color: rgba(var(--black), 0.5);
        }

        input:focus{
            outline: transparent;
        }
    
    `;
__decorate([
    property()
], DateInput.prototype, "prompt", void 0);
__decorate([
    property()
], DateInput.prototype, "type", void 0);
__decorate([
    property()
], DateInput.prototype, "labelFrom", void 0);
__decorate([
    property()
], DateInput.prototype, "labelTo", void 0);
DateInput = __decorate([
    customElement('date-input')
], DateInput);
export { DateInput };
