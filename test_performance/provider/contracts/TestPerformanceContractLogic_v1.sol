pragma solidity ^0.4.17;

import '../../gmo/contracts/VersionLogic.sol';
import '../../gmo/contracts/DataObject_v1.sol';
import '../../gmo/contracts/FileObject_v1.sol';
import './TestPerformanceContract.sol';
import './TestPerformanceContract_v1.sol';

contract TestPerformanceContractLogic_v1 is VersionLogic, TestPerformanceContract {
    ContractNameService gmoCns;
    
    /* ----------- for migration ----------------- */
    function TestPerformanceContractLogic_v1(ContractNameService _cns, ContractNameService _gmoCns) VersionLogic (_cns, CONTRACT_NAME) {
        gmoCns = _gmoCns;
    }

    function call() constant returns (bytes32) {
        return "hellogiangpt kaka";
    }
    
    function sendTransaction(address _caller, bytes32 _symbol, bytes32 _name) onlyByVersionContractOrLogic {
       //todo something
    }

    function sendData(address _from,  bytes32 _objectId, bytes32 _dataHash) onlyByVersionContractOrLogic {
    	DataObject_v1 dataObject = DataObject_v1(gmoCns.getLatestContract('DataObject'));
        dataObject.create(_objectId, _from, _dataHash, cns, 'TestPerformanceContract');     
    }

    function getData(bytes32 _id) constant returns (bytes32) {
        return "objectId";
    }

    function sendFile(address _from, bytes32 _fileNameHash, bytes32 _objectId, bytes32 _dataHash) onlyByVersionContractOrLogic {
    	FileObject_v1  fileObject = FileObject_v1 (gmoCns.getLatestContract('FileObject'));
        fileObject.create(_objectId, _from, _fileNameHash, _dataHash, cns, 'TestPerformanceContract');     
    }

    function getFile(bytes32 _id) constant returns (bytes32) {
        return _id;
    }

} 