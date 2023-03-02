import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {classMap} from 'lit/directives/class-map.js';
import { debounce } from "../utilities/searchDebounce";

@customElement('text-input')
export class TextInput extends LitElement{
    static styles = css`
        div{
            display: inline-flex;
            flex-direction: column;
            width: 100%;
        }

        label, input::placeholder, input{
            font-family: var(--font);
        }

        label{
            text-transform: uppercase;
            color: rgb(var(--white));
            margin-bottom: 0.25em;
            font-size: 0.8em;
        }

        input{
            padding: 0.25em 0 0.25em 0.5em;
            border: none;
            border-radius: 4px;
        }

        input:focus{
            outline: transparent;
        }

        input::placeholder{
            color: rgba(var(--black), 0.5);
        }

        .lightMode label{
            color: rgb(var(--black));
        }

        .lightMode input{
            border: 1px solid rgba(var(--black), 0.5);
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        }

        input[type=number] {
        -moz-appearance: textfield;
        }
    
    `

    @property()
    label!: string;

    @property()
    placeholder?: string;

    @property()
    type!: string;

    @property()
    value!: string | number | null;

    @property({type:Boolean})
    lightMode = false;

    render() {
        const classes = {lightMode : this.lightMode }
        return html`
            <div class=${classMap(classes)}>
                <label for=${this.label}>${this.label}</label>
                <input id=${this.label} type=${this.type} placeholder=${this.placeholder} name=${this.label.replace(/:$/g, '')} @input=${debounce(this._textInputEmitter, 750)}
                value=${this.value}/>
            </div>
        `
    }

    _textInputEmitter = () => {
        let inputText = this.renderRoot.querySelector('input')?.value.trim().toLowerCase() as string

        this.dispatchEvent(new CustomEvent('entered-input', {
            detail: inputText,
            bubbles: true,
            composed: true
        }))
    }
}

declare global {
    interface HTMLElementTagName {
        'text-input': TextInput;
    }
}