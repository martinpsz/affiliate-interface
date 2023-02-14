var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/list-item';
let ListStatus = class ListStatus extends LitElement {
    render() {
        console.log(this._units);
        return html `<list-item></list-item>`;
    }
};
__decorate([
    state()
], ListStatus.prototype, "_units", void 0);
ListStatus = __decorate([
    customElement('list-status')
], ListStatus);
export { ListStatus };
