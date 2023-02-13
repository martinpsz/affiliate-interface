import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('radio-toggle')
export class RadioToggle extends LitElement{
    static styles = css`
        div{
            display: flex;
        }

        .vertical{
            flex-direction: column;
        }

        .radio-options{
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        .option{
            display: flex;
            align-items: center;
        }

        .option input{
            margin: 0 0.25em 0 0;
            appearance: none;
            background: rgb(var(--blue));
            border: 1px solid rgb(var(--white));
            height: 0.8em;
            width: 0.8em;
            
        }

        .option input:checked{
            background: rgb(var(--red));
        }

        span, label{
            font-family: var(--font);
            color: rgb(var(--white));
            font-size: 0.8em;
            text-transform: uppercase;
        }

    `

    @property()
    prompt: String
    labels!: []
    defaultChecked!: String
    columnDirection!: String;

    constructor() {
        super();
        this.prompt = '';
    }

    render() {
        return html`
            <div class = ${this.columnDirection === "vertical" ? "vertical" : nothing}>
                <span>${this.prompt}</span>
                <div class="radio-options">
                    ${this.labels.map(label => html`
                        <div class="option">
                            ${label === this.defaultChecked ? 
                                html`<input id=${label} type="radio" @input=${this._checkedItem} checked name="option"/>` :
                                html`<input id=${label} type="radio" @input=${this._checkedItem} name="option"/>`
                            }
                            <label for=${label}>${label}</label>
                        </div>
                    `)}
                </div>
            </div>

        `
    }

    _checkedItem = () => {
        const inputOptions = Array.from(this.renderRoot?.querySelectorAll('.option input')) as Array<HTMLInputElement>
        let selection = inputOptions.filter(val => val.checked && val)[0].id
        //dispatch value of selection or set context state to value. Set the default state to true and update on user input.
    }
}

declare global {
    interface HTMLElementTagName {
        'radio-toggle': RadioToggle;
    }
}