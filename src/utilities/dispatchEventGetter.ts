
export function getInputValue(event: {detail: string | undefined}, stateVariable?:string){
    stateVariable = event.detail ? event.detail : '';   
   
}