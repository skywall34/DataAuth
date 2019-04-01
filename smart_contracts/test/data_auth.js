let sha256 = require('js-sha256');
let abi = require('ethereumjs-abi'); //library for encode abi
const assert = require('assert');
const DataAuth = artifacts.require("DataAuth");



contract("DataAuth", async accounts => {

  let userAddress = accounts[0]; //test account address you can get from ganache
  //console.log(typeof userAddress);
  let result = sha256(abi.rawEncode(["address","string","string","uint32[]"],[userAddress, "testUser1", "group1", [1,2]])); //assertion lockId
  let testLockId = "0x".concat(result);

  it("should create a new User", async () => { //only the owner can do this
    //TODO: create handler for checking if account is owner, though this is already implemented in the SC
    let instance = await DataAuth.deployed();
    let lockId = await instance.createUser.call(userAddress, "testUser1", "group1", [1,2]);

    //console.log("LockId from contract" + lockId);
    //console.log("Test LockId" + testLockId);
    assert.equal(lockId, testLockId);
  });

  it("should validate the User", async () => {
    let instance = await DataAuth.deployed();
    let lockId = await instance.createUser.call(userAddress, "testUser2", "group2", [1,2]);
    console.log("owns_user lockId: " + lockId);
    let boolResult = await instance.owns_user.call(lockId);
    assert.equal(true. boolResult);
  });

  //TODO: FIX Bugs
  it("should call a function that returns the created User", async () => {
    let instance = await DataAuth.deployed();
    let lockId = await instance.createUser.call(userAddress, "testUser3", "group2", [1,2,3]);
    console.log("getUser lockId:" + lockId);
    let [sender, callUserAddress, callUsername, callUserGroup, callDatabaseList] = await instance.getUser.call(lockId);
    assert.equal(accounts[0], sender); //assuming that we're using the same account to make this call, not good practice
    assert.equal(userAddress, callUserAddress);
    assert.equal(username, callUsername);
    assert.equal(group, callUserGroup);
    assert.equal(databaseList, callDatabaseList);
  });

  it("should edit the user correctly", async () => {
    let instance = await DataAuth.deployed();
    let lockId = await instance.createUser.call(userAddress, "testUser4", "group3", [1,2]);
    console.log("editUser lockId:" + lockId);
    let result = await instance.editUser.call(lockId, "testUser5", "group3", [1,2,3]);
    assert.equal(result, true);
  });

  //TODO: deleteUser test code
});
