var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/list-item';
let ListContainer = class ListContainer extends LitElement {
    constructor() {
        super(...arguments);
        this._payload = [];
    }
    render() {
        console.log(this._payload);
        return html `
            <div class="list-container">
                <div id="review-needed">
                    ${this._payload.filter(item => item['status'] === 'Needs Review').map(item => {
            return html ` 
                            <list-item .employer=${item['employer']}
                                       .master=${item['master']}
                                       .local=${item['local']}
                                       .council=${item['council']}
                                       .subunit=${item['subunit']}
                                       .members=${item['number of members']}
                                       .state=${'state'}></list-item>   
                        `;
        })}
                </div>
                <div id="submitted">
                    ${this._payload.filter(item => item['status'] === 'Submitted').map(item => {
            return html ` 
                            <list-item .employer=${item['employer']}></list-item>   
                        `;
        })}
                </div>
                <div id="inactive"> 
                    ${this._payload.filter(item => item['status'] === 'Inactive').map(item => {
            return html ` 
                            <list-item .employer=${item['employer']}></list-item>   
                        `;
        })}
                </div>



            </div>`;
    }
};
ListContainer.styles = css `
        .list-container{
            height: 60vh;
            overflow-y: scroll;
        }
    
    `;
__decorate([
    state()
], ListContainer.prototype, "_payload", void 0);
ListContainer = __decorate([
    customElement('list-container')
], ListContainer);
export { ListContainer };
