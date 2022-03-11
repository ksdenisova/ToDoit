# To Doit
React front end app `To Doit` that allows you to create To Do lists. This app will consume a [JSON Server](https://github.com/typicode/json-server) through a request endpoint.

# How to Setup

To set up To Doit, run the following commands in your Terminal:

`git@github.com:ksdenisova/ToDoit.git`

`cd ToDoit`

# How to Run JSON Server

Install the JSON Server following the [instruction](https://github.com/typicode/json-server) and run these commands in the Terminal to start the JSON Server:

`cd json_server`

`json-server --watch db.json --port 3001`

The JSON Server will start on port 3001.

# How to Run To Doit app

Run the following commands in the separate Terminal window:

`cd to-do-app`

Install dependencies before the first run:

`npm install`

Start the To Doit app:

`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

# How to Run the Tests
To run the Unit tests, run this command in the Terminal:

`npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# How to Use To Doit app
<img width="1572" alt="image" src="https://user-images.githubusercontent.com/89826596/157936295-ca35b267-e41c-423e-9860-3d7dd4ec77b1.png">

1. Enter a new To Doit list title, click `+` button, or press `Enter` to save.
2. Switch between lists clicking on titles.
3. To delete an active list, click on the `Delete List` button.
4. Add a new To Doit item in ListView.
5. Hover an item to see the `edit` and `delete` buttons.
6. Mark the item as done by clicking on the checkbox or the item name.
7. You can't delete a completed item.
