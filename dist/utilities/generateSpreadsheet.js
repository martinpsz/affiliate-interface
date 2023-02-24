export const generateSpreadSheet = (data) => {
    const csv = [
        ['affiliate_id', 'agr_id', 'agreement_eff_date', 'agreement_exp_date',
            'contact.email', 'contact.name', 'contact.phone', 'council', 'employer', 'local', 'master', 'master_name',
            'number_of_members', 'period_id', 'state', 'status', 'subunit', 'unit_name', 'year'],
        ...data.map(item => {
            var _a, _b, _c;
            return [
                item.affiliate_id,
                item.agr_id,
                item.agreement_eff_date,
                item.agreement_exp_date,
                (_a = item.contact) === null || _a === void 0 ? void 0 : _a.email,
                (_b = item.contact) === null || _b === void 0 ? void 0 : _b.name,
                (_c = item.contact) === null || _c === void 0 ? void 0 : _c.phone,
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
            ].map(value => typeof value === 'string' ? `"${value.replace(/"/g, '\"')}"` : value);
        })
    ].map(e => e.join(','))
        .join("\n");
    const blob = new Blob([csv], { type: 'text/csv; charset=utf-8,' });
    const objURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', objURL);
    link.setAttribute('download', 'unit-data.csv');
};
