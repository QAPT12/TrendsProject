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
            cardHeader = document.querySelector(".card-header");
            cardHeader.innerText = data[1].title;
            cardText = document.querySelector(".card-text");
            cardText.innerText = data[1].content;
            voteCount = document.querySelector(".vote-count");
            voteCount.innerText = data[1].score;
        });

    })
    .catch(error => {
        console.error("Error:", error);
    });
});