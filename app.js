// Client side application for making requests to the database server from the webpage
// Used by new_post.html and paulApp.html
// ---------------------------------------------------------
var dbhost = "localhost";
var dbport = "3000";
// var dbname = "ForumData";
// var dbCollection = "ThreadData";
var domain = `http://${dbhost}:${dbport}/`;

const displayError = error => {
    $("#error").html(`${error.message}`)
}

const getCollectionData = (dbCollection) => {
    console.log("Fetching Collection data from:", dbCollection);
    // Make a fetch API call
    return fetch(domain + "query/" + dbCollection)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // console.log('Data received from server:', data);
            // Do something with the data
            return data;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
};

/* connect/disconnect to/from a MongoDb database. */
const connectAction = resp => {
    console.log("Connection Action Result:", resp);
    return fetch(domain + "getcollections")
        .then(obj => obj.json())
        .then(data => {
            // collectionAction(data);
            return data; // Return the data from this block
        })
        .catch(e => {
            displayError(e);
            throw e; // Propagate the error further
        })
        .finally(() => {
            console.log("*".repeat(30));
        });
};

// connect/disconnect to the specified database
// send a message to "localhost:3000/connect/<database name>" or
// send a message to "localhost:3000/disconnect"
// const toggleDatabaseConnection = () =>{
//     // var dbhost = $("#dbhost").val();
//     // var dbport = $("#dbport").val();
//     // var dbname = $("#dbident").val();
//     var dbhost = "localhost";
//     var dbport = "3000";
//     var dbname = "test";

//     domain = `http://${dbhost}:${dbport}/`;

//     if ($("#dbconnect").text() == "Connect")
//         command = domain+`connect/${dbname}`;
//     else
//         command = domain+'disconnect';

//     fetch(command)
//         .then (obj => obj.text() )
//         .then (data => connectAction(data))
//         .catch (e => displayError (e));
    
// };
const connectToThreadsDB = () => {
    console.log("Connecting");
    return fetch(domain + `connect/${dbname}`)
        .then(obj => obj.text())
        .then(data => {
            let collectionData = connectAction(data);
            return collectionData;
        })
        .catch(e => {
            displayError(e);
            throw e;
        });
};

const disconnectThreadsDB = () => {
    console.log("Disconnecting");
    fetch(domain + `disconnect`)
        .then (obj => obj.text() )
        .then (data => connectAction(data))
        .catch (e => displayError (e));
}

function submitThreadData(event){
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
            // disconnectThreadsDB();
            window.location.href = "thread.html?data=" + encodeURIComponent("latest_post");
            
        })
        .catch(error => {
            // Handle errors
            console.error('Error!!!:', error);
        });
};

// $(window).on('beforeunload', disconnectThreadsDB);


// $(document).ready (() => {
//     // hook up click event(s)
//     connectToThreadsDB();

//     $("#submit").click(submitThreadData);
// });