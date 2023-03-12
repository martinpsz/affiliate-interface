import { LitElement, html, css, nothing} from 'lit' 
import { customElement, property, state } from 'lit/decorators.js'

@customElement('adjustment-input')
export class AdjustmentInput extends LitElement{
    static styles = css`
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
            color: rgb(var(--black));
            margin-bottom: 0.25em;
            font-size: 0.8em;
            font-weight: 600;
        }

        input{
            border: none;
            font-size: 0.8em;
            border-bottom: 1px solid rgba(var(--black), 0.5);
        }

        input:focus{
            outline: transparent;
        }

        input::placeholder{
            color: rgba(var(--black), 0.5);
        }

        .input-field{
            display: inline-flex;
            flex-direction: row;
        }

        .input-field button{
            background-color: rgb(var(--black));
            color: rgb(var(--white));
            font-family: var(--font);
            border: none;
            padding: 0 0.75em;
        }

        .percent-input button{
            border-top-right-radius: 0.25em;
            border-bottom-right-radius: 0.25em;
        }

        .percent-input input{
            border-right: none;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        .dollar-input button{
            border-top-left-radius: 0.25em;
            border-bottom-left-radius: 0.25em;
        }

        .dollar-input input{
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

    `

    @property()
    typeOfAdjustment!: string;

    @state()
    rateDirection!: string;

    render() {
        console.log(this.typeOfAdjustment)
        return html `
            <div>
                <label>Adjustment rate</label>
                    ${this.typeOfAdjustment === 'hourly increase' || this.typeOfAdjustment === 'hourly decrease' || this.typeOfAdjustment === 'lump sum/bonus' ? 
                        html`
                            <div class='input-field dollar-input'>
                                <button class=dollar><span>$</span></button>
                                <input type='text'>
                            </div>`
                        :
                        html`
                            <div class='input-field percent-input'>
                                <input type='text'>
                                <button class=percent><span>%</span></button>
                            </div>
                        `
                    }
            </div>
        `
    }
}


declare global {
    interface HTMLElementTagName {
        'adjustment-input': AdjustmentInput;
    }
}