import { LitElement, html, css } from "lit";
import { customElement, property} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement('radio-input')
export class RadioInput extends LitElement {
    static styles = css`
        .radio-input{
            display: flex;
            font-family: var(--font);
            accent-color: rgb(var(--blue));
        }

        .radio-input p{
            margin: 0;
            margin-right: 0.5em;  
        }

        .radio-input label{
            font-size: 1em;
        }

        .radio-input input:nth-of-type(n+2){
            margin-left: 0.5em;
        }

        .raiseSelection p{
            margin-bottom: 0.25em;
            text-transform: uppercase;
            font-size: 0.8em;
        }

        .dirColumn{
            flex-direction: column;
        }

        .dirColumn p{
            margin-bottom: 0.5em;
        }

        .darkMode {
            color: rgb(var(--white));
        }

        .darkMode p{
            margin-right: 0;
            margin-bottom: 0.25em;
            text-transform: uppercase;
            font-size: 0.8em;
        }

        .darkMode label{
            font-weight: 200;
        }

        .darkMode input{
            margin: 0;
            accent-color: rgb(var(--red));
        }

    `

    @property()
    prompt!: string;

    @property()
    labels!: string[]

    @property()
    defaultCheck!: string;

    @property({type:Boolean})
    darkMode = false;

    @property({type:Boolean})
    dirColumn = false;

    @property({type:Boolean})
    raiseSelection = false;

    render() {
        const classes = {darkMode : this.darkMode, dirColumn : this.dirColumn, raiseSelection : this.raiseSelection}
        return html`
            <div class="radio-input ${classMap(classes)}">
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