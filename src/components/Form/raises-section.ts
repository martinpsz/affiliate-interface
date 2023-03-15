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
    wageStatus!: string

    @state()
    _generalRaises: TemplateResult[];

    constructor(){
        super()
        this._generalRaises = [html`<wage-event raiseEvent="REGULAR" key=1></wage-event>`];
        this.wageStatus = 'Yes'
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
        this._generalRaises = [...this._generalRaises, html`<wage-event raiseEvent="REGULAR" key=${arrSize}></wage-event>`]
    }
}


declare global {
    interface HTMLElementTagName {
        'raises-section': RaisesSection;
    }
}