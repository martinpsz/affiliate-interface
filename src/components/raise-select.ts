import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement('raise-select')
export class RaiseSelect extends LitElement{
    static styles = css`
        label{
            font-family: var(--font);
            text-transform: uppercase;
            color: rgb(var(--black));
            font-size: 0.8em; 
            font-weight: 600;  
        }

        select{
            border: none;
            border-bottom: 1px solid rgba(var(--black), 0.5);
            margin-top: 0.25em;
            font-family: var(--font);
        }

        select:focus{
            outline: transparent;
        }
    `

    @state()
    _selected_option = '% increase'

    render() {
        console.log(this._selected_option)
        return html`
            <label>Select raise event</label>
            <select @change=${this._raiseTypeSelection}>
                <optgroup label="Percent Adjustment">
                    <option value="% increase">% INCREASE</option>
                    <option value="% decrease">% DECREASE</option>
                </optgroup>
                <optgroup label="Hourly Adjustment">
                    <option value="hourly increase">HOURLY INCREASE</option>
                    <option value="hourly decrease">HOURLY DECREASE</option>
                </optgroup>
                <option value="lump sum/bonus">LUMP SUM/BONUS</option>
            </select>
        
        `
    }

    _raiseTypeSelection = () => {
        const options = this.renderRoot.querySelectorAll('option')

        for(let i=0; i<options.length; i++){
            if(options[i].selected){
                this._selected_option = options[i].value
            }
        }

        this.dispatchEvent(new CustomEvent('retrieve-raiseType', {
            detail: this._selected_option,
            bubbles: true,
            composed: true
        }))
    }


}

declare global {
    interface HTMLElementTagName {
        'raises-select': RaiseSelect;
    }
}