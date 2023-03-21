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
import { debounce } from "../../utilities/searchDebounce";

interface wageEvent {
    effective_date_of_inc: string | undefined;
    cents_per_hour_base?: string | null;
    cents_per_hour_inc?: string | null;
    dollar_lump_sum_base?: string | null;
    dollar_lump_sum_inc?: string | null;
    percent_wage_inc: number | null;
    increase_type: string;
    number_affected?: number | null;
}

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
    _regularWageIncrease!: wageEvent; //captures individual wageEvent

    @state()
    _regularWageIncreases = new Array(); //regular wage increases are passed to list of such increases.

    constructor(){
        super()
        this._generalRaises = [html`<wage-event raiseEvent="REGULAR" key=1 @wage-event=${(e:{detail: {}}) => this._getWageEvent(e)}></wage-event>`];
        this.wageStatus = 'Yes'
    }

    render() {
        console.log(this._regularWageIncreases)
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
        this._generalRaises = [...this._generalRaises, html`<wage-event raiseEvent="REGULAR" key=${arrSize} @wage-event=${(e:{detail: {}}) => this._getWageEvent(e)}></wage-event>`]

    }

    _getWageEvent = (e: {detail: {date: string, startingWage: number, typeOfRaise: string, wageAdjustment: number}}) => {
        let raiseEvent  =   {...this._regularWageIncrease,
                                        effective_date_of_inc: e.detail.date, 
                                        increase_type: e.detail.typeOfRaise,
                                        percent_wage_inc: e.detail.typeOfRaise === '% increase' ? (e.detail.wageAdjustment % 1 === 0 ? 
                                                                                                   e.detail.wageAdjustment / 100 : 
                                                                                                   e.detail.wageAdjustment)
                                                            : e.detail.typeOfRaise === '% decrease' ? (e.detail.wageAdjustment % 1 === 0 ? 
                                                                                                      -e.detail.wageAdjustment / 100:
                                                                                                      -e.detail.wageAdjustment) 
                                                            : null,

                                        cents_per_hour_inc: e.detail.typeOfRaise === 'hourly increase' ? 
                                                                Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(e.detail.wageAdjustment) 
                                                            : e.detail.typeOfRaise === 'hourly decrease' ? 
                                                                '-' + Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(e.detail.wageAdjustment)
                                                            : null,

                                        cents_per_hour_base: e.detail.typeOfRaise === 'hourly increase' || e.detail.typeOfRaise === 'hourly decrease' ?
                                                                Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(e.detail.startingWage) 
                                                            : null,

                                        dollar_lump_sum_inc: e.detail.typeOfRaise === 'lump sum/bonus' ?
                                                                Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(e.detail.wageAdjustment) 
                                                            : e.detail.typeOfRaise === 'lump sum/bonus' ? 
                                                                '-' + Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(e.detail.wageAdjustment)
                                                            : null,

                                        dollar_lump_sum_base: e.detail.typeOfRaise === 'lump sum/bonus' ?
                                                                Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(e.detail.startingWage)
                                                            : null}  
        
        return raiseEvent
    }

    

    
}


declare global {
    interface HTMLElementTagName {
        'raises-section': RaisesSection;
    }
}