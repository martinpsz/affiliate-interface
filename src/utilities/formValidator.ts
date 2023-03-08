//validation function for reporter section of form
export const validateReporterSection = (fieldValue: string | null, fieldLabel: string) : string | null => {
    let warning: string | null = '';

    //check for missing field values: [Remove once email regex is set as this is superfluous with other checks]
    //warning = fieldValue === '' ? 'This is a required field' : null;

    //light check for valid name: at least 2 words:
    if (fieldLabel === 'name'){
        warning = fieldValue?.split(/\s+/).length === 1 ? 'Please enter your full name' : null
    }

    //lazy check for proper email value:
    if (fieldLabel === 'email'){
        const emailValid = new RegExp(/^\S+@\S+$/, 'g').test(fieldValue as string)
        warning = !emailValid ? 'Please enter a valid email address' : null;
    }

    //check for 9 digit phone number:
    if (fieldLabel === 'phone'){
        let phoneDigits= fieldValue?.replace(/\D|^1/g, '') as string
        const phoneValid:Boolean = new RegExp(/^\d{10}$/, 'g').test(phoneDigits)
        
        warning = !phoneValid  ? 'Please enter a valid phone number' : null;

    }
    
    return warning
    
}