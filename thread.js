$(window).on('beforeunload',() => {
    disconnectThreadsDB();
} );

// Updates the comment section to add any comments in the DB
function updateCommentsList(data, dataIndex) {
    // Only run if comments not empty
    if (data[dataIndex].comments.length > 0){
        let commentSection = document.querySelector(".comments-list");
        

        console.log("Data is :",data);
        console.log("Data Index is :",dataIndex);

        for (let i = 0; i < data[dataIndex].comments.length; i++) {

            // comment div
            commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            // add comment text
            commentText = document.createElement("p");
            commentText.innerText = data[dataIndex].comments[i];
            // up vote button
            upVoteButton = document.createElement("button");
            upVoteButton.className = 'btn btn-success up-vote';
            // image for button
            upVoteIcon = document.createElement("i");
            upVoteIcon.className = 'fa-solid fa-thumbs-up';
            upVoteButton.appendChild(upVoteIcon);
            // down vote button
            downVoteButton = document.createElement("button");
            downVoteButton.className = 'btn btn-primary down-vote';
            // image for button
            downVoteIcon = document.createElement("i");
            downVoteIcon.className = 'fa-solid fa-thumbs-down';
            downVoteButton.appendChild(downVoteIcon);

            // Add it all together
            commentSection.appendChild(commentDiv);
            commentDiv.appendChild(commentText);
            commentDiv.appendChild(upVoteButton);
            commentDiv.appendChild(downVoteButton);
            
        };
    }
};

// Add comment to database
async function addCommentToThread(event, postId, newComment) {
    try {
        event.preventDefault();
        
        // Add new comment to page
        let commentSection = document.querySelector(".comments-list");
        // comment div
        commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        // Comment text
        commentText = document.createElement("p");
        commentText.innerText =  newComment;
        // up vote button
        upVoteButton = document.createElement("button");
        upVoteButton.className = 'btn btn-success up-vote';
        // image for button
        upVoteIcon = document.createElement("i");
        upVoteIcon.className = 'fa-solid fa-thumbs-up';
        upVoteButton.appendChild(upVoteIcon);
        // down vote button
        downVoteButton = document.createElement("button");
        downVoteButton.className = 'btn btn-primary down-vote';
        // image for button
        downVoteIcon = document.createElement("i");
        downVoteIcon.className = 'fa-solid fa-thumbs-down';
        downVoteButton.appendChild(downVoteIcon);
        // Add elements to page
        commentSection.appendChild(commentDiv);
        commentDiv.appendChild(commentText);
        commentDiv.appendChild(upVoteButton);
        commentDiv.appendChild(downVoteButton);

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
        // Update score on page
        voteCount = await document.querySelector(".vote-count");
        voteCount.innerText = (parseInt(voteCount.innerText) + scoreToAdd);
        const result = await response.text();
        console.log(result);

    } catch (error) {
        console.error('Error:', error);
    }
}

$(document).ready (() => {
    console.log("home");
    dbname = "ForumData";
    dbCollection = "ThreadData";

    // let commentSection = document.querySelector(".comments-list");
    
    connectToThreadsDB()
    .then(dataFromConnectAction => {
        // Access the returned data from connectAction
        console.log("Data from connectAction:", dataFromConnectAction);
        // console.log(dataFromConnectAction[0].name)
        getCollectionData(dbCollection).then(data => {
            console.log("Data:", data);
            var dataIndex;
            const urlParams = new URLSearchParams(window.location.search);
            const encodedData = urlParams.get('data');
            const decodedData = decodeURIComponent(encodedData);
            // Determine index coresponding to thread opened
            if (decodedData == "latest_post"){
                dataIndex = data.length-1;
            }
            else {
                for(let i = 0; i < data.length; i++){
                    if (data[i]._id == decodedData){
                        dataIndex = i;
                    }
                }
            }

            // Build thread elements
            cardHeader = document.querySelector(".card-header");
            cardHeader.innerText = data[dataIndex].title;
            // Add username if available.
            if(data[dataIndex].username != ""){
                userName = document.createElement("p");
                userName.innerHTML += "By User: " + data[dataIndex].username;
                cardHeader.appendChild(userName);
            }
            // Add creation date
            creationDate = document.createElement("p");
            creationDate.innerHTML = "Date Posted: " + data[dataIndex].creationDate.substring(0, 10);
            cardHeader.appendChild(creationDate);

            cardText = document.querySelector(".card-text");
            cardText.innerText = data[dataIndex].content;
            voteCount = document.querySelector(".vote-count");
            voteCount.innerText = data[dataIndex].score;
            const postButton = document.getElementById('postButton');
            const commentInput = document.getElementById('commentInput');
        
            // Add comment creation behavior
            postButton.addEventListener('click', (event) => {
                const newComment = commentInput.value;
                if (newComment.trim() !== '') {
                    data[dataIndex].comments.push(newComment);
                    commentInput.value = '';
                    // updateCommentsList(data, dataIndex);
                    addCommentToThread(event, data[dataIndex]._id, newComment)
                };
            });

            // Vote Button for post scores
            const votePostUpButton = document.getElementById("upVotePostButton");
            const votePostDownButton = document.getElementById("downVotePostButton");

            votePostUpButton.addEventListener('click', (event) => {
                increasePostScore(event, dataIndex);
                updateScore(event, data[dataIndex]._id, 1);
                
            });

            votePostDownButton.addEventListener('click', (event) => {
                decreasePostScore(event, dataIndex);
                updateScore(event, data[dataIndex]._id, -1);
            
            });

            updateCommentsList(data, dataIndex);
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });
});