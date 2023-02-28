export interface Reporter {
    email: string | undefined,
    name: string | undefined,
    phone: string | undefined,
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

export interface Prompts {
    UnitActivePrompt: string,
    UnitActiveOptions: string[],
    UnitActiveDefault: string;
    UnitBargainingPrompt: string,
    UnitBargainingOptions: string[],
    UnitBargainingDefault: string;
}