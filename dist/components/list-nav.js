var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import '../components/list-search';
import '../components/radio-toggle';
let ListNav = class ListNav extends LitElement {
    render() {
        return html `
            <div .columnDirection=${true}>
                <list-search></list-search>
                <radio-toggle .prompt=${"Filter by status:"} .labels=${['All', 'Needs Review', 'Submitted', 'Active']} .checked=${'All'}></radio-toggle>
            </div>
        
        `;
    }
};
ListNav = __decorate([
    customElement('list-nav')
], ListNav);
export { ListNav };
