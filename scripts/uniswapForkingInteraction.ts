import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main( ){
    const ROUTER_CONTRACT_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAI_CONTRACT_ADDRESS  = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

    const TOKEN_WALLET = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

    await helpers.impersonateAccount(TOKEN_WALLET);

    const impersonatedSigner = await ethers.getSigner(TOKEN_WALLET);

     const amountOut = ethers.parseUnits("20", 18);
    const amountInMax = ethers.parseUnits("1000", 6);

     const USDC_Contract = await ethers.getContractAt("IERC20TOKEN", USDC_CONTRACT_ADDRESS, impersonatedSigner);
    const DAI_Contract = await ethers.getContractAt("IERC20TOKEN", DAI_CONTRACT_ADDRESS);

    const ROUTERV2 = await ethers.getContractAt("IUNISWAPV2", ROUTER_CONTRACT_ADDRESS, impersonatedSigner);

    await USDC_Contract.approve(ROUTERV2, amountOut);

    // ============================ balance before transaction ===========================

    const usdc_balance_before = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const dai_balance_before = await DAI_Contract.balanceOf(impersonatedSigner.address);

    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);


    console.log("usdc balance before swap", Number(usdc_balance_before));
    console.log("dai balance before swap", Number(dai_balance_before));

    await ROUTERV2.swapTokensForExactTokens(
        amountOut,
        amountInMax,
        [USDC_CONTRACT_ADDRESS, DAI_CONTRACT_ADDRESS],
        impersonatedSigner.address,
        deadline
    );

     // ============================ balance before transaction ===========================
     const usdc_balance_After = await USDC_Contract.balanceOf(impersonatedSigner.address);
     const daiBal_balance_After = await DAI_Contract.balanceOf(impersonatedSigner.address);

        console.log("============================ balance before transaction ===========================");

         console.log("usdc balance after", Number(usdc_balance_After));
        console.log("dai balance after", Number(daiBal_balance_After));


    await ROUTERV2.swapTokensForExactTokens(
        amountOut,
        amountInMax,
        [USDC_CONTRACT_ADDRESS, DAI_CONTRACT_ADDRESS],
        impersonatedSigner.address,
        deadline
    );

        const usdc_After = await USDC_Contract.balanceOf(impersonatedSigner.address);
        const daiBal_After = await DAI_Contract.balanceOf(impersonatedSigner.address);

        console.log("============================ balance after 2 transaction ===========================");

         console.log("usdc balance ", Number(usdc_balance_After));
        console.log("dai balance", Number(daiBal_balance_After));



}

main().then((res) => process.exit(1)).catch(err => {console.log(err); process.exit(1);})