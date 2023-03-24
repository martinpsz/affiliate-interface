import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import '../form-header';
import '../radio-input';
import '../custom-button';
import '../date-input';
import COPY from '../../affiliate-interface-copy.json' assert {type: "json"}
 

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
            grid-template-columns: 150px 2fr 1fr;
            align-items: end;
        }

        @media (min-width: 1200px){
            #unit-section-info{
                flex-wrap: nowrap;
                justify-content: space-between;
            }
        }

        #unit-section-info .file{
            align-self: center;
        }

        custom-button{
            align-self: end;
        }

        date-input{
            justify-self: center;
        }
    `

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
    private _activeStatus!: string;

    @state()
    private _wageStatus!: string;

    @state()
    private _bargainingStatus!: string;

    
    constructor(){
        super()

        this._activeStatus = 'No';
    }

    _submit_button = () => {
        return html`<custom-button warning 
                                   buttonText=${"Save Report"} 
                                  .icon=${html`<iconify-icon icon="ant-design:cloud-upload-outlined" 
                                   style="color: white;" width="24" height="24">
                                               </iconify-icon>`}>
                    </custom-button>`
    }

    _unit_meta = () => {
        return html`
        <div id="unit-section-info">
            <text-input id="member-num" lightMode 
                        type=${"number"} 
                        label=${COPY.UnitStatus[0]['Number-of-members']} 
                        value=${this.memberNumber} 
                        @entered-input=${(e: EventType) => this._getInputValue(e, 'MemberCount')}></text-input>
            <date-input 
                        id="date-range"
                        type=${'date-range'}
                        labelFrom=${COPY.UnitStatus[0]['CBA-Start']}
                        labelTo=${COPY.UnitStatus[0]['CBA-End']}
                        .valueFrom=${this.effectiveFrom ? this.effectiveFrom : ''}
                        .valueTo=${this.effectiveTo ? this.effectiveTo: ''}
                        @retrieve-dates=${(e: EventType) => this._getInputValue(e, 'DateRange')}
                        >
            </date-input>
            <text-input lightmode 
                        class="file"
                        type=${"file"} 
                        id="file"
                        label=${COPY.UnitStatus[0]['CBA-Upload']}
                        accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                        @file-upload=${(e: EventType) => this._getInputValue(e, 'File')}></text-input>
        </div>
        `
    }

    render() {
        return html`
            <form-header title=${COPY.UnitStatus[0]['Section-header']}></form-header>
            <div id="unit-section">
            <radio-input prompt=${COPY.UnitStatus[0]['Active-question']} 
                        .labels=${['Yes', 'No']} 
                         defaultCheck=${'No'}
                         @retrieve-selection=${(e: EventType) => this._getInputValue(e, 'ActiveStatus')}>
            </radio-input>
            ${this._activeStatus === 'Yes' ?
                nothing 
                : html`
                    ${this._unit_meta()}
                    <radio-input prompt=${COPY.UnitStatus[0]['Wage-question']}
                                 .labels=${['Yes', 'No']}
                                 @retrieve-selection=${(e: EventType) => this._getInputValue(e, 'WageStatus')}>
                    </radio-input>

                    ${this._wageStatus === 'No' ?
                         html`
                            <radio-input prompt=${COPY.UnitStatus[0]['Bargaining-question']}
                            .labels=${['Yes', 'No']}
                            @retrieve-selection=${(e: EventType) => this._getInputValue(e, 'BargainingStatus')}>
                            </radio-input>
                        
                        ` : nothing}     
                `
            }
            </div>
        `}

    _getInputValue = (e: EventType, label:string) => {
        switch(label){
            case 'ActiveStatus':
                this._activeStatus = e.detail as string;
                break;
            case 'WageStatus':
                this._wageStatus = e.detail as string;
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
                     'wageStatus': this._wageStatus,
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