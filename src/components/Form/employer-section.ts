import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('employer-section')
export class EmployerSection extends LitElement{
    static styles = css`
        div{
            display: grid;
            grid-template-columns: 1fr 10% 10%;
            grid-column-gap: 0.5em;
        }
    `
    
    @property()
    employer!: string | undefined;

    @property()
    local!: number | undefined;

    @property()
    subunit!: number | undefined;


    render() {
        return html`
            <div>
                <text-input lightMode .type=${"text"} label=${"Employer:"} .value=${this.employer ? this.employer : ''}></text-input>
                <text-input lightMode .type=${"number"} label=${"Local:"} .value=${this.local ? this.local : ''}></text-input>
                <text-input lightMode .type=${"text"} label=${"Subunit:"} .value=${this.subunit ? this.subunit : ''}></text-input>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'employer-section': EmployerSection;
    }
}