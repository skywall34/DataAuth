import express from 'express';
import fs from 'fs';
import { ethers } from 'ethers';
import abiFile from '../../smart_contracts/build/contracts/DataAuth.json';
const abi = JSON.stringify(abiFile['abi']);
const router = express.Router();

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
  const url = "http://localhost:8545";//7545 if running ganache-cli as an application, running ganache-cli on command line is 8545
  const custom_provider = new ethers.providers.JsonRpcProvider(url);
  const private_key = process.env.PRIVATE_KEY_OWNER; //-> Metamask for client integration
  const wallet = new ethers.Wallet(private_key, custom_provider); //connects wallet with private_key and custome_provider
  let contract = new ethers.Contract(contract_address, abi, wallet);

  return contract;
}



//router functions



// Request getUser
router.get('/getUser/:lockId', async (req, res, next) => {

  //reqs
  const post = req.body;
  const contract_address = post.contract_address; //require address from user

  const contract = await connectToEthereum(contract_address);
  //check the contract
  if (typeof contract === undefined) {
    res.status(404).send("Contract creation failed at createUser!");
  }

  const lockId = req.params.lockId;
  try {
    const result = await contract.getUser(lockId);
    if (result === undefined) {
      res.status(404).send("getUser values undefined or false! Call on getUser");
    } else {
      console.log("getUser success!");
      res.status(200).json({
        result: result
      });
    }
  } catch (err) {
    next(err);
  }


});

//address _userAddress, string memory _username, string memory _group, uint32[] memory _databaseList
router.post('/createUser', async (req, res, next) => {

  //reqs
  const post = req.body;
  const userAddress = post.userAddress;
  const username = post.username;
  const group = post.group;
  const databaseList = post.databaseList;
  const contract_address = post.contract_address; //require address from user

  const contract = await connectToEthereum(contract_address);
  //check the contract
  if (typeof contract === undefined) {
    res.status(404).send("Contract creation failed at createUser!");
  }

  try {
    const result = await contract.createUser(userAddress, username, group, databaseList);
    // event filter
    contract.on("NewUser", async (lockId, event) => {
      console.log(lockId);
      if (result === undefined) {
        res.status(404).send("contract returned undefined!");
      } else {
        console.log("contract call successfully called and sent!");
        res.status(200).json({
          lockId: lockId
        });
      }
    });
  } catch(err) {
    next(err);
  }

});

//bytes32 _lockId, string memory _username, string memory _group, uint32[] memory _databaseList
router.post('/editUser', async (req, res, next) => {

  //reqs
  const post = req.body;
  const lockId = post.lockId;
  const username = post.username;
  const group = post.group;
  const databaseList = post.databaseList;
  const contract_address = post.contract_address; //require address from user

  const contract = await connectToEthereum(contract_address);

  if (typeof contract === undefined){
    res.status(404).send("Contract creation failed at editUser!");
  } else {
    try {
      const result = await contract.editUser(lockId, username, group, databaseList);
      contract.on("UserEdited", async (result_bool, event) => {
        if (result_bool === false) {
          res.status(404).send("Contract function call failed at editUser!");
        } else {
          console.log("editUser success!");
          res.status(200).json({
            transactionResult: result,
            editUserResult : result_bool
          });
        }
      });
    } catch (err) {
      next(err);
    }
  }

});


router.post('/deleteUser/:lockId', async (req, res, next) => {
  //reqs
  const post = req.body;
  const contract_address = post.contract_address; //require address from user

  const contract = await connectToEthereum(contract_address);
  //check the contract
  if (typeof contract === undefined) {
    res.status(404).send("Contract creation failed at createUser!");
  }

  const lockId = req.params.lockId;
  try {
    const result = await contract.deleteUser(lockId);
    contract.on("UserDeleted", async (result_bool, event) => {
      if (result_bool === false || result_bool === undefined) {
        res.status(404).send("delteUser undefined or false! Call on deleteUser");
      } else {
        res.status(200).json({
          transactionResult: result,
          deleted: result_bool
        });
      }
    });
  } catch (err) {
    next(err);
  }
});



export default router;
