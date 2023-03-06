import { Reporter } from "../interfaces/interfaces";


export const formValidator = (data: Reporter, formSection: string) => {
    let errors = {nameWarning: '', emailWarning: '', phoneWarning: ''}
    if(formSection === 'reporter-section' && data){
        //checks for blank fields:
        errors.nameWarning = data.name?.length === 0 ? 'This is a required field': ''
        errors.emailWarning = data.email?.length === 0 ? 'This is a required field': ''
        errors.phoneWarning = data.phone?.length ===  0 ? 'This is a required field': ''
    }

    return errors
}
