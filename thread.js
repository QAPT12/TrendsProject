// Disconnect from the DB when page is closing
$(window).on('beforeunload', () => {
    disconnectThreadsDB();
});

// Updates the comment section to add any comments in the DB
function updateCommentsList(data, dataIndex) {
    // Only run if comments not empty
    if (data[dataIndex].comments.length > 0) {
        let commentSection = document.querySelector(".comments-list");

        console.log("Data is :", data);
        console.log("Data Index is :", dataIndex);

        // Loop through comments and add each one
        for (let i = 0; i < data[dataIndex].comments.length; i++) {

            // Comment div
            commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            // Add comment text
            commentText = document.createElement("p");
            commentText.innerText = data[dataIndex].comments[i];
            // Append elements to page
            commentSection.appendChild(commentDiv);
            commentDiv.appendChild(commentText);
        };
    }
};

// Add comment to the DB
async function addCommentToThread(event, postId, newComment) {
    try {
        event.preventDefault();

        // Add new comment to the current page
        let commentSection = document.querySelector(".comments-list");
        // Comment div
        commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        // Comment text
        commentText = document.createElement("p");
        commentText.innerText = newComment;
        // Add elements to page
        commentSection.appendChild(commentDiv);
        commentDiv.appendChild(commentText);

        // Construct the API endpoint for updating comments
        var updateCommentsEndpoint = domain + `updateData/${postId}/addComment`;

        // Create a JSON object with the data to be added (new comment)
        var commentData = {
            newComment: newComment,
            collection: dbCollection,
        };

        // Use the fetch API to send a POST request to update comments
        const response = await fetch(updateCommentsEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        });

        const result = await response.text();
        console.log(result);

    } catch (error) {
        console.error('Error:', error);
    }
}

// Updates the score in the database and on the page
async function updateScore(event, recordId, scoreToAdd) {
    try {
        event.preventDefault();

        // Construct the API endpoint for updating the score
        var updateScoreEndpoint = domain + `updateData/${recordId}/updateScore`;

        // Create a JSON object with the data to be added (score to add)
        var scoreData = {
            scoreToAdd: scoreToAdd,
            collection: dbCollection,
        };

        // Use the fetch API to send a POST request to update the score
        const response = await fetch(updateScoreEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scoreData),
        });

        // Update score on the current page
        voteCount = await document.querySelector(".vote-count");
        voteCount.innerText = (parseInt(voteCount.innerText) + scoreToAdd);

        // Disabled whichever button was clicked
        if (event.target.id == "upVotePostButton") {
            document.getElementById("upVotePostButton").disabled = true;
            document.getElementById("downVotePostButton").disabled = false;
        }
        else {
            document.getElementById("upVotePostButton").disabled = false;
            document.getElementById("downVotePostButton").disabled = true;
        }

        const result = await response.text();
        console.log(result);

    } catch (error) {
        console.error('Error:', error);
    }
}

$(document).ready(() => {
    console.log("home");
    dbname = "ForumData";
    dbCollection = "ThreadData";

    // Connect to DB on page load
    connectToThreadsDB()
        .then(dataFromConnectAction => {
            // Access the returned data from connectAction
            console.log("Data from connectAction:", dataFromConnectAction);
            getCollectionData(dbCollection).then(data => {
                console.log("Data:", data);
                var dataIndex;
                const urlParams = new URLSearchParams(window.location.search);
                const encodedData = urlParams.get('data');
                const decodedData = decodeURIComponent(encodedData);

                // Determine index coresponding to thread opened
                if (decodedData == "latest_post") {
                    dataIndex = data.length - 1;
                }
                else {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]._id == decodedData) {
                            dataIndex = i;
                        }
                    }
                }

                // Build thread elements
                cardHeader = document.querySelector(".card-header");
                cardHeader.innerText = data[dataIndex].title;

                // Add username if available.
                if (data[dataIndex].username != "") {
                    userName = document.createElement("p");
                    userName.innerHTML += "By User: " + data[dataIndex].username;
                    cardHeader.appendChild(userName);
                }
                // Add creation date
                creationDate = document.createElement("p");
                creationDate.innerHTML = "Date Posted: " + data[dataIndex].creationDate.substring(0, 10);
                cardHeader.appendChild(creationDate);

                // Add content
                cardText = document.querySelector(".card-text");
                cardText.innerText = data[dataIndex].content;

                // Add post score
                voteCount = document.querySelector(".vote-count");
                voteCount.innerText = data[dataIndex].score;

                // Add comment box and post button
                const postButton = document.getElementById('postButton');
                const commentInput = document.getElementById('commentInput');

                // Add comment creation behavior
                postButton.addEventListener('click', (event) => {
                    const newComment = commentInput.value;
                    if (newComment.trim() !== '') {
                        data[dataIndex].comments.push(newComment);
                        commentInput.value = '';
                        addCommentToThread(event, data[dataIndex]._id, newComment)
                    };
                });

                // Vote Button for post scores
                const votePostUpButton = document.getElementById("upVotePostButton");
                const votePostDownButton = document.getElementById("downVotePostButton");

                votePostUpButton.addEventListener('click', (event) => {
                    updateScore(event, data[dataIndex]._id, 1);

                });

                votePostDownButton.addEventListener('click', (event) => {
                    // decreasePostScore(event, dataIndex);
                    updateScore(event, data[dataIndex]._id, -1);

                });

                // Populate stored comments on page load
                updateCommentsList(data, dataIndex);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});