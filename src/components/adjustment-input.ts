import { LitElement, html, css, nothing} from 'lit' 
import { customElement, property, state } from 'lit/decorators.js'
import { debounce } from '../utilities/searchDebounce';

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
            font-size: 0.8em;
            font-weight: 600;
            margin-bottom: 0.2em;
        }

        input{
            border: none;
            font-size: 0.8em;
            border-bottom: 1px solid rgba(var(--black), 0.5);
            color: rgb(var(--black));
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type=number] {
            -moz-appearance: textfield;
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

        .input-field input{
            width: calc(100% - 1em);
        }

        .input-field span{
            color: rgb(var(--white));
            font-family: var(--font);
            font-weight: lighter;
            border: none;
            padding: 0.25em;
            line-height: 1;
        }

        .percent-input span{
            border-top-right-radius: 0.25em;
            border-bottom-right-radius: 0.25em;
        }

        .percent-input input{
            border-right: none;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            text-align: right;
            padding-right: 0.5em;
        }

        .dollar-input span{
            border-top-left-radius: 0.25em;
            border-bottom-left-radius: 0.25em;
        }

        .dollar-input input{
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            padding-left: 0.5em;
        }

        .increase span{
            background: rgb(var(--black));
        }

        .decrease span{
            background: rgb(var(--red));
        }

        .decrease input{
            color: rgb(var(--red));
            border-bottom-color: rgb(var(--red));
        }

    `
    @property()
    typeOfAdjustment!: string;

    render() {
        return html `
            <div>
                ${this.typeOfAdjustment === 'hourly increase' || this.typeOfAdjustment === 'hourly decrease' || this.typeOfAdjustment === 'lump sum/bonus' ? 
                    html`
                        <label>${this.typeOfAdjustment === 'hourly increase' ||
                                 this.typeOfAdjustment === 'lump sum/bonus' ? 'Increase Amount' : 'Decrease amount' }</label>
                        <div class=${`input-field dollar-input ${this.typeOfAdjustment === 'hourly increase' ||
                                     this.typeOfAdjustment === 'lump sum/bonus' ? 'increase' : 'decrease'}`}>
                            <span>$</span>
                            <input type='number' @input=${debounce(this._setAdjustmentAmount, 750)}>
                        </div>`
                    :
                    html`
                        <label>${this.typeOfAdjustment === '% increase' ? 'Increase %' : 'Decrease %'}</label>
                        <div class=${`input-field percent-input ${this.typeOfAdjustment === '% increase' ? 'increase' : 'decrease'}`}>
                            <input type='number' @input=${debounce(this._setAdjustmentAmount, 750)}>
                            <span>%</span>
                        </div>
                    `
                }
            </div>
        `
    }

    _setAdjustmentAmount = () => {
        const value = this.renderRoot.querySelector('input')?.value.trim() as number | string;
        
        this.dispatchEvent(new CustomEvent('retrieve-change', {
            detail: value,
            bubbles: true,
            composed: true
        }))
    }
}


declare global {
    interface HTMLElementTagName {
        'adjustment-input': AdjustmentInput;
    }
}