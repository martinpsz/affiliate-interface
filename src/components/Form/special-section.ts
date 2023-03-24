import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import '../form-header';
import '../radio-input';
import '../wage-event';
import '../custom-button'
import COPY from "../../affiliate-interface-copy.json" assert {type: 'json'}
import { AdjustmentDataList } from "../../interfaces/interfaces.js";

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
    specialIncreases!: AdjustmentDataList

    constructor(){
        super()

        this._specialRaises = [];
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
        this._specialRaises = [html`<wage-event raiseEvent="SPECIAL" key=1 @wage-event=${this._getSpecialAdjustment}></wage-event>`]
    }

    _addSpecialAdjustment = () => {
        let arrSize = this._specialRaises.length + 1 as number
        this._specialRaises = [...this._specialRaises, html`<wage-event raiseEvent="SPECIAL" key=${arrSize} @wage-event=${this._getSpecialAdjustment}></wage-event>`]
    }

    _getSpecialAdjustment = (e:{detail:{}}) => {
        console.log(e.detail)
    }
}