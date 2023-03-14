import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state} from "lit/decorators.js";
import './date-input'
import './raise-select'
import './adjustment-input'
import './text-input'

interface AdjustmentData {
    date: string;
    typeOfRaise: string;
    startingWage: number;
    wageAdjustment: number;
    numberAffected: string;
    groupDescription: string;
}


@customElement('wage-event')
export class WageEvent extends LitElement{
    static styles = css`
        .wage-event{
            display: grid;
            grid-template-columns: 120px repeat(3, 140px) 1em;
            grid-template-areas: 'date type change starting delete'
                                 'affected description description description .';
            align-items: end;
            justify-content: space-evenly;
            margin-bottom: 0.5em;
            padding: 0.5em 0;
        }

        .special{
            grid-row-gap: 1em;
        }

        .wage-event span{
            align-self: start;
            padding: 0.2em;
            grid-column-end: -1;
            justify-self: end;
            cursor: pointer;
            padding-top: 0;
            font-size: 1.4em;
        }

        #date{
            grid-area: date;
        }

        #type{
            grid-area: type;
        }

        #starting{
            grid-area: starting;
        }

        #change{
            grid-area: change;
        }

        #delete{
            grid-area: delete;
        }

        #affected{
            grid-area: affected;
        }

        #description{
            grid-area: description;
        }

    `

    @property()
    raiseEvent!: 'REGULAR' | 'SPECIAL';

    @property()
    key!: number;

    @state()
    _adjustmentData!: AdjustmentData;

    constructor(){
        super()
        this._adjustmentData = {date: '', typeOfRaise: '% increase', startingWage: 0, wageAdjustment: 0, numberAffected: '', groupDescription: ''}
    }
    
    render() {
        return html`
            <div class=${`wage-event ${this.raiseEvent==='SPECIAL' ? 'special' : ''}`} key=${this.key} >
                <date-input type="date"
                            labelFrom="Effective Date"
                            id='date'
                            @retrieve-dates=${(e: {detail: {From: string}}) => this._getAdjustmentData('effective-date', e.detail.From)}>
                </date-input>

                <raise-select @retrieve-raiseType=${(e: {detail: string}) => this._getAdjustmentData('raise-type', e.detail)} id='type'></raise-select>

                ${this._adjustmentData.typeOfRaise !== '% increase' && this._adjustmentData.typeOfRaise !== '% decrease' ? html`
                    <text-input type=${'text'}
                        label=${this._adjustmentData.typeOfRaise === 'lump sum/bonus'? 'Starting annual $' : 'Starting hourly $'}
                        lightMode
                        class="startingWage"
                        id='starting'
                        @entered-input=${(e: {detail: string}) => this._getAdjustmentData('starting-wage', e.detail)}>
                    </text-input>
                `: nothing}
                
                <adjustment-input typeOfAdjustment=${this._adjustmentData.typeOfRaise} 
                                  id='change'
                                  @retrieve-change=${(e: {detail: string}) => this._getAdjustmentData('adjustment', e.detail)}>
                </adjustment-input>

                <span @click=${this._deleteRaise} id='delete'>&#10540;</span>

                ${this.raiseEvent === 'SPECIAL' ? 
                    html`
                        <text-input label="# affected"
                                    lightMode
                                    id='affected'
                                    @entered-input=${(e: {detail: string}) => this._getAdjustmentData('affected', e.detail)}>    
                        </text-input>
                        <text-input label="Describe group receiving this special increase/decrease"
                                    lightMode
                                    id='description'
                                    @entered-input=${(e: {detail: string}) => this._getAdjustmentData('description', e.detail)}>
                        </text-input>
                    `: nothing}
            </div>
        `
    }

    _deleteRaise = () => {
        this.remove();
    }

    _getAdjustmentData = (fieldName: string, value: string) => {
        switch(fieldName){
            case 'effective-date':
                this._adjustmentData = {...this._adjustmentData, date: value}
                break;
            case 'raise-type':
                this._adjustmentData = {...this._adjustmentData, typeOfRaise: value}
                break;
            case 'starting-wage':
                this._adjustmentData = {...this._adjustmentData, startingWage: Number(value)} 
                break;
            case 'adjustment':  
                this._adjustmentData = {...this._adjustmentData, wageAdjustment: Number(value)}
                break;
            case 'affected':
                this._adjustmentData = {...this._adjustmentData, numberAffected: value}
                break;
            case 'description':
                this._adjustmentData = {...this._adjustmentData, groupDescription: value}
                break;
        }

        this.dispatchEvent(new CustomEvent('wage-event', {
            detail: this._adjustmentData,
            composed: true,
            bubbles: true
        }))

    }

    
}

declare global {
    interface HTMLElementTagName {
        'wage-event': WageEvent;
    }
}