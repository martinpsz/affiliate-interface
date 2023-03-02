import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import '../form-header';
import '../radio-input';
import '../custom-button';
import '../date-input';
import { Prompts } from "../../interfaces/interfaces";

interface DateRange {
    effectiveFrom: string | undefined;
    effectiveTo: string | undefined;
}

interface EventType {
    detail: string | number | DateRange;
}

@customElement('unit-status-section')
export class UnitStatusSection extends LitElement{
    static styles = css`
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
    `

    @property()
    status_prompts: Prompts;

    @property()
    memberNumber: number | undefined;

    @property()
    effectiveFrom: string | undefined;

    @property()
    effectiveTo: string | undefined;

    @property()
    dateRange!: DateRange;

    @state()
    private _activeStatus: string;

    @state()
    private _bargainingStatus: string;

    
    constructor(){
        super()

        this.status_prompts = {
            UnitActivePrompt: 'Is the unit active in the period 8/1/22-7/31/23?',
            UnitActiveOptions: ['Yes', 'No'],
            UnitActiveDefault: 'Yes',
            UnitBargainingPrompt: 'Is the unit in bargaining in the period 8/1/22-7/31/23?',
            UnitBargainingOptions: ['Yes', 'No'],
            UnitBargainingDefault: 'No'
        } 

        this._activeStatus = this.status_prompts['UnitActiveDefault']
        this._bargainingStatus = this.status_prompts['UnitBargainingDefault']
    }

    _submit_button = () => {
        return html`<custom-button warning 
                                   buttonText=${"Save Progress"} 
                                  .icon=${html`<iconify-icon icon="ant-design:cloud-upload-outlined" 
                                   style="color: white;" width="24" height="24">
                                               </iconify-icon>`}>
                    </custom-button>`
        }

    _bargainStatusHandler = () => {
        if (this._bargainingStatus === 'Yes'){
            return html`
                <div id="unit-in-bargaining">
                    <text-input id="member-num" lightMode 
                                type=${"number"} 
                                label=${"Number of Members:"} 
                                value=${this.memberNumber} 
                                @entered-input=${(e: EventType) => this._getInputValue(e, 'MemberCount')}></text-input>
                    ${this._submit_button()}
                </div>
            `
        }

        if (this._bargainingStatus === 'No'){
            return html`
                <div id="unit-section-info">
                    <text-input lightMode 
                                type=${"number"} 
                                label=${"Number of Members:"} 
                                value=${this.memberNumber}
                                @entered-input=${(e: EventType) => this._getInputValue(e, 'MemberCount')}></text-input>
                    <date-input 
                                .type=${'date-range'}
                                .labelFrom=${'CBA Effective From:'}
                                .labelTo=${'CBA Effective To:'}
                                .valueFrom=${this.effectiveFrom ? this.effectiveFrom : ''}
                                .valueTo=${this.effectiveTo? this.effectiveTo: ''}
                                @retrieve-dates=${(e: EventType) => this._getInputValue(e, 'DateRange')}
                                >
                    </date-input>
                    <text-input lightmode .type=${"file"} label=${"Upload CBA:"}></text-input>
                </div>
            `
        }

    }
    
    render() {
        return html`
            <form-header title=${'Unit Status'}></form-header>
            <div id="unit-section">
            <radio-input prompt=${this.status_prompts.UnitActivePrompt} 
                        .labels=${this.status_prompts.UnitActiveOptions} 
                         defaultCheck=${this.status_prompts.UnitActiveDefault}
                         @retrieve-selection=${(e: EventType) => this._getInputValue(e, 'ActiveStatus')}
                         class="prompt">
            </radio-input>
            ${this._activeStatus === 'No' ? 
                this._submit_button() :
                html`<radio-input prompt=${this.status_prompts.UnitBargainingPrompt} 
                                  .labels=${this.status_prompts.UnitBargainingOptions} 
                                  defaultCheck=${this._bargainingStatus ? this._bargainingStatus : this.status_prompts.UnitBargainingDefault}
                                  @retrieve-selection=${(e: EventType) => this._getInputValue(e, 'BargainingStatus')}>
                    </radio-input>
                    ${this._bargainStatusHandler()}
                    `}
           
            </div>
        `}

    _getInputValue = (e: EventType, label:string) => {
        switch(label){
            case 'ActiveStatus':
                this._activeStatus = e.detail as string;
                break;
            case 'BargainingStatus':
                this._bargainingStatus = e.detail as string;
                break;
            case 'MemberCount':
                this.memberNumber = e.detail as number;
                break;
            case 'DateRange':
                this.dateRange = e.detail as DateRange;
                break;
            default:
                return true;
        }

        this.dispatchEvent(new CustomEvent('unit-status-data', {
            detail: {'activeStatus': this._activeStatus, 
                     'bargainStatus': this._bargainingStatus,
                     'memberCount': this.memberNumber,
                     'cbaEffectiveDates': this.dateRange},
            composed: true,
            bubbles: true,
        }))
    } 
    
}

//Add support for grabbing upload to CBA field.
//Add checks to date fields and present warning if dates are out of range.
//Add debounce on date fields and inputs.

declare global {
    interface HTMLElementTagName {
        'unit-status-section': UnitStatusSection;
    }
}