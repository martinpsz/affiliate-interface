var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import '../form-header';
import '../radio-input';
import '../custom-button';
import '../date-input';
let UnitStatusSection = class UnitStatusSection extends LitElement {
    constructor() {
        super();
        this._submit_button = () => {
            return html `<custom-button warning 
                                   buttonText=${"Save Progress"} 
                                  .icon=${html `<iconify-icon icon="ant-design:cloud-upload-outlined" 
                                   style="color: white;" width="24" height="24">
                                               </iconify-icon>`}>
                    </custom-button>`;
        };
        this._bargainStatusHandler = () => {
            if (this._bargainingStatus === 'Yes') {
                return html `
                <div id="unit-in-bargaining">
                    <text-input id="member-num" lightMode 
                                type=${"number"} 
                                label=${"Number of Members:"} 
                                value=${this.memberNumber} 
                                @entered-input=${(e) => this._getInputValue(e, 'MemberCount')}></text-input>
                    ${this._submit_button()}
                </div>
            `;
            }
            if (this._bargainingStatus === 'No') {
                return html `
                <div id="unit-section-info">
                    <text-input lightMode 
                                type=${"number"} 
                                label=${"Number of Members:"} 
                                value=${this.memberNumber}
                                @entered-input=${(e) => this._getInputValue(e, 'MemberCount')}></text-input>
                    <date-input 
                                .type=${'date-range'}
                                .labelFrom=${'CBA Effective From:'}
                                .labelTo=${'CBA Effective To:'}
                                .valueFrom=${this.effectiveFrom ? this.effectiveFrom : ''}
                                .valueTo=${this.effectiveTo ? this.effectiveTo : ''}
                                @retrieve-dates=${(e) => this._getInputValue(e, 'DateRange')}
                                >
                    </date-input>
                    <text-input lightmode .type=${"file"} label=${"Upload CBA:"}></text-input>
                </div>
            `;
            }
        };
        this._getInputValue = (e, label) => {
            switch (label) {
                case 'ActiveStatus':
                    this._activeStatus = e.detail;
                    break;
                case 'BargainingStatus':
                    this._bargainingStatus = e.detail;
                    break;
                case 'MemberCount':
                    this.memberNumber = e.detail;
                    break;
                case 'DateRange':
                    this.dateRange = e.detail;
                    break;
                default:
                    return true;
            }
            this.dispatchEvent(new CustomEvent('unit-status-data', {
                detail: { 'activeStatus': this._activeStatus,
                    'bargainStatus': this._bargainingStatus,
                    'memberCount': this.memberNumber,
                    'cbaEffectiveDates': this.dateRange },
                composed: true,
                bubbles: true,
            }));
        };
        this.status_prompts = {
            UnitActivePrompt: 'Is the unit active in the period 8/1/22-7/31/23?',
            UnitActiveOptions: ['Yes', 'No'],
            UnitActiveDefault: 'Yes',
            UnitBargainingPrompt: 'Is the unit in bargaining in the period 8/1/22-7/31/23?',
            UnitBargainingOptions: ['Yes', 'No'],
            UnitBargainingDefault: 'No'
        };
        this._activeStatus = this.status_prompts['UnitActiveDefault'];
        this._bargainingStatus = this.status_prompts['UnitBargainingDefault'];
    }
    render() {
        return html `
            <form-header title=${'Unit Status'}></form-header>
            <div id="unit-section">
            <radio-input prompt=${this.status_prompts.UnitActivePrompt} 
                        .labels=${this.status_prompts.UnitActiveOptions} 
                         defaultCheck=${this.status_prompts.UnitActiveDefault}
                         @retrieve-selection=${(e) => this._getInputValue(e, 'ActiveStatus')}
                         class="prompt">
            </radio-input>
            ${this._activeStatus === 'No' ?
            this._submit_button() :
            html `<radio-input prompt=${this.status_prompts.UnitBargainingPrompt} 
                                  .labels=${this.status_prompts.UnitBargainingOptions} 
                                  defaultCheck=${this._bargainingStatus ? this._bargainingStatus : this.status_prompts.UnitBargainingDefault}
                                  @retrieve-selection=${(e) => this._getInputValue(e, 'BargainingStatus')}>
                    </radio-input>
                    ${this._bargainStatusHandler()}
                    `}
           
            </div>
        `;
    }
};
UnitStatusSection.styles = css `
        #unit-section{
            display: flex;
            flex-direction: column;
            row-gap: 1em;
        }

        #unit-section-info{
            display: grid;
            grid-template-columns: 140px 280px 240px;
            grid-column-gap: 2em;
            align-items: end;
        }

        #unit-in-bargaining{
            display: flex;
            justify-content: space-between;
        }

        #unit-in-bargaining custom-button{
            margin-top: 1em;
        }
    `;
__decorate([
    property()
], UnitStatusSection.prototype, "status_prompts", void 0);
__decorate([
    property()
], UnitStatusSection.prototype, "memberNumber", void 0);
__decorate([
    property()
], UnitStatusSection.prototype, "effectiveFrom", void 0);
__decorate([
    property()
], UnitStatusSection.prototype, "effectiveTo", void 0);
__decorate([
    property()
], UnitStatusSection.prototype, "dateRange", void 0);
__decorate([
    state()
], UnitStatusSection.prototype, "_activeStatus", void 0);
__decorate([
    state()
], UnitStatusSection.prototype, "_bargainingStatus", void 0);
UnitStatusSection = __decorate([
    customElement('unit-status-section')
], UnitStatusSection);
export { UnitStatusSection };
