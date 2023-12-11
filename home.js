$(window).on('beforeunload',() => {
    disconnectThreadsDB();
} );

$(document).ready (() => {
    console.log("home");
    dbname = "ForumData";
    dbCollection = "ThreadData";
    const postarea = document.getElementById("postarea");
    
    connectToThreadsDB()
    .then(dataFromConnectAction => {
        // Access the returned data from connectAction
        console.log("Data from connectAction:", dataFromConnectAction);
        console.log(dataFromConnectAction[0].name)
        getCollectionData(dbCollection).then(data => {
            console.log("Data:", data);

            // Lettuce begin.
            // For all the posts. We cook. Anyone who likes clean code, Look away now.
            for(let i = 0; i < data.length; i ++){
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
                cardTitle.href = "thread.html?data=" + encodeURIComponent(data[i]._id); 
                cardTitle.innerHTML = data[i].title;
                // Add username if available
                if(data[i].username != ""){
                    userName = document.createElement("p");
                    userName.innerHTML += "By User: " + data[i].username;
                }
                // Add creation date
                creationDate = document.createElement("p");
                creationDate.innerHTML = "Date Posted: " + data[i].creationDate.substring(0, 10);
                // Card body
                cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                // create card text
                cardText = document.createElement("p");
                cardText.classList.add("card-text");
                // Split up the comment if its too long
                let commentSplitArray = data[i].content.split(" ");
                let comment = "";
                let commentBreak = Math.min(commentSplitArray.length, 25);
                for (let j = 0; j < commentBreak; j++){
                    comment += commentSplitArray[j] + " ";
                } 
                if (commentBreak >= 25){
                    comment += "...";
                }
                cardText.innerHTML = comment;
                // card footer
                cardFooter = document.createElement("div");
                cardFooter.classList.add("card-footer");
                cardFooter.classList.add("text-muted");
                // vote count
                voteCount = document.createElement("span");
                voteCount.classList.add("vote-count");
                voteCount.innerHTML = "Score: " + data[i].score;
                // put the spaghetti together. make sure to cook it good.
                postarea.appendChild(postDiv);
                postDiv.appendChild(cardDiv);
                cardDiv.appendChild(cardHeader);
                cardHeader.appendChild(cardTitle);
                // add in the user if we have it. Like adding mushrooms if everyone in the room like it.
                if(data[i].username != ""){
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