const moment = require('moment');

exports.convertTimeZone = (date, timeZone) => {
    if (typeof date === "string")
        date = new Date(date);

    return new Date(date.toLocaleString("en-US", { timeZone: timeZone }));
}


exports.parseDateTime = (date, time) => {

    // let mydate = moment.utc(date+" "+time, "YYYY-MM-DD hh:mm");

    //'2014-04-03'
    let dateParts = date.split('-');
    //'14:30'
    let timeparts = time.split(':');
    //JavaScript counts months from 0. January - 0, February - 1, etc.
    let mydate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], timeparts[0], timeparts[1], 0, 0));
    console.log(mydate);
    return mydate;
}

//Transform meeting objects before sending response
//e.g set date & time , remove _v
exports.transformMeetings = (meetings) => {

    return meetings.map(m => {
        //remove _v
        let {__v, start, end,...meeting} = m;
        
        meeting.date = start.getUTCFullYear()+"-"+(start.getUTCMonth()+1)+"-"+start.getUTCDate();
        meeting.start_time = start.getUTCHours()+":"+start.getUTCMinutes();
        meeting.end_time = end.getUTCHours()+":"+end.getUTCMinutes();

        return meeting;
    });
}