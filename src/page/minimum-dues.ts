import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
//import data from '../test-data.json' assert {type: "json"}
import '../sections/header-section'
import '../sections/footer-section'
import '../sections/list-section'
import '../sections/form-section'

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
            flex: 30%;
            background: rgb(var(--blue));
        }

        form-section{
            flex: 70%;
        }
    `

    //@provide({context: dataContext})
    //@property({attribute: false})
    //data;

    @state()
    private _windowWidth: Number;

    


    constructor(){
        super();
        //this.data = data;
        this._windowWidth = window.innerWidth
    }
    
    
    

    render(){
        return html`
            <div class="container">
                <header-section></header-section>
                ${this._windowWidth < 992 ? 
                    html`<p id="mobile-msg">This page is optimized for desktops. Please visit the provided link on a desktop.</p>` :
                    html`
                    <main>
                        <list-section></list-section>
                        <form-section ></form-section>
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
