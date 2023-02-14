import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

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
            background: rgb(var(--black));
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

    //make sure to assign a unique name to each dispatch instance.
    _checkedItem = () => {
        const inputOptions = Array.from(this.renderRoot?.querySelectorAll('.option input')) as Array<HTMLInputElement>
        let _selection = inputOptions.filter(val => val.checked && val)[0].id
        
        this.dispatchEvent(new CustomEvent('status_selection', {
            detail : _selection,
            bubbles: true,
            composed: true
        }))
    }
}

declare global {
    interface HTMLElementTagName {
        'radio-toggle': RadioToggle;
    }
}