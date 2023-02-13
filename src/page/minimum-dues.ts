import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {provide} from "@lit-labs/context";
import {dataContext} from "../context/data";
import data from '../test-data.json' assert {type: "json"}
import '../sections/header-section'
import '../sections/footer-section'
import '../sections/list-section'
import '../sections/form-section'

@customElement('minimum-dues')
export class MinimumDues extends LitElement{
    static styles = css`
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



    `

    @provide({context: dataContext})
    @property({attribute: false})
    data;

    @state()
    private _windowWidth: Number;

    constructor(){
        super();
        this.data = data;
        this._windowWidth = window.innerWidth
    }
    

    render(){
        console.log(this._windowWidth);
        return html`
            <div class="container">
                <header-section></header-section>
                ${this._windowWidth < 992 ? 
                    html`<p id="mobile-msg">This page is optimized for desktops. Please visit the provided link on a desktop.</p>` :
                    html`
                    <main>
                        <list-section></list-section>
                        <form-section></form-section>
                    </main>`
                }
                <footer-section></footer-section>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'minimum-dues': MinimumDues;
    }
}
