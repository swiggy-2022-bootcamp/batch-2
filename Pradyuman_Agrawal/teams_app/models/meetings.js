const pool = require("../config/db")

const Meeting = function(meeting){
    this.creatorId = meeting.creatorId;
    this.startTime = meeting.startTime;
    this.members=meeting.members;
}



Meeting.create = async (newMeeting) => {
    //console.log(newMeeting);
    const resultObj ={...newMeeting};
    const {creatorId,startTime,members}=newMeeting;  
    try{
        const res = await pool.promise("INSERT INTO meetings SET ?; ", { creatorId: creatorId, startTime: startTime });
        console.log("meeting created",{...newMeeting});
        resultObj.id=res.insertId;
        let promises=[]
        members.forEach(memberId => {
            promises.push(pool.promise("INSERT IGNORE INTO meetingMembers SET ?; ", { meetingId: resultObj.id, userId:memberId }))
        });

        await Promise.all(promises);
        return resultObj;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

Meeting.getAllMeeting = async () => {
    try{
        const res = await pool.promise("Select * from meetings natural join meetingMembers ORDER BY meetings.meetingId",[]);
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
        const res = await pool.promise("Select * from meetings m natural join meetingMembers where m.meetingId in (select meetingId from meetingMembers where userId = ?) ORDER BY m.meetingId",[userId]);
        return res;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};


Meeting.updateMeetingById = (meetingId,updateInfo,cb) => {
    var sql=`UPDATE meetings SET `;
        var arg=[]
        if(updateInfo.name){
            sql+=`name=? ,`;
            arg.push(updateInfo.name);
        }
        if(updateInfo.password){
            sql+=`password=? `;
            arg.push(updateInfo.password);
        }
        sql+= `WHERE meetingId=?`;
        arg.push(meetingId);

        pool.query(sql,arg,(err,res) => {
        if(err){
            console.log("error: ",err)
            cb(err,null);
            return;
        }
        console.log("meeting info update where meetingId is",meetingId);
        cb(null,{meeting:res});
    });
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

module.exports = Meeting;