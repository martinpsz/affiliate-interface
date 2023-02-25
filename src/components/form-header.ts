import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('form-header')
export class FormHeader extends LitElement {
    static styles = css`
        h2{
            font-family: var(--font);
            font-size: 1.1em;
            font-weight: 200;
            text-transform: uppercase;
            color: rgb(var(--blue));
            border-bottom: 4px solid rgb(var(--green));
            margin: 1em 0;
        }

        p{
            margin: 0;
            background: rgba(var(--red), 0.75);
            color: rgb(var(--white));
            font-family: var(--font);
            font-weight: 200;
            text-align: center;
        }

        p:not(:empty){
            margin-top: -1.1em;
        }
    
    `

    @property()
    title!: string;

    @property()
    warning?: string;

    render() {
        return html`
            <h2>${this.title}</h2>
            <p>${this.warning}</p>
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'form-header': FormHeader;
    }
}