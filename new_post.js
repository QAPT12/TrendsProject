async function submitThreadData(event){
    event.preventDefault();
    // Get the data from the input field
    var username = $("#username").val();
    var title = $("#title").val();
    var content = $("#content").val();;

    // Construct the API endpoint for adding data to the database
    var addDataEndpoint = domain + "addData";

    // Create a JSON object with the data to be added
    var postData = {
        username: username,
        title: title,
        content: content,
        creationDate: new Date(),
        score: 0,
        comments: [],
        collection: dbCollection // Use the currently selected collection
    };

    // Use the fetch API to send a POST request to the server
    await fetch(addDataEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);        
    })
    .catch(error => {
        console.error('Error!!!:', error);
    });
    await disconnectThreadsDB();
    window.location.href = "thread.html?data=" + encodeURIComponent("latest_post");
};

$(document).ready (() => {
    console.log("new_post");
    dbname = "ForumData";
    dbCollection = "ThreadData";

    connectToThreadsDB();
    $("#submit").click(submitThreadData);
    // TODO: Quintin, ask noah about getting this to work
    // $("#submit").click(function(){
    //     if($("#title").value.length > 0 && $("#content").value.length){
    //         submitThreadData();
    //     }
    // });
});