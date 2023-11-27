$(window).on('beforeunload', disconnectThreadsDB);

$(document).ready (() => {
    console.log("new_post");
    // hook up click event(s)
    connectToThreadsDB();
    $("#submit").click(submitThreadData);
});