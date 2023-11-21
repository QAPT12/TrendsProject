// Client side application for making requests to the database server from the webpage
// Used by new_post.html and paulApp.html
// ---------------------------------------------------------

var domain;
var dbCollection;

const displayError = error => {
    $("#error").html(`${error.message}`)
}

/* Retrieve a JavaScript collection of a Mongodb database object containing Mongodb collections (tables). */
const collectionAction = resp => {
    console.log(resp); // result set, resp, should be JSON.
    // make the selection list from the result set.
    var s = $('<select id="collectionList" name="collectionList" />');
    for(var val in resp) {
        s.append($("<option />", {text: resp[val].name}));

    }
    $("#queryArea").append('<label for="collectionList">Selected Collection:</label>');
    $("#queryArea").append(s);

    // set the initial colletion
    dbCollection = $("#collectionList").find(':selected').text();

    // create a handler if the selection is changed.
    $("#collectionList").change( () => {
        dbCollection = $("#collectionList").find(':selected').text();
    });
}

/* connect/disconnect to/from a MongoDb database. */
const connectAction = resp => {
    console.log (resp);
    if ($("#dbconnect").text() == "Connect" && resp == 'Success' || resp == 'Fail: Already connected to a database'){
        $("#dbstate").text("Connected");
        $("#dbconnect").text("Disconnect");

        // Connection successful, now compose the queryArea div
        // we need a list of database Collections.
        fetch(domain+"getcollections")
        .then (obj => obj.json() )
        .then (data => collectionAction(data))
        .catch (e => displayError (e));

    }
    else if ($("#dbconnect").text() == "Disconnect" && resp == 'Success'){
        $("#dbstate").text("Not Connected");
        $("#dbconnect").text("Connect");

        //decompose the queryArea div
        $("#queryArea").empty();
    }
    else{
        displayError (resp);
    }
}

const toggleDatabaseConnection = () =>{

    // connect/disconnect to the specified database
    // send a message to "localhost:3000/connect/<database name>" or
    // send a message to "localhost:3000/disconnect"
    // Let's use the fetch API.

    // var dbhost = $("#dbhost").val();
    // var dbport = $("#dbport").val();
    // var dbname = $("#dbident").val();
    var dbhost = "localhost";
    var dbport = "3000";
    var dbname = "test";

    domain = `http://${dbhost}:${dbport}/`;

    if ($("#dbconnect").text() == "Connect")
        command = domain+`connect/${dbname}`;
    else
        command = domain+'disconnect';

    fetch(command)
        .then (obj => obj.text() )
        .then (data => connectAction(data))
        .catch (e => displayError (e));
    
};

const submitThreadData = () => {
    
        // Get the data from the input field
        var username = $("#username").val();
        var title = $("#title").val();
        var data = "";

        // Construct the API endpoint for adding data to the database
        var addDataEndpoint = domain + "addData";

        // Create a JSON object with the data to be added
        var postData = {
            username: username,
            title: title,
            data: data,
            collection: dbCollection // Use the currently selected collection
        };

        // Use the fetch API to send a POST request to the server
        fetch(addDataEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.text())
        .then(data => {
            // Handle the response, you might want to display a success message or handle errors
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
};

$(document).ready (() => {
    // hook up click event(s)

    $("#dbconnect").click(toggleDatabaseConnection);

    $("#submit").click(submitThreadData);
});