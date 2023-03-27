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
    affiliate_id?: number;
    master_name?: string;
    period_id: number;
    year: number;
    unit_id: number | null;
    unit_name: string | null;
    master_id: number | null;
    master: boolean;
    name: string | null;
    subunit: string | number | null;
    chapter: string | number | null;
    council: string | number | null;
    local: number | null;
    state: string;
    contact: Reporter | null;
    in_negotiation: 'Yes' | 'No' | null;
    wage_adjustment?: 'Yes' | 'No' | null;
    inactive_unit?: 'Yes' | 'No' | null;
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
    employer?: string | null;
    status?: 'Needs Review' | 'Saved';
    cbaFile?: File;
    regular_raise_events?: wageEvent[];
    special_raise_events?: wageEvent[];
    comment?: string | null;
}

export interface UnitList extends Array<Unit>{}

export interface UnitStatus{
    inactive_unit: 'Yes' | 'No';
    in_negotiation: 'Yes' | 'No' | undefined;
    wage_adjustment: 'Yes' | 'No' | undefined;
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

export interface wageEvent {
    id?: string;
    effective_date_of_inc: string | null;
    cents_per_hour_base?: string | null;
    cents_per_hour_inc?: string | null;
    dollar_lump_sum_base?: number | null;
    dollar_lump_sum_inc?: string | null;
    percent_wage_inc: number | null;
    increase_type: string;
    number_affected?: number | null;
    group_description?: string | null;
}