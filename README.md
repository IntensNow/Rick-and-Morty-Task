# The project is the test task described below

Using a third-party API as a data source (example: Star Wars API https://swapi.dev/), implement a SPA React application consisting of two pages.
On the main page, display a list or cards of characters, add the possibility of character search and pagination to the list.
Implement a page with detailed information on the selected character.

Pros:
+ Using TypeScript
+ Neat layout
+ Using UI framework (Material, Ant, Bootstrap, etc.)

As an extra challenge:
+ To work with data, use storage (Redux, etc.)
+ Edit character information locally, without sending to server

## How i worked on this project

+ I used react-create-app to quickly set up the project
+ I used github projects desk for plannig tasks. [That's the link](https://github.com/users/IntensNow/projects/2/views/1)
+ For API i used https://rickandmortyapi.com/ because rick and morty is awesome series.

## Some technologies used

+ I used react-router for routing and didn't connect it with redux. 
+ I used React-bootstrap as a very convenient and lightweight UI-library

## How to navigate this project
+ /api folder is for any server requests. based on the fetch API.
+ /app contains some helpers and configs for redux.
+ /features contains controller-like pages connected to redux.
+ /typing is for typescript related features.
+ /views contains redux-free components that is going to be rendered inside the "/features" controllers

## Available Scripts

In the project directory, you can run:

### `yarn install` to install dependencies

### `yarn start` to start the project
