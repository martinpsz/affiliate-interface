import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '../components/list-item';

@customElement('list-container')
export class ListContainer extends LitElement {
    static styles = css`
        .list-container{
            height: 60vh;
            overflow-y: scroll;
        }
    
    `

    @state()
    _payload = []


    render() {
        console.log(this._payload)
        return html`
            <div class="list-container">
                <div id="review-needed">
                    ${this._payload.filter(item => item['status'] === 'Needs Review').map(item => {
                        return html` 
                            <list-item .employer=${item['employer']}
                                       .master=${item['master']}
                                       .local=${item['local']}
                                       .council=${item['council']}
                                       .subunit=${item['subunit']}
                                       .members=${item['number of members']}
                                       .state=${'state'}></list-item>   
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