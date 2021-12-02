const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Charmander", "Squirtle", "Bulbasaur"], // Names
    [
      "https://cdn.goodvinilos.com/4608/pokemon-charmander.jpg", // Images
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
      "https://static.wikia.nocookie.net/ultimate-pokemon-fanon/images/e/ea/001Bulbasaur_AG_anime.png/revision/latest/scale-to-width-down/2000?cb=20160513022152",
    ],
    [39, 44, 45], // HP values
    [52, 48, 49] // Attack damage values
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(0);
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();
  console.log("Minted NFT #2");

  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();
  console.log("Minted NFT #3");

  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();
  console.log("Minted NFT #4");

  console.log("Done deploying and minting!");

  // display results
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
