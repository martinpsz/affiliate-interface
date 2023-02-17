import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

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
    
    `
    @property()
    prompt?: string;

    @property()
    type!: dateType;

    @property()
    labelFrom!: string;

    @property()
    labelTo?: string;

    render() {
        return html`
            <div class="date-input">
                ${this.prompt && html`<p>${this.prompt}</p>`}
                ${this.type === 'date-range' ? html`
                    <div class="date">
                        <label for=${this.labelFrom}>${this.labelFrom}</label>
                        <input id=${this.labelFrom} type="date" @input=${this._dateInputEmitter}/>
                    </div>
                    <div class="date">
                        <label for=${this.labelTo}>${this.labelTo}</label>
                        <input id=${this.labelTo} type="date" @input=${this._dateInputEmitter}/>
                    </div>
                `:html`
                    <div class="date">
                        <label for=${this.labelFrom}>${this.labelFrom}</label>
                        <input id=${this.labelFrom} type="date" @input=${this._dateInputEmitter}/>
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
            const FromDate = this.renderRoot?.querySelector(`${'#' + this.labelFrom}`) as HTMLInputElement

            const ToDate = this.renderRoot?.querySelector(`${'#' + this.labelTo}`) as HTMLInputElement

            dateValue = {'From': dateFormatter(FromDate.value), 
                         'To': dateFormatter(ToDate.value)}
        }

        if (this.type === 'date'){
            const FromDate = this.renderRoot?.querySelector(`${'#' + this.labelFrom}`) as HTMLInputElement

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