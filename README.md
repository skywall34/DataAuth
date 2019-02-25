# DataAuth
data authorization through the ethereum blockchain

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


# Notes (25th Feb, 2019)

- DataAuth contract implemented, initial build successful
- String comparison requires keccak256 and abi.encodePacked
- Strings now need to be specified as memory in parameters with the update of 0.5.0 and above compilers
- Deleting a user still leaves a gap TODO: find a way to change the length of the gap to match the deleted index (need to get the index)

## Functions (CRUD)

**Function params and return params specified in source code comments**
1. createUser
2. getUser
3. editUser
4. deleteUser
