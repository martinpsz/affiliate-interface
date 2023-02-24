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
const data = saveSession("src/test-8.json");
let localData = getSession();
let MinimumDues = class MinimumDues extends LitElement {
    constructor() {
        super();
        this._filterWithSearchValues = (e) => {
            let searchTerm = e.detail.searchTerm;
            let statusSelected = e.detail.statusSelected;
            let searchTermRegExp = new RegExp("^" + searchTerm, 'gi');
            if (statusSelected === 'all') {
                this._filteredList = typeof searchTerm === 'undefined' ? [...this._initialList] :
                    [...this._initialList].filter(item => { var _a; return (_a = item['employer']) === null || _a === void 0 ? void 0 : _a.toLowerCase().match(searchTermRegExp); });
            }
            else if (statusSelected === 'needs review') {
                this._filteredList = typeof searchTerm === 'undefined' ? [...this._initialList].filter(item => item['status'].toLowerCase() === 'needs review') :
                    [...this._initialList].filter(item => item['status'].toLowerCase() === 'needs review').filter(item => { var _a; return (_a = item['employer']) === null || _a === void 0 ? void 0 : _a.toLowerCase().match(searchTermRegExp); });
            }
            else if (statusSelected === 'submitted') {
                this._filteredList = typeof searchTerm === 'undefined' ? [...this._initialList].filter(item => item['status'].toLowerCase() === 'submitted') :
                    [...this._initialList].filter(item => item['status'].toLowerCase() === 'submitted').filter(item => { var _a; return (_a = item['employer']) === null || _a === void 0 ? void 0 : _a.toLowerCase().match(searchTermRegExp); });
            }
            else if (statusSelected === 'active') {
                this._filteredList = typeof searchTerm === 'undefined' ? [...this._initialList].filter(item => item['status'].toLowerCase() !== 'inactive') :
                    [...this._initialList].filter(item => item['status'].toLowerCase() !== 'inactive').filter(item => { var _a; return (_a = item['employer']) === null || _a === void 0 ? void 0 : _a.toLowerCase().match(searchTermRegExp); });
            }
        };
        this._getUnitSelection = (e) => {
            this._unitSelected = this._unitSelected !== e.detail ? e.detail : this._unitSelected;
        };
        this._windowWidth = window.innerWidth;
        this._initialList = [...localData];
        this._initialListLength = this._initialList.length;
        this._unitSelected = this._initialList[0]['agr_id'];
    }
    render() {
        return html `
            <div class="container">
                <header-section></header-section>
                ${this._windowWidth < 992 ?
            html `<p id="mobile-msg">This page is optimized for desktops. Please visit the provided link on a desktop.</p>` :
            html `
                    <main>
                        <list-section ._payload=${typeof this._filteredList === 'undefined' ? this._initialList : this._filteredList}
                                      ._initialUnitSelection = ${typeof this._filteredList === 'undefined' ? this._initialList[0].agr_id : this._filteredList[0].agr_id}
                                      @search-values=${this._filterWithSearchValues}
                                      @unit-list-selection=${this._getUnitSelection}
                                      ._initialListSize=${this._initialListLength}>
                        </list-section>
                        <form-section ._unitData=${typeof this._filteredList === 'undefined' ? this._initialList.filter(item => item['agr_id'] === this._unitSelected) : this._filteredList.filter(item => item['agr_id'] === this._unitSelected)}>
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
    `;
__decorate([
    state()
], MinimumDues.prototype, "_initialListLength", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_windowWidth", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_initialList", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_filteredList", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_unitSelected", void 0);
MinimumDues = __decorate([
    customElement('minimum-dues')
], MinimumDues);
export { MinimumDues };
