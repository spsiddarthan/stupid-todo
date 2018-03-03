# Todo App to show the functioning of web sockets. 
 The problem statement is to have a form on the UI and submit button along side it. When the submit button is clicked, the todo 
 item gets added to the list of items shown to you. If there are multiple browser windows open, all of them should display the 
 newly added item throught means of a web socket. 
 
 # Tech Stack and Folder Structure. 
  The app's backend API's are written in Node 9.7.1 and express. The socket server is also written using node amd express.
  The front end is written using ReactJS (a boiler plate called Create React App was used to create the client directory, it
  was heavily modified of course to suit this application).
  
  Everything under the api's directory refers to server side rest endpoint code. 
  Everything under the client directory is the client side react code. 
  Everyrthing under the socket server  is the socket server code. 
  
  A digital ocean instance was booted up to serve as the DB store. The same instance is also used to host the app as a whole as
  well and is available at http://159.89.175.10:3000
  
 # Workflow
   When the UI app loads, it makes an API call to the GET '/todos' end point to get a list of todos that already exist.
   When some value is typed into the form the submit button is clicked (please note that the button is disabled when the text
   are is empty), a request is made to the POST '/todos' endpoint. After creating the todo object (using the Mongoose URM), the 
   rest api emits a socket event called 'item added' to the socket server, which in turn broadcasts the message to all the UI clients.
   
   The UI clients (in our case, the various browser windows that are open), on recieving the event, add the newly added item to
   the list of items to be shown. 
   
   Whenever the delete button is clicked on the UI, a call is made to the DELETE '/todos/:id' end point by the UI, which removes the 
   item if it exists from the DB and fires an event to the socket server, which in turn broadcasts an event to all the 
   clients to remove the item that was deleted. 
   
   "socket.io" is the npm module used on the socket server.
   "socket.io-client" is the npm module used on the client side.
   
 # Possible Improvements
    Add input param validation on the rest APIs.
    Better error handling across the board.
    Add authentication to mongodb.
    
# Deployment steps for localhost
    The steps are the same as that for prod, except you should be working out of the `local` branch to see this app in action on the localhost.
    
# Deployment steps for Prod
Make sure you're on the master branch.

Install npm

Install mongodb

Install pm2

```
npm install pm2@latest -g
```

Clone the repository

```
git clone https://github.com/spsiddarthan/stupid-todo
```

cd into the stupid-todo directory's root and run npm install. Once that's done, do the same in the client directory.

Now, run the following commands:

```
pm2 start apis/index.js
pm2 start socket-server/server.js
cd client
npm start dev (run it in the background)
```

The app is ready to use! 
