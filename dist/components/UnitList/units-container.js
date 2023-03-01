var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import '../UnitList/unit-element';
let UnitsContainer = class UnitsContainer extends LitElement {
    constructor() {
        super(...arguments);
        this.shortList = false;
        this._unitSelection = () => {
            var _a, _b;
            let units = (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.container')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('unit-element');
            units === null || units === void 0 ? void 0 : units.forEach(unit => {
                var _a, _b, _c, _d;
                if (this._unitSelected === unit['__agr_id']) {
                    (_b = (_a = unit.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('div')) === null || _b === void 0 ? void 0 : _b.classList.add('selected');
                }
                else {
                    (_d = (_c = unit.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('div')) === null || _d === void 0 ? void 0 : _d.classList.remove('selected');
                }
            });
        };
        this._getUnitSelection = (e) => {
            this._unitSelected = this._unitSelected !== e.detail ? e.detail : this._unitSelected;
        };
    }
    render() {
        const classes = { shortList: this.shortList };
        return html `
           <div class="container ${classMap(classes)}">
            ${this._payload.map(item => {
            return html `
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
                    `;
        })}
           </div>
        `;
    }
};
UnitsContainer.styles = css `
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

    `;
__decorate([
    state()
], UnitsContainer.prototype, "_payload", void 0);
__decorate([
    state()
], UnitsContainer.prototype, "_unitSelected", void 0);
__decorate([
    state()
], UnitsContainer.prototype, "_initialUnitSelection", void 0);
__decorate([
    property({ type: Boolean })
], UnitsContainer.prototype, "shortList", void 0);
UnitsContainer = __decorate([
    customElement('units-container')
], UnitsContainer);
export { UnitsContainer };
//# sourceMappingURL=units-container.js.map