// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

import './Data.sol';




contract AppLogic {
  using SafeMath for uint256; // Allow SafeMath to be called for all uint256 types
    
    DataLogic dataLogic;
    address contractOwner; 
  
  /**********************************************************************/
  /*                        Data Variables                            */
  /**********************************************************************/
  
    constructor(address dataAddress) {
       contractOwner = msg.sender;
       
       dataLogic = DataLogic(dataAddress);
  }

  /**********************************************************************/
  /*                        Function Modifiers                         */
  /**********************************************************************/
  
  modifier onlyOwner() {
    require(msg.sender == contractOwner, 'caller not owner');
    _;
  }
  
  
   /**********************************************************************/
  /*                        Events                        */
  /**********************************************************************/

    event LogSaleAdded(string id, uint256 sales, uint256 bonus);
  
  
  function _calculateBonus(uint256 _sales) private pure returns(uint) {
    if(_sales < 100) {
     return _sales.mul(5).div(100);
    } else if(_sales >= 100 && _sales < 500 ) {
     return _sales.mul(7).div(100);
    } else {
     return _sales.mul(10).div(100);
    }
  }

  function addSale(string memory _id, uint256 _amount) external onlyOwner {
    uint256 bonusResult = _calculateBonus(_amount);
    dataLogic.updateEmployee(_id, _amount, bonusResult);
    emit LogSaleAdded(_id, _amount, bonusResult);
   
  } 
}




  /**********************************************************************/
  /*                       DataLogic Interface                          */
  /**********************************************************************/

interface DataLogic {
    function  updateEmployee(string memory _id, uint256 _sales, uint _bonus) external;
}