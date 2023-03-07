import { Reporter } from "../interfaces/interfaces";


export const formValidator = (data: Reporter, formSection: string) => {
    let errors = {nameWarning: '', emailWarning: '', phoneWarning: ''}
    if(formSection === 'reporter-section' && data){

        //checks for blank fields:
        errors.nameWarning = data.name?.length === 0 ? 'This is a required field': ''
        errors.emailWarning = data.email?.length === 0 ? 'This is a required field': ''
        errors.phoneWarning = data.phone?.length ===  0 ? 'This is a required field': ''

        //check for adequate number of phone digits:
        const dateRegex = new RegExp('/\d{9}/', 'g')
        errors.phoneWarning = data.phone?.replace(/\D+/, '').match(dateRegex) ? '' : 'Please enter a valid phone'
    }

    return errors
}


export const validateReporterSection = (fieldValue: string | null, fieldLabel: string) : string | null => {
    let warning: string | null = '';

    //check for missing field values:
    warning = fieldValue === '' ? 'This is a required field' : null;

    //check for proper email value:
    if (fieldLabel === 'email'){
        //const emailRegex = new RegExp('/[a-zA-Z0-9\.\_]+@/', 'gi')
        //warning = !fieldValue?.match(emailRegex) ? 'Please enter a valid email address' : null;
    }

    //check for valid phone number:
    if (fieldLabel === 'phone'){
        let phoneDigits= fieldValue?.replace(/\D|^1/g, '') as string
        const phoneValid:Boolean = new RegExp(/^\d{10}$/, 'g').test(phoneDigits)
        
        warning = !phoneValid  ? 'Please enter a valid phone number' : null;

    }
    
    return warning
    
}