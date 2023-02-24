import { LitElement, html, css, nothing } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import '../components/text-input'
import '../components/radio-input'
import '../components/UnitList/units-container'
import '../components/custom-button'

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

    `

    @state()
    _payload = []

    @state()
    _initialListSize!: number;

    @state()
    _searchTerm!: string;

    @state()
    _statusSelected: string;

    constructor(){
        super();
        this._statusSelected = 'all'
    }

    render(){
        return html`
            <section>
                ${this._initialListSize >= 24 ? html`
                    <div class="list-filter">
                        <text-input label="Search:" placeholder="Search by unit/employer" @entered-input=${this._updateSearchTerm}></text-input>

                        <radio-input darkMode dirColumn prompt="Status:" .labels=${['All', 'Needs Review', 'Submitted']} .defaultCheck=${this._statusSelected} @retrieve-selection=${this._updatedStatusSelection}></radio-input>

                        <div class="filter-btns">
                            <custom-button secondary 
                                .buttonText=${"Get Spreadsheet"}>
                            </custom-button>
                            <custom-button primary 
                                .buttonText=${"Search"}
                                @click=${this._getSearchValues}>
                            </custom-button>
                        </div>
                        <hr/>
                    </div>
                    <units-container ._payload=${this._payload}></units-container>
                ` : html`
                    <div class="short-list">
                        <units-container ._payload=${this._payload} shortList></units-container>
                        <custom-button secondary .buttonText=${"Get Spreadsheet"}>></custom-button>
                    </div>
                    `}
            </section>
        `
    }

    _updateSearchTerm = (e: { detail: string; }) => {
        this._searchTerm = e.detail.toLowerCase()
    }

    _updatedStatusSelection = (e: { detail: string; }) => {
        this._statusSelected = e.detail.toLowerCase();
    }

    _getSearchValues = () => {
        let searchValues ={searchTerm: this._searchTerm, statusSelected: this._statusSelected}

        this.dispatchEvent(new CustomEvent('search-values', {
            detail: searchValues,
            bubbles: true,
            composed: true
        }))
    }
    
}

declare global {
    interface HTMLElementTagName {
        'list-section': ListSection;
    }
}
