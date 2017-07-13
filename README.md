# The Jolly Green Giant
***
## We are building a product to help aspiring business to solve their online order delivery related problems. 

***
# Motivation

### Many Californians have businesses that would greatly benefit from the ability to use our shopping cart and real-time delivery tracking application
---
# Link to live example 
   
   [link to heroku app](https://the-jolly-green-giant.herokuapp.com/tracker)
   [link to heroku app](https://the-jolly-green-giant.herokuapp.com/viewer) 
   ##### *Note you must open the tracker, then open the viewer, to see a marker!*
   ### Keep both browsers open, to track your location in real-time!
  
---

# Tecnology Used
+ NodeJS
+ ExpressJS
+ PostgreSQL
+ PG Promise
+ GoogleMaps API
+ Socket.io
+ Bootstrap
+ Express-Session
***
# Installation Instructions
### To run this app successfully, you must have PostgreSQL installed. You can run the brew installation command:
    $ brew install postgresql
### If this is your first time installing Postgres with Homebrew, you'll need to create a database with the following command in your terminal/ commandline:
    $ initdb /usr/local/var/postgres -E utf8
    
### If you have never set up and run a server with PostgreSQL, you may get this error:
    psql: could not connect to server: No such file or directory
    Is the server running locally and accepting
    connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
### Don't panic. Run this line, and you should not have any issues, going forward:
    pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
### If you're in your project directory, you can run postgres and create the project database:
    $ psql
### You will then see your username set equal to the poundsign. It should look like the following:
    waynebanks=#
### You, then need to run the following to create your 'waynes_world' database:
    CREATE DATABASE dbname;
### At this point, you should have already done a pull from the master branch and done an NPM install with the following:
    $ git pull
### then...
    $ npm install
### You can now use the command to start-react:
    $ npm run start-dev
### You can now run your server with:
    $ node app
#### If you have nodemon installed you can:
    $ nodemon app 
#### If you do not, you can install or just use our start script:
    $ npm run start-dev
### If this worked correctly, you should see:
    > sessions-auth-cookies-and-milk@1.0.0 start /Users/waynebanks/Desktop/dev/sessions-auth-cookies-and-milk
    > node app "dev"
    [nodemon] 1.11.0
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: *.*
    [nodemon] starting `node app app.js`
    session and cookies is listening on port: 3002
***
# Important Info about getting the tracker to work!!!
#### The App will not track your location unless you have both the viewer and the tracker open
***
+ 1. Open the viewer browser
``` 
localhost:3002/tracker
```
+ 2. Open the Tracker browser
``` 
localhost:3002/tracker 
```
+ 3. Viewer should now have a marker that displays your location
#### As long as both browsers are open your location will be tracked and stored into the breadcrumbs array.
![Dev Console display](/public/images/breadcrumb.png)
---
![Location Marker](/public/images/marker.png)

***
# So What's Next for The JGG App?
### I am also building a shopping cart front end that I will add to this repo, once I solidify the funcationality. Users will be able to make purchases through the PayPal API. I plan to pass these purchases and customer's locations to our drivers. This is, obviously, a work in process. 

#### If you would like to contribute to that repo, you can just follow this link:
   [link to Shopping Cart's Repo](https://github.com/Limelight-Management-Group/the-jolly-green-giant)
   
   ![Shopping Cart](/public/images/shopping-cart.png)
   

