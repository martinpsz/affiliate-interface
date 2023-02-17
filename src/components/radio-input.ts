import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('radio-input')
export class RadioInput extends LitElement {
    static styles = css`
        .radio-input{
            display: flex;
            font-family: var(--font);
        }

        .radio-input p{
            margin: 0;
            margin-right: 0.5em;
        }


    
    `

    @property()
    prompt!: string;

    @property()
    labels!: string[]

    @property()
    defaultCheck!: string;


    render() {
        return html`
            <div class="radio-input">
                <p>${this.prompt}</p>
                <div>
                    ${this.labels?.length > 1 && this.labels.map(label => {
                        return html`
                            ${label.toLowerCase() === this.defaultCheck?.toLowerCase() ? html`
                                <input id=${label} type="radio" name="options" checked @input=${this._getInput}/>
                                <label for=${label}>${label}</label>` : 
                            html`
                                <input id=${label} type="radio" name="options" @input=${this._getInput}/>
                                <label for=${label}>${label}</label>      
                        `}
                        `
                    })}
                </div>
            </div>
        `
    }

    _getInput = () => {
        let selection; 
        const inputs = this.renderRoot.querySelectorAll('input')

        for (let i=0; i<inputs.length; i++){
            if (inputs[i].checked) {
                selection = inputs[i].id
            }
        }
        
        this.dispatchEvent(new CustomEvent('retrieve-selection', {
            detail: selection,
            composed: true,
            bubbles: true,
        }))

        
    }

   
}

declare global {
    interface HTMLElementTagName {
        'radio-input': RadioInput;
    }
}