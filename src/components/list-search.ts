import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('list-search')
export class ListSearch extends LitElement {
    render() {
        return html`
            <p>Hello from list search</p>
        
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'list-search': ListSearch;
    }
}