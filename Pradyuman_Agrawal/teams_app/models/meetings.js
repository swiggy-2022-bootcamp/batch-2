const pool = require("../config/db")

const Meeting = function(meeting){
    this.creatorId = meeting.creatorId;
    this.startTime = meeting.startTime;
    this.endTime = meeting.endTime;
    this.description=meeting.description;
    this.members=meeting.members;
    this.inviteLinkAccess=meeting.inviteLinkAccess;
}


Meeting.create = async (newMeeting) => {
    //console.log(newMeeting);
    const resultObj ={...newMeeting};
    const {creatorId,startTime,endTime,description,members,inviteLinkAccess}=newMeeting; 
    try{
        const res = await pool.promise("INSERT INTO meetings SET ?; ", { creatorId: creatorId, startTime: startTime,endTime:endTime,description:description,inviteLinkAccess:inviteLinkAccess});
        console.log("meeting created",{...newMeeting});
        resultObj.id=res.insertId;
        let promises=[]
        members.forEach(memberId => {
            promises.push(pool.promise("INSERT INTO meetingMembers SET ?; ", { meetingId: resultObj.id, userId:memberId }))
        });

        await Promise.all(promises);
        return resultObj;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

// Meeting.getAllMeeting = async () => {
//     try{
//         const res = await pool.promise("Select * from meetings natural join meetingMembers ORDER BY meetings.meetingId",[]);
//         return res;
//     }
//     catch(err){
//         console.log("error: ",err);
//         throw err;
//     }
// };

Meeting.getAllMeeting = async (queryArgs) => {
    let sqlQuery="SELECT * FROM meetings NATURAL JOIN meetingMembers"
    if(queryArgs.sortBy){
        sqlQuery+=" ORDER BY " + queryArgs.sortBy
        if(queryArgs.order&&queryArgs.order.toUpperCase().localeCompare("DESC")==0)
            sqlQuery+=" DESC"
    }
    try{
        const res = await pool.promise(sqlQuery);
        return res;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

Meeting.findMeetingById = async (meetingId) => {
    try{
        const res = await pool.promise("Select * from meetings m natural join meetingMembers where m.meetingId = ? ORDER BY m.meetingId",[meetingId]);
        return res;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

Meeting.findcreatorIdByMeetingId = async (meetingId) => {
    try{
        const res = await pool.promise("Select creatorId from meetings where meetingId = ?",[meetingId]);
        return res;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

Meeting.findMeetingByCreatorId = async (creatorId) => {
    try{
        const res = await pool.promise("Select * from meetings m  natural join meetingMembers  where m.creatorId = ? ORDER BY m.meetingId",[creatorId]);
        return res;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

Meeting.findMeetingByMemberId = async (userId) => {
    try{
        const res = await pool.promise("Select * from meetings m natural join meetingMembers where m.meetingId in (select meetingId from meetingMembers where userId = ?) ORDER BY startTime",[userId]);
        return res;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};


Meeting.updateMeetingById = async (meetingId,updateInfo) => {
    var sql=`UPDATE meetings SET `;
        var args=[]
        if(updateInfo.startTime){
            sql+=`startTime=? ,`;
            args.push(updateInfo.startTime);
        }
        if(updateInfo.endTime){
            sql+=`endTime=? `;
            args.push(updateInfo.endTime);
        }
        if(updateInfo.description){
            sql+=`description=? `;
            args.push(updateInfo.description);
        }
        if(updateInfo.inviteLinkAccess){
            sql+=`inviteLinkAccess=? `;
            args.push(updateInfo.inviteLinkAccess);
        }
        sql+= `WHERE meetingId=?`;
        args.push(meetingId);

        try{
            const res = await pool.promise(sql,args);
            return {user:res}
        }
        catch(err){
            console.log("error: ",err);
            throw err;
        }
    
};

Meeting.deleteMeetingById = async (meetingId) => {
    try{
        await pool.promise("Delete from meetingMembers where meetingId = ?",[meetingId]);
        const res = await pool.promise("Delete from meetings where meetingId = ?",[meetingId]);
        return res;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

Meeting.dropOffMeetingById= async (meetingId,userId) => {
    try{
        
        console.log([meetingId,userId]);
        const res = await pool.promise("Delete from meetingMembers where (meetingId = ?) AND (userId = ?)",[meetingId,userId]);
        return res;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

Meeting.createInviteLink = async (inviteLink,meetingId) => {
    try{
        const res = await pool.promise("update meetings set inviteLink = ? where meetingId =?",[inviteLink,meetingId]);
        return res;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

Meeting.joinMeetingbyId = async (userId,meetingId) => {
    try{
        const res = await pool.promise("INSERT INTO meetingMembers SET ?; ", { meetingId: meetingId, userId:userId });
        return res;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

module.exports = Meeting;