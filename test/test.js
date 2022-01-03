const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Soladay Token and Registry", function () {

    it("Should Deploy", async function () {

        let accounts = await ethers.getSigners()

        const tokenFactory = await ethers.getContractFactory("SoladayToken");
        const tokenContract = await tokenFactory.deploy();
        await tokenContract.deployed();

        const registryFactory = await ethers.getContractFactory("SoladayRegistry");
        const registryContract = await registryFactory.deploy();
        await registryContract.deployed();

        console.log("  Token Contract:   ", tokenContract.address);
        console.log("  Registry Contract:", registryContract.address);

        // now try minting directly from tokenContract


        // await registryContract.registerDeployment(accounts[2].address, accounts[1].address)
        // await registryContract.registerDeployment(accounts[3].address, accounts[1].address)
        // await registryContract.registerDeployment(accounts[5].address, accounts[4].address)
        // await todayContract.getDeployers();
        // await todayContract.getDeployments(accounts[1].address);
        // await todayContract.getDeployers();
        // await todayContract.getDeployments(accounts[4].address);
    });
});