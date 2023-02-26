var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { property, customElement } from 'lit/decorators.js';
const afscmeLogo = 'src/static/afscme.webp';
let HeaderSection = class HeaderSection extends LitElement {
    render() {
        return html `
            <header>
                <img src=${afscmeLogo} alt="AFSCME logo" height=82/>
                <h1>Minimum Dues Reporting</h1>
                <p>${this.affiliate}</p>
            </header>`;
    }
};
HeaderSection.styles = css `
        header{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0.5em 0;
        }

        h1{
            margin: 0.25em 0 0;
            font-family: var(--font);
            font-size: 1.5em;
            color: var(--black);
        }

        p{
            margin: 0;
            font-family: var(--font);
            color: var(--black);
            text-transform: uppercase;
        }
    
    `;
__decorate([
    property({ attribute: false })
], HeaderSection.prototype, "affiliate", void 0);
HeaderSection = __decorate([
    customElement('header-section')
], HeaderSection);
export { HeaderSection };
