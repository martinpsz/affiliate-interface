var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const saveSession = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = yield FetchData(path);
    if (obj) {
        const updatedObj = (obj
            .map((val) => (Object.assign(Object.assign({}, val), { 'employer': val['master'] ? val['master_name'] : val['unit_name'], 'status': 'Needs Review' })))
            .sort((a, b) => { var _a, _b, _c; return (a.employer.toLowerCase() < ((_a = b.employer) === null || _a === void 0 ? void 0 : _a.toLowerCase())) ? -1 : (((_b = a.employer) === null || _b === void 0 ? void 0 : _b.toLowerCase()) > ((_c = b.employer) === null || _c === void 0 ? void 0 : _c.toLowerCase())) ? 1 : -0; }));
        window.sessionStorage.setItem("unitList", JSON.stringify(updatedObj));
        return true;
    }
});
export const getSession = () => {
    let obj = [];
    if (typeof sessionStorage.unitList !== "undefined") {
        obj = JSON.parse(window.sessionStorage.unitList);
    }
    return obj;
};
export const FetchData = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch(path);
    return resp.json();
});
//# sourceMappingURL=data.js.map