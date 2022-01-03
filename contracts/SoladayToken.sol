// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <=0.8.11;

import "@rari-capital/solmate/src/tokens/ERC20.sol";

/**
 * @title SoladayToken
 * @dev Contract for announcing deployments
 * @author kethcode (https://github.com/kethcode)
 */
contract SoladayToken is ERC20 {

    /*********
    * Events *
    **********/

    /************
    * Variables *
    *************/

    /*******************
    * Public Functions *
    ********************/
    constructor() ERC20 ("Soladay", "SAD", 18) {

    }
}