import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('unit-element')
export class UnitElement extends LitElement{
    static styles = css`
        div{
            font-family: var(--font);
            color: rgb(var(--white));
            margin: 0.5em 0.5em 0.5em 0.25em;
            padding: 0.5em 0 0.5em 0.5em;
            background: red;
            border-radius: 2px;
            cursor: pointer;
        }

        #master{
            background: rgb(var(--green));
            padding: 0 0.25em;
        }

        .selected #master{
            color: rgb(var(--white));
        }

        p, span, h2{
            margin: 0;
        }

        p{
            text-transform: uppercase;
            font-size: 0.8em;
        }

        h2{
            max-width: 320px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.2em;
            margin-top: 0.25em;
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

    @property()
    members!: number;

    @property()
    initialUnitSelection!: number;

    //Need to update initial Selection to search result first 
    render() {
        return html`
            <div  
                 class=${this.agr_id === this.initialUnitSelection ? `${this.status.replace(' ', '')} selected` : `${this.status.replace(' ', '')}`}
                 @click=${this._selectedUnit}>
                <p>
                    ${this.master ? html`<span id="master">Master</span>` : nothing}
                    <span>${this.state}</span>
                    ${this.local ? html`<span>&centerdot; L ${this.local}</span>` : nothing}
                    ${this.council ? html`<span>&centerdot; C ${this.council}</span>` : nothing}
                    ${this.subunit ? html`<span>&centerdot; SU ${this.subunit}</span>` : nothing}
                    ${this.members ? html`<span>&centerdot; Members: ${this.members}</span>` : nothing}
                </p>
                <h2 title=${this.employer}>
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