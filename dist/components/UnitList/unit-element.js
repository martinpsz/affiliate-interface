var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
let UnitElement = class UnitElement extends LitElement {
    render() {
        return html `
            <div data-key=${this.agr_id} class=${this.status.replace(' ', '')}>
                <p>
                    ${this.master ? html `<span>Master</span>` : nothing}
                    <span>${`State: ${this.state}`}</span>
                    ${this.local ? html `Local: <span>${this.local}</span>` : nothing}
                    ${this.council ? html `Council: <span>${this.council}</span>` : nothing}
                    ${this.subunit ? html `Chapter/Unit: <span>${this.subunit}</span>` : nothing}
                </p>
                <h2>
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
UnitElement = __decorate([
    customElement('unit-element')
], UnitElement);
export { UnitElement };
