// Disconnect from database before leaving the page
$(window).on('beforeunload', () => {
    disconnectThreadsDB();
});

$(document).ready(() => {
    console.log("home");
    dbname = "ForumData";
    dbCollection = "ThreadData";
    const postarea = document.getElementById("postarea");

    // Connect to DB on page load
    connectToThreadsDB()
        .then(dataFromConnectAction => {
            // Access the returned posts data from connectAction
            console.log("Data from connectAction:", dataFromConnectAction);
            getCollectionData(dbCollection).then(data => {
                console.log("Data:", data);

                // Build a card element for each post record
                for (let i = 0; i < data.length; i++) {
                    // Make the post div
                    postDiv = document.createElement("div");
                    postDiv.classList.add("post");
                    // Card
                    cardDiv = document.createElement("div");
                    cardDiv.classList.add("card");
                    // Card header
                    cardHeader = document.createElement("div");
                    cardHeader.classList.add("card-header");
                    // Link for the card header
                    cardTitle = document.createElement("a");
                    cardTitle.innerHTML = data[i].title;
                    // Redirect to thread page with post ID passed as URI paramater
                    cardTitle.href = "thread.html?data=" + encodeURIComponent(data[i]._id);

                    // Add username if available
                    if (data[i].username != "") {
                        userName = document.createElement("p");
                        userName.innerHTML += "By User: " + data[i].username;
                    }
                    // Add creation date
                    creationDate = document.createElement("p");
                    creationDate.innerHTML = "Date Posted: " + data[i].creationDate.substring(0, 10);
                    // Card body
                    cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");
                    // Create card text
                    cardText = document.createElement("p");
                    cardText.classList.add("card-text");

                    // Split up the content if its too long
                    let contentSplitArray = data[i].content.split(" ");
                    let content = "";
                    let contentBreak = Math.min(contentSplitArray.length, 25);
                    for (let j = 0; j < contentBreak; j++) {
                        content += contentSplitArray[j] + " ";
                    }
                    if (contentBreak >= 25) {
                        content += "...";
                    }
                    cardText.innerHTML = content;

                    // Card footer
                    cardFooter = document.createElement("div");
                    cardFooter.classList.add("card-footer");
                    cardFooter.classList.add("text-muted");

                    // Vote count
                    voteCount = document.createElement("span");
                    voteCount.classList.add("vote-count");
                    voteCount.innerHTML = "Score: " + data[i].score;

                    // Append elements to page
                    postarea.appendChild(postDiv);
                    postDiv.appendChild(cardDiv);
                    cardDiv.appendChild(cardHeader);
                    cardHeader.appendChild(cardTitle);

                    // Add in the user if we have it.
                    if (data[i].username != "") {
                        cardHeader.appendChild(userName);
                    }

                    cardHeader.appendChild(creationDate);
                    cardDiv.appendChild(cardBody);
                    cardBody.appendChild(cardText);
                    cardDiv.appendChild(cardFooter);
                    cardFooter.appendChild(voteCount);
                }

            })
        })
        .catch(error => {
            console.error("Error:", error);
        });

});