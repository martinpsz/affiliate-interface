import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import '../sections/header-section'
import '../sections/footer-section'
import '../sections/list-section'
import '../sections/form-section'
import { getSession, saveSession, FetchData } from "../data";

//Put passed JSON into session storage
const data = saveSession("src/test-data.json");

//Grabs data from session storage
let localData = getSession()

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

            background: var(--white);

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
            background: var(--red);
            padding: 2em 2em;
            line-height: 1.44;
            height: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        main{
            height: 100%;
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
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            border: 1px solid rgb(var(--black));
        }
    `

    @state()
    private _windowWidth: Number;

    @state()
    private _unitSearchResults!: [];

    @state()
    private _unitIdSelected!: Number;

    constructor(){
        super();
        this._windowWidth = window.innerWidth
        this._unitSearchResults = localData
        this._unitIdSelected = localData[0]['agr_id']
    }
    
    render(){
        return html`
            <div class="container">
                <header-section></header-section>
                ${this._windowWidth < 992 ? 
                    html`<p id="mobile-msg">This page is optimized for desktops. Please visit the provided link on a desktop.</p>` :
                    html`
                    <main>
                        <list-section @entered-text=${this._updateUnitSearchTerm} 
                                      @radio-selection=${this._updateStatusSelection}
                                      @unit-selection=${this._updateUnitSelection}
                                      ._payload=${this._unitSearchResults}></list-section>
                        <form-section 
                            ._unitData=${this._unitDataFilter(this._unitIdSelected)}>
                        </form-section>
                    </main>`
                }
                <footer-section></footer-section>
            </div>
        `
    }

    _updateUnitSearchTerm = (e: { detail: String; }) => {
        let searchTerm = e.detail.trim().toLowerCase();      
        this._unitSearchResults = localData.filter((val: { employer: { toLowerCase: () => String[]; }; }) => val.employer.toLowerCase().includes(searchTerm))
    }

    _updateStatusSelection = (e: { detail: String; }) => {
        let unitStatus = e.detail.toLowerCase();
        (unitStatus === 'all' || typeof unitStatus === 'undefined') ? this._unitSearchResults = localData :
        this._unitSearchResults = localData.filter((val: { status: string; }) => val.status.toLowerCase() === unitStatus)
    }

    _updateUnitSelection = (e: { detail: Number; }) => {
        this._unitIdSelected !== e.detail ? this._unitIdSelected = e.detail : this._unitIdSelected
    }

    _unitDataFilter = (id:Number) => {
        return this._unitSearchResults.filter(item => item['agr_id'] === id)[0]
    } 


}

declare global {
    interface HTMLElementTagName {
        'minimum-dues': MinimumDues;
    }
}
