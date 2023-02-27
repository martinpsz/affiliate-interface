var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
let UnitElement = class UnitElement extends LitElement {
    constructor() {
        super(...arguments);
        this._selectedUnit = () => {
            this.dispatchEvent(new CustomEvent('unit-list-selection', {
                detail: this.agr_id,
                bubbles: true,
                composed: true
            }));
        };
    }
    render() {
        return html `
            <div  
                 class=${this.agr_id === this.initialUnitSelection ? `${this.status.replace(' ', '')} selected` : `${this.status.replace(' ', '')}`}
                 @click=${this._selectedUnit}>
                <p>
                    ${this.master ? html `<span id="master">Master</span>` : nothing}
                    <span>${this.state}</span>
                    ${this.local ? html `<span>&centerdot; L ${this.local}</span>` : nothing}
                    ${this.council ? html `<span>&centerdot; C ${this.council}</span>` : nothing}
                    ${this.subunit ? html `<span>&centerdot; SU ${this.subunit}</span>` : nothing}
                    ${this.members ? html `<span>&centerdot; Members: ${this.members}</span>` : nothing}
                </p>
                <h2 title=${this.employer}>
                    ${this.employer}
                </h2>

            </div>
        `;
    }
};
UnitElement.styles = css `
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
    `;
__decorate([
    property()
], UnitElement.prototype, "agr_id", void 0);
__decorate([
    property()
], UnitElement.prototype, "master", void 0);
__decorate([
    property()
], UnitElement.prototype, "state", void 0);
__decorate([
    property()
], UnitElement.prototype, "local", void 0);
__decorate([
    property()
], UnitElement.prototype, "council", void 0);
__decorate([
    property()
], UnitElement.prototype, "subunit", void 0);
__decorate([
    property()
], UnitElement.prototype, "employer", void 0);
__decorate([
    property()
], UnitElement.prototype, "status", void 0);
__decorate([
    property()
], UnitElement.prototype, "members", void 0);
__decorate([
    property()
], UnitElement.prototype, "initialUnitSelection", void 0);
UnitElement = __decorate([
    customElement('unit-element')
], UnitElement);
export { UnitElement };
