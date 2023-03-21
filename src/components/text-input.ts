import { LitElement, html, css, nothing } from "lit";
import { customElement, property} from "lit/decorators.js";
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
            margin-bottom: 0.2em;
            font-size: 0.8em;
        }

        input:focus{
            outline: transparent;
        }

        input::placeholder{
            color: rgba(var(--black), 0.5);
        }

        .lightMode label{
            color: rgb(var(--black));
            font-weight: 600;
        }

        .lightMode input{
            border: none;
            border-bottom: 1px solid rgba(var(--black), 0.5);
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        }

        input[type=number] {
        -moz-appearance: textfield;
        }

        input[type=file]{
            border-bottom: none;
        }

        input[type='file']::file-selector-button{
            background-color: rgb(var(--blue));
            color: rgb(var(--white));
            border: none;
            font-family: var(--font);
            text-transform: uppercase;
            border-radius: 0.25em;
            padding: 0.125em 0.375em;
        }

        

        small{
            font-family: var(--font);
            font-weight: 600;
            text-transform: uppercase;
            text-align: center;
            background: rgba(var(--red), 0.8);
            color: rgb(var(--white));
            font-size: 0.6em;
            margin: 0 0.25em;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
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

    @property()
    warning!: string;

    @property({type:Boolean})
    lightMode = false;


    render() {
        const classes = {lightMode : this.lightMode }
        return html`
            <div class=${classMap(classes)}>
                <label for=${this.label}>${this.label}</label>
                <input id=${this.label} 
                       type=${this.type} 
                       placeholder=${this.placeholder} 
                       name=${this.label?.replace(/:$/g, '')} 
                       @input=${debounce(this._textInputEmitter, 1000)}
                       @change=${this.type==='file' ? this._fileUploadHandler : nothing}
                       value=${this.value}/>
                <small>${this.warning}</small>
            </div>
        `
    }

    _textInputEmitter = () => {
        let inputText = this.renderRoot.querySelector('input')?.value.trim() as string | number
        
        this.dispatchEvent(new CustomEvent('entered-input', {
            detail: inputText,
            bubbles: true,
            composed: true
        }))
    }

    _fileUploadHandler = () => {
        let inputField = this.renderRoot.querySelector('input')?.files as FileList
        let inputFile;

        if (inputField !== null){
            inputFile = inputField[0]
        }

        this.dispatchEvent(new CustomEvent('file-upload', {
            detail: inputFile,
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