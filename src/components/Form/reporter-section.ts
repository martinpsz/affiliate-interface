import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Reporter } from "../../interfaces/interfaces";
import "../form-header";

@customElement('reporter-section')
export class ReporterSection extends LitElement{
    static styles = css`
        div{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 0.5em;
        }
    `    
    @property()
    contact!: Reporter | null;

    render() {
        let {name : fullName, phone, email} = this.contact || {}
        
        return html`
            <form-header .title=${'Reporting for Unit'}></form-header>
            <div>
                <text-input lightMode .type=${"text"} label=${"Full Name:"} .value=${fullName ? fullName : ''}></text-input>
                <text-input lightMode .type=${"email"} label=${"Email:"} .value=${email ? email : ''}></text-input>
                <text-input lightMode .type=${"tel"} label=${"Phone:"} .value=${phone ? phone : ''}></text-input>
            </div>
        
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'reporter-section': ReporterSection;
    }
}