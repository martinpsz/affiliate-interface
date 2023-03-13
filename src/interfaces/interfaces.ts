export interface Employer {
    employer: string;
    local: number | null;
    subunit: string | number | null;
}

export interface Reporter {
    email: string | null,
    name: string | null,
    phone: string | null,
}

export interface Unit {
    affiliate_id: string,
    agr_id: number,
    agreement_eff_date: string | null,
    agreement_exp_date: string | null,
    contact: Reporter | null,
    council: number | null,
    employer: string | null,
    local: number | null,
    master: boolean,
    master_name: string | null,
    number_of_members: number | null,
    period_id: number,
    state: string,
    status: string,
    subunit: string | number | null,
    unit_name: string | null,
    year: number
}

export interface UnitList extends Array<Unit>{}

export interface UnitStatus{
    activeStatus: 'Yes' | 'No';
    bargainStatus: 'Yes' | 'No' | undefined;
    wageStatus: 'Yes' | 'No' | undefined;
    cbaEffectiveDates: {From: string, To: string} | undefined;
    fileUpload: File | undefined;
    memberCount: string | undefined;
}