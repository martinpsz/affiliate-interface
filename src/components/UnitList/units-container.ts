import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import {repeat} from 'lit/directives/repeat.js';
import '../UnitList/unit-element'

@customElement('units-container')
export class UnitsContainer extends LitElement{
    static styles = css`
        .container{
            max-height: 57.5vh;
            overflow-y: scroll;
            margin: 1em 0;
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
    
    `

    @property()
    payload!: []

    render() {
        return html`
           <div class="container">
            ${this.payload.map(item => {
                    return html`
                        <unit-element
                                    .employer=${item['employer']}
                                    .agr_id=${item['agr_id']}
                                    .master=${item['master']}
                                    .state=${item['state']}
                                    .local=${item['local']}
                                    .council=${item['council']}
                                    .subunit=${item['subunit']}
                                    .status=${item['status']}
                                    >
                        </unit-element>
                    
                    `
            })}
           </div>
        `
    }


}

declare global {
    interface HTMLElementTagName {
        'units-container': UnitsContainer;
    }
}