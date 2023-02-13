var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
let FooterSection = class FooterSection extends LitElement {
    render() {
        return html `
            <footer>
                <small>For assistance with this form:
                    <a href="mailto: minimumdues@afscme.org">minimumdues@afscme.org</a>
                    / 202-429-1219
                </small>
            </footer>
        `;
    }
};
FooterSection.styles = css `
        footer{
            margin: 0.5em 0;
        }

        small{
            font-family: var(--font);
            color: var(--black);
            font-size: 1em;
        }

        a{
            color: var(--red);
        }
    
    
    `;
FooterSection = __decorate([
    customElement('footer-section')
], FooterSection);
export { FooterSection };
