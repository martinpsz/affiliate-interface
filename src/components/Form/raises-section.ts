import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import COPY from '../../affiliate-interface-copy.json' assert {type: "json"}
import '../form-header';
import '../date-input.js';
import '../radio-input.js';
import '../text-input.js';
import '../adjustment-input.js'
import '../raise-select.js'

@customElement('raises-section')
export class RaisesSection extends LitElement{
    static styles = css`
        .wage-event{
            display: grid;
            grid-template-columns: 120px 140px 140px 140px 1em;
            align-items: end;
            justify-content: space-evenly;
            padding: 0.4em 0.2em;
            
        }

        .wage-event span{
            align-self: start;
            padding: 0.2em;
            grid-column-end: -1;
            justify-self: end;
            cursor: pointer;
            padding-top: 0;
            font-size: 1.4em;
        }
    
    `
    @property()
    wageStatus!: string

    @state()
    _raiseType!: string

    constructor(){
        super()

        this.wageStatus = 'Yes'
        this._raiseType = '% increase'
    }

    _setStartingWageLabel = () => {
        let label = '';
        if (this._raiseType === 'hourly increase' || this._raiseType === 'hourly decrease'){
         label = 'Starting hourly $'
        } else if (this._raiseType === 'lump sum/bonus'){
         label = 'Starting annual $'
        }
        return label
    }

    _wageEvent = () => {
        return html`
            <div class="wage-event">
                <date-input type="date"
                            labelFrom="Effective Date">
                </date-input>

                <raise-select @retrieve-raiseType=${this._setRaiseType}></raise-select>

                ${this._raiseType !== '% increase' && this._raiseType !== '% decrease' ? html`
                    <text-input type=${'text'}
                        label=${this._setStartingWageLabel()}
                        lightMode
                        class="startingWage">
                    </text-input>
                `: nothing}


                <adjustment-input typeOfAdjustment=${this._raiseType}></adjustment-input>

                <span>&#10540;</span>
            </div>
        
        `
    }

    render() {
        return html`
            ${this.wageStatus === 'Yes' ? html`
                <form-header title=${COPY.Raises[0]['Section-header']}></form-header>
                ${this._wageEvent()}
            `: nothing}
        `
    }

    _setRaiseType = (e: {detail: string}) => {
        this._raiseType = e.detail
    }
}


declare global {
    interface HTMLElementTagName {
        'raises-section': RaisesSection;
    }
}