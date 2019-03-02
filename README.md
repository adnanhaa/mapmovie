<h1 align='center'>
  Movie App
</h1>

Demo page [https://mapmovie.herokuapp.com](https://mapmovie.herokuapp.com)


### Usage

```bash
git clone https://github.com/adnanhaa/movieapp.git

cd movieapp

npm install

npm start
```

This project was bootstrapped with Webpack.
### Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8008](http://localhost:8008) to view it in the browser.

For LAN change host in the webpack.config.js
```js
devServer: {...
            host: '20.20.1.4',//LAN - your pc ip address
        ...},
```
Open [http://<20.20.1.4>:8008] to view it in the mobile or pc browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.<br>



### `npm run build`
Builds the app for production to the `public` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!



Future improvements:
- Code Splitting
- Analyzing the Bundle Size
- Making a Progressive Web App

