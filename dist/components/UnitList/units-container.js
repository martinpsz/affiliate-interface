var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import '../UnitList/unit-element';
let UnitsContainer = class UnitsContainer extends LitElement {
    render() {
        return html `
           <div class="container">
            ${this.payload.map(item => {
            return html `
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
                    
                    `;
        })}
           </div>
        `;
    }
};
UnitsContainer.styles = css `
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
    
    `;
__decorate([
    property()
], UnitsContainer.prototype, "payload", void 0);
UnitsContainer = __decorate([
    customElement('units-container')
], UnitsContainer);
export { UnitsContainer };
