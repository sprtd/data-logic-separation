// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';




contract UpgradeContract {

  using SafeMath for uint256; // Allow SafeMath to be called for all uint256 types

  /**********************************************************************/
  /*                        DATA VARIABLES                             */
  /**********************************************************************/

  
  struct Profile {
    string id;
    bool isRegistered;
    bool isAdmin;
    uint256 sales;
    uint256 bonus;
    address wallet;
  }

  address private contractOwner;
  mapping(string => Profile) employees; // mapping for storing employees

  /**********************************************************************/
  /*                        EVENTS                           */
  /**********************************************************************/

  event LogRegistered(address indexed account);
  event LogSaleAdded(string id, uint256 sales, uint256 bonus);


  /**
  * @dev Constructor 
  *      Deploying contract is contract owner
  * */


  constructor() {
    contractOwner = msg.sender;
  }

  /**********************************************************************/
  /*                        FUNCTION MODIFIERS                          */
  /**********************************************************************/

  modifier onlyOwner() {
    require(msg.sender == contractOwner, 'caller not owner');
    _;
  }



  /**********************************************************************/
  /*                        CORE FUNCTIONS                        */
  /**********************************************************************/
  function registerEmployee(string memory _id, bool _isAdmin, address _account) public onlyOwner {
    require(!employees[_id].isRegistered, 'empl. already registered');
    employees[_id] = Profile({
      id: _id,
      isRegistered: true,
      isAdmin: _isAdmin,
      sales: 0,
      bonus: 0,
      wallet: _account
    });

    emit LogRegistered(_account);
  }

  function _updateEmployee(string memory _id, uint256 _sales, uint _bonus) private onlyOwner {
    require(employees[_id].isRegistered, 'employee not registered');
    employees[_id].sales = _sales;
    employees[_id].bonus = _bonus;
  }


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
    uint256 accumulatedBonus;
    uint256 bonusResult = _calculateBonus(_amount);
    employees[_id].bonus = employees[_id].bonus.add(bonusResult);
    accumulatedBonus = employees[_id].bonus;
    _updateEmployee(_id, _amount, accumulatedBonus);
    emit LogSaleAdded(_id, _amount, accumulatedBonus);
  }


    




  /**********************************************************************/
  /*                        HELPER FUNCTIONS                        */
  /**********************************************************************/

  function isEmployeeRegistered(string memory _id) public view returns(bool isRegistered)  {
    return isRegistered = employees[_id].isRegistered;

  }


  function isEmployeeAdmin(string memory _id) public view returns(bool isAdmin)  {
    return isAdmin = employees[_id].isRegistered;
  }


  function getEmployeeBonus(string memory _id) public view returns(uint employeeBonus) {
    return employeeBonus = employees[_id].bonus;
  }
}