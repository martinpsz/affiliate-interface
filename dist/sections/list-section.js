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
import '../components/UnitList/units-container';
import '../components/custom-button';
import { generateSpreadSheet } from "../utilities/generateSpreadsheet";
let ListSection = class ListSection extends LitElement {
    constructor() {
        super();
        this._updateSearchTerm = (e) => {
            this._searchTerm = e.detail.toLowerCase();
        };
        this._updatedStatusSelection = (e) => {
            this._statusSelected = e.detail.toLowerCase();
        };
        this._statusSelected = 'all';
    }
    render() {
        return html `
            <section>
                ${this._initialListSize >= 24 ? html `
                    <div class="list-filter">
                        <text-input label="Search:" placeholder="Search by unit/employer" @entered-input=${this._updateSearchTerm}></text-input>
                        <radio-input darkMode dirColumn prompt="Status:" .labels=${['All', 'Needs Review', 'Submitted']} .defaultCheck=${this._statusSelected} @retrieve-selection=${this._updatedStatusSelection}></radio-input>
                        <div class="filter-btns">
                            <custom-button secondary
                                .icon=${html `<iconify-icon icon="simple-icons:microsoftexcel" style="color: white;" width="24" height="24"></iconify-icon>`}
                                .buttonText=${"Edit in Spreadsheet"}
                                @click=${() => generateSpreadSheet(this._payload)}>
                            </custom-button>
                            <custom-button primary 
                                .icon=${html `<iconify-icon icon="fluent:people-team-add-20-regular" style="color: white;" width="24" height="24"></iconify-icon>`}
                                .buttonText=${"Add Unit"}>
                            </custom-button>
                        </div>
                        <hr/>
                    </div>
                    <units-container ._payload=${this._payload} ._initialUnitSelection=${this._initialUnitSelection}></units-container>
                ` : html `
                    <div class="short-list">
                        <units-container ._payload=${this._payload} shortList ._initialUnitSelection=${this._initialUnitSelection}></units-container>
                        <custom-button secondary .buttonText=${"Get Spreadsheet"}>></custom-button>
                    </div>
                    `}
            </section>
        `;
    }
};
ListSection.styles = css `
        section {
            padding: 0.5em 1em; 
            display: flex;
            flex-direction: column;
            justify-content: center;
            
        }   

        .list-filter{
            height: 20vh;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

        .list-filter hr{
            width: 80%;
            border: 1px solid rgba(var(--white), 0.25);
            
        }

        .filter-btns{
            align-self: center;
        }  

        .short-list{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .short-list custom-button{
            align-self: flex-end;
            margin-top: 1em;
        }

    `;
__decorate([
    state()
], ListSection.prototype, "_payload", void 0);
__decorate([
    state()
], ListSection.prototype, "_initialListSize", void 0);
__decorate([
    state()
], ListSection.prototype, "_searchTerm", void 0);
__decorate([
    state()
], ListSection.prototype, "_statusSelected", void 0);
__decorate([
    state()
], ListSection.prototype, "_initialUnitSelection", void 0);
ListSection = __decorate([
    customElement('list-section')
], ListSection);
export { ListSection };
