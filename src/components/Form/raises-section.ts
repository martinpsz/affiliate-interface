import { LitElement, html, css, nothing } from "lit";
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

@customElement('raises-section')
export class RaisesSection extends LitElement{
    static styles = css`

    
    `
    @property()
    wageStatus!: string


    constructor(){
        super()
        this.wageStatus = 'Yes'
    }

    render() {
        return html`
            ${this.wageStatus === 'Yes' ? html`
                <form-header title=${COPY.Raises[0]['Section-header']}></form-header>
                <wage-event raiseEvent="REGULAR"></wage-event>
                
            `: nothing}
        `
    }


}


declare global {
    interface HTMLElementTagName {
        'raises-section': RaisesSection;
    }
}