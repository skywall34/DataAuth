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

console.log(ethers);

let abi = ABI.abi;
let contract_address = "0x48d99aef55c1e7e940e420da674e17696c93089e";
let url = "http://localhost:8545";//7545 if running ganache-cli as an application, running ganache-cli on command line is 8545
let custom_provider = new ethers.providers.JsonRpcProvider(url);
let private_key = process.env.PRIVATE_KEY_OWNER;
let wallet = new ethers.Wallet(private_key, custom_provider); //connects wallet with private_key and custome_provider

console.log(wallet.address);


//TODO fix bug
// Connect with provider
let contract = new ethers.Contract(contract_address, abi, wallet);
console.log(contract.address);

//test out the contracts
async function testContract (address, username, group, database_list){
  try{
    let result = await contract.createUser(address, username, group, database_list);
    return result;
  } catch(error){
    console.log(error);
  }
}

let r = testContract(wallet.address, "Mike","1",[1]);
console.log(r);




//router functions

// Request getUser
router.get('/getUser/:lockId', async (req, res, next) => {
  //let lockId = await contract.createUser.call(userAddress, "testUser3", "group2", [1,2,3]);
  lockId = req.params.lockId;
  console.log("getUser lockId:" + lockId);
  let [sender, callUserAddress, callUsername, callUserGroup, callDatabaseList] = await instance.getUser.call(lockId);

});


export default router;
