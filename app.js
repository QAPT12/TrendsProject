// Client side application for making requests to the database server from the webpage
// Used by pages for general connection actions
// ---------------------------------------------------------
var dbhost = "localhost";
var dbport = "3000";
// var dbname = "ForumData";
// var dbCollection = "ThreadData";
var domain = `http://${dbhost}:${dbport}/`;

// Displays an error if connection fails
const displayError = error => {
    $("#error").html(`${error.message}`)
}


const getCollectionData = async (dbCollection) => {
    console.log("Fetching Collection data from:", dbCollection);
    // Make a fetch API call
    try {
        const response = await fetch(domain + "query/" + dbCollection);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

// Connect/disconnect to/from a MongoDb database.
const connectAction = async resp => {
    console.log("Connection Action Result:", resp);
    try {
        try {
            const obj = await fetch(domain + "getcollections");
            const data = await obj.json();
            return data;
        } catch (e) {
            displayError(e);
            throw e; // Propagate the error further
        }
    } finally {
        console.log("*".repeat(30));
    }
};

// Begin connecting to a DB
const connectToThreadsDB = async () => {
    console.log("Connecting");
    try {
        const obj = await fetch(domain + `connect/${dbname}`);
        const data = await obj.text();
        let collectionData = connectAction(data);
        return await collectionData;
    } catch (e) {
        displayError(e);
        throw e;
    }
};

// Begin disconnecting from a DB
const disconnectThreadsDB = async () => {
    console.log("Disconnecting");
    try {
        await fetch(domain + `disconnect`);
    } catch (e) {
        displayError(e);
        throw e;
    }
}