import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import '../components/list-search';
import '../components/radio-toggle';

@customElement('list-nav')
export class ListNav extends LitElement {
    render() {
        return html`
            <div .columnDirection=${true}>
                <list-search></list-search>
                <radio-toggle .prompt=${"Filter by status:"} .labels=${['All', 'Needs Review', 'Submitted', 'Active']} .checked=${'All'}></radio-toggle>
            </div>
        
        `
    }
}