import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import COPY from '../../affiliate-interface-copy.json' assert {type: "json"}
import '../form-header';
import '../date-input';
import '../radio-input';
import '../text-input';
import '../adjustment-input'
import '../raise-select'
import '../custom-button'
import '../wage-event'
import { wageEvent } from "../../interfaces/interfaces.js";


@customElement('raises-section')
export class RaisesSection extends LitElement{
    static styles = css`
        div{
            display: flex;
            flex-direction: column;
        }

        custom-button{
            align-self: flex-end;
            margin-top: 1em;
        }

        wage-event:nth-of-type(even){
            border-top: 1px solid rgba(var(--black), 0.25);
            border-bottom: 1px solid rgba(var(--black), 0.25);
        }
    `
    @property()
    wage_adjustment!: 'Yes' | 'No';

    @state()
    _generalRaises: TemplateResult[];

    @state()
    _regularWageIncreases!: Array<wageEvent>; 

    @state()
    _updatedRegularWagesIncreases!: Array<wageEvent>;

    constructor(){
        super()
        this._generalRaises = [html`<wage-event raiseEvent="REGULAR" 
                                                key=0 
                                                id='first-raise'
                                                @wage-event=${(e:any) => this._getWageEvent(e)}></wage-event>`];
        this.wage_adjustment = 'Yes';
        this._regularWageIncreases = [{
            id: '0',
            effective_date_of_inc: null,
            cents_per_hour_base: null,
            cents_per_hour_inc: null,
            dollar_lump_sum_base: null,
            dollar_lump_sum_inc: null,
            percent_wage_inc: null,
            increase_type: '% increase',
            number_affected: null,
            group_description: null}]
        
    }

    render() {
        return html`
            ${this.wage_adjustment === 'Yes' ? html`
                <form-header title=${COPY.Raises[0]['Section-header']}></form-header>
                <div>
                    ${this._generalRaises.map(raise => raise)}
                    <custom-button primary 
                                   .icon=${html`<iconify-icon icon="ci:table-add" style="color: white;" height="24" ></iconify-icon>`}
                                   buttonText='Add General Increase / Decrease'
                                   @click=${this._addRegularAdjustment}>
                    </custom-button>
                </div>
            `: nothing}
        `
    }

    _addRegularAdjustment = () => {
        let arrSize = this._generalRaises.length
        this._generalRaises = [...this._generalRaises, html`<wage-event raiseEvent="REGULAR"  key=${arrSize} @wage-event=${(e:any) => this._getWageEvent(e)} @wage-deletion=${(e: {detail: number}) => this._removeWageEvent(e)}></wage-event>`]

    }

    _getWageEvent = (e: {detail: {wageData: wageEvent}}) => {
        const generateWageArray = (array:Array<wageEvent>, newObj:wageEvent) => {
            const existingIndex = array.findIndex(obj => obj.id === newObj.id)

            if(existingIndex !== -1){
                array[existingIndex] = newObj;
            }

            else {
                array.push(newObj)
            }

            return array
        }

        this._updatedRegularWagesIncreases = generateWageArray(this._regularWageIncreases, e.detail.wageData)
        

        this.dispatchEvent(new CustomEvent('get-wage-event', {
            detail: this._updatedRegularWagesIncreases,
            bubbles: true,
            composed: true
        }))
    }

    _removeWageEvent = (e: {detail: number}) => {
        const idxToRemove = this._updatedRegularWagesIncreases.findIndex((elem) => {    
            return elem.id?.toString()  === e.detail.toString()
        })

        
        this._updatedRegularWagesIncreases = this._updatedRegularWagesIncreases?.filter((elem, idx) => {
            if (idx !== idxToRemove){
                return elem
            }
        })
    }
}
declare global {
    interface HTMLElementTagName {
        'raises-section': RaisesSection;
    }
}