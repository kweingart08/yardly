# README - Yardly

Yardly is an app that was created using Ruby on Rails and React. This app is used for scheduling yard work. Everyone needs to register as a user. Users can choose to be employees. If a user is an employee then they get to create the list of services that they will provide and how much each one cost. Users are able to add different jobs to their requests list and write reviews about different employees. 

### Link to Live Site
Here is the link to the live site so you can use the app
[https://yardly-app.herokuapp.com/]

### Technologies Used
  Technologies Used Whilte Building the App: 
  
  Atom: 
  - CSS
  - Ruby on Rails
  - React
  
  Heroku: 
  - Heroku was used to deploy the app online. 
  
### Details on the App: 
  The App consists of an MVC framework: 
  - Models: 
    - Users
    - Employees
    - Services
    - Reviews
    - Jobs 
  ![ERD](https://github.com/kweingart08/yardly/blob/master/ERD-pic.png?raw=true)
  
  - Views: 
    - The front end was built using React and Javascript. 
  - Controllers: 
    - Users
    - Employees
    - Services
    - Reviews
    - Jobs 
    
  The App includes the following routes: 
 
### Unsolved Problems / Additional Items To Add: 
  There are multiple items that I have not gotten to yet, that need updated: 
  
  - There is no authorization right now, and there is no way for administration to add additional employees.
  - The log in does not use the password at the moment.
  - Right now there can be multiple users with the same username. Need to add a check. 
  - Add phone numbers to the employees table so the users can contact workers if needed.
  - Incorporate calendar so you can click on when you need the service completed and those dates show up. 
  - Show reviews and add and edit reviews.
  - Add reminders to the users and employees when they have a job request coming up. 
  - Add a show route when you click on the service to show all the details. 
  - Add an archive so that when the job is completed, the employee can click "complete" and push it into an archive. 
  - Include a filter for services by subject or person. 
  - Add sort by price option for services
