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
            padding: 0.375em 0.75em;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .icon{
            max-height: 24px;
        }

        .text{
            text-transform: uppercase;
            margin-left: 0.25em;
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
            <button class=${classMap(classes)}><span slot="icon" class="icon">${this.icon}</span><span slot="text" class="text">${this.buttonText}</span></button>

        `
    }
}