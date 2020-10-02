# TODO
- Verification Code resend
- Redirect not verified user to verification
- X Reset password? Admin
- User management via user class on dynamo DB role only change
- Pattern Editor using AppSync (Master/Detail using routing) , dynamic data reloading/subscribing


# AWS setup

## AppSync setup
- use dynamo table for query setup
- use cognito as standard auth

commands on client side
- npm install -g @aws-amplify/cli
- amplify init
- amplify add auth
- amplify add codegen --apiId u6z54gfvwfb3pk7r7m6mhhryvy
- amplify codegen
- amplify push 

Add new entity (Always via App sync! -> auto create Dynamo table):
Start in AppSync: Schema ressource erstellen: Neuen Typ generieren

# Dynamo DB Table schema

## Pattern
{
  "author": "Richard K. Guy",
  "boxX": 3,
  "boxY": 3,
  "description": "The glider (or featherweight spaceship) is the smallest, most common, and first-discovered spaceship. It travels diagonally across the Life grid at a speed of c/4. Gliders are important because they are easily produced (for an example see the Gosper glider gun), can be collided with each other to form more complicated objects (see glider synthesis), and can be used to transmit information over long distances.",
  "heat": 4,
  "id": "1",
  "name": "Glider",
  "pattern": ".O\n..O\nOOO",
  "type": "Spaceship",
  "year": 1969
}

## User
{
  "id": "id",
  "username":"username",
  "email":"email",
  "role":"role",
  "lastLogin":"lastLogin"
}

## Code Snippets

Debug enable JS console:
window.LOG_LEVEL = 'DEBUG';

const client = new AWSAppSyncClient({
      url: AppSync.graphqlEndpoint,
      region: AppSync.region,
      auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: (await Auth.currentSession()).accessToken.jwtToken, // adjust
      },
    });

Master Detail pattern mit Routing:
https://medium.com/@blewpri/angular-8-responsive-master-detail-3b4d591b3294
