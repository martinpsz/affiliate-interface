import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('radio-toggler')
export class RadioToggler extends LitElement{
    static styles = css`
        div{
            display: flex;
        }

        .vertical{
            flex-direction: column;
        }

        .vertical span{
            margin-bottom: 0.25em;
        }

        .radio-options{
            display: inline-flex;
        }

        .option input{
            margin: 0;
            border: 1px solid var(--blue);
            appearance: none;
            background: white;
            width: 100%;
            height: 2em;
            padding: 0 2em;
            position: relative;
        }

        .option input:checked{
            background: var(--blue);
            color: white;
        }

        span {
            font-family: var(--font);
            color: var(--black);
            font-size: 0.8em;
            text-transform: uppercase;
        }
    `

    @property()
    prompt?: String
    labels!: []
    defaultChecked!: String
    columnDirection!: String;


    render() {
        return html`
            <div class = ${this.columnDirection === "vertical" ? "vertical" : nothing}>
                <span>${this.prompt}</span>
                <div class="radio-options">
                    ${this.labels.map(label => html`
                        <div class="option">
                            ${label === this.defaultChecked ? 
                                html`
                                <input id=${label} type="radio" @input=${this._checkedItem} checked name="option"/>` :
                                html`
                                <input id=${label} type="radio" @input=${this._checkedItem} name="option"/>`
                            }
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
        'radio-toggler': RadioToggler;
    }
}