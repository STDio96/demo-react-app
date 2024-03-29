# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

How to run:
1. Install dependensies: `npm install`
1. Start the project: `npm start`
1. Login using one of the provided usernames (you can try some other usernames as well):
  * John
  * Terry
  * White (doesn't have any posts)

Since the dummyjson server's users don't have a lot of posts to show how infinite scroll logic works,
I've created a page with all the posts (not related to a user) that shows this logic. You have to be authorized to view this page:
[http://localhost:3000/all-posts](http://localhost:3000/all-posts)



Data is loading from the following URL endpoints:
* https://dummyjson.com/posts
* https://dummyjson.com/users/%userId%/posts
* https://dummyjson.com/users/search
* https://dummyjson.com/posts/


Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
