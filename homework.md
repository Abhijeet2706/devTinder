-create a repository
-Initialize the repository
-node_modules,package.json,package-lock.json
-install express
-create a server
-Listen to Port 7777
-write request handler for /test,/hello
-install nodemon
-update script in package.json
-what are dependencies
-what is the use of "-g" while npm install
-Difference between caret and tilda (^ || ~)


//Routing and request handler

-initialize the git
-gitignore
-create a remote app in github
-push all the code to remote origin
-play with routes and route extension ex. hello, / , hello/2, /xys
-order of routes matter a lot 
-install postman app and make a workspace/collection > test Get Api call
-write logic to handle GET,POST,PUT,PATCH and DELETE API calls and test them on POSTMAN
-Explore routing and use of ? , + , (),* in the routes
-use if regex in routes /a/, ,/.*fly$/
-Reading the query params in the routes
-Reading the dynamic routes



//Middleware and error handlers
-multiple route handler-play with the code
-next()
-next function and errors along with res.send()
-practice the code
-What is Middleware
-How Express JS basically handles request behind the scene
-Difference between app.use and app.all
-write a dummy auth middleware for admin
-write a dummy auth middleware for all user routes, except user/login
-Error handling using  the app.use("/",(err,req,res,next)=>{})



//Database,schema and models/Mongoose
-Create a free cluster on mongoDB official website(mongoDB Atlas)
-Install mongoose library
-connect your application to the <connection-url/> database/devTinder
-call the connectDB function and connect the database before stating the application on 7777 PORT
-create a userSchema and user model
-create a POST /signup api to add data to database
-push some document using api calls from postman


//diving into the api's
-Difference between the JSON and javascript object
-Add the experess.json middleware to the app
-make your signup api dynamic and recive the data from the end user
-If you are doing user.findOne with duplicate email id which object would returned.
-API GET user by email
-create a delete user api
-API - //Feed api -GET /feed -get all the users from the database.
-API-Patch update the api
-explore the mongoose documentation for model method
-what are options in a Model.findOneAndUpdate method,and explore more about it.
-api-update the user with email id



//Data sanitization and schema validation
-Explore SchemaType options from the documentaion
-add required,unique,min,max,defaultValue,trim
-Add default
-create a custom validation function.
-Improve the DB schema-PUT all appropriate validations on each field in schema,
-Add timeStamps in the user Schema
-Add validation in skills section like we can'pass skills more then 5
-Add api level validation on patch request & signup post api
-DATA Santization - Add api validation for each field
-install validator
-Explore validator library function and validator function for password,email,photo url
-never trust request body



//Encrypting password
-validate data in SIGNUP api
-Install bcrypt package
-create paswordHash using bcrypt .hash and save the user is encrypted password
-

