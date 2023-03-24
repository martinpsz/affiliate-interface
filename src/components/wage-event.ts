import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state} from "lit/decorators.js";
import './date-input'
import './raise-select'
import './adjustment-input'
import './text-input'
import { AdjustmentData} from "../interfaces/interfaces.js";

@customElement('wage-event')
export class WageEvent extends LitElement{
    static styles = css`
        .wage-event{
            display: grid;
            grid-template-columns: 120px 130px 130px 130px 1em;
            grid-template-areas: 'date type change starting delete'
                                 'affected description description description .';
            align-items: end;
            justify-content: space-between;
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
    _wage_data!: {}

    @state()
    _effective_date_of_inc!: string;

    @state()
    _increase_type!: string;

    @state()
    _percent_wage_inc!: string | null;

    @state()
    _dollar_lump_sum_inc!: string | null;

    @state()
    _dollar_lump_sum_base!:  string | null;

    @state()
    _cents_per_hour_base!:  string | null;

    @state()
    _cents_per_hour_inc!: string | null;

    @state()
    _number_affected!: number | string | null;

    @state()
    _group_description!: string | null;

    @state()
    _deleteRaiseKey!: number;


    constructor(){
        super()
        this._increase_type = '% increase'
    }
    
    render() {
        return html`
            <div class=${`wage-event ${this.raiseEvent==='SPECIAL' ? 'special' : ''}`} key=${this.key} >
                <date-input type="date"
                            labelFrom="Effective Date"
                            id='date'
                            @retrieve-dates=${(e: {detail: {From: string}}) => this._updateWageData('effective-date', e.detail.From)}>
                </date-input>

                <raise-select @retrieve-raiseType=${(e: {detail: string}) => this._updateWageData('increase-type', e.detail)} id='type'></raise-select>

                ${this._increase_type !== '% increase' && this._increase_type!== '% decrease' ? html`
                    <text-input type=${'text'}
                        label=${this._increase_type === 'lump sum/bonus'? 'Starting annual $' : 'Starting hourly $'}
                        lightMode
                        class="startingWage"
                        id='starting'
                        @entered-input=${(e: {detail: string}) => {
                            if(this._increase_type === 'lump sum/bonus'){
                                this._updateWageData('lump-sum-start', e.detail)
                            } else if (this._increase_type === 'hourly increase' || this._increase_type === 'hourly decrease') {
                                this._updateWageData('hourly-start', e.detail)
                            }
                        }}>
                    </text-input>
                `: nothing}
                
                <adjustment-input typeOfAdjustment=${this._increase_type} 
                                  id='change'
                                  @retrieve-change=${(e: {detail: string}) => {
                                    if(this._increase_type === '% increase' || this._increase_type === '% decrease'){
                                        this._updateWageData('percent_wage_inc', e.detail)
                                    } else if (this._increase_type === 'lump sum/bonus'){
                                        this._updateWageData('dollar_lump_sum_inc', e.detail)
                                    } else if (this._increase_type === 'hourly increase' || this._increase_type === 'hourly decrease'){
                                        this._updateWageData('cents_per_hour_inc', e.detail);
                                    }
                                  }}>
                </adjustment-input>

                <span @click=${this._deleteRaise} id='delete'>&#10540;</span>

                ${this.raiseEvent === 'SPECIAL' ? 
                    html`
                        <text-input label="# affected"
                                    lightMode
                                    id='affected'
                                    @entered-input=${(e: {detail: string}) => this._updateWageData('number_affected', e.detail)}>    
                        </text-input>
                        <text-input label="Describe group receiving this special increase/decrease"
                                    lightMode
                                    id='description'
                                    @entered-input=${(e: {detail: string}) => this._updateWageData('group_description', e.detail)}>
                        </text-input>
                    `: nothing}
            </div>
        `
    }

    _deleteRaise = () => {
        this.remove()
        this._deleteRaiseKey = this.key;
    }

    _updateWageData = (typeOfUpdate: string, value: string) => {
        //update values here for increase/decrease logic:
        if(typeOfUpdate === 'effective-date'){
            this._effective_date_of_inc = value;
        }

        if(typeOfUpdate === 'increase-type'){
            this._increase_type = value;
        }

        if(typeOfUpdate === 'lump-sum-start'){
            this._dollar_lump_sum_base = value;
        }

        if(typeOfUpdate === 'hourly-start'){
            this._cents_per_hour_base = value;
        }

        if(typeOfUpdate === 'percent_wage_inc'){
            this._percent_wage_inc = value;
        }

        if(typeOfUpdate === 'dollar_lump_sum_inc'){
            this._dollar_lump_sum_inc = value;
        }

        if(typeOfUpdate === 'cents_per_hour_inc'){
            this._cents_per_hour_inc = value;
        }

        if(typeOfUpdate === 'number_affected'){
            this._number_affected = value;
        }

        if(typeOfUpdate === 'group_description'){
            this._group_description = value;
        }

        
        let wageData  = {...this._wage_data, 
                              id: Number(this.key),
                              effective_date_of_inc: this._effective_date_of_inc,
                              increase_type: this._increase_type,

                              dollar_lump_sum_base: this._increase_type === 'lump sum/bonus' ? Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(Number(this._dollar_lump_sum_base)) : null,

                              cents_per_hour_base: this._increase_type === 'hourly increase' ? Intl.NumberFormat('en-us', {style: 'currency',
                              currency: 'USD'}).format(Number(this._cents_per_hour_base)) : this._increase_type === 'hourly decrease' ? Intl.NumberFormat('en-us', {style: 'currency',
                              currency: 'USD'}).format(Number(this._cents_per_hour_base)) : null,

                              percent_wage_inc: this._increase_type === '% decrease' ?
                              -(this._percent_wage_inc!) : this._increase_type === '% increase' ? Number(this._percent_wage_inc)  : null,

                              dollar_lump_sum_inc: this._increase_type === 'lump sum/bonus' ? Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(Number(this._dollar_lump_sum_inc)) : null,

                              cents_per_hour_inc: this._increase_type === 'hourly increase' ? Intl.NumberFormat('en-us', {style: 'currency',
                              currency: 'USD'}).format(Number(this._cents_per_hour_inc)) : this._increase_type === 'hourly decrease' ? Intl.NumberFormat('en-us', {style: 'currency',
                              currency: 'USD'}).format(-Number(this._cents_per_hour_inc)): null,


                              number_affected: this._number_affected,
                              group_description: this._group_description}

        
        this.dispatchEvent(new CustomEvent('wage-event', {
            detail: {wageData: wageData, delRaise: this._deleteRaiseKey},
            bubbles: true,
            composed: true
        }))
        

    }

}

declare global {
    interface HTMLElementTagName {
        'wage-event': WageEvent;
    }
}