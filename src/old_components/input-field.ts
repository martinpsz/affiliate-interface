import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("input-field")
export class InputField extends LitElement{
    static styles = css`
        .text{
            display: flex;
            flex-direction: column;
        }

        label, .text input::placeholder, .prompt{
            font-family: var(--font);
        }

        .prompt{
            margin: 0;
            margin-right: 0.5em;
        }

        .text input{
            padding: 0.5em 0 0.5em 0.25em;
            border: none;
            border: 1px solid rgba(var(--black), 0.5);
            border-radius: 4px;
        }

        .radio label{
            font-family: var(--font);
        }   
    `

    //used if input has a question prompt.
    @property()
    prompt?: string;

    //used to determine instance type of class.
    @property()
    inputType!: string

    //used to determine input labels.
    @property()
    labels!: string[];

    //specific to radio instances only.
    @property()
    defaultChecked?: string;

    //specific to text instances only.
    @property()
    placeholder!: string;


    render() {
        let inputFields;
        switch(this.inputType){
            case 'radio':
                inputFields = html`
                    <div class="radio">
                        ${this.labels.map(label => {
                            return html`
                            ${label === this.defaultChecked ? html`
                                    <input id=${label} type="radio" name="options" checked/>
                            ` : html`
                                    <input id=${label} type="radio" name="options"/>
                            `}
                            <label for=${label}>${label}</label>
                            `
                        })}
                    </div>
                `
                break;
            case 'calendar':
                inputFields = html`
                    <div class="calendar">
                        ${this.labels.map(label => {
                            html`
                                <label for=${label}>${label}</label>
                                <input id=${label} name=${label} type="calendar"/>
                            `
                        })}
                    </div>
                `
                break;
            default:
                inputFields = html`
                    ${this.labels.map(label => html`
                        <div class="text">
                            <label for=${label}>${label}</label>
                            <input id=${label} name=${label} type="text"/>
                        </div>
                    `)}
                
                `
        }

        return html`
            ${this.prompt && html`<p class="prompt">${this.prompt}</p>`}
            ${inputFields}
        
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'input-field': InputField;
    }
}