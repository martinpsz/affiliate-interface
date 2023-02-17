import { LitElement, html, css, nothing } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import '../components/text-input'
import '../components/radio-input'
import '../components/UnitList/units-container'
import '../components/custom-button'

@customElement('list-section')
export class ListSection extends LitElement {
    static styles = css`
        section {
            padding: 0.5em; 
        }   

        .list-filter{
            display: flex;
            flex-direction: column;
            row-gap: 0.5em;
        }

        #btn-group{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            column-gap: 0.5em;
            margin-right: 1em;
        }
        
    `

    @state()
    _payload = []

    @property()
    initialListSize!: number;

    render(){
        //console.log(this._payload)
        return html`
            <section>
                ${this.initialListSize >= 24 ? html`
                    <div class="list-filter">
                        <text-input label="Search:" placeholder="Start entering a unit/employer name" @retrieve-input=${true}></text-input>
                        <radio-input darkMode prompt="Status:" .labels=${['All', 'Needs Review', 'Submitted', 'Active']} .defaultCheck=${'All'}></radio-input>
                    </div>
                ` : nothing}
                <units-container .payload=${this._payload}></units-container>
                <div id="btn-group">
                    <custom-button warning buttonText="Get spreadsheet"></custom-button>
                    <custom-button primary buttonText="Add a Unit"></custom-button>
                </div>

            </section>
        `
    }

    
}

declare global {
    interface HTMLElementTagName {
        'list-section': ListSection;
    }
}
