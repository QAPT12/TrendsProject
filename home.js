$(window).on('beforeunload', disconnectThreadsDB);

$(document).ready (() => {
    console.log("home");
    // hook up click event(s)
    connectToThreadsDB();

});