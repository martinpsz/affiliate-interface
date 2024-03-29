import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import '../form-header';
import '../radio-input';
import '../wage-event';
import '../custom-button'
import COPY from "../../affiliate-interface-copy.json" assert {type: 'json'}
import { wageEvent} from "../../interfaces/interfaces.js";

@customElement('special-section')
export class SpecialSection extends LitElement {
    static styles = css`
        div{
            display: flex;
            flex-direction: column;
        }

        radio-input{
            margin-bottom: 1em;
        }

        wage-event:nth-of-type(even){
            border-top: 1px solid rgba(var(--black), 0.25);
            border-bottom: 1px solid rgba(var(--black), 0.25);
        }

        custom-button{
            align-self: end;
            margin-top: 1em;
        }

    `
    @property()
    specialResponse!: 'Yes' | 'No'

    @state()
    _specialRaises!: TemplateResult[]

    @state()
    _specialIncreases: Array<wageEvent>

    @state()
    _updatedSpecialWagesIncreases!: Array<wageEvent>;

    constructor(){
        super()

        this._specialRaises = [];

        this._specialIncreases = [{
            id: '1',
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
            <form-header title=${COPY.Special[0]['Section-header']}></form-header>
            <div>
                <radio-input prompt=${COPY.Special[0]['Special-question']}
                            .labels=${['Yes', 'No']}
                            @retrieve-selection=${this._setSpecialResponse}>
                </radio-input>
                ${this.specialResponse === 'Yes' ? 
                    html
                        `
                        ${this._specialRaises.map(raise => raise)}
                        <custom-button primary 
                        .icon=${html`<iconify-icon icon="ci:table-add" style="color: white;" height="24" ></iconify-icon>`}
                        buttonText='Add Special Increase / Decrease'
                        @click=${this._addSpecialAdjustment}>
                        </custom-button>
                        `
                    :
                    nothing}
            </div>
        `
    }

    _setSpecialResponse = (e : {detail: 'Yes' | 'No'}) => {
        this.specialResponse = e.detail;
        this._specialRaises = [html`<wage-event raiseEvent="SPECIAL" key=1 id="first-raise" @wage-event=${this._getSpecialAdjustment}></wage-event>`]
    }

    _addSpecialAdjustment = () => {
        let arrSize = this._specialRaises.length + 1 as number
        this._specialRaises = [...this._specialRaises, html`<wage-event raiseEvent="SPECIAL" key=${arrSize} @wage-event=${this._getSpecialAdjustment} @wage-deletion=${this._removeSpecialWageEvent}></wage-event>`]
    }

    _getSpecialAdjustment = (e: {detail: {wageData: wageEvent}}) => {
        const generateWageArray = (array:Array<wageEvent>, newObj:wageEvent) => {
            const existingIndex = array.findIndex(obj => obj.id === newObj.id);

            if(existingIndex !== -1){
                array[existingIndex] = newObj;
            }

            else {
                array.push(newObj)
            }

            return array
        }

        this._updatedSpecialWagesIncreases = generateWageArray(this._specialIncreases, e.detail.wageData)
        
    
        this.dispatchEvent(new CustomEvent('get-wage-event', {
            detail: this._updatedSpecialWagesIncreases,
            bubbles: true,
            composed: true
        }))
    }

    _removeSpecialWageEvent = (e: {detail: number}) => {
        const idxToRemove = this._updatedSpecialWagesIncreases.findIndex((elem) => {    
            return elem.id?.toString()  === e.detail.toString()
        })

        
        this._updatedSpecialWagesIncreases = this._updatedSpecialWagesIncreases?.filter((elem, idx) => {
            if (idx !== idxToRemove){
                return elem
            }
        })
    }
}