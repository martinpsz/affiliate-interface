import {html} from 'lit';

type TypeOfAdjustment = 'PCT INCREASE' | 'PCT DECREASE' | 'AMT INCREASE' | 'AMT DECREASE'

export const InputTextElement = (type: string, label: string, _fetchInput: Function) => {
    return html`
        <label>${label}:</label>
        <input type=${type} @input=${_fetchInput}/>
    `
}

export const InputFileElement = (type: string, label: string, _fetchFile: Function) => {
    return html`
        <label>${label}:</label>
        <label class="file-input">
            Select File
            <input type=${type} @change=${_fetchFile}/>
        </label>
   `
}

const _increaseHandler = (typeOfAdjustment: TypeOfAdjustment) => {
    if (typeOfAdjustment === 'PCT INCREASE' || typeOfAdjustment === 'PCT DECREASE'){
        return html`
                    <div class=${typeOfAdjustment === 'PCT INCREASE' ? 
                        'pct-increase': 'pct-decrease'}>
                        <input type='number'/>
                        <span>%</span>
                    </div>
                   `
    } else {
        return html`
                    <div class=${typeOfAdjustment === 'AMT INCREASE' ? 
                        'amt-increase': 'amt-decrease'}>
                        <span>%</span>
                        <input type='number'/>
                    </div>
        
                   `
    }
}

export const InputTextElementWithSpan = (type='adjustment', typeOfAdjustment: TypeOfAdjustment, label: string, _fetchInput: Function) => {
    return html`
        <label>${label}</label>
        ${_increaseHandler(typeOfAdjustment)}
    
    `
}




