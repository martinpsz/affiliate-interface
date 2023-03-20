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
            border-radius: 2px;
            cursor: pointer;
        }

        #master{
            background: rgb(var(--green));
            padding: 0 0.5em;
            font-size: 0.8em;
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
            max-width: 90%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.2em;
        }

        .Review{
            background: rgb(var(--red));
        }

        .Review.selected{
            background: rgb(var(--white));
            color: rgb(var(--red));
        }

        .Saved{
            background: rgba(var(--blue), 1);
        }

        .Saved.selected{
            background: rgb(var(--white));
            color: rgb(var(--blue));
        }
    `

    @property()
    unit_id!: number;

    @property()
    master!: boolean;

    @property()
    masterName!: string;

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
    status!: 'Review' | 'Saved';

    @property()
    members!: number;

    @property()
    initialSelect!: number;

    constructor(){
        super()

        this.status = 'Review';
    }

    render() {
        return html`
            <div @click=${this._selectedUnit} class="${this.status === 'Review' ? 'Review': 'Saved'} ${this.unit_id === this.initialSelect ? 'selected' : ''}">
                <p>
                    <span>${this.state}</span>
                    ${this.local ? html`<span>&centerdot; L ${this.local}</span>` : nothing}
                    ${this.council ? html`<span>&centerdot; C ${this.council}</span>` : nothing}
                    ${this.subunit ? html`<span>&centerdot; SU ${this.subunit}</span>` : nothing}
                    ${this.members ? html`<span>&centerdot; Members: ${this.members}</span>` : nothing}
                </p>
                <h2 title=${this.employer}>
                    ${this.employer}
                </h2>
                ${this.master ? html`<span id="master">${this.masterName}</span>` : nothing}
            </div>
        `
    }

    _selectedUnit = () => {
        this.dispatchEvent(new CustomEvent('unit-list-selection', {
            detail: this.unit_id,
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