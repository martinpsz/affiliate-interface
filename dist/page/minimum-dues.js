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
        this._unitStatusValue = 'all';
        this._updateUnitSearchTerm = (e) => {
            this._textSearchValue = new RegExp(`^${e.detail}`, "gi");
            this._filteredList = [...this._initialList].filter(item => { var _a; return (_a = item['employer']) === null || _a === void 0 ? void 0 : _a.toLowerCase().match(this._textSearchValue); });
        };
        this._updateStatusSelection = (e) => {
            this._unitStatusValue = e.detail.toLowerCase();
            this._filteredList = [...this._initialList].filter(item => item['status'].toLowerCase() === this._unitStatusValue);
        };
        this._windowWidth = window.innerWidth;
        this._initialList = [...localData];
        this._initialListLength = this._initialList.length;
        this._unitIdSelected = this._initialList[0]['agr_id'];
    }
    render() {
        return html `
            <div class="container">
                <header-section></header-section>
                ${this._windowWidth < 992 ?
            html `<p id="mobile-msg">This page is optimized for desktops. Please visit the provided link on a desktop.</p>` :
            html `
                    <main>
                        <list-section @entered-input=${this._updateUnitSearchTerm} 
                                      @retrieve-selection=${this._updateStatusSelection}
                                      ._payload=${this._filteredList === undefined ? this._initialList : this._filteredList}
                                      .initialListSize=${this._initialListLength}>
                        </list-section>
                        <form-section>
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
    `;
__decorate([
    state()
], MinimumDues.prototype, "_initialListLength", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_windowWidth", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_textSearchValue", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_unitStatusValue", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_initialList", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_filteredList", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_unitIdSelected", void 0);
MinimumDues = __decorate([
    customElement('minimum-dues')
], MinimumDues);
export { MinimumDues };
