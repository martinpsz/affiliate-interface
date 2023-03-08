import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Reporter } from "../../interfaces/interfaces";
import "../form-header";
import { validateReporterSection } from "../../utilities/formValidator";

interface Errors {
    nameError: string | null,
    emailError: string | null,
    phoneError: string | null
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

    @state()
    private _input_error: Errors

    constructor(){
        super()
        this._input_error = {nameError: null, emailError: null, phoneError: null}
    }

    render() {
        let {name : fullName, phone, email} = this.contact || {}
        this._reporter_data = {...this.contact}

        return html`
            <form-header .title=${'Reporting for Unit'}></form-header>
            <div>
                <text-input lightMode 
                            type=${"text"}
                            label=${"Full Name:"} 
                            value=${fullName ? fullName : null} 
                            @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'name')}
                            warning=${this._input_error.nameError}></text-input>
                <text-input lightMode 
                            type=${"email"} 
                            label=${"Email:"} 
                            value=${email ? email : null} 
                            @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'email')}
                            warning=${this._input_error.emailError}></text-input>
                <text-input lightMode 
                            type=${"tel"} 
                            label=${"Phone:"} 
                            value=${phone ? phone : null} 
                            @entered-input=${(e: {detail: string}) => this._updateReporter(e, 'phone')}
                            warning=${this._input_error.phoneError}></text-input>
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
            this._input_error.nameError = validateReporterSection(this._reporter_data['name'], 'name')
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
            this._input_error.emailError = validateReporterSection(this._reporter_data['email'], 'email')
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
            this._input_error.phoneError = validateReporterSection(this._reporter_data['phone'], 'phone')
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