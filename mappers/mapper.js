const templateDeal = {
    name: "-",
    surname: "-",
    tel: "-",
    email: "-",
    jobType: "-",
    jobSource: "-",
    jobDescription: "-",
    address: "-",
    location: "-",
    street: "-",
    postCode: "-",
    date: "-",
    fromTime: "-",
    toTime: "-",
    person: "-",
    district: "-"
}
function mapDeal(deal){
    if(!deal){
        return templateDeal
    }
    const entries = Object.entries(deal);
    const result = entries.map(([key, value]) => {
        if(key === "id" ||key === "userId" ||key === "dealId"  ){
            return []
        }
        return [key, value ? value :  '-'];
    });
    const obj = Object.fromEntries(result)

    delete obj[undefined]
    return obj
}

export  default {mapDeal}
