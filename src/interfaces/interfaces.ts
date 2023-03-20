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
    period_id: number;
    year: number;
    unit_id: number | null;
    unit_name: string | null;
    master_id: number;
    master: boolean;
    name: string | null;
    subunit: string | number | null;
    chapter: string | number | null;
    council: string | number | null;
    local: number | null;
    state: string;
    contact: Reporter | null;
    in_negotiation: boolean | null;
    number_of_members: number | null;
    agreement_eff_date: string | null;
    agreement_exp_date: string | null;
    increase_type: string | null;
    effective_date_of_inc: string | null;
    cents_per_hour_base: string | null;
    cents_per_hour_inc: string | null;
    dollar_lump_sum_base: string | null;
    dollar_lump_sum_inc: string | null;
    percent_wage_inc: string | null;
    agr_id: number | null;
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

export interface AdjustmentData {
    date: string;
    typeOfRaise: string;
    startingWage: number;
    wageAdjustment: number;
    numberAffected?: string;
    groupDescription?: string;
}

export interface AdjustmentDataList extends Array<AdjustmentData>{}