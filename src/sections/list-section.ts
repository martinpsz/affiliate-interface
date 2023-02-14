import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/list-nav'
import '../components/list-container'

@customElement('list-section')
export class ListSection extends LitElement {
    static styles = css`
        section {
            padding: 0.5em 1em;

        }   
    `

    @state()
    _payload = []


    render(){
        return html`
            <section>
                <list-nav></list-nav>
                <list-container ._payload=${this._payload}></list-container>
            </section>
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'list-section': ListSection;
    }
}
