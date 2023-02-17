var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
let NewTextField = class NewTextField extends LitElement {
    render() {
        switch (this.inputType) {
            case 'radio':
                let inputField = html `
                    ${this.labels.map(label => {
                    html `
                            <input type="radio" name="option" id=${label}/>
                            <label ></label>
                        `;
                })}
                
                `;
        }
        return html `
            <div class='input-wrapper'>
                <p>${this.prompt}</p>
                <div class='input-field'>
                </div>
            </div>
        
        `;
    }
};
__decorate([
    property()
], NewTextField.prototype, "prompt", void 0);
__decorate([
    property()
], NewTextField.prototype, "labels", void 0);
__decorate([
    property()
], NewTextField.prototype, "placeholder", void 0);
__decorate([
    property()
], NewTextField.prototype, "inputType", void 0);
NewTextField = __decorate([
    customElement("new-text-field")
], NewTextField);
export { NewTextField };
