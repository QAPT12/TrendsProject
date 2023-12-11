# MTG Threads
## CP4485 Emerging Trends Group Final Project

## Application Description:
  - This application is a thread-based communication platform meant to give players of the popular game "Magic: The Gathering", a place to communicate with other players in order to form strategies and decks.
  - Developed as the group final project for the course CP4485 Emerging Trends in the College of the North Atlantic's [Software Development (Co-op)](https://www.cna.nl.ca/program/software-development-co-op#) course.

## Application Set-Up:
- Clone the repository with 
```
    git clone https://github.com/QAPT12/TrendsProject
```
- Install the required packages
```
    npm install express
    npm install cors
    npm install mongodb
```
- Start the database server
```
    node index.js
```
- Open home.html in your browser of choice
  
## Technology Used:
  ### Front-End:
    - HTML
    - BootStrap
    - Javascript

  ### Back-End
    - Node.js
    - Express.js
    - MongoDB

  ### Verson Control:
    - Git and Github

  ### Required Packages:
    - cors
    - MongoDB
    - Express

## Features
### Home Page
- The home page will display a list of thread posts with their title, content, user, date of creation, and a score on up-votes and down-votes. 
- Clicking on any post will bring you to the thread page with all data related to the post, along with a section to post comments and view comments that have already been made.
### New Post Page
- The"New Post" tab will bring users to a screen that allows them to enter an (optional) username, title, and content for a post. 
- After filling these fields, clicking the "Create New Post" button will push whatever data is entered to the database, and redirect to a thread page containing the new thread data.
### About
- Navigating to the "About" tab will show users a screen with information on what the application is about, along with a button that will take you to the "New Post" tab.
### Database
- Thread and comment data is drawn from and stored in a cloud-based MongoDB database.
       
## Authors:
  - Noah Forward [@UnusualFrog](https://github.com/UnusualFrog)
  - Quintin Tuck [@QAPT12](https://github.com/QAPT12)
  - Jason Somerton-Earle [@goro391](https://github.com/goro391?tab=overview&from=2022-12-01&to=2022-12-31)


## Acknowledgements
 - Paul Dover for providing the base express connection application and for instructing the class
 - The King 😉
