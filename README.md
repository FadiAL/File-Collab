# File-Collab
Access and Modify files in realtime with others, with advanced features

## Web Technologies Used
* ### Socket.io
Socket.io is used to communicate between the server and client.  The socket events used are detailed in the later sections
* ### React
React is used to render the front-end views.  Nothing but a basic skeleton html is sent to the user.
* ### Redis
Redis is used as the storage option since the data is write-heavy and needs extremely fast access.  Files are stored using their names as unique identifiers (might switch to ID's later) and their key contains the file contents
* ### Express
Express is the framework used for the server backend, though not much of it is used since it is socket-heavy
* ### Webpack
Webpack is the bundler that is combining all import statements in index.js into one large js file.  It also runs a babel plugin to convert the code to ES5
* ### Gulp
Gulp runs browsersync and some automation, though its removal is being considered in favor of webpack
* ### Babel
Babel primarily works to convert the ES6 code to ES5.  It is used as a loader in webpack with the presets defined in .babelrc

## Socket events
* **Requests:**
  * "files": Request all files on the server
  * "fileReq": Request a file by name, giving its contents
  * "keystroke": Request an update for a file because the user typed on it
  * "fileCreate": Request the creation of a new file with a given name
  * "delete": Request the deletion of a given file
* **Responses:**
  * "files": Response to the files request - A list of the files on the server
  * "fileReq": Response to the fileReq request - A requested file and its contents
  * "keystroke": Response to the keystroke request - An update to the file text contents"
  * "fileCreate": Response to the fileCreate request - File successfully created
  * "fileTaken": Response to the fileCreate request - File name taken
  * "delete": Response to the delete request - File deleted

## Future Plans
* Use of Redux to manage state
* Removal of Gulp
* Advanced configuration of Webpack
* Test libraries (mocha, jenkins, etc...)
