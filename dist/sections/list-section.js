var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/text-input';
import '../components/radio-input';
let ListSection = class ListSection extends LitElement {
    constructor() {
        super(...arguments);
        this._payload = [];
    }
    render() {
        return html `
            <section>
                <!--<list-nav></list-nav>
                <list-container ._payload=${this._payload}></list-container>-->

                ${this._payload.length >= 24 && html `
                    <div class="list-filter">
                        <text-input label="Search:" placeholder="Start entering a unit/employer name" @retrieve-input=${true}></text-input>
                        <radio-input darkMode prompt="Status:" .labels=${['All', 'Needs Review', 'Submitted', 'Active']} .defaultCheck=${'All'}></radio-input>
                    </div>
                `}
            </section>
        `;
    }
};
ListSection.styles = css `
        section {
            padding: 0.5em;   
        }   

        .list-filter{
            display: flex;
            flex-direction: column;
            row-gap: 0.5em;
        }
        

    `;
__decorate([
    state()
], ListSection.prototype, "_payload", void 0);
ListSection = __decorate([
    customElement('list-section')
], ListSection);
export { ListSection };
