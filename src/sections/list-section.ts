import { LitElement, html, css} from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/text-input'
import '../components/radio-input'
import '../components/UnitList/units-container'
import '../components/custom-button'
import { generateSpreadSheet } from "../utilities/generateSpreadsheet";

@customElement('list-section')
export class ListSection extends LitElement {
    static styles = css`
        section {
            padding: 0.5em 1em; 
            display: flex;
            flex-direction: column;
            justify-content: center;
        }   

        .list-filter{
            height: 15vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            row-gap: 0.5em;
        }

        @media (min-width: 1200px){
            .list-filter{
                height: 12.5vh;
            }
        }

        .filter-btns{
            align-self: flex-end;
            margin-top: 0.75em;
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

    `

    @state()
    _payload!: [];

    @state()
    _initialListSize!: number;

    @state()
    _searchTerm!: string;

    @state()
    _statusSelected: string;

    @state()
    _initialUnitSelection!: number;

    constructor(){
        super();
        this._statusSelected = 'all'
        this._searchTerm = '';
    }

    render(){
        return html`
            <section>
                ${this._initialListSize >= 24 ? html`
                    <div class="list-filter">
                        <text-input label="Search:" placeholder="Search by unit/employer"
                        .value=${''} @entered-input=${this._updateSearchTerm}></text-input>
                        <radio-input darkMode dirColumn prompt="Status:" .labels=${['All', 'Needs Review', 'Saved']} .defaultCheck=${this._statusSelected} @retrieve-selection=${this._updatedStatusSelection}></radio-input>
                    </div>
                    <units-container ._payload=${this._payload} ._initialUnitSelection=${this._initialUnitSelection}></units-container>
                    <div class="filter-btns">
                        <custom-button secondary
                            .icon=${html`<iconify-icon icon="simple-icons:microsoftexcel" style="color: white;" width="24" height="24"></iconify-icon>`}
                            .buttonText=${"Download Spreadsheet"}
                            @click=${() => generateSpreadSheet(this._payload)}>
                        </custom-button>
                        <custom-button primary 
                            .icon=${html`<iconify-icon icon="fluent:people-team-add-20-regular" style="color: white;" width="24" height="24"></iconify-icon>`}
                            .buttonText=${"Add Unit"}>
                        </custom-button>
                    </div>
                ` : html`
                    <div class="short-list">
                        <units-container ._payload=${this._payload} shortList ._initialUnitSelection=${this._initialUnitSelection}></units-container>
                        <custom-button secondary .buttonText=${"Download Spreadsheet"}></custom-button>
                    </div>
                    `}
            </section>
        `
    }

    _updateSearchTerm = (e: { detail: string; }) => {
        this._searchTerm = e.detail.toLowerCase();
    }

    _updatedStatusSelection = (e: { detail: string; }) => {
        this._statusSelected = e.detail.toLowerCase();
    }
    
}

declare global {
    interface HTMLElementTagName {
        'list-section': ListSection;
    }
}
