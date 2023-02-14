var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
let ListItem = class ListItem extends LitElement {
    render() {
        return html `
            <div>
                <p>
                    <span>${this.master ? 'Master' : nothing}</span>
                    <span>${this.council ? `Council: ${this.council}` : nothing}</span>
                    <span>${this.local ? `Local: ${this.local}` : nothing}</span>
                    <span>${this.subunit ? `Chapter: ${this.subunit}` : nothing}</span>
                    <span>${this.members ? `# of members: ${this.members}` : nothing}</span>
                    <span>${`State: ${this.state}`}</span>
                </p>

            </div>`;
    }
};
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
ListItem = __decorate([
    customElement('list-item')
], ListItem);
export { ListItem };
