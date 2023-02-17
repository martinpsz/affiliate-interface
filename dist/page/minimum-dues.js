var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../sections/header-section';
import '../sections/footer-section';
import '../sections/list-section';
import '../sections/form-section';
import { getSession, saveSession } from "../data";
const data = saveSession("src/test-data.json");
let localData = getSession();
let MinimumDues = class MinimumDues extends LitElement {
    constructor() {
        super();
        this._updateUnitSearchTerm = (e) => {
            let searchTerm = e.detail.trim().toLowerCase();
            this._unitSearchResults = localData.filter((val) => val.employer.toLowerCase().includes(searchTerm));
        };
        this._updateStatusSelection = (e) => {
            let unitStatus = e.detail.toLowerCase();
            (unitStatus === 'all' || typeof unitStatus === 'undefined') ? this._unitSearchResults = localData :
                this._unitSearchResults = localData.filter((val) => val.status.toLowerCase() === unitStatus);
        };
        this._updateUnitSelection = (e) => {
            this._unitIdSelected !== e.detail ? this._unitIdSelected = e.detail : this._unitIdSelected;
        };
        this._unitDataFilter = (id) => {
            return this._unitSearchResults.filter(item => item['agr_id'] === id)[0];
        };
        this._windowWidth = window.innerWidth;
        this._unitSearchResults = localData;
        this._unitIdSelected = localData[0]['agr_id'];
    }
    render() {
        return html `
            <div class="container">
                <header-section></header-section>
                ${this._windowWidth < 992 ?
            html `<p id="mobile-msg">This page is optimized for desktops. Please visit the provided link on a desktop.</p>` :
            html `
                    <main>
                        <list-section @entered-text=${this._updateUnitSearchTerm} 
                                      @radio-selection=${this._updateStatusSelection}
                                      @unit-selection=${this._updateUnitSelection}
                                      ._payload=${this._unitSearchResults}></list-section>
                        <form-section 
                            ._unitData=${this._unitDataFilter(this._unitIdSelected)}>
                        </form-section>
                    </main>`}
                <footer-section></footer-section>
            </div>
        `;
    }
};
MinimumDues.styles = css `
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
            flex: 30%;
            background: rgb(var(--black));
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
        }

        form-section{
            flex: 70%;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            border: 1px solid rgb(var(--black));
        }
    `;
__decorate([
    state()
], MinimumDues.prototype, "_windowWidth", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_unitSearchResults", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_unitIdSelected", void 0);
MinimumDues = __decorate([
    customElement('minimum-dues')
], MinimumDues);
export { MinimumDues };
