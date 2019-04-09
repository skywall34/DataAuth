import express from 'express';
import { ethers } from 'ethers';
const router = express.Router();
import ABI from './abi.js';

// Code below is for environment setup for dev purposes only
const envVars = [
  'PRIVATE_KEY_OWNER', //export private key to your console for dev. For clients, it will be stored in the browser
];
//TODO: get the private key from client such as metamask or others
function errMsgTag(strings, envExp) {
  return `Environment variable ${envExp} not defined.`
}
for (let envVar of envVars) {
  if (!process.env[envVar]) { throw new Error(errMsgTag`${envVar}`); }
}


//logic functions

//common function to connect to ethereum network
async function connectToEthereum(contract_address) {
  //ether params  (we could do this outside later)
  let url = "http://localhost:8545";//7545 if running ganache-cli as an application, running ganache-cli on command line is 8545
  let custom_provider = new ethers.providers.JsonRpcProvider(url);
  let private_key = process.env.PRIVATE_KEY_OWNER; //-> Metamask for client integration
  let wallet = new ethers.Wallet(private_key, custom_provider); //connects wallet with private_key and custome_provider
  let contract = new ethers.Contract(contract_address, abi, wallet);

  return contract;
}

//test out the contracts
async function testContract (address, username, group, database_list){
  try{
    let result = await contract.createUser(address, username, group, database_list);
    return result;
  } catch(err){
    console.log(err);
  }
}




//router functions



// Request getUser
router.get('/getUser/:lockId', async (req, res, next) => {

  //reqs
  let post = req.body;
  let contract_address = post.contract_address; //require address from user
  let abi = ABI.abi;

  let contract = connectToEthereum(contract_address);
  //check the contract
  if (typeof contract === undefined) {
    res.status(404).send("Contract creation failed at createUser!");
  }

  lockId = req.params.lockId;
  console.log("getUser lockId:" + lockId);
  try {
    let [sender, callUserAddress, callUsername, callUserGroup, callDatabaseList] = await contract.getUser.call(lockId);
    if (sender && callUserAddress && callUsername && callUserGroup && callDatabaseList) {
      res.status(404).send("getUser values undefined or false! Call on getUser");
    } else {
      console.log("getUser success!");
      res.status(200).json({
        sender: sender,
        userAddress: callUserAddress,
        userGroup : callUserGroup,
        databaseList: callDatabaseList
      });
    }
  } catch (err) {
    next(err);
  }


});

//address _userAddress, string memory _username, string memory _group, uint32[] memory _databaseList
router.post('/createUser', async (req, res, next) => {

  //reqs
  let post = req.body;
  let userAddress = post.userAddress;
  let username = post.username;
  let group = post.group;
  let databaseList = post.databaseList;
  let contract_address = post.contract_address; //require address from user
  let abi = ABI.abi;

  let contract = connectToEthereum(contract_address);
  //check the contract
  if (typeof contract === undefined) {
    res.status(404).send("Contract creation failed at createUser!");
  }

  try {
    let lockId = await contract.createUser(userAddress, username, group, databaseList);
    console.log(lockId);
    if (lockId === undefined) {
      res.status(404).send("Lock ID returned undefined!");
    } else {
      console.log("LockID successfully called and sent!");
      res.status(200).json({
        lockId: lockId
      });
    }
  } catch(err) {
    next(err);
  }

});

//bytes32 _lockId, string memory _username, string memory _group, uint32[] memory _databaseList
router.post('/editUser', async (req, res, next) => {

  //reqs
  let post = req.body;
  let lockId = post.lockId;
  let username = post.username;
  let group = post.group;
  let databaseList = post.databaseList;
  let contract_address = post.contract_address; //require address from user
  let abi = ABI.abi;

  let contract = connectToEthereum(contract_address);

  if (typeof contract === undefined){
    res.status(404).send("Contract creation failed at editUser!");
  } else {
    try {
      let result_bool = await contract.editUser(lockId, username, group, databaseList);
      console.log(result_bool);
      if (result_bool === false) {
        res.status(404).send("Contract function call failed at editUser!");
      } else {
        console.log("editUser success!");
        res.status(200).json({
          editUserResult : result_bool
        });
      }
    } catch (err) {
      next(err);
    }
  }

});


router.post('/deleteUser/:lockId', async (req, res, next) => {
  //reqs
  let post = req.body;
  let contract_address = post.contract_address; //require address from user
  let abi = ABI.abi;

  let contract = connectToEthereum(contract_address);
  //check the contract
  if (typeof contract === undefined) {
    res.status(404).send("Contract creation failed at createUser!");
  }

  lockId = req.params.lockId;
  console.log("getUser lockId:" + lockId);
  try {
    let result_bool = await contract.deleteUser.call(lockId);
    if (result_bool === false || result_bool === undefined) {
      res.status(404).send("delteUser undefined or false! Call on deleteUser");
    } else {
      console.log("deleteUser success!");
      res.status(200).json({
        deleted: result_bool
      });
    }
  } catch (err) {
    next(err);
  }
});



export default router;
