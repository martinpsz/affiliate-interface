import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import '../UnitList/unit-element'


@customElement('units-container')
export class UnitsContainer extends LitElement{
    static styles = css`
        .container{
            max-height: 55vh;
            overflow-y: auto;
        }

        .container::-webkit-scrollbar{
            width: 0.25em;
        }

        .container::-webkit-scrollbar-track{
            box-shadow: inset 0 0 6px rgba(var(--white), 0.25);
        }

        .container::-webkit-scrollbar-thumb{
            background: rgb(var(--green));
        }
    
        .shortList{
            max-height: 80vh;
        }

    `

    @state()
    _payload!: []

    @state()
    _unitSelected!: number

    @state()
    _initialUnitSelection!: number

    @property({type: Boolean})
    shortList= false;
    
    render() {
        const classes = {shortList: this.shortList}
        return html`
           <div class="container ${classMap(classes)}">
            ${this._payload.map(item => {
                    return html`
                        <unit-element @click=${this._unitSelection}
                                     @unit-list-selection=${this._getUnitSelection}
                                     .initialUnitSelection=${this._initialUnitSelection}
                                    .employer=${item['employer']}
                                    .agr_id=${item['agr_id']}
                                    .master=${item['master']}
                                    .state=${item['state']}
                                    .local=${item['local']}
                                    .council=${item['council']}
                                    .subunit=${item['subunit']}
                                    .status=${item['status']}
                                    .members=${item['number_of_members']}
                                    >
                        </unit-element>
                    `
            })}
           </div>
        `
    }

    _unitSelection = () => {
        let units = this.renderRoot?.querySelector('.container')?.querySelectorAll('unit-element') as NodeListOf<any>

        units?.forEach(unit => {
            if (this._unitSelected === unit['__agr_id']){
                unit.shadowRoot?.querySelector('div')?.classList.add('selected')
            } else {
                unit.shadowRoot?.querySelector('div')?.classList.remove('selected')
            }
        })
    }

    _getUnitSelection = (e: {detail: number}) => {
        this._unitSelected = this._unitSelected !== e.detail ? e.detail : this._unitSelected
    }
}

declare global {
    interface HTMLElementTagName {
        'units-container': UnitsContainer;
    }
}