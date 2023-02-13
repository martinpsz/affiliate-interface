
import { createContext} from '@lit-labs/context'


export const appContext = createContext(Symbol('app-context'))

export const dataContext = createContext<affiliateData>({agr_id: Number});

interface Contact {
    "name": String | null;
    "email": String | null;
    "phone": String | null;
}

interface affiliateDataFields {
    "agr_id": Number,
    "agreement_eff_date": String | null,
    "agreement_exp_date": String | null,
    "contact": Contact | null, 
    "council": Number | null,
    "local": Number | null,
    "master": Boolean,
    "master_name": String | null,
    "number_of_members": Number | null,
    "period_id": Number,
    "state": String,
    "subunit": String | null,
    "unit_name": String | null,
    "year": Number,
    "affiliate_id": String,
}

export interface affiliateData extends Array<affiliateDataFields>{}

