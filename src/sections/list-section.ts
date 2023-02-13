import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import '../components/list-nav'

@customElement('list-section')
export class ListSection extends LitElement {
    static styles = css`
        section {
            padding: 0.5em 1em;

        }   
    
    `
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
