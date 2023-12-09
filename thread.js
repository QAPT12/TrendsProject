$(window).on('beforeunload',() => {
    disconnectThreadsDB();
} );

// Updates the comment section to add any new comments
function updateCommentsList(data, dataIndex) {
    // Only run if comments not empty
    if (data[dataIndex].comments.length > 0){
        let commentSection = document.querySelector(".comments-list");
        commentSection.innerHTML = '<h5>Comments:</h5><ul class="comments-list"></ul>';

        console.log("Data is :",data);
        console.log("Data Index is :",dataIndex);

        for (let i = 0; i < data[dataIndex].comments.length; i++) {
            let lineBreak = document.createElement("br");
            let commentElement = document.createElement("li");
            commentElement.innerText = data[dataIndex].comments[i];
            let thumbsUpButton = document.createElement("button");
            thumbsUpButton.className = 'btn btn-success up-vote';
            let thumbsUpButtonIcon = document.createElement("i");
            thumbsUpButtonIcon.className = 'fa-solid fa-thumbs-up';
            let thumbsDownButton = document.createElement("button");
            thumbsDownButton.className = 'btn btn-primary down-vote';
            let thumbsDownButtonIcon = document.createElement("i");
            thumbsDownButtonIcon.className = 'fa-solid fa-thumbs-down';
            thumbsUpButton.appendChild(thumbsUpButtonIcon);
            thumbsDownButton.appendChild(thumbsDownButtonIcon);

            commentSection.appendChild(commentElement);
            commentSection.appendChild(lineBreak);
            commentSection.appendChild(thumbsUpButton);
            commentSection.appendChild(thumbsDownButton);
        };
    }
};

async function addCommentToThread(event, postId, newComment) {
    try {
        event.preventDefault();

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
                    updateCommentsList(data, dataIndex);
                    addCommentToThread(event, data[dataIndex]._id, newComment)
                };
            });

            updateCommentsList(data, dataIndex);
            // for (let i = 0; i < data[dataIndex].comments.length; i++){
            //     let lineBreak = document.createElement("br");
            //     let commentElement = document.createElement("li");
            //     commentElement.innerText = data[dataIndex].comments[i];
            //     let thumbsUpButton = document.createElement("button");
            //     thumbsUpButton.className = 'btn btn-success up-vote';
            //     let thumbsUpButtonIcon = document.createElement("i");
            //     thumbsUpButtonIcon.className = 'fa-solid fa-thumbs-up';
            //     let thumbsDownButton = document.createElement("button");
            //     thumbsDownButton.className = 'btn btn-primary down-vote';
            //     let thumbsDownButtonIcon = document.createElement("i");
            //     thumbsDownButtonIcon.className = 'fa-solid fa-thumbs-down';
            //     thumbsUpButton.appendChild(thumbsUpButtonIcon);
            //     thumbsDownButton.appendChild(thumbsDownButtonIcon);

            //     commentSection.appendChild(commentElement);
            //     commentSection.appendChild(lineBreak);
            //     commentSection.appendChild(thumbsUpButton);
            //     commentSection.appendChild(thumbsDownButton);
            // };
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });
});