exports.convertTimeZone = (date, timeZone)=>{
    if(typeof date === "string")
        date = new Date(date);
    
    return new Date(date.toLocaleString("en-US", {timeZone: timeZone}));
}
