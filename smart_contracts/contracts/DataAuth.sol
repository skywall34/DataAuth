pragma solidity >=0.4.22 <0.6.0;

contract DataAuth is Ownable{

  event NewUser(
    bytes32 indexed lockId;
  );


  struct User {
    address userPubKey;
    bytes32 username;
    bytes32 group;
    uint32[] databaseList;
  }

  modifier () {
    require();
    _;
  }

  mapping (bytes32 => User) users;

  /*
    Description: adds the new user and authorized group and databases

    NOTE: This call is done by the administrator

    params:
    _username: name of user to add to database
    _group: group associated with user (group association done off-chain)
    _databaseList: list of databases the user wants to have access to
   */

   function createUser(bytes32 _username, bytes32 _group, uint32[] _databaseList) private onlyOwner returns (bytes32 lockId){

   }

   /*
     Description: get the user associated with the lockId

     NOTE: This call can be made by both the administrator and the user

     params:
     _lockId: indexed lockId created at createUser. Referenced mapping to user
    */
    function getUser(bytes32 _lockId) public view returns (address requester, address username, bytes32 group, uint32[] databaseList){

    }

    /*
      Description: edits user credentials and group information

      NOTE: This call can only be made by the administrator

      params:
      _lockId: indexed lockId created at createUser. Referenced mapping to user
     */
     function editUser(bytes32 _lockId) private onlyOwner returns (bool){

     }


     /*
       Description: removes user from databases and groups

       NOTE: This call can only be made by the administrator

       params:
       _lockId: indexed lockId created at createUser. Referenced mapping to user
      */
      function deleteUser(bytes32 _lockId) private onlyOwner returns (bool) {

      }


}
