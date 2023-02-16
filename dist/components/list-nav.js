var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/text-field';
import '../components/radio-toggle';
let ListNav = class ListNav extends LitElement {
    constructor() {
        super(...arguments);
        this._getInput = () => {
            console.log(this);
        };
    }
    render() {
        console.log(this._enteredText);
        return html `
            <div .columnDirection=${true}>
                <text-field .label=${"Search:"} .placeholder=${"Start entering a unit name"} @input=${this._getInput}></text-field>
                <radio-toggle .columnDirection=${"vertical"} .prompt=${"Unit status:"} .labels=${['All', 'Needs Review', 'Submitted', 'Active']} .defaultChecked=${'All'}></radio-toggle>
            </div>
        
        `;
    }
};
ListNav.styles = css `
       div{
         width: 100%;
         margin: 1em 0;
       }

       text-field{
         margin-bottom: 1em;
       }
    
    `;
__decorate([
    state()
], ListNav.prototype, "_enteredText", void 0);
ListNav = __decorate([
    customElement('list-nav')
], ListNav);
export { ListNav };
