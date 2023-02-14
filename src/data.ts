
export const saveSession = async (path: any) => {
    const obj = await FetchData(path)

    //data prep here to get 
    if (obj){
        const updatedObj = (obj
                              .map((val: { [x: string]: String | Number; }) => ({...val, 'employer': val['master'] ? val['master_name'] : val['unit_name'], 'status':'Needs Review'}))
                              .sort((a: { employer: { toLowerCase: () => number; }; },b: { employer: { toLowerCase: () => number; }; }) => (a.employer.toLowerCase() < b.employer?.toLowerCase()) ? -1 : (a.employer?.toLowerCase() > b.employer?.toLowerCase()) ? 1 : -0 ))
        window.sessionStorage.setItem("unitList", JSON.stringify(updatedObj))
        return true;
    }

}

export const getSession = () => {
    let obj = [];

    if (typeof sessionStorage.unitList !== "undefined"){
        obj = JSON.parse(window.sessionStorage.unitList)
    }

    return obj;
}

export const FetchData = async (path:any) => {
    const resp = await fetch(path);
    return resp.json();
};
  
