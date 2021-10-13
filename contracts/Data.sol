// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';




contract Data {

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

  function updateEmployee(string memory _id, uint256 _sales, uint _bonus) external {
    require(employees[_id].isRegistered, 'employee not registered');
    uint256 currentBonus =  employees[_id].bonus;
    uint256 currentSales = employees[_id].sales;
    
    employees[_id].bonus = currentBonus.add(_bonus);
    employees[_id].sales = currentSales.add(_sales);

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

  function getEmployeeSales(string memory _id) public view returns(uint employeeSales) {
    return employeeSales = employees[_id].sales;

  }




}