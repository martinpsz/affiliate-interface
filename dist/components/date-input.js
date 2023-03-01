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
            var _a, _b, _c, _d;
            const dateFormatter = (date) => {
                let [year, month, day] = date.split('-');
                return [month, day, year].join('/');
            };
            let dateValue = {};
            if (this.type === 'date-range') {
                const FromDate = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`${'#' + this.labelFrom.replace(/[\s+:]/g, '')}`);
                const ToDate = (_b = this.renderRoot) === null || _b === void 0 ? void 0 : _b.querySelector(`${'#' + ((_c = this.labelTo) === null || _c === void 0 ? void 0 : _c.replace(/[\s+:]/g, ''))}`);
                dateValue = { 'From': dateFormatter(FromDate.value),
                    'To': dateFormatter(ToDate.value) };
            }
            if (this.type === 'date') {
                const FromDate = (_d = this.renderRoot) === null || _d === void 0 ? void 0 : _d.querySelector(`${'#' + this.labelFrom.replace(/[\s+:]/g, '')}`);
                dateValue = { 'From': dateFormatter(FromDate.value) };
            }
            this.dispatchEvent(new CustomEvent('retrieve-dates', {
                detail: dateValue,
                bubbles: true,
                composed: true,
            }));
            console.log(dateValue);
        };
    }
    render() {
        var _a;
        return html `
            <div class="date-input">
                ${this.prompt && html `<p>${this.prompt}</p>`}
                ${this.type === 'date-range' ? html `
                    <div id="date-range">
                        <div class="date">
                            <label for=${this.labelFrom}>${this.labelFrom}</label>
                            <input id=${this.labelFrom.replace(/[\s+:]/g, '')} type="date" @input=${this._dateInputEmitter} value=${this.valueFrom}/>
                        </div>
                        <div class="date">
                            <label for=${this.labelTo}>${this.labelTo}</label>
                            <input id=${(_a = this.labelTo) === null || _a === void 0 ? void 0 : _a.replace(/[\s+:]/g, '')} type="date" @input=${this._dateInputEmitter} value=${this.valueTo}/>
                        </div>
                    </div>
                ` : html `
                    <div class="date">
                        <label for=${this.labelFrom}>${this.labelFrom}</label>
                        <input id=${this.labelFrom.replace(/[\s+:]/g, '')} type="date" @input=${this._dateInputEmitter} value=${this.valueFrom}/>
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
            font-size: 1em;
        }

        .date{
            display: inline-flex;
            flex-direction: column;
        }

        label{
            text-transform: uppercase;
            font-size: 0.8em;
            margin-bottom: 0.25em;
        }

        input{
            padding: 0.2em 0 0.2em 0.5em;
            font-family: inherit;
            border: 1px solid rgba(var(--black), 0.5);
            border-radius: 4px;
            color: rgba(var(--black), 0.5);
        }

        input:focus{
            outline: transparent;
        }

        #date-range{
            display: flex;
            column-gap: 1em;
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
__decorate([
    property()
], DateInput.prototype, "valueFrom", void 0);
__decorate([
    property()
], DateInput.prototype, "valueTo", void 0);
DateInput = __decorate([
    customElement('date-input')
], DateInput);
export { DateInput };
