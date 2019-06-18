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

let abi = ABI.abi;
let contract_address = "";
//ether params  (we could do this outside later)
let url = "http://localhost:8545";//7545 if running ganache-cli as an application, running ganache-cli on command line is 8545
let custom_provider = new ethers.providers.JsonRpcProvider(url);
let private_key = process.env.PRIVATE_KEY_OWNER; //-> Metamask for client integration
let wallet = new ethers.Wallet(private_key, custom_provider); //connects wallet with private_key and custome_provider
let contract = new ethers.Contract(contract_address, abi, wallet);

console.log(contract.address);

//test out the contracts
//TODO: Figure out how to get value from the contracts return values
async function testContract (address, username, group, database_list){
  try{
    let result = await contract.createUser(address, username, group, database_list);

    console.log(result);

    return result; //returns the hash of the transaction
  } catch(err){
    console.log(err);
  }
}

console.log(wallet.address);
//test network

//test for Create User
if (typeof contract === undefined){
  console.log("Error connecting to ethereum");
} else {
  try {
    let r = testContract(wallet.address, "John","33",[1]);
  } catch (err){
    console.log(err);
  }
}


export default router;
