# R6DB  
this is all the code for our frontend at r6db.com  
we are focusing on keeping the app small in size and quick in loading time.  
If you want to suggest a feature or submit a bug, please head over to the [main repository](https://github.com/r6db/r6db/issues) and submit an issue there. Only internal issues are tracked here.

## generate swagger client
`curl -X POST -H "content-type:application/json" -d '{"swaggerUrl":"https://apidocs.r6db.com/r6db.yaml"}' https://generator.swagger.io/api/gen/clients/typescript-fetch`

## Structure

```
|
| - build    -> target directory when running a full build
| - config   -> webpack configs
| - src      -> contains app src
|   |
|   | - app             -> app code
|   |   | - components
|   |   |   | - misc    -> folder for resusable and one-off components
|   |   |   | - Pages   -> top-level Pages
|   |   |   | - ...
|   |   | - lib         -> non-component code
|   |   |   | - api     -> calls to r6db api
|   |   |   | - store   -> redux stuff, routes
|   |   |   | ...
|   |   | - app.js      -> app mount
|   |   | - index.js    -> root imports
|   | - assets          -> contains images/fonts, etc
|   | - favicons        -> generated favicons
|   | - scss            -> holds variables and mixins
|   | - index.ejs       -> template for the index.html file


```

## local installation

you need to have [node](https://nodejs.org/en/) and npm (or yarn) installed locally.
after installing the dependencies with `npm install`, you have following commands available

 - `npm start` to run the dev-server
 - `npm run build` to build the app in production mode
 - `npm run build:dev` to build the app in development mode