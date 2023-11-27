$(window).on('beforeunload', disconnectThreadsDB);

$(document).ready (() => {
    console.log("new_post");
    dbname = "ForumData";
    dbCollection = "ThreadData";

    // hook up click event(s)
    connectToThreadsDB();
    $("#submit").click(submitThreadData);
});