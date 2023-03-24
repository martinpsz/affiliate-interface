import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {repeat} from 'lit/directives/repeat.js';
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
    wageStatus!: 'Yes' | 'No';

    @state()
    _generalRaises: TemplateResult[];

    @state()
    _regularWageIncreases!: Array<wageEvent>; //captures individual wageEvent

    constructor(){
        super()
        this._generalRaises = [html`<wage-event raiseEvent="REGULAR" key=1 @wage-event=${(e:any) => this._getWageEvent(e)}></wage-event>`];
        this.wageStatus = 'Yes';
        this._regularWageIncreases = [{
            id: 1,
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
            ${this.wageStatus === 'Yes' ? html`
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
        let arrSize = this._generalRaises.length + 1 as number
        this._generalRaises = [...this._generalRaises, html`<wage-event raiseEvent="REGULAR" key=${arrSize} @wage-event=${(e:any) => this._getWageEvent(e)}></wage-event>`]

    }

    _getWageEvent = (e: {detail: {wageData: wageEvent, delRaise: number}}) => {
        const generateWageArray = (array:Array<wageEvent>, newObj:wageEvent) => {
            const existingIndex = array.findIndex(obj => obj.id === newObj.id);

            if(existingIndex !== -1){
                array[existingIndex] = newObj;
            }
            //else if (deleteThis > -1){
              //  array.splice(deleteThis, 1)} 
            else {
                array.push(newObj)
            }

            return array
        }

        /*const removeWageData = (arr:Array<wageEvent>, id:number) => {
            const objWithIdIndex = arr.findIndex((obj) => obj.id === id)

            if(objWithIdIndex > -1){
                arr.splice(objWithIdIndex, 1)
            } 

            return arr
        }*/

        let regularWageAdjustments = generateWageArray(this._regularWageIncreases, e.detail.wageData)
        
    
        this.dispatchEvent(new CustomEvent('get-wage-event', {
            detail: regularWageAdjustments,
            bubbles: true,
            composed: true
        }))
    }
}
declare global {
    interface HTMLElementTagName {
        'raises-section': RaisesSection;
    }
}