import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement('list-item')
export class ListItem extends LitElement {
    static styles = css`
        div{
            margin: 0.5em;
            padding-left: 0.25em;
            border: 1px solid rgb(var(--white));
            background: rgba(var(--white), 1);
            cursor: pointer;
        }
        p, span, h1{
            font-family: var(--font);
            color: rgb(var(--red));
        }

        h1{
            font-size: 1.2em;
            max-width: 288px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-transform: uppercase;
            font-weight: 200;
        }

        p, h1{
            margin: 0;
        }

        span{
            font-size: 0.8em;
        }
    
    `

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

    @property()
    unitId!: Number;


    render() {
        return html`
            <div @click=${this._dispatchUnitId}>
                <p>
                    <span>${this.master ? 'Master' : nothing}</span>
                    <span>${`State: ${this.state}`}</span>
                    <span>${this.council ? `Council: ${this.council}` : nothing}</span>
                    <span>${this.local ? `Local: ${this.local}`: nothing}</span>
                    <span>${this.subunit ? `Chapter: ${this.subunit}`: nothing}</span>
                    <!--<span>${this.members ? `Representing: ${this.members} members`: nothing}</span>-->
                </p>
                <h1>${this.employer}</h1>
            </div>`
    }

    _dispatchUnitId = () => {
        this.dispatchEvent(new CustomEvent('unit-selection', {
            detail: this.unitId,
            bubbles: true,
            composed: true,
        }))
    }
}

declare global {
    interface HTMLElementTagName {
        'list-item': ListItem;
    }
}