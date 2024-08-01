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

function timeUnitInSeconds(n: number, unit: 'minute'|'hour'|'day'|'month'|'year'|'year_with_leap_year'){
    switch (unit) {
        case 'minute':
            return n * (60);
        case 'hour':
            return n * (60 * 60); // Multiply by 60 seconds per minute and then by 60 minutes per hour
        case 'day':
            return n * (60 * 60 * 24); // Multiply by 24 hours per day, 60 minutes per hour, and 60 seconds per minute
        case 'month': // Assuming a month is approximately 30 days
            return n * (60 * 60 * 24 * 30);
        case 'year': // Assuming a year is approximately 365 days
            return n * (60 * 60 * 24 * 365);
        case 'year_with_leap_year': // Assuming a year is approximately 365.25 days (accounting for leap years)
            return n * (60 * 60 * 24 * 365.25);
    }
}



export default{
    nowPlusDay,
    clean,
    removeUnknownProps,
    timeUnitInSeconds
}