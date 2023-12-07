$(window).on('beforeunload', disconnectThreadsDB);

$(document).ready (() => {
    console.log("home");
    dbname = "ForumData";
    dbCollection = "ThreadData";

    let commentSection = document.querySelector(".comments-list");

    
    connectToThreadsDB()
    .then(dataFromConnectAction => {
        // Access the returned data from connectAction
        console.log("Data from connectAction:", dataFromConnectAction);
        console.log(dataFromConnectAction[0].name)
        getCollectionData(dbCollection).then(data => {
            console.log("Data:", data);
            cardHeader = document.querySelector(".card-header");
            cardHeader.innerText = data[20].title;
            cardText = document.querySelector(".card-text");
            cardText.innerText = data[20].content;
            voteCount = document.querySelector(".vote-count");
            voteCount.innerText = data[20].score;
            const postButton = document.getElementById('postButton');
            const commentInput = document.getElementById('commentInput');
        
            postButton.addEventListener('click', () => {
                const newComment = commentInput.value;
                if (newComment.trim() !== '') {
                    data[20].comments.push(newComment);
                    commentInput.value = '';
                    updateCommentsList();

                };
                
            });

            function updateCommentsList() {
                commentSection.innerHTML = '<h5>Comments:</h5><ul class="comments-list"></ul>';
        
                for (let i = 0; i < data[20].comments.length; i++) {
                    let lineBreak = document.createElement("br");
                    let commentElement = document.createElement("li");
                    commentElement.innerText = data[20].comments[i];
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
            };
        
            

            for (let i = 0; i < data[20].comments.size; i++){
                let lineBreak = document.createElement("br");
                let commentElement = document.createElement("li");
                commentElement.innerText = data[20].comments[i];
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
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });
});