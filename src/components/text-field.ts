import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement('text-field')
export class TextField extends LitElement {
    static styles = css`
        :host{
            display: flex;
            flex-direction: column;
        }


        label{
            color: rgb(var(--white));
            font-family: var(--font);
            font-size: 0.8em;
            text-transform: uppercase;
        }

        input{
            outline: transparent;
            padding: 0.25em 0 0.25em 0.25em;
            border: none;
            border: 1px solid rgb(var(--white));
            background: rgb(var(--white));
            color: rgb(var(--blue));
        }

        input::placeholder{
            font-family: var(--font);
            color: var(--white);
        }
    
    `

    @property()
    label!: String;
    placeholder?: String

    @state()
    _enteredText!: String | Number;
    
    render() {
        return html`
            <label for=${this.label}>${this.label}</label>
            <input placeholder=${this.placeholder} @input=${this._captureInput} .value=${this._enteredText ? this._enteredText : nothing}/>
        `
    }

    _captureInput = () => {
        const _searchTerm = this.renderRoot.querySelector('input')!.value
        //add dispatch event or update the context value with the above value.
        this.dispatchEvent(new CustomEvent('unit-search', {detail: _searchTerm, bubbles: true, composed: true}))
    }
}

declare global {
    interface HTMLElementTagName {
        'text-field': TextField;
    }
}