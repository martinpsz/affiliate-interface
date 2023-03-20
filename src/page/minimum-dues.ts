import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../sections/header-section'
import '../sections/footer-section'
import '../sections/list-section'
import '../sections/form-section'

import {Unit, UnitList} from '../interfaces/interfaces'
import data from '../test-data.json' assert {type: "json"}

interface SearchParams{
    searchTerm: string,
    statusSelection: string,
}

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
            font-family: var(--font);
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

    @state()
    private _searchParams: SearchParams;

    constructor(){
        super();
        this._windowWidth = window.innerWidth;
        this._initialList = [...data] as UnitList
        this._unitSelected = this._initialList[0]['unit_id'] as number;
        this._initialListLength = this._initialList.length;  
        this._searchParams = {searchTerm: '', statusSelection: 'all'} 
    }

    
    render(){
        return html`
            <div class="container">
                <header-section></header-section>
                ${this._windowWidth < 992 ? 
                    html`<p id="mobile-msg">This page is optimized for computers. Please visit the provided link on a computer.</p>` :
                    html`
                    <main>
                        <list-section ._payload=${this._initialList}
                                      @unit-list-selection=${this._getUnitSelection}
                                      @entered-input=${this._getSearchParams}
                                      @retrieve-selection=${this._getSearchParams}
                                      ._initialListSize=${this._initialListLength}>
                        </list-section>
                        <form-section ._unitData=${this._initialList.filter(item => item['unit_id'] === this._unitSelected)[0]}>
                           
                        </form-section>
                    </main>`
                }
                <footer-section></footer-section>
            </div>
        `
    }

    _getSearchParams = (e: { detail: string; type: string; }) => {
        e.type === 'entered-input' ? this._searchParams.searchTerm = e.detail : this._searchParams.statusSelection = e.detail

        this._filterWithSearchValues()
        this.requestUpdate()
    }

    _getUnitSelection = (e: { detail: number; }) => {
        this._unitSelected = this._initialList[0]['unit_id'] !== e.detail ? e.detail : this._initialList[0]['unit_id'];

        console.log(this._unitSelected)
    }

    _filterWithSearchValues = () => {
        let searchTerm = this._searchParams.searchTerm;
        let searchTermRegExp = new RegExp("^"+searchTerm, 'gi');
        let statusSelected = this._searchParams.statusSelection


        /*if(statusSelected === 'all'){
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
        }*/

        
    }

}

declare global {
    interface HTMLElementTagName {
        'minimum-dues': MinimumDues;
    }
}
