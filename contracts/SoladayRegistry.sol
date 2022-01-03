// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <=0.8.11;

import "./SoladayContract.sol";

error noReentracy();
error invalidAddress();

/**
 * @title SoladayRegistry
 * @dev contract to track deployers and deployments
 * @author kethcode (https://github.com/kethcode)
 */
contract SoladayRegistry is SoladayContract {

    /*********
    * Events *
    **********/

    /**     * Announce a Registration
     * @param _contract Address of deployed Contract
     * @param _deployer Address of account that deployed the Contract
     */
    event SoladayContractRegistered(
        address indexed _contract,
        address indexed _deployer
    );

    /************
    * Variables *
    *************/
    
    address[] deployers;
    mapping( address => address[] ) deployments;
    bool private locked;

    /*******************
    * Public Functions *
    ********************/

    modifier validAddress(address _addr) {
        if(_addr == address(0)) revert invalidAddress();
        _;
    }

    modifier noReentrancy() {
        if(locked) revert noReentracy();

        locked = true;
        _;
        locked = false;
    }

    function getDeployers() public view returns (address[] memory) {
        return deployers;
    }

    function getDeployments(address _deployer) public view returns (address[] memory) {
        return deployments[_deployer];
    }

    function registerDeployment(address _contract, address _deployer) public noReentrancy validAddress(_contract) validAddress(_deployer)
    {
        // find deployer
        // TODO:    redundant and a waste of storage. extract this data from emitted events.
        //          being overly cautious, expect I'll need to migrate this data

        bool hasDeployed = false;
        for(uint256 i = 0; i < deployers.length; i++)
        {
            if(_deployer == deployers[i])
            {
                hasDeployed = true;
            }
        }

        if(!hasDeployed)
        {
            deployers.push(_deployer);
        }

        // check for dups
        bool duplicateFound = false;
        for(uint256 i = 0; i < deployments[_deployer].length; i++)
        {
            if(deployments[_deployer][i] == _contract)
            {
                duplicateFound = true;
            }
        }

        // no dup, log it
        if(!duplicateFound)
        {
            deployments[_deployer].push(_contract);

            emit SoladayContractRegistered(
                _contract,
                _deployer
            );
        }
    }
}
