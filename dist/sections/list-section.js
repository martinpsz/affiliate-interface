var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import '../components/text-input';
import '../components/radio-input';
import '../components/UnitList/units-container';
import '../components/custom-button';
let ListSection = class ListSection extends LitElement {
    constructor() {
        super(...arguments);
        this._payload = [];
    }
    render() {
        return html `
            <section>
                ${this.initialListSize >= 24 ? html `
                    <div class="list-filter">
                        <text-input label="Search:" placeholder="Start entering a unit/employer name" @retrieve-input=${true}></text-input>
                        <radio-input darkMode prompt="Status:" .labels=${['All', 'Needs Review', 'Submitted', 'Active']} .defaultCheck=${'All'}></radio-input>
                    </div>
                ` : nothing}
                <units-container .payload=${this._payload}></units-container>
                <div id="btn-group">
                    <custom-button warning buttonText="Get spreadsheet"></custom-button>
                    <custom-button primary buttonText="Add a Unit"></custom-button>
                </div>

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

        #btn-group{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            column-gap: 0.5em;
            margin-right: 1em;
        }
        
    `;
__decorate([
    state()
], ListSection.prototype, "_payload", void 0);
__decorate([
    property()
], ListSection.prototype, "initialListSize", void 0);
ListSection = __decorate([
    customElement('list-section')
], ListSection);
export { ListSection };
