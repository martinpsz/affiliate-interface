import { UnitList } from "../interfaces/unit"


export const generateSpreadSheet = (data : UnitList) => {
    const csv = [
        ['affiliate_id', 'agr_id', 'agreement_eff_date', 'agreement_exp_date',
        'contact.email', 'contact.name', 'contact.phone', 'council', 'employer', 'local','master', 'master_name', 
        'number_of_members','period_id', 'state', 'status', 'subunit', 'unit_name', 'year'],
        ...data.map(item => [
            item.affiliate_id,
            item.agr_id,
            item.agreement_eff_date,
            item.agreement_exp_date,
            item.contact?.email,
            item.contact?.name,
            item.contact?.phone,
            item.council,
            item.employer,
            item.local,
            item.master,
            item.master_name,
            item.number_of_members,
            item.period_id,
            item.state,
            item.status,
            item.subunit,
            item.unit_name,
            item.year
        ].map(value => typeof value === 'string' ? `"${value.replace(/"/g, '\"')}"` : value))
    ].map(e => e.join(','))
     .join("\n");

    const blob = new Blob([csv], {type: 'text/csv; charset=utf-8,'})
    const objURL = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.setAttribute('href', objURL)
    link.setAttribute('download', 'unit-data.csv')
    
}