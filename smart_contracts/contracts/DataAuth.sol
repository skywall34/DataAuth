pragma solidity >=0.5.0;
import "./Ownable.sol";

contract DataAuth is Ownable{


    event NewUser(
        bytes32 indexed lockId
    );


    struct User {
        address userPubKey;
        string username;
        string group;
        uint32[] databaseList;
    }

    modifier user_exists(bytes32 _lockId) {
        require(owns_user(_lockId), "User does not exist");
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

    returns:
    lockId: abi.encode(sha256) hash of the parameters
   */

    function createUser(address _userPubKey, string memory _username, string memory _group, uint32[] memory _databaseList) public onlyOwner returns (bytes32 lockId){

        lockId = sha256(abi.encodePacked(
            _userPubKey,
            _username,
            _group,
            _databaseList
            )
        );

        // reject if the user already exists
        if(owns_user(lockId)){
            revert("lockId already exists");
        }

        users[lockId] = User(
            _userPubKey,
            _username,
            _group,
            _databaseList
        );

        emit NewUser(lockId);
    }

    /*
     Description: get the user associated with the lockId

     NOTE: This call can be made by both the administrator and the user

     params:
     _lockId: indexed lockId created at createUser. Referenced mapping to user

     return:
     - requester: admin address of who requested information
     - userPubKey: public key of the user
     - username: username of the user
     - group: group association
     - databaseList: authorized database list (specified in numbers)
    */

    function getUser(bytes32 _lockId) public view returns (address requester, address userPubKey ,string memory username, string memory group, uint32[] memory databaseList){
        if (owns_user(_lockId) == false)
          revert("lock Id does not match");
        User storage c = users[_lockId];
        return (
            msg.sender,
            c.userPubKey,
            c.username,
            c.group,
            c.databaseList
        );
    }

    /*
      Description: edits user credentials and group information
      - If the input is 0 or null no change will be made, else make a change

      NOTE: This call can only be made by the administrator

      params:
      _lockId: indexed lockId created at createUser. Referenced mapping to user
      _username: name of user to change on database
      _group: group associated with user (group association done off-chain) to change
      _databaseList: list of databases the user wants to have access to, having no input means there should be no change

      returns:
      boolean: true if success, else reverts
     */
    function editUser(bytes32 _lockId, string memory _username, string memory _group, uint32[] memory _databaseList) public user_exists(_lockId) onlyOwner returns (bool){

        if (owns_user(_lockId) == false)
            revert("lock Id does not match");

        User storage c = users[_lockId];

        if (keccak256(abi.encodePacked(_username)) != keccak256("null")){
            c.username = _username;
        }

        if (keccak256(abi.encodePacked(_group)) != keccak256("null")){
            c.group = _group;
        }

        //checks the length of the database
        if (_databaseList.length > 0){
            c.databaseList = _databaseList;
        }

        return true;

    }


     /*
       Description: removes user from databases and groups

       NOTE: This call can only be made by the administrator

       params:
       _lockId: indexed lockId created at createUser. Referenced mapping to user

       returns:
       boolean: true if success
      */
    function deleteUser(bytes32 _lockId) public user_exists(_lockId) onlyOwner returns (bool) {

        if (owns_user(_lockId) == false)
            revert("lock Id does not match");

        //for now haven't found a way to resize and find index of the array
        delete users[_lockId];

        return true;
    }


    /*
        Check if there is a lockId with id _lockId.
        parmas: _lockId: Id into contracts mapping.
        returns: boolean, true if success
    */
    function owns_user(bytes32 _lockId) internal view returns (bool exists){
        exists = (users[_lockId].userPubKey != address(0));
    }



}
