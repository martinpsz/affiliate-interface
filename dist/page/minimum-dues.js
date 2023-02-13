var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { provide } from "@lit-labs/context";
import { dataContext } from "../context/data";
import data from '../test-data.json' assert { type: "json" };
import '../sections/header-section';
import '../sections/footer-section';
import '../sections/list-section';
import '../sections/form-section';
let MinimumDues = class MinimumDues extends LitElement {
    constructor() {
        super();
        this.data = data;
        this._windowWidth = window.innerWidth;
    }
    render() {
        console.log(this._windowWidth);
        return html `
            <div class="container">
                <header-section></header-section>
                ${this._windowWidth < 992 ?
            html `<p id="mobile-msg">This page is optimized for desktops. Please visit the provided link on a desktop.</p>` :
            html `
                    <main>
                        <list-section></list-section>
                        <form-section></form-section>
                    </main>`}
                <footer-section></footer-section>
            </div>
        `;
    }
};
MinimumDues.styles = css `
        :host{
            --green: rgb(8,172,82);
            --blue: rgb(21, 50, 67);
            --white: rgb(252, 252, 252);
            --red: rgb(164, 14, 76);
            --black: rgb(25, 21, 22);
            --font: 'Montserrat', sans-serif;
        }

        .container{
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            justify-content: space-between;
            background: var(--white);
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
            border: 1px solid red;
            height: 100%;
            width: calc(100% - 2em);
            max-width: 1200px;
            display: flex;
            margin: 1em 0;
        }

        list-section{
            flex: 30%;
            padding: 0 0.5em;
            outline: 1px solid green;
        }

        form-section{
            flex: 70%;
            padding: 0 0.5em;
            border: 1px solid blue;
        }



    `;
__decorate([
    provide({ context: dataContext }),
    property({ attribute: false })
], MinimumDues.prototype, "data", void 0);
__decorate([
    state()
], MinimumDues.prototype, "_windowWidth", void 0);
MinimumDues = __decorate([
    customElement('minimum-dues')
], MinimumDues);
export { MinimumDues };
