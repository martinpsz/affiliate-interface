import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('unit-element')
export class UnitElement extends LitElement{
    static styles = css`
        div{
            font-family: var(--font);
            color: rgb(var(--white));
            margin: 0.5em 0.5em 0.5em 0.25em;
            padding: 0.25em;
            background: red;
            border-radius: 2px;
            cursor: pointer;
        }

        p, span, h2{
            margin: 0;
        }

        p{
            text-transform: uppercase;
            font-size: 0.8em;
        }

        h2{
            font-weight: 200;
            max-width: 320px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            
        }

        .NeedsReview{
            background: rgb(var(--red));
        }

        .NeedsReview.selected{
            background: rgb(var(--white));
            color: rgb(var(--red));
        }

        .Submitted{
            background: rgba(var(--blue), 1);
        }

        .Submitted.selected{
            background: rgb(var(--white));
            color: rgb(var(--blue));
        }

        .Inactive{
            background: rgba(var(--blue), 0.25);
        }

        .Inactive.selected{
            background: rgba(var(--blue), 0.5);
        }
    `

    @property()
    agr_id!: number;

    @property()
    master!: boolean;

    @property()
    state!: string;

    @property()
    local!: number | null;

    @property()
    council!: number | null;

    @property()
    subunit!: number | string | null;

    @property()
    employer!: string;

    @property()
    status!: string;

    render() {
        return html`
            <div  
                 class=${this.status.replace(' ', '')}
                 @click=${this._selectedUnit}>
                <p>
                    ${this.master ? html`<span>Master</span>` : nothing}
                    <span>${`State: ${this.state}`}</span>
                    ${this.local ? html`Local: <span>${this.local}</span>` : nothing}
                    ${this.council ? html`Council: <span>${this.council}</span>` : nothing}
                    ${this.subunit ? html`Chapter/Unit: <span>${this.subunit}</span>` : nothing}
                </p>
                <h2>
                    ${this.employer}
                </h2>

            </div>
        `
    }

    _selectedUnit = () => {
        this.dispatchEvent(new CustomEvent('unit-list-selection', {
            detail: this.agr_id,
            bubbles: true,
            composed: true
        }))
    }
}

declare global {
    interface HTMLElementTagName {
        'unit-element': UnitElement;
    }
}