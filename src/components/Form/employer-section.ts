import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { validateEmployerSection } from "../../utilities/formValidation.js";

interface Warnings {
    employerError: string | null,
}

@customElement('employer-section')
export class EmployerSection extends LitElement{
    static styles = css`
        div{
            display: grid;
            grid-template-columns: 1fr 10% 10%;
            grid-column-gap: 0.5em;
        }
    `
    
    @property()
    employer!: string | null;

    @property()
    local!: number | null;

    @property()
    subunit!: number | string | null;

    @state()
    _input_error!: Warnings;

    constructor(){
        super()
        this._input_error = {employerError: null}
    }

    render() {
        return html`
            <div>
                <text-input lightMode .type=${"text"} label=${"Employer:"} value=${this.employer} @entered-input=${(e: {detail: string}) => this._updateEmployer(e, 'employer')} warning=${this._input_error.employerError}></text-input>

                <text-input lightMode .type=${"number"} label=${"Local:"} value=${this.local} @entered-input=${(e: {detail: number}) => this._updateEmployer(e, 'local')}></text-input>

                <text-input lightMode .type=${"text"} label=${"Subunit:"} value=${this.subunit} @entered-input=${(e: {detail: string | number | null}) => this._updateEmployer(e, 'subunit')}></text-input>
            </div>
        `
    }


    _updateEmployer = (e: {detail: string | number | null}, fieldName: string) => {
        console.log(e.detail)
        if (fieldName === 'employer'){
            /*if(e.detail !== null){
                this.employer = e.detail as string
            } else if (typeof e.detail === undefined && this.employer){
                this.employer
            } else {
                this.employer = null;
            }*/
            this.employer = e.detail as string;

            
            this._input_error.employerError = validateEmployerSection(this.employer, 'employer')


        }

        if (fieldName === 'local'){
            /*
            if(e.detail !== null){
                this.local = e.detail as number
            } else if (typeof e.detail === undefined && this.local){
                this.local
            } else {
                this.local = null;
            }*/

            this.local = e.detail as number;
            
        }

        if (fieldName === 'subunit'){
            /* if(e.detail !== null){
                this.subunit = e.detail as string | number;
            } else if (typeof e.detail === undefined && this.subunit){
                this.subunit;
            } else {
                this.subunit = null;
            }*/

            this.subunit = e.detail as number | string;
        }

        
        this.dispatchEvent(new CustomEvent('employer-field-values', {
            detail: {employer: this.employer, local: this.local, subunit: this.subunit},
            composed: true,
            bubbles: true
        }))

        
    }
}

declare global {
    interface HTMLElementTagName {
        'employer-section': EmployerSection;
    }
}