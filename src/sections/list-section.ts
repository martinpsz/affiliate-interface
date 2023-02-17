import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
//import '../components/list-nav'
//import '../components/list-container'
import '../components/text-input'

@customElement('list-section')
export class ListSection extends LitElement {
    static styles = css`
        section {
            padding: 0.5em;
            
            
        }   

        .list-filter{

        }

    `

    @state()
    _payload = []


    render(){
        return html`
            <section>
                <!--<list-nav></list-nav>
                <list-container ._payload=${this._payload}></list-container>-->

                ${this._payload.length >= 24 && html`
                    <div class="list-filter">
                        <text-input label="Search:" placeholder="Start entering a unit/employer name" @retrieve-input=${true}></text-input>
                    </div>
                `}
            </section>
        `
    }

    
}

declare global {
    interface HTMLElementTagName {
        'list-section': ListSection;
    }
}
