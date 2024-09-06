# Movies React

Welcome to the Movies React project.

We want to be able to see all Movies we have in our Movietheque. \
We can access our data thanks to an API describe here : http://ec2-15-237-160-101.eu-west-3.compute.amazonaws.com:8828/v3/api-docs 
http://ec2-15-237-160-101.eu-west-3.compute.amazonaws.com:8828/swagger-ui/index.html

## Exercice 1

Create a service to issue requests to the API to retrive the data.
We need to be able to :

- Retrieve all movies by page
- Retrieve all actors or directors (Person) by page
- Get a Person by its ID.

## Exercice 2


Create a React component to display the first 3 Movies in a table. \
This table must have simple borders.

## Exercice 3

Use the new component on the homepage.

## Exercice 4

- We want to get Movies 3 by 3 with pagination
- We need a button to load the next 3 movies
- The button needs to disappear when all the movies have been retrieved

## Exercice 5

We would like to display actors and directors by name and not only their own IDs.

# Technical Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
