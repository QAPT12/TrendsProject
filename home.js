$(window).on('beforeunload', disconnectThreadsDB);

$(document).ready (() => {
    console.log("home");
    dbname = "ForumData";
    dbCollection = "ThreadData";
    
    connectToThreadsDB()
    .then(dataFromConnectAction => {
        // Access the returned data from connectAction
        console.log("Data from connectAction:", dataFromConnectAction);
        console.log(dataFromConnectAction[0].name)
        getCollectionData(dbCollection).then(data => {
            console.log("Data:", data);
        })
    })
    .catch(error => {
        console.error("Error:", error);
    });

});