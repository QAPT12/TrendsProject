$(window).on('beforeunload', disconnectThreadsDB);

$(document).ready (() => {
    console.log("new_post");
    dbname = "ForumData";
    dbCollection = "ThreadData";

    // hook up click event(s)
    connectToThreadsDB();
    $("#submit").click(submitThreadData);
    // TODO: Quintin, ask noah about getting this to work
    // $("#submit").click(function(){
    //     if($("#title").value.length > 0 && $("#content").value.length){
    //         submitThreadData();
    //     }
    // });
});