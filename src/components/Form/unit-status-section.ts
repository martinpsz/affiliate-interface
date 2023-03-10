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
    detail: string | number | DateRange | {};
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
            grid-template-columns: 160px 320px 256px;
            justify-content: space-between;
            align-items: end;
        }

        custom-button{
            align-self: end;
        }

        date-input{
            justify-self: center;
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

    @property()
    fileData!: {name: string, size: number, type: string};

    @state()
    private _activeStatus: string;

    @state()
    private _bargainingStatus: string;

    
    constructor(){
        super()

        this.status_prompts = {
            UnitActivePrompt: 'Has this unit been deactivated or decertified?',
            UnitActiveOptions: ['Yes', 'No'],
            UnitActiveDefault: 'Yes',
            UnitBargainingPrompt: 'Is the unit still bargaining for any part of the 8/1/2022-7/31/2023 period?',
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
                <div id="unit-section-info">
                    <text-input id="member-num" lightMode 
                                type=${"number"} 
                                label=${"Number of Members:"} 
                                value=${this.memberNumber} 
                                @entered-input=${(e: EventType) => this._getInputValue(e, 'MemberCount')}></text-input>
                    <date-input 
                                type=${'date-range'}
                                labelFrom=${'Previous CBA Start:'}
                                labelTo=${'Previous CBA End:'}
                                .valueFrom=${this.effectiveFrom ? this.effectiveFrom : ''}
                                .valueTo=${this.effectiveTo ? this.effectiveTo: ''}
                                @retrieve-dates=${(e: EventType) => this._getInputValue(e, 'DateRange')}
                                >
                    </date-input>
                    <text-input lightmode 
                                type=${"file"} 
                                label=${"Upload Expired CBA (Word doc/PDF) :"}
                                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                                @file-upload=${(e: EventType) => this._getInputValue(e, 'File')}></text-input>
                </div>
                ${this._submit_button()}
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
                                type=${'date-range'}
                                labelFrom=${'CBA Effective From:'}
                                labelTo=${'CBA Effective To:'}
                                .valueFrom=${this.effectiveFrom ? this.effectiveFrom : ''}
                                .valueTo=${this.effectiveTo ? this.effectiveTo: ''}
                                @retrieve-dates=${(e: EventType) => this._getInputValue(e, 'DateRange')}
                                >
                    </date-input>
                    <text-input lightmode 
                                type=${"file"} 
                                label=${"Upload CBA (Word doc/PDF):"}
                                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                                @file-upload=${(e: EventType) => this._getInputValue(e, 'File')}></text-input>
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
            case 'File':
                this.fileData = e.detail as File;
                
                break;
            default:
                return true;
        }

        this.dispatchEvent(new CustomEvent('unit-status-values', {
            detail: {'activeStatus': this._activeStatus, 
                     'bargainStatus': this._bargainingStatus,
                     'memberCount': this.memberNumber,
                     'cbaEffectiveDates': this.dateRange,
                     'fileUpload': this.fileData},
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