import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('radio-toggle')
export class RadioToggle extends LitElement{
    static styles = css`
        display: flex;


        .vertical {
            flex-direction: column;
        }
    
    `

    @property()
    prompt: String
    labels!: []
    checked: String
    columnDirection!: Boolean;

    constructor() {
        super();
        this.columnDirection = false;
        this.prompt = '';
        this.checked = 'All';
    }

    render() {
        console.log(this.labels)
        return html`
            <div class = ${this.columnDirection ? "vertical" : ''}>
                <span>${this.prompt}</span>
                ${this.labels.map(label => html`
                    <input id=${label} type="radio" ${label === this.checked && 'checked'} name="radio-options"/>
                    <label for=${label}>${label}</label>
                `)}
            </div>

        `
    }
}

declare global {
    interface HTMLElementTagName {
        'radio-toggle': RadioToggle;
    }
}