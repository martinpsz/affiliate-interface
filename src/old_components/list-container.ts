import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import './list-item';

@customElement('list-container')
export class ListContainer extends LitElement {
    static styles = css`
        .list-container{
            height: 57.5vh;
            overflow-y: scroll;
            padding: 0 0.25em 0 0;
            margin: 0;
        }

        .list-container::-webkit-scrollbar{
            width: 0.25em;
        }

        .list-container::-webkit-scrollbar-track{
            box-shadow: inset 0 0 6px rgba(var(--white), 0.25);
        }

        .list-container::-webkit-scrollbar-thumb{
            background: rgb(var(--green));
        }

        #review-needed{
            background: rgb(var(--red));
            padding: 0.25em 0;
        }
    
    `

    @state()
    _payload = []


    render() {
        return html`
            <div class="list-container">
                <div id="review-needed">
                    ${this._payload.filter(item => item['status'] === 'Needs Review').map(item => {
                        return html` 
                            <list-item 
                                       .unitId=${item['agr_id']}
                                       .employer=${item['employer']}
                                       .master=${item['master']}
                                       .local=${item['local']}
                                       .council=${item['council']}
                                       .subunit=${item['subunit']}
                                       .members=${item['number_of_members']}
                                       .state=${item['state']}></list-item>   
                        `
                    })}
                </div>
                <div id="submitted">
                    ${this._payload.filter(item => item['status'] === 'Submitted').map(item => {
                        return html` 
                            <list-item .employer=${item['employer']}></list-item>   
                        `
                    })}
                </div>
                <div id="inactive"> 
                    ${this._payload.filter(item => item['status'] === 'Inactive').map(item => {
                        return html` 
                            <list-item .employer=${item['employer']}></list-item>   
                        `
                    })}
                </div>



            </div>`
    }
}

declare global {
    interface HTMLElementTagName {
        'list-container': ListContainer;
    }
}