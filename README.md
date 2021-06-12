# My Contacts
## Overview :
This is an interactive & user-friendly Address Book / Contact Keeper application. The motivation behind it is to create a full-stack web application which users can use in their day to day lives. 
<br> For a **live preview**, kindly visit http://mycontacts2021.herokuapp.com/ 



## Table of Contents :
* [Installation & Usage](https://github.com/Evergreen07/My-Contacts#installation--usage-)
* [Features](https://github.com/Evergreen07/My-Contacts#features-)
* [Technologies Used](https://github.com/Evergreen07/My-Contacts#technologies-used-)
* [API Documentation](https://github.com/Evergreen07/My-Contacts/blob/master/README.md#api-documentation-)
* [Contributions](https://github.com/Evergreen07/My-Contacts#contributions-) 



## Installation & Usage :

Dependencies
```
npm install
npm client-install
```


Development Mode
```
npm run dev      // Express & React PORT:3000 & PORT:5000
npm run server   // Express API Only PORT:5000
npm run client   // React Client Only PORT:3000
```



## Features :
* **Register / Login :** Users can register & Login to their private account.
* **View :** Lets users view all their personal contacts in *reverse-chronological order*.
* **Create :** Lets users add new contacts i.e name, email, phone no. & type and finally save. 
* **Update :** Allows users to make any changes in their existing contacts.
* **Search :** A filterable search list, which filters contact cards based on the keywords entered.
* **Delete :** The user can delete any of their particular contacts when necessary.
* **Logout :** Finally user can logout from their application.
* **Storage :** Any image that is uploaded is stored safe & permanently in the database.
* **Responsiveness :** This application is completely responsive & produces a smooth user experience across Mobile Screens, Tablets & PCs.
 
 
 
## Technologies Used :
* **Front-End :-** React, HTML, CSS, JavaScript, CSS Flexbox & Grids.
* **Backend & Database :-** Node JS, Express, MongoDB, JWT Authentication, Bcrypt Js.
* **Deployment :-** Heroku, Heroku CLI. 



## API Documentation :
* **Register a User**<br><br>
  * Request : [POST] /api/users
    * Headers
        ```
        Content-type : application/json
        ```
    * Body 
        ```
        {
          "name" : "",
          "email" : "",
          "password" : "",
          "confirm_password" : ""
        }
        ```
  * Response : 200 (application/json)
    * Body 
        ```
        {
          "token" : ""
        }
        ```
        <br><br>
* **Login a User**<br><br>
  * Request : [POST] /api/auth
      * Headers
        ```
        Content-type : application/json
        ```
      * Body 
        ```
        {
          "email" : "",
          "password" : ""
        }
        ```
  * Response : 200 (application/json)
       * Body 
         ```
         {
           "token" : ""
         }
         ```
         <br><br>
* **Get user's Contacts**<br><br>
  * Request : [GET] /api/contacts
      * Headers
        ```
        x-auth-token : JWT_TOKEN
        ```
     
  * Response : 200 (application/json)
      * Body 
        ```
        {
          "contacts" : []
        }
        ```
        <br><br>
* **Add new Contact**<br><br>
  * Request : [POST] /api/contacts
      * Headers
        ```
        x-auth-token : JWT_TOKEN
        Content-type : application/json
        ```
      * Body
        ```
         {
           "name":"",
           "email":"",
           "phone":"",
           "type":""
         }
        ```
     
  * Response : 200 (application/json)
    * Body
        ```
         {
           "contact": {}
         }
        ```
        <br><br>
* **Update Contact**<br><br>
  * Request : [PUT] /api/contacts/:id
      * Parameters
        ```
        id: (A Unique Identifier of the Object)
        ```
      * Headers
        ```
        x-auth-token : JWT_TOKEN
        Content-type : application/json
        ```
      * Body
        ```
         {
           "name":"",
           "email":"",
           "phone":"",
           "type":""
         }
        ```
     
  * Response : 200 (application/json)
    * Body
        ```
         {
           "contact": {}
         }
        ```
        <br><br>
* **Delete Contact**<br><br>
  * Request : [DELETE] /api/contacts/:id
      * Parameters
        ```
        id: (A Unique Identifier of the Object)
        ```
      * Headers
        ```
        x-auth-token : JWT_TOKEN
        ```
     
  * Response : 200 (application/json)
    * Body
        ```
         {
           "msg" : "Contact Deleted"
         }
        ```
    


### Contributions : 
* You are free to clone & contribute to improve the app, also report bugs & help in making it even better.
* Before you join development, please set up the project on your local machine, run it and go through the application completely. Press on any button you can find and see where it leads to. Explore.
* When you're submitting a PR for a UI-related issue, it would be really awesome if you add a screenshot of your change or a link to a deployment where it can be tested out along with your PR.
