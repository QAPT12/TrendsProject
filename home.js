$(window).on('beforeunload', disconnectThreadsDB);

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
            // For all the posts. We cook. Anyone who likes clean code, Look away now
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
                cardTitle.href = "thread.html?data=" + encodeURIComponent(data[i]._id); // TODO: when jason has link working put here
                cardTitle.innerHTML = data[i].title;
                // Card body
                cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                // Pee?
                cardText = document.createElement("p");
                cardText.classList.add("card-text");
                cardText.innerHTML = data[i].content;
                // card footer
                cardFooter = document.createElement("div");
                cardFooter.classList.add("card-footer");
                cardFooter.classList.add("text-muted");
                //button time
                upButton = document.createElement("btn");
                upButton.classList.add("btn");
                upButton.classList.add("btn-success");
                upButton.classList.add("up-vote");
                // up button image
                upImage = document.createElement("i");
                upImage.classList.add("fa-solid");
                upImage.classList.add("fa-thumbs-up");

                downButton = document.createElement("btn");
                downButton.classList.add("btn");
                downButton.classList.add("btn-primary");
                downButton.classList.add("down-vote");
                // up button image
                downImage = document.createElement("i");
                downImage.classList.add("fa-solid");
                downImage.classList.add("fa-thumbs-down");
                // vote count
                voteCount = document.createElement("span");
                voteCount.classList.add("vote-count");
                voteCount.innerHTML = data[i].score;
                // put the spaghetti together
                postarea.appendChild(postDiv);
                postDiv.appendChild(cardDiv);
                cardDiv.appendChild(cardHeader);
                cardHeader.appendChild(cardTitle);
                cardDiv.appendChild(cardBody);
                cardBody.appendChild(cardText);
                cardDiv.appendChild(cardFooter);
                cardFooter.appendChild(upButton);
                upButton.appendChild(upImage);
                cardFooter.appendChild(downButton);
                downButton.appendChild(downImage);
                cardFooter.appendChild(voteCount);

                
            }

        })
    })
    .catch(error => {
        console.error("Error:", error);
    });

});