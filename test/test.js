const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Soladay Token and Registry", function () {

    it("Should Deploy", async function () {

        let accounts = await ethers.getSigners()

        const tokenFactory = await ethers.getContractFactory("SoladayToken");
        const tokenContract = await tokenFactory.deploy();
        await tokenContract.deployed();

        const registryFactory = await ethers.getContractFactory("SoladayRegistry");
        const registryContract = await registryFactory.deploy(tokenContract.address);
        await registryContract.deployed();

        console.log("  Token Contract:   ", tokenContract.address);
        console.log("  Registry Contract:", registryContract.address);

            // now try minting directly from tokenContract
            describe("SoladayToken", function () {

                it("Should Mint Tokens", async function () {
                    await tokenContract.mint(accounts[0].address, 100)
                    let afterBalance = await tokenContract.balanceOf(accounts[0].address)
                    expect(afterBalance).to.equal(100)
                });
            });

            describe("SoladayRegistry", function () {

                it("Should Mint Tokens on Deploy", async function () {
                    await registryContract.registerDeployment(accounts[2].address, accounts[1].address)
                    let afterBalance = await tokenContract.balanceOf(accounts[1].address)
                    expect(afterBalance).to.equal(ethers.utils.parseUnits("1",18))
                });
            });

        // await registryContract.registerDeployment(accounts[2].address, accounts[1].address)
        // await registryContract.registerDeployment(accounts[3].address, accounts[1].address)
        // await registryContract.registerDeployment(accounts[5].address, accounts[4].address)
        // await todayContract.getDeployers();
        // await todayContract.getDeployments(accounts[1].address);
        // await todayContract.getDeployers();
        // await todayContract.getDeployments(accounts[4].address);
    });
});