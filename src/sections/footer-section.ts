import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('footer-section')
export class FooterSection extends LitElement {
    static styles = css`
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
    
    
    `
    render() {
        return html`
            <footer>
                <small>For assistance with this form:
                    <a href="mailto: minimumdues@afscme.org">minimumdues@afscme.org</a>
                    / 202-429-1219
                </small>
            </footer>
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'footer-section': FooterSection;
    }
}