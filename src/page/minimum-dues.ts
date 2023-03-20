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
            max-width: 1200px;
            margin: 0 auto;
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
            display: flex;
            margin: 1em 0;
        }

        list-section{
            width: 36%;
            background: rgb(var(--black));
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
        }

        form-section{
            width: 64%;
            height: calc(80vh - 2px);
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            border: 1px solid rgb(var(--black));
        }

        @media (min-width: 1200px){
            list-section{
                width: 30%;
            }

            form-section{
                width: 70%;
            }
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
                ${this._windowWidth < 1024 ? 
                    html`<p id="mobile-msg">This page is optimized for computers. Please visit the provided link on a computer.</p>` :
                    html`
                    <main>
                        <list-section ._payload=${typeof this._filteredList === 'undefined' ? this._initialList : this._filteredList }
                                      @unit-list-selection=${this._getUnitSelection}
                                      @entered-input=${this._getSearchParams}
                                      @retrieve-selection=${this._getSearchParams}
                                      ._initialListSize=${this._initialListLength}>
                        </list-section>
                        <form-section ._unitData=${this._initialList.filter(item => item['unit_id'] === this._unitSelected)[0]} totalForms=${this._initialList.length} currForm=${this._initialList.findIndex(item => item['unit_id'] === this._unitSelected) + 1}>
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
    }

    _filterWithSearchValues = () => {
        let searchTerm = this._searchParams.searchTerm.toLowerCase();
        let searchTermRegExp = new RegExp("^"+searchTerm, 'gi');
        let statusSelected = this._searchParams.statusSelection
    
        if(statusSelected === 'all'){
            this._filteredList = this._initialList.filter(item => item.name?.toLowerCase().match(searchTermRegExp) || item.unit_name?.toLowerCase().match(searchTermRegExp))
        }

        /*Assumption: there is a 'status' column that has one of two states: 'needs review' and 'saved' Enable this section once you have those fields set up i nthe data.

        else if(statusSelected === 'needs review'){
            typeof searchTerm === 'undefined' ?
            this._filteredList = this._initialList.filter(item => {item.status.toLowerCase === 'needs review'}):
            this._filteredList = this._initialList.filter(item => item.status.toLowerCase() === 'needs review').filter(item => item.name?.toLowerCase().match(searchTermRegExp) || item.unit_name?.toLowerCase().match(searchTermRegExp))
        }

        else if(statusSelected === 'saved'){
            typeof searchTerm === 'undefined' ?
            this._filteredList = this._initialList.filter(item => {item.status.toLowerCase === 'saved'}):
            this._filteredList = this._initialList.filter(item => item.status.toLowerCase() === 'saved').filter(item => item.name?.toLowerCase().match(searchTermRegExp) || item.unit_name?.toLowerCase().match(searchTermRegExp))
        }*/
    }
}

declare global {
    interface HTMLElementTagName {
        'minimum-dues': MinimumDues;
    }
}
