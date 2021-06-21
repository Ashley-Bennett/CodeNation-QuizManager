# Code Nation - Synoptic Project - Quiz Manager

## Preface

This is the final project set by code nation in order for me to pass the bcs exam and complete my apprenticeship. I was given an option of projects to chose from but I chose to do the quiz manager one becuase it works best for me and my tech stack. I felt most comfortable with it.

The brief was to create a front-end website where users of varying permission levels could login and acces a database of quizzes. Certain users would be able to edit, add and delete quizes, questions and answers.

To complete this task. I decided to use react with an express backend and a sql database to store the data.

## Set Up

- To first set this up, make sure you you run `npm i` in both the client and the server folders. This will install any packages I have used.
- You must have an instance of MySQL running, this can be downloaded [here](https://www.mysql.com/products/workbench/), and have full access to the credentials.
- You must then a file in the server folder called `DBPassword.example.js`, first remove the `example` from the name and then change the password to the password used to login to your MySQL.
- Create a new schema on MySQL and then edit the `dbConfig.js` file and change the credentials to suit you.
- Then start the server: `CodeNation-QuizManager\server> npm run devStart`. This should spin up the file and you should get a console logging that the server is listening on port 3001
- To create the tables, cd into the utils folder in the client side and run: `CodeNation-QuizManager\client\src\Utils> node initTables.js`. This should populate the schema with the correct tables and default permissions.
- You then need users, you can do this manually in the database or run:`CodeNation-QuizManager\client\src\Utils> node createUsers.js` and follow the prompts in the console. Permission levels are as follows: 1 - Restricted, 2 - View, 3 - Edit.
- The last thing to do is start the front-end with: `CodeNation-QuizManager\client> npm start`. This should boot up the front-end and direct you to the login page.
