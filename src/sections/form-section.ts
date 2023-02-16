import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement('form-section')
export class FormSection extends LitElement {
    static styles = css`
        section{
            
        }
    `

    @state()
    _unitData!: []

    render() {
        return html`

            <form></form>
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'form-section': FormSection;
    }
}
