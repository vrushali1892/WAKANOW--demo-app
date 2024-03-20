# User App

## Default admin info

 email: admin@gmail.com
 password: admin


## What you were able to do so far

I was able to perform below mentioned points:

- Once user is submitted, the first user is approved by an admin and then user can login.
- Default user “admin” can only approve the first user, but every new user becomes an admin automatically once approved by the last user before them (similar process happens as stated above).
- Users can signup by themselves without having to login, they can only login when they have been approved.
- The users can only perform crud operation on the records they are admin for. that is remove, update existing records, a user cannot remove or update their own record.
- Data can be persisted temporarily based on the current session using json server, Calls to a mocked or demo rest api is to show us how you call your apis

## Issues encountered and

I couldn't implement temp key functionality to login.

## Any additional details to take into consideration in running and reviewing the assessment

- install node.js
- install angular cli version 12.2.5
- intall all dependencies => run command npm install
- run the application => ng serve
- start json server => npm run json:server


