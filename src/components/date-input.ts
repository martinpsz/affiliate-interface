import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { debounce } from "../utilities/searchDebounce";

type dateType = 'date' | 'date-range'

@customElement('date-input')
export class DateInput extends LitElement {
    static styles = css`
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
            font-weight: 600;
        }

        input{
            font-family: inherit;
            font-size: 0.8em;
            border: none;
            border-bottom: 1px solid rgba(var(--black), 0.5);
            color: rgba(var(--black), 0.5);
        }

        input:focus{
            outline: transparent;
        }

        #date-range{
            display: flex;
            column-gap: 1em;
        }

        small{
            font-family: var(--font);
            font-weight: 600;
            text-transform: uppercase;
            text-align: center;
            background: rgba(var(--red), 0.8);
            color: rgb(var(--white));
            font-size: 0.6em;
            margin: 0 0.25em;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    
    `
    @property()
    prompt?: string;

    @property()
    type!: dateType;

    @property()
    labelFrom!: string;

    @property()
    labelTo?: string;

    @property()
    valueFrom?: string;

    @property()
    valueTo?: string;

    @property()
    warning!: string;

    render() {
        return html`
            <div class="date-input">
                ${this.prompt && html`<p>${this.prompt}</p>`}
                ${this.type === 'date-range' ? html`
                    <div id="date-range">
                        <div class="date">
                            <label for=${this.labelFrom}>${this.labelFrom}</label>
                            <input id=${this.labelFrom.replace(/[\s+:]/g, '')} type="date" @input=${debounce(this._dateInputEmitter, 750)} value=${this.valueFrom}/>
                            <small>${this.warning}</small>
                        </div>
                        <div class="date">
                            <label for=${this.labelTo}>${this.labelTo}</label>
                            <input id=${this.labelTo?.replace(/[\s+:]/g, '')} type="date" @input=${debounce(this._dateInputEmitter, 750)} value=${this.valueTo}/>
                            <small>${this.warning}</small>
                        </div>
                    </div>
                `:html`
                    <div class="date">
                        <label for=${this.labelFrom}>${this.labelFrom}</label>
                        <input id=${this.labelFrom.replace(/[\s+:]/g, '')} type="date" @input=${debounce(this._dateInputEmitter, 750)} value=${this.valueFrom}/>
                        <small>${this.warning}</small>
                    </div>
                `}
            </div>
        `
    }

    _dateInputEmitter = () => {
        const dateFormatter = (date:string) => {
            let [year, month, day] = date.split('-')
            return [month, day, year].join('/')
        }

        let dateValue = {};
        if (this.type === 'date-range'){
            const FromDate = this.renderRoot?.querySelector(`${'#' + this.labelFrom.replace(/[\s+:]/g, '')}`) as HTMLInputElement

            const ToDate = this.renderRoot?.querySelector(`${'#' + this.labelTo?.replace(/[\s+:]/g, '')}`) as HTMLInputElement

            dateValue = {'From': dateFormatter(FromDate.value), 
                         'To': dateFormatter(ToDate.value)}
        }

        if (this.type === 'date'){
            const FromDate = this.renderRoot?.querySelector(`${'#' + this.labelFrom.replace(/[\s+:]/g, '')}`) as HTMLInputElement

            dateValue = {'From': dateFormatter(FromDate.value)}
        }
        
        this.dispatchEvent(new CustomEvent('retrieve-dates', {
            detail: dateValue,
            bubbles: true,
            composed: true,
        }))

    }
}

declare global {
    interface HTMLElementTagName {
        'date-input': DateInput;
    }
}