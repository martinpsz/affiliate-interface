import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import {classMap} from 'lit/directives/class-map.js';

@customElement('text-input')
export class TextInput extends LitElement{
    static styles = css`
        div{
            display: flex;
            flex-direction: column;
        }

        label, input::placeholder, input{
            font-family: var(--font);
        }

        label{
            text-transform: uppercase;
            color: rgb(var(--white));
            margin-bottom: 0.25em;
        }

        input{
            padding: 0.5em 0 0.5em 0.25em;
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
    
    `

    @property()
    label!: string;

    @property()
    placeholder?: string;

    @property()
    type!: string;

    @property({type:Boolean})
    lightMode = false;

    render() {
        const classes = {lightMode : this.lightMode }
        return html`
            <div class=${classMap(classes)}>
                <label for=${this.label}>${this.label}</label>
                <input id=${this.label} type=${this.type} placeholder=${this.placeholder} name=${this.label.replace(/:$/g, '')} @input=${this._textInputEmitter}/>
            </div>
        `
    }

    _textInputEmitter = () => {
        const inputText = this.renderRoot.querySelector('input')?.value
        this.dispatchEvent(new CustomEvent('retrieve-input', {
            detail: inputText?.trim().toLowerCase(),
            bubbles: true,
            composed: true,
        }))
    }
}

declare global {
    interface HTMLElementTagName {
        'text-input': TextInput;
    }
}