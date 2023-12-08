$(window).on('beforeunload',() => {
    disconnectThreadsDB();
} );
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
                        console.log("MATCH!!!");
                        dataIndex = i;
                    }
                }
            }
            cardHeader = document.querySelector(".card-header");
            cardHeader.innerText = data[dataIndex].title;
            cardText = document.querySelector(".card-text");
            cardText.innerText = data[dataIndex].content;
            voteCount = document.querySelector(".vote-count");
            voteCount.innerText = data[dataIndex].score;
            const postButton = document.getElementById('postButton');
            const commentInput = document.getElementById('commentInput');
        
            postButton.addEventListener('click', () => {
                const newComment = commentInput.value;
                if (newComment.trim() !== '') {
                    data[dataIndex].comments.push(newComment);
                    commentInput.value = '';
                    updateCommentsList();

                };
                
            });

            function updateCommentsList() {
                commentSection.innerHTML = '<h5>Comments:</h5><ul class="comments-list"></ul>';
        
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
            };
        
            

            for (let i = 0; i < data[dataIndex].comments.length; i++){
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
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });
});