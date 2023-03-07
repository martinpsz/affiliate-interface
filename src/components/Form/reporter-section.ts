import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Reporter } from "../../interfaces/interfaces";
import "../form-header";
import { validateReporterSection } from "../../utilities/formValidator";

interface Warnings {
    nameWarning: string | null,
    phoneWarning: string | null,
    emailWarning: string | null,
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
    warnings!: {contact: Warnings}

    render() {
        let {name : fullName, phone, email} = this.contact || {}
        this._reporter_data = {...this.contact}
        console.log(this._reporter_data)
        console.log(this.warnings.contact)

        return html`
            <form-header .title=${'Reporting for Unit'}></form-header>
            <div>
                <text-input lightMode 
                            type=${"text"}
                            label=${"Full Name:"} 
                            value=${fullName ? fullName : null} 
                            @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'name')}
                            warning=${this.warnings.contact.nameWarning}></text-input>
                <text-input lightMode 
                            type=${"email"} 
                            label=${"Email:"} 
                            value=${email ? email : null} 
                            @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'email')}
                            warning=${this.warnings.contact.emailWarning}></text-input>
                <text-input lightMode 
                            type=${"tel"} 
                            label=${"Phone:"} 
                            value=${phone ? phone : null} 
                            @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'phone')}
                            warning=${this.warnings.contact.phoneWarning}></text-input>
            </div>
        `
    }

    _updateReporter = (e: {detail: string}, fieldName: string) => {
        if (fieldName === 'name'){
            //set value of name:
            if (typeof e.detail !== null) {
                this._reporter_data.name = e.detail;
            } else if (typeof e.detail === undefined && this._reporter_data.name){
                this._reporter_data.name
            } else {
                this._reporter_data.name === null
            }

            //validate value of name:
            this.warnings.contact.nameWarning = validateReporterSection(this._reporter_data['name'], 'name')
        }

        if (fieldName === 'email'){
            //set value of email:
            if (typeof e.detail !== null) {
                this._reporter_data.email = e.detail;
            } else if (typeof e.detail === undefined && this._reporter_data.email){
                this._reporter_data.email
            } else {
                this._reporter_data.email === null
            }

            //validate value of email:
            this.warnings.contact.emailWarning = validateReporterSection(this._reporter_data['email'], 'email')
        }

        if (fieldName === 'phone'){
            //set value of phone:
            if (typeof e.detail !== null) {
                this._reporter_data.phone = e.detail;
            } else if (typeof e.detail === undefined && this._reporter_data.phone){
                this._reporter_data.phone
            } else {
                this._reporter_data.phone === null
            }

            //validate value of phone:
            this.warnings.contact.phoneWarning = validateReporterSection(this._reporter_data['phone'], 'phone')
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