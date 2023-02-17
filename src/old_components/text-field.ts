import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {classMap} from 'lit/directives/class-map.js'

@customElement('text-field')
export class TextField extends LitElement {
    static styles = css`
        :host{
            display: flex;
            flex-direction: column;
        }


        label{
            font-family: var(--font);
            font-size: 0.8em;
            text-transform: uppercase;
        }

        input{
            outline: transparent;
            padding: 0.5em 0 0.5em 0.25em;
            border: none;
            border-bottom: 1px solid rgba(var(--black), 0.3);
        }

        input::placeholder{
            font-family: var(--font);
        }
   
    `

    @property()
    label!: string;

    @property()
    placeholder?: string;

    @property()
    defaultText?: string | number;

    @state()
    _enteredText!: string | number;

    constructor() {
        super()

        this.defaultText = '';
    }
    
    render() {
        return html`
            <label for=${this.label}>${this.label}</label>
            <input placeholder=${this.placeholder} @input=${this._captureInput} .value=${this._enteredText ? this._enteredText : this.defaultText}/>
        `
    }

    _captureInput = () => {
        this._enteredText = this.renderRoot.querySelector('input')!.value
        this.dispatchEvent(new CustomEvent('entered-text', {detail: this._enteredText, bubbles: true, composed: true}))
    }
}

declare global {
    interface HTMLElementTagName {
        'text-field': TextField;
    }
}