import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { inputFieldStyles } from "./Input-styles";
import { InputTextElement, InputFileElement, InputTextElementWithSpan } from "./Input-snippets";
import { debounce } from "../../utilities/searchDebounce";

type InputTypes = 'text' | 'number' | 'email' | 'phone' | 'file' | 'select' | 'submit' | 'adjustment';

@customElement('input-field')
export class InputField extends LitElement{
    static styles = [
        inputFieldStyles,

        css`
            div{
                display: inline-flex;
                flex-direction: column;
            }

            .flex_direction_row{
                flex-direction: row;
                
            }
        `
    ]
    
    @property({type: Boolean})
    dark_mode = false;

    @property({type: Boolean})
    flex_direction_row = false;

    @property()
    type!: InputTypes

    @property()
    label!: string;

    _inputFieldGenerator = (type: InputTypes, label: string, _fetch: Function) => {
        let inputField = undefined;

        switch(type){
            case 'adjustment':
                inputField = InputTextElementWithSpan(type, label, _fetch)
                break;
            case 'file':
                inputField = InputFileElement(type, label, _fetch)
                break;
            default:
                inputField = InputTextElement(type, label, _fetch);
        }

        return inputField
        
    }

    protected render() {
        const classes = {dark_mode: this.dark_mode, 
                         flex_direction_row: this.flex_direction_row}
        return html`
            <div class=${classMap(classes)}>
                ${this._inputFieldGenerator(this.type, this.label, debounce(this._getInput, 750))}
            </div>
        `
    }

     _getInput = () => {
        //console.log(this.renderRoot.querySelector('input')?.value)
        //console.log(this.renderRoot.querySelector('input')?.files)
    }
}

declare global {
    interface HTMLElementTagName {
        'input-field': InputField;
    }
}