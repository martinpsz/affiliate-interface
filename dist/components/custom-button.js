var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
let CustomButton = class CustomButton extends LitElement {
    constructor() {
        super(...arguments);
        this.primary = false;
        this.warning = false;
        this.primaryMuted = false;
        this.warningMuted = false;
    }
    render() {
        const classes = { primary: this.primary, warning: this.warning, primaryMuted: this.primaryMuted, warningMuted: this.warningMuted };
        return html `
            <button class=${classMap(classes)}>${this.buttonText}</button>

        `;
    }
};
CustomButton.styles = css `
        button{
            border: none;
            color: rgb(var(--white));
            font-family: var(--font);
            padding: 0.5em 1em;
            border-radius: 4px;
            text-transform: uppercase;
        }

        .primary{
            background: rgb(var(--blue));
            box-shadow: 0 2px 4px rgb(var(--black));
        }

        .primaryMuted{
            background: rgba(var(--blue), 0.5);
        }

        .warning{
            background: rgb(var(--red));
            box-shadow: 0 2px 4px rgb(var(--black));
        }

        .warningMuted{
            background: rgba(var(--red), 0.5);
        }

    `;
__decorate([
    property()
], CustomButton.prototype, "buttonText", void 0);
__decorate([
    property({ type: Boolean })
], CustomButton.prototype, "primary", void 0);
__decorate([
    property({ type: Boolean })
], CustomButton.prototype, "warning", void 0);
__decorate([
    property({ type: Boolean })
], CustomButton.prototype, "primaryMuted", void 0);
__decorate([
    property({ type: Boolean })
], CustomButton.prototype, "warningMuted", void 0);
CustomButton = __decorate([
    customElement('custom-button')
], CustomButton);
export { CustomButton };
