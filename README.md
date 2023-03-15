## CSS and JavaScript Syntax Rules

This document outlines the syntax rules for writing CSS and JavaScript code in this project. Adhering to these rules will ensure consistency and readability in the codebase.

### CSS Syntax Rules

- Use BEM syntax.
- Use kebab-case syntax for variable's names.
- Use HEX color notation. e.g. background-color: #fff;. No `white` notation.
- Put one space after the colon in property declarations, e.g. background-color: #ccc;
- Put each property declaration on a new line.
- Use double quotes for attribute selectors, e.g. [data-attribute="value"].

### JavaScript Syntax Rules

- Use camelCase for variable and function names, e.g. myVariableName or myFunctionName.
- Use upper-case for constant variables, e.g. MY_CONSTANT.
- Use `var` for global variables declaration.
- Use semicolons to end statements.
- Put each variable declaration on a new line.
- Use double quotes for string literals, e.g. const myString = "Hello, world!";.

### Naming Conventions

- Use descriptive names for variables, functions, and classes to improve readability and maintainability.
- Function names have to start with `axios` + `Get/Post/Put/Delete` e.g. function axiosGetUserData.
- Function names wich return data have to start with `get`.
- Function names wich set data have to start with `set`.
- Component handler event functions have to start with `handle`.

By following these syntax rules, we can maintain a consistent codebase and make it easier for developers to understand and modify the code. If you have any questions or concerns, please reach out to the project lead.

## Libraries

- Axios: API call https://axios-http.com/docs/intro
- Lodash: utils functions https://lodash.com/docs/4.17.15
- Moment: date functions https://momentjs.com/docs/
- React Redux/Toolkit/Logger: global state management https://react-redux.js.org/introduction/getting-started
- Material UI: UI components https://mui.com/material-ui/getting-started/overview/
- SASS: css pre-processor https://sass-lang.com/documentation/
- I18N: translations management https://www.i18next.com/
- Helmet: SEO management https://github.com/nfl/react-helmet

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
