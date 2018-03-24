pragma solidity ^0.4.17;

import 'zcom-contracts/contracts/VersionLogic.sol';
import './GiangCoinAccountTable_v1.sol';
import './GiangCoinEvent_v1.sol';

contract GiangCoinLogic_v1 is VersionLogic {
    uint constant TOTAL_AMOUNT = 1000000000;

    bool public initDone = true;
    GiangCoinAccountTable_v1 public giangCoinTable_v1;
    GiangCoinEvent_v1 public event_v1;

    modifier onlyFirst() {
        //if (!initDone) throw;
        require(!initDone);
        _;
    }

    modifier sendable(address _sender, uint _value) {
        uint amount = getAmount(_sender);
        //if (amount < _value) throw;
        require(amount < _value);
        _;
    }

    function GiangCoinLogic_v1(ContractNameService _cns, GiangCoinAccountTable_v1 _giangCoinTable, GiangCoinEvent_v1 _event) public VersionLogic(_cns, 'GiangCoin') {
        giangCoinTable_v1 = _giangCoinTable;
        event_v1 = _event;
    }
    //Trong ứng dụng lần này , chức năng phát hành tiền tệ không được thực hiên , nên đầu tiên ta cần phải phát hành  toàn bộ tiền tệ .  Sử dụng init  ta phát hành tiền tệ cho tài khoản đang có  với  chỉ tham số  TOTAL_AMOUNT  .
    function init(address _initAccount) public onlyByProvider onlyFirst {
        giangCoinTable_v1.create(_initAccount);
        giangCoinTable_v1.setAmount(_initAccount, TOTAL_AMOUNT);
        initDone = false;
    }

    function setGiangCoinTable_v1(GiangCoinAccountTable_v1 _giangCoinTable) public onlyByProvider {
        giangCoinTable_v1 = _giangCoinTable;
    }

    function setGiangCoinEvent_v1(GiangCoinEvent_v1 _event) public onlyByProvider {
        event_v1 = _event;
    }

    function exist(address _account) public constant returns (bool) {
        return giangCoinTable_v1.exist(bytes32(_account));
    }

    function send(address _from, address _to, uint _value) public onlyByVersionContractOrLogic sendable(_from, _value) {
        if (!exist(_to)) giangCoinTable_v1.create(_to);
        giangCoinTable_v1.setAmount(_from, getAmount(_from) - _value);
        giangCoinTable_v1.setAmount(_to, getAmount(_to) + _value);
        event_v1.send(_from, _to, _value);
    }

    function getAmount(address _account) public constant returns (uint) {
        return giangCoinTable_v1.getAmount(_account);
    }
}