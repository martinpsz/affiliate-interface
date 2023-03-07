import { Reporter } from "../interfaces/interfaces";


export const validateReporterSection = (fieldValue: string | null, fieldLabel: string) : string | null => {
    let warning: string | null = '';

    //check for missing field values:
    warning = fieldValue === '' ? 'This is a required field' : null;

    //light check for valid name: at least 2 words:
    if (fieldLabel === 'name'){
        warning = fieldValue?.split(/\s+/).length === 1 ? 'Please enter your full name' : null
    }

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