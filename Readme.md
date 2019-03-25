# Dealer Inspire Front End Code Challenge

## Project Architecture

The project has two parts, the first is the Server and then the Client.

### How to start the project?

#### `npm i`

it will install all the dependencies

#### `npm client-install`

it will install all the dependencies on the client, you can `cd` into the client and can still do `npm install`

#### `npm run dev`

It will run the node project and client at the same time. Concurrently is being used to run server and client at the same time

### Server

I have used express to create the server you can check it out here [`server.js`](./server.js)
If you want to take a look at all the api routes in the service click here [`Routes`](./routes/api/users.js)
The constant configs are in [`config`](./config/keys.js)

#### Why?

The server has been used to flatten the data and handle error correctly. I have simplified the data structure so that it's easier on the front end to map the data.

### Client

Client is build using Create React App 2. You can start the dev server on client as mentioned above. If you want to run the tests you can test it using `npm run test`. You can search for a new user directly from the typeahead.

#### Landing Page

You can visit the localserver at [http://localhost:3000/](http://localhost:3000/)

You can start typing user names and the typeahead will fetch users based on how the behance api returns the data. Once the dropdown will show the users you can click on user's name and it will route you to their profile page.

#### Profile Page

- Info Section: It will display the author's full name, username, and other information about them
- Stats: In Stats section you can click the followers/following and it will open the modal showing you the list of followers/ following the user has.
- Work Experience: This section might be visible for some user and might not be visible for other based on what the behance api returns.
- Projects: The last section will show all the user's project. You can click on them which will take you to the behance project details.
