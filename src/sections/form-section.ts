import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/form-header';
import '../components/radio-input'

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

    `
    @state()
    _unitData!: Unit

    render() {
        //console.log(this._unitData)
        return html`
            <form id="unit-form">
                <radio-input prompt="Is the unit active?" 
                             .labels=${['Yes', 'No']} 
                             .defaultCheck=${'Yes'}></radio-input>
            </form>
        `
    }
}

declare global {
    interface HTMLElementTagName {
        'form-section': FormSection;
    }
}
