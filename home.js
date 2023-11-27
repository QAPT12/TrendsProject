$(window).on('beforeunload', disconnectThreadsDB);

$(document).ready (() => {
    console.log("home");
    dbname = "test";
    dbCollection = "registrations";
    
    // hook up click event(s)
    connectToThreadsDB();

});