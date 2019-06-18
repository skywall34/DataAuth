# DataAuth
data authorization through the ethereum blockchain

# Running the project

We are utilizing nodemon to watch the `src` directory and recompile the entire
directory on any change. To run the project and enable file watching:

`npm run dstart` - with 'd' meaning development

# Structure of the MemSQL tables

Database: dapp

Tables:
- test1

Table Format:
- user_id (auto increment, primary key)
- username VARCHAR 255
- address (public key ethereum address, also validation to enter this database, VARCHAR 510)
- description (test text, usually just description of the user or something), TEXT, This is what the user will attempt to change

Example:

[1, "Mike Shin", "0xsomeaddressinhex", "This is a test"]

# The idea

without using conventional methods (e.g. passwords), can we use ethereum to authenticate users to a private database?

# methods (Will be using number 2, number 1 is for reference)

1. Using Assets

- Use NFTs and distribute to certain ppl, only the ones who have access to these NFTs will be authorized and be able to request changes on the database
- NFTs will be based on which databases it will have access to, some NFTs will have access to all databases while others will have access to just one.

2. Encoding user information and authorization into packets (In dev)

- user abi.encodePacked() to hash user information and authorization level into a single packet that can be stored as storage on the network
- will be able to call and change information by having this encoded packet

# Development environment
- Truffle, Ganache (POW) local dev
- Remix IDE
- NOTE: To be compatible with ethers, ganache-cli needs to be version 6.1.8 (https://github.com/ethers-io/ethers.js/issues/275)
  - npm install -g ganache-cli@6.1.8
- NOTE: branch seems to have a security flaw, need to audit and upgrade to ^2.3.1 (TODO)


# Notes (18th June, 2019)

**CRUD functions completed**

**Postman Tests Successful**

- createUser: mapping does not handle duplicates if there is a lockId creation. The duplicate handling should be done client-side. The owner checks for duplicates then calls the createUser function
- Deleting a user still leaves a gap TODO: find a way to change the length of the gap to match the deleted index (need to get the index)
- Integration of etherjs and controller code to index Successful
- Exports
  - MYSQL_DB_USER
  - MYSQL_DB_PW
  - PRIVATE_KEY_OWNER -> This will be moved to client
- Add-ons
  - Contract Address
- TODO: Finish Tests



## Functions (CRUD)

**Function params and return params specified in source code comments**
1. createUser
2. getUser
3. editUser
4. deleteUser
5. owns_user: check to see if user owns the lockId address
