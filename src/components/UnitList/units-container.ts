import { LitElement, html, css} from "lit";
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

    @property({type: Boolean})
    shortList= false;

    render() {
        const classes = {shortList: this.shortList}
        let initialUnit = this._payload[0]['unit_id'];
        return html`
           <div class="container ${classMap(classes)}">
            ${this._payload.map(item => {
                    return html`
                        <unit-element @click=${this._unitSelection}
                                     .initialSelect=${initialUnit}
                                     @unit-list-selection=${this._getUnitSelection}
                                    .employer=${item['master'] && item['unit_name'] === "(master)" ? item['name'] : item['unit_name']}
                                    .unit_id=${item['unit_id']}
                                    .masterName=${item['name']}
                                    .master=${item['master']}
                                    .state=${item['state']}
                                    .local=${item['local']}
                                    .council=${item['council']}
                                    .subunit=${item['subunit']}
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
            if (this._unitSelected === unit['__unit_id']){
                unit.shadowRoot?.querySelector('div')?.classList.add('selected')
            } else {
                unit.shadowRoot?.querySelector('div')?.classList.remove('selected')
            }
        })   
    }

    _getUnitSelection = (e: {detail: number}) => {
        this._unitSelected = e.detail;
    }

}

declare global {
    interface HTMLElementTagName {
        'units-container': UnitsContainer;
    }
}