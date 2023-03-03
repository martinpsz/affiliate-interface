import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Reporter } from "../../interfaces/interfaces";
import "../form-header";

interface Warnings {
    name: string | null,
    phone: string | null,
    email: string | null,
}

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
    contact!: Reporter;

    @state()
    private _entered_data!: Reporter;

    @property()
    warning!: Warnings

    constructor(){
        super()
        this.warning = {name: null, phone: null, email: null}
    }

    render() {
        let {name : fullName, phone, email} = this.contact || {}
        this._entered_data = {...this.contact}

        console.log(`Starting with the following reporter data:`, this._entered_data)

        return html`
            <form-header .title=${'Reporting for Unit'}></form-header>
            <div>
                <text-input lightMode .type=${"text"} label=${"Full Name:"} .value=${fullName ? fullName : ''} @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'name')} warning=${this.warning.name}></text-input>
                <text-input lightMode .type=${"email"} label=${"Email:"} .value=${email ? email : ''} @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'email')} warning=${this.warning.email}></text-input>
                <text-input lightMode .type=${"tel"} label=${"Phone:"} .value=${phone ? phone : ''} @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'phone')} warning-${this.warning.phone}></text-input>
            </div>
        `
    }

    _updateReporter = (e: {detail: string}, fieldName: string) => {
        if (fieldName === 'name'){
            e.detail ? this._entered_data.name = e.detail : this._entered_data.name
        }

        if (fieldName === 'email'){
            e.detail ? this._entered_data.email = e.detail : this._entered_data.email
        }

        if (fieldName === 'phone'){
            e.detail ? this._entered_data.phone = e.detail : this._entered_data.phone
        }

        
        this.dispatchEvent(new CustomEvent('reporter-field-values', {
            detail: this._entered_data,
            composed: true,
            bubbles: true
        }))

        console.log(`Passing the following reporter updates`, this._entered_data)
    }

}

declare global {
    interface HTMLElementTagName {
        'reporter-section': ReporterSection;
    }
}