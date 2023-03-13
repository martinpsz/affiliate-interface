import { LitElement, html, css, nothing } from "lit";
import { customElement, property} from "lit/decorators.js";
import './date-input'
import './raise-select'
import './adjustment-input'
import './text-input'

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
            //border: 1px solid rgba(var(--black), 0.25);
            //border-radius: 0.25em;
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
    raiseType!: string

    @property()
    raiseEvent!: 'REGULAR' | 'SPECIAL'

    @property()
    key!: number;

    constructor(){
        super()

        this.raiseType = '% increase'
    }
    
    
    render() {
        return html`
            <div class=${`wage-event ${this.raiseEvent==='SPECIAL' ? 'special' : ''}`} key=${this.key} >
                <date-input type="date"
                            labelFrom="Effective Date"
                            id='date'>
                </date-input>

                <raise-select @retrieve-raiseType=${this._setRaiseType} id='type'></raise-select>

                ${this.raiseType !== '% increase' && this.raiseType !== '% decrease' ? html`
                    <text-input type=${'text'}
                        label=${this.raiseType === 'lump sum/bonus'? 'Starting annual $' : 'Starting hourly $'}
                        lightMode
                        class="startingWage"
                        id='starting'>
                    </text-input>
                `: nothing}
                
                <adjustment-input typeOfAdjustment=${this.raiseType} id='change'></adjustment-input>

                <span @click=${this._deleteRaise} id='delete'>&#10540;</span>

                ${this.raiseEvent === 'SPECIAL' ? 
                    html`
                        <text-input label="# affected"
                                    lightMode
                                    id='affected'>    
                        </text-input>
                        <text-input label="Describe group receiving this special increase/decrease"
                                    lightMode
                                    id='description'>
                        </text-input>
                    `: nothing}
            </div>
        `
    }

    _setRaiseType = (e: {detail: string}) => {
        this.raiseType = e.detail
    }

    _deleteRaise = () => {
        this.remove()
    }
}

declare global {
    interface HTMLElementTagName {
        'wage-event': WageEvent;
    }
}