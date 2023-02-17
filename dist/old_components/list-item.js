var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
let ListItem = class ListItem extends LitElement {
    constructor() {
        super(...arguments);
        this._dispatchUnitId = () => {
            this.dispatchEvent(new CustomEvent('unit-selection', {
                detail: this.unitId,
                bubbles: true,
                composed: true,
            }));
        };
    }
    render() {
        return html `
            <div @click=${this._dispatchUnitId}>
                <p>
                    <span>${this.master ? 'Master' : nothing}</span>
                    <span>${`State: ${this.state}`}</span>
                    <span>${this.council ? `Council: ${this.council}` : nothing}</span>
                    <span>${this.local ? `Local: ${this.local}` : nothing}</span>
                    <span>${this.subunit ? `Chapter: ${this.subunit}` : nothing}</span>
                    <!--<span>${this.members ? `Representing: ${this.members} members` : nothing}</span>-->
                </p>
                <h1>${this.employer}</h1>
            </div>`;
    }
};
ListItem.styles = css `
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
    
    `;
__decorate([
    property()
], ListItem.prototype, "master", void 0);
__decorate([
    property()
], ListItem.prototype, "employer", void 0);
__decorate([
    property()
], ListItem.prototype, "council", void 0);
__decorate([
    property()
], ListItem.prototype, "local", void 0);
__decorate([
    property()
], ListItem.prototype, "subunit", void 0);
__decorate([
    property()
], ListItem.prototype, "members", void 0);
__decorate([
    property()
], ListItem.prototype, "state", void 0);
__decorate([
    property()
], ListItem.prototype, "unitId", void 0);
ListItem = __decorate([
    customElement('list-item')
], ListItem);
export { ListItem };
