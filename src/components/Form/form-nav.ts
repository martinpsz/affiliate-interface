import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import '../custom-button';

@customElement('form-nav')
export class FormNav extends LitElement{
    static styles = css`
        :host{
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
        }

        div{
            margin: 0 0.25em;
            max-width: 98%;
            background: rgba(var(--black), 0.95);
            color: rgb(var(--white));
            font-family: var(--font);
            padding: 0 0.5em;
            box-shadow: 0 6px 6px -2px rgba(var(--black), 0.5);
            border-bottom-left-radius: 0.25em;
            border-bottom-right-radius: 0.25em;
            display: grid;
            align-items: center;
            justify-content: space-between;
            grid-template-columns: 1fr 6fr 2fr;
            grid-template-areas: 'progress message button'; 
        }

        #progress{
            font-weight: 200;
            grid-area: progress;
            font-size: 0.8em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        #progress span:nth-of-type(1){
            font-weight: 600;
        }

        p{
            text-transform: uppercase;
            grid-area: message;
            margin: 0;
            justify-self: center;
            font-size: 0.8em;
        }

        custom-button{
            justify-self: end;
            margin: 0.5em 0;
            grid-area: button;  
        }
    `
    @property()
    currForm!: number;

    @property()
    totalForms!: number;

    @property()
    warningMsg!: string;

    render() {
        return html`
            <div>
                <p id="progress"><span>Report:</span><span>${this.currForm} of ${this.totalForms}</span></p>
                <p>${this.warningMsg}</p>
                <custom-button buttonText='Save this Report' warning
                               .icon=${html`<iconify-icon icon="codicon:cloud-upload" style="color: white;" width="24" height="24"></iconify-icon>`}>
                </custom-button>
            </div>

            

        `
    }
}

declare global {
    interface HTMLElementTagName {
        'form-nav': FormNav;
    }
}