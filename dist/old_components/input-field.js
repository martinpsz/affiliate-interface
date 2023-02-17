var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let InputField = class InputField extends LitElement {
    render() {
        let inputFields;
        switch (this.inputType) {
            case 'radio':
                inputFields = html `
                    <div class="radio">
                        ${this.labels.map(label => {
                    return html `
                            ${label === this.defaultChecked ? html `
                                    <input id=${label} type="radio" name="options" checked/>
                            ` : html `
                                    <input id=${label} type="radio" name="options"/>
                            `}
                            <label for=${label}>${label}</label>
                            `;
                })}
                    </div>
                `;
                break;
            case 'calendar':
                inputFields = html `
                    <div class="calendar">
                        ${this.labels.map(label => {
                    html `
                                <label for=${label}>${label}</label>
                                <input id=${label} name=${label} type="calendar"/>
                            `;
                })}
                    </div>
                `;
                break;
            default:
                inputFields = html `
                    ${this.labels.map(label => html `
                        <div class="text">
                            <label for=${label}>${label}</label>
                            <input id=${label} name=${label} type="text"/>
                        </div>
                    `)}
                
                `;
        }
        return html `
            ${this.prompt && html `<p class="prompt">${this.prompt}</p>`}
            ${inputFields}
        
        `;
    }
};
InputField.styles = css `
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
    `;
__decorate([
    property()
], InputField.prototype, "prompt", void 0);
__decorate([
    property()
], InputField.prototype, "inputType", void 0);
__decorate([
    property()
], InputField.prototype, "labels", void 0);
__decorate([
    property()
], InputField.prototype, "defaultChecked", void 0);
__decorate([
    property()
], InputField.prototype, "placeholder", void 0);
InputField = __decorate([
    customElement("input-field")
], InputField);
export { InputField };
