import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('form-section')
export class FormSection extends LitElement {
    render() {
        return html`
            <section>
                <p>Hello from the unit form area</p>
            </section>
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'form-section': FormSection;
    }
}
