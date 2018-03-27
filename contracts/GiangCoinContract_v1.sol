pragma solidity ^0.4.17;

import 'zcom-contracts/contracts/VersionContract.sol';
import './GiangCoinLogic_v1.sol';

contract GiangCoinContract_v1 is VersionContract {
    uint constant TIMESTAMP_RANGE = 60;
    GiangCoinLogic_v1 public logic_v1;

    function GiangCoinContract_v1(ContractNameService _cns, GiangCoinLogic_v1 _logic) public VersionContract(_cns, 'GiangCoin') {
        logic_v1 = _logic;
    }

    function setMyCoinLogic_v1(GiangCoinLogic_v1 _logic) public onlyByProvider {
        logic_v1 = _logic;
    }

    /*function checkTimestamp(uint _timestamp) private constant returns(bool) {
        return (now - TIMESTAMP_RANGE < _timestamp && _timestamp < now + TIMESTAMP_RANGE);
    }*/
    function call() constant returns (bytes32) {
        return logic_v1.call();
    }

    function sendTransaction(bytes _sign, bytes32 _symbol, bytes32 _name) {
        // create all parameters hash
        bytes32 hash = calcEnvHash('sendTransaction');
        hash = sha3(hash, _symbol);
        hash = sha3(hash, _name);
        // get end user's addresss
        address endUserAddr = Utils.recoverAddress(hash, _sign);

        logic_v1.sendTransaction(endUserAddr, _symbol, _name);   
    }

    function exist(address _account) public constant returns (bool) {
        return logic_v1.exist(_account);
    }

    function send(bytes _sign, /*uint _timestamp,*/ address _to, uint _value) public {
        //if (!checkTimestamp(_timestamp)) throw;
        //require(!checkTimestamp(_timestamp));
        bytes32 hash = calcEnvHash('send');
        //hash = keccak256(hash, _timestamp);
        hash = keccak256(hash, _to);
        hash = keccak256(hash, _value);
        address sender = recoverAddress(hash, _sign);
        logic_v1.send(sender, _to, _value);
    }

    function getAmount(address _account) public constant returns (uint) {
        return logic_v1.getAmount(_account);
    }


    function init(address _account) public constant {
        return logic_v1.init(_account);
    }
}