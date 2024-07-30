function nowPlusDay(n: number) {

    let now = new Date()
    return new Date(now.setDate(now.getDate() + n))

}

function clean(obj: any){
    let propNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < propNames.length; i++) {
        let propName = propNames[i];
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj
}

function removeUnknownProps(x:any, props:string[]){
    const daprops = props
    const xprop = Object.keys(x)

    for(let xp of xprop) if(!daprops.includes(xp)) delete x[xp]
}

export default{
    nowPlusDay,
    clean,
    removeUnknownProps
}