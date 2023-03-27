import { LitElement, html, css } from "lit";
import { customElement, property} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement('radio-input')
export class RadioInput extends LitElement {
    static styles = css`
        .radio-input{
            display: flex;
            flex-wrap: wrap;
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
            text-transform: uppercase;
            font-size: 0.8em;
        }

        .dirColumn{
            flex-direction: column;
        }

        .darkMode {
            color: rgb(var(--white));
        }

        .darkMode p{
            margin-right: 0;
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
    selection!: string | undefined;

    @property()
    defaultChecked!: string | undefined;

    @property({type:Boolean})
    darkMode = false;

    @property({type:Boolean})
    dirColumn = false;

    @property({type:Boolean})
    raiseSelection = false;

    

    render() {
        //console.log(this.selection)
        const classes = {darkMode : this.darkMode, dirColumn : this.dirColumn, raiseSelection : this.raiseSelection}
        
        return html`
            <div class="radio-input ${classMap(classes)}">
                <p>${this.prompt}</p>
                <div>
                    ${this.labels?.length > 1 && this.labels.map(label => {
                        return html`
                                <input id=${label} type="radio" name="options" .value=${label} ?checked=${this.selection === label}
                                 @change=${this._getInput}/>
                                <label for=${label}>${label}</label>`
                    })}
                </div>
            </div>
        `
    }

    _getInput = (e: {target: HTMLInputElement}) => {
        this.selection = e.target.value;

        this.dispatchEvent(new CustomEvent('retrieve-selection', {
            detail: this.selection,
            composed: true,
            bubbles: true,
        }))
    }

   
    //if component updates, reset input checked to original value or this.defaultChecked
    updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('selection')) {
            this.shadowRoot?.querySelectorAll('input').forEach(input => {
                if (input.value === this.selection) {
                    input.checked = true;
                } else {
                    input.checked = false;
                }
            })
        }
    }

    
    

    

    


    

    

}

declare global {
    interface HTMLElementTagName {
        'radio-input': RadioInput;
    }
}