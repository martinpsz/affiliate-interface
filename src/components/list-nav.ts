import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/text-field'
import '../components/radio-toggle';

@customElement('list-nav')
export class ListNav extends LitElement {
    static styles = css`
       div{
         width: 100%;
         margin: 1em 0;
       }

       text-field{
         margin-bottom: 1em;
       }
    
    `

    @state()
    _enteredText!: String;

    render() {
        console.log(this._enteredText)
        return html`
            <div .columnDirection=${true}>
                <text-field .label=${"Search:"} .placeholder=${"Start entering a unit name"} @input=${this._getInput}></text-field>
                <radio-toggle .columnDirection=${"vertical"} .prompt=${"Unit status:"} .labels=${['All', 'Needs Review', 'Submitted', 'Active']} .defaultChecked=${'All'}></radio-toggle>
            </div>
        
        `
    }

    _getInput = () => {
        console.log(this)
        //this._enteredText = this.renderRoot.querySelector('input')!.value
    }

}

declare global {
    interface HTMLElementTagName {
        'list-nav': ListNav;
    }
}