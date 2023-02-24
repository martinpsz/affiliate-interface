import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement('custom-button')
export class CustomButton extends LitElement {
    static styles = css`
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
        }

        .secondary{
            background: rgb(var(--green));
        }

        .primaryMuted{
            background: rgba(var(--blue), 0.5);
        }

        .warning{
            background: rgb(var(--red));
        }

        .warningMuted{
            background: rgba(var(--red), 0.5);
        }

    `
    
    @property()
    buttonText!: string;

    @property()
    icon!:HTMLElement;

    @property({type: Boolean})
    primary = false;

    @property({type:Boolean})
    secondary = false;

    @property({type:Boolean})
    warning = false;

    @property({type:Boolean})
    primaryMuted = false;

    @property({type:Boolean})
    warningMuted = false;


    render() {
        const classes = {primary: this.primary, warning: this.warning, primaryMuted: this.primaryMuted, warningMuted: this.warningMuted, secondary: this.secondary}
        return html`
            <button class=${classMap(classes)}>${this.icon}${this.buttonText}</button>

        `
    }
}