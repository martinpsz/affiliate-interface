import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/form-header';
import '../components/radio-input';
import '../components/custom-button';
import '../components/text-input';
import '../components/date-input';

interface Unit {
    employer: string,
    local: number,
}
@customElement('form-section')
export class FormSection extends LitElement {
    static styles = css`
        form{
            padding: 1em;
        }

        #employerID{
            display: grid;
            grid-template-columns: 1fr 15%;
            grid-column-gap: 0.5em;
        }

        #reporter{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 0.5em;
        }

    `
    @state()
    _unitData!: Unit

    render() {
        return html`
            <form id="unit-form">
                <div id="employerID">
                    <text-input lightMode .type=${"text"} label=${"Unit/Employer:"}></text-input>
                    <text-input lightMode .type=${"number"} label=${"Local:"}></text-input>
                </div>
                <form-header .title=${'Reporting for Unit'}></form-header>
                <div id="reporter">
                    <text-input lightMode .type=${"text"} label=${"Full Name:"}></text-input>
                    <text-input lightMode .type=${"email"} label=${"Email:"}></text-input>
                    <text-input lightMode .type=${"tel"} label=${"Phone:"}></text-input>
                </div>
                <form-header .title=${'Unit Status'}></form-header>
                    <radio-input .prompt=${'Is the unit active in the period 8/1/22-7/31/23?:'} .labels=${['Yes', 'No']} defaultCheck=${'Yes'}></radio-input>
            </form>
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'form-section': FormSection;
    }
}
