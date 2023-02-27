import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import '../sections/header-section'
import '../sections/footer-section'
import '../sections/list-section'
import '../sections/form-section'
import { getSession, saveSession} from "../data";

//Put passed JSON into session storage
const data = saveSession("src/test-8.json");

//Grabs data from session storage
let localData = getSession()


interface Reporter {
    email: string,
    name: string,
    phone: string,
}

interface Unit{
    affiliate_id: string,
    agr_id: number,
    agreement_eff_date: string | null,
    agreement_exp_date: string | null,
    contact: Reporter | null,
    council: number | null,
    employer: string | null,
    local: number | null,
    master: boolean,
    master_name: string | null,
    number_of_members: number | null,
    period_id: number,
    state: string,
    status: string,
    subunit: string | number | null,
    unit_name: string | null,
    year: number
}

interface UnitList extends Array<Unit>{}

@customElement('minimum-dues')
export class MinimumDues extends LitElement{
    static styles = css`
        :host{
            --green: 8,172,82;
            --white: 252, 252, 252;
            --red: 164, 14, 76;
            --black: 21, 50, 67;
            --blue: 5, 87, 164;
            --font: 'Poppins', sans-serif;

            background: rgb(var(--white));
        }

        .container{
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            justify-content: space-between;
        }

        #mobile-msg{
            font-family: rgb(var(--font));
            color: white;
            background: rgb(var(--red));
            padding: 2em 2em;
            line-height: 1.44;
            height: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        main{
            height: 80vh;
            width: calc(100% - 2em);
            max-width: 1200px;
            display: flex;
            margin: 1em 0;
        }

        list-section{
            flex: 33%;
            background: rgb(var(--black));
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
        }

        form-section{
            flex: 67%;
            height: calc(80vh - 2px);
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            border: 1px solid rgb(var(--black));
        }
    `
    @state()
    private _initialListLength: number;

    @state()
    private _windowWidth: number;

    @state()
    private _initialList!: UnitList;

    @state()
    private _filteredList!: UnitList;

    @state()
    private _unitSelected!: number;

    constructor(){
        super();
        this._windowWidth = window.innerWidth;
        this._initialList = [...localData];
        this._initialListLength = this._initialList.length;
        this._unitSelected = this._initialList[0]['agr_id'];   
    }
    
    render(){
        return html`
            <div class="container">
                <header-section></header-section>
                ${this._windowWidth < 992 ? 
                    html`<p id="mobile-msg">This page is optimized for desktops. Please visit the provided link on a desktop.</p>` :
                    html`
                    <main>
                        <list-section ._payload=${typeof this._filteredList === 'undefined' ? this._initialList : this._filteredList}
                                      ._initialUnitSelection = ${typeof this._filteredList === 'undefined' ? this._initialList[0].agr_id : this._filteredList[0].agr_id}
                                      @search-values=${this._filterWithSearchValues}
                                      @unit-list-selection=${this._getUnitSelection}
                                      ._initialListSize=${this._initialListLength}>
                        </list-section>
                        <form-section ._unitData=${typeof this._filteredList === 'undefined' ? this._initialList.filter(item => item['agr_id'] === this._unitSelected) : this._filteredList.filter(item => item['agr_id'] === this._unitSelected)}>
                        </form-section>
                    </main>`
                }
                <footer-section></footer-section>
            </div>
        `
    }


    //Controls the unit data displayed in the list-section.
    _filterWithSearchValues = (e: {detail : {searchTerm: string, statusSelected: string}}) => {
        let searchTerm = e.detail.searchTerm
        let statusSelected = e.detail.statusSelected
        let searchTermRegExp = new RegExp("^"+searchTerm, 'gi')

        if(statusSelected === 'all'){
            this._filteredList = typeof searchTerm === 'undefined' ? [...this._initialList] :
            [...this._initialList].filter(item => item['employer']?.toLowerCase().match(searchTermRegExp))
        }

        else if(statusSelected === 'needs review'){
            this._filteredList = typeof searchTerm === 'undefined' ? [...this._initialList].filter(item => item['status'].toLowerCase() === 'needs review') :
            [...this._initialList].filter(item => item['status'].toLowerCase() === 'needs review').filter(item => item['employer']?.toLowerCase().match(searchTermRegExp))
        }

        else if(statusSelected === 'submitted'){
            this._filteredList = typeof searchTerm === 'undefined' ? [...this._initialList].filter(item => item['status'].toLowerCase() === 'submitted') :
            [...this._initialList].filter(item => item['status'].toLowerCase() === 'submitted').filter(item => item['employer']?.toLowerCase().match(searchTermRegExp))
        }

        /*else if(statusSelected === 'active'){
            this._filteredList = typeof searchTerm === 'undefined' ? [...this._initialList].filter(item => item['status'].toLowerCase() !== 'inactive') :
            [...this._initialList].filter(item => item['status'].toLowerCase() !== 'inactive').filter(item => item['employer']?.toLowerCase().match(searchTermRegExp))
        }*/    
    }
    


    _getUnitSelection = (e: { detail: number; }) => {
        this._unitSelected = this._unitSelected !== e.detail ? e.detail : this._unitSelected
    }

    /*

    _unitDataFilter = (id:Number) => {
        return this._unitSearchResults.filter(item => item['agr_id'] === id)[0]
    }*/


}

declare global {
    interface HTMLElementTagName {
        'minimum-dues': MinimumDues;
    }
}
