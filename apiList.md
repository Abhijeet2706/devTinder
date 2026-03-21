# DevTinder API


## authRouter
-POST /signup
-POST /login
-POST /logout


## profileRouter
-GET /profile/view
-PATCH /profile/edit
<!-- * updating the profile, forgot password -->
-PATCH /profile/password



# ConnectionRequestRouter
* Sending a connection request
<!-- We can make this all 4 api dynamic with only one api -->
 * POST /request/send/status/:userId



-POST /request/send/intsrested/:userId
-POST /request/send/ignored/:userId
<!-- * Accept or reject the connection request -->
-POST/ request/review/accepted/:requestId
-POST/ request/review/rejected/:requestId


# userRouter
<!-- * To get all my connection or matches -->
-GET /user/request/received
-GET /user/connections
<!-- * get you the profiles of other users on platform -->
-GET /user/feed


# Status 
ignored
interested
accepted
rejected