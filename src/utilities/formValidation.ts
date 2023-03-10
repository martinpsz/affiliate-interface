//validation function for the employer section:
export const validateEmployerSection = (fieldValue: string | null, fieldLabel: string) : string | null => {
    let warning: string | null = '';

    //current check for string that is at least one character in length before warning dismissed. Consider
    //adding check against list of existing employer/units.
    if (fieldLabel === 'employer'){
        warning = fieldValue === null || fieldValue.length === 0 ? 'Please enter an employer/unit name' : null
    }

    return warning
}



//validation function for reporter section of form
export const validateReporterSection = (fieldValue: string | null, fieldLabel: string) : string | null => {
    let warning: string | null = '';

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