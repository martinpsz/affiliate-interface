import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement('list-item')
export class ListItem extends LitElement {

    @property()
    master!: Boolean;

    @property()
    employer!: String;

    @property()
    council!: Number | null;

    @property()
    local!: Number | null;

    @property()
    subunit!: String | null;

    @property()
    members!: Number | null;

    @property()
    state!: String;


    render() {
        return html`
            <div>
                <p>
                    <span>${this.master ? 'Master' : nothing}</span>
                    <span>${this.council ? `Council: ${this.council}` : nothing}</span>
                    <span>${this.local ? `Local: ${this.local}`: nothing}</span>
                    <span>${this.subunit ? `Chapter: ${this.subunit}`: nothing}</span>
                    <span>${this.members ? `# of members: ${this.members}`: nothing}</span>
                    <span>${`State: ${this.state}`}</span>
                </p>

            </div>`
    }
}

declare global {
    interface HTMLElementTagName {
        'list-item': ListItem;
    }
}