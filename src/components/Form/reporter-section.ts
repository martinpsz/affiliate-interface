import { LitElement, html, css, PropertyValueMap } from "lit";
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
    private _reporter_data!: Reporter;

    @property()
    warnings!: Warnings

    constructor(){
        super()
        
    }

    render() {
        let {name : fullName, phone, email} = this.contact || {}
        this._reporter_data = {...this.contact}

        return html`
            <form-header .title=${'Reporting for Unit'}></form-header>
            <div>
                <text-input lightMode .type=${"text"} label=${"Full Name:"} .value=${fullName ? fullName : null} @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'name')}></text-input>
                <text-input lightMode .type=${"email"} label=${"Email:"} .value=${email ? email : null} @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'email')}></text-input>
                <text-input lightMode .type=${"tel"} label=${"Phone:"} .value=${phone ? phone : null} @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'phone')}></text-input>
            </div>
        `
    }

    _updateReporter = (e: {detail: string}, fieldName: string) => {
        if (fieldName === 'name'){
            this._reporter_data.name = e.detail ? e.detail : this._reporter_data.name
        }

        if (fieldName === 'email'){
            this._reporter_data.email = e.detail ? e.detail : this._reporter_data.email
        }

        if (fieldName === 'phone'){
            this._reporter_data.phone = e.detail ? e.detail : this._reporter_data.phone
        }

        
        this.dispatchEvent(new CustomEvent('reporter-field-values', {
            detail: this._reporter_data,
            composed: true,
            bubbles: true
        }))
    }

    

}

declare global {
    interface HTMLElementTagName {
        'reporter-section': ReporterSection;
    }
}