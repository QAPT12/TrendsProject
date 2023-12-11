#Emerging Trends Group Final Project

- Application Description:
  - This application is a thread-based communication platform meant to give players of the popular game "Magic: The Gathering", a place to communicate with other players in order to form strategies and decks.

- Application Set-Up:
  - In order to run this application, after downloading the supplied files, simply open the files in an IDE and create a new terminal. Run the command "node index.js" in order to connect to the database, pulling all the data from the connected MongoDB. After this, running the "home.html" file will start the application from the home-page built using HTML, BootStrap, and Javascript running through Node and Express. The home page will display a list of posts with their title, content, user, date of creation, and a score on up-votes and down-votes with buttons attributed to them to determine the validity of the post. Clicking on any post will bring you to a thread unique to that post, containing all the data visible from the home-page, along with a section to post comments and view comments that have already been made along with their respective scores and voting buttons. Moving to the "New Post" tab will bring users to a screen that allows them to enter an optional username, title, and content for a post. After filling these fields, clicking the "Create New Post" button will push whatever data is entered to thr database, and perform another call in order to display the new post on the home screen. Navigating to the "About" tab will show users a screen with information on what the application is about, along with a button that will take you to the "New Post" tab. Any navigation to the home screen or one of the threads will perform a call to the database in order to display the relevant information.
  
- Tech Section:
  - Front-End:
    - HTML
    - BootStrap
    - Javascript

  - Back-End
    - Node.js
    - Express.js
    - MongoDB

  - Verson Control:
    - Git and Github

  - Required Packages:
    - cors
    - MongoDB
    - Express
            
- Authors:
  - Noah Forward
  - Quintin Tuck
  - Jason Somerton-Earle