import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import '../components/list-nav'

@customElement('list-section')
export class ListSection extends LitElement {
    render(){
        return html`
            <section>
                <list-nav></list-nav>
            </section>
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'list-section': ListSection;
    }
}
