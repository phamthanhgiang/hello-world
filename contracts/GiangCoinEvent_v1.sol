pragma solidity ^0.4.17;

import 'zcom-contracts/contracts/VersionEvent.sol';

contract GiangCoinEvent_v1 is VersionEvent {
    function GiangCoinEvent_v1(ContractNameService _cns) public VersionEvent(_cns, 'GiangCoin') {}

    event SendEvent(address indexed _from, address indexed _to, uint _value);

    function send(address _from, address _to, uint _value) public onlyByVersionLogic {
        SendEvent(_from, _to, _value);
    }
}