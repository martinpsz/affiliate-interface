import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Employer } from "../../interfaces/interfaces.js";

interface Warnings {
    employer: string | null,
    local: string | null,
    subunit: string | null,
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
    employer!: string | undefined;

    @property()
    local!: number | undefined;

    @property()
    subunit!: number | undefined;

    @property()
    warning!: Warnings;

    @state()
    private _employer_data!: Employer;

    constructor(){
        super()
        this.warning = {employer: null, local: null, subunit: null}
    }

    render() {
        
        return html`
            <div>
                <text-input lightMode .type=${"text"} label=${"Employer:"} .value=${this.employer ? this.employer : null} @entered-input=${(e: {detail: string}) => this._updateEmployer(e, 'employer')} warning=${this.warning.employer}></text-input>
                <text-input lightMode .type=${"number"} label=${"Local:"} .value=${this.local ? this.local : ''} @entered-input=${(e: {detail: number}) => this._updateEmployer(e, 'local')} warning=${this.warning.local}></text-input>
                <text-input lightMode .type=${"text"} label=${"Subunit:"} .value=${this.subunit ? this.subunit : ''} @entered-input=${(e: {detail: string | number | null}) => this._updateEmployer(e, 'subunit')} warning=${this.warning.subunit}></text-input>
            </div>
        `
    }


    _updateEmployer = (e: {detail: string | number | null}, fieldName: string) => {
        if (fieldName === 'employer'){
            this._employer_data['employer'] = e.detail ? this._employer_data.employer: this.employer as string;
        }

        if (fieldName === 'local'){
            this._employer_data['local'] = e.detail ? this._employer_data.local : this.local as number;
        }

        if (fieldName === 'subunit'){
            this._employer_data['subunit'] = e.detail ? this._employer_data.subunit : this.subunit as number | string;
        }

        
        this.dispatchEvent(new CustomEvent('employer-field-values', {
            detail: this._employer_data,
            composed: true,
            bubbles: true
        }))

        console.log(
            'Sending the following data', this._employer_data
        )
    }
}

declare global {
    interface HTMLElementTagName {
        'employer-section': EmployerSection;
    }
}