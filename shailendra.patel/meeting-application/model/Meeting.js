class Meeting{


    constructor(id=new String(), date = new Date(), startTime=new String(), endTime=new String(), description=new String(), participants=new String())
    {
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
        this.participants = participants;
    }

    print(){
        console.log("Hello from meet");
    }

}

module.exports = Meeting;