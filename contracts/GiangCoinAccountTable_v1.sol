pragma solidity ^0.4.17;

import 'zcom-contracts/contracts/VersionField.sol';

contract GiangCoinAccountTable_v1 is VersionField {
    struct Account {
        bool isCreated;
        uint amount;
    }

    mapping(bytes32 => Account) public accounts;

    function GiangCoinAccountTable_v1(ContractNameService _cns) public VersionField(_cns, 'GiangCoin') {}

    /** OVERRIDE */
    function setDefault(bytes32 _id) private {
        accounts[_id] = Account({ isCreated: true, amount: 0 });
    }

    /** OVERRIDE */
    function existIdAtCurrentVersion(bytes32 _id) public constant returns (bool) {
        return accounts[_id].isCreated;
    }

    function create(address _account) public onlyByNextVersionOrVersionLogic {
        bytes32 id = bytes32(_account);
        if (exist(id)) throw;
        //require(exist(id));
        accounts[id] = Account({ isCreated: true, amount: 0 });
    }

    function setAmount(address _account, uint _amount) public onlyByNextVersionOrVersionLogic {
        bytes32 id = bytes32(_account);
        prepare(id);
        accounts[id].amount = _amount;
    }

    function getAmount(address _account) public constant returns (uint) {
        bytes32 id = bytes32(_account);
        if (shouldReturnDefault(id)) return 111;
        return accounts[id].amount;
    }
}