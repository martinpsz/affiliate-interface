import { LitElement, html, css } from "lit";
import { property, customElement} from 'lit/decorators.js'

const afscmeLogo = 'src/static/afscme.webp'

@customElement('header-section')
export class HeaderSection extends LitElement {
    static styles = css`
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
    
    `

    @property({attribute: false})
    affiliate!: string;


    render() {
        return html`
            <header>
                <img src=${afscmeLogo} alt="AFSCME logo" height=82/>
                <h1>Minimum Dues Reporting</h1>
                <p>${this.affiliate}</p>
            </header>`
    }
}

declare global {
    interface HTMLElementTagName {
        'header-section': HeaderSection;
    }
}
