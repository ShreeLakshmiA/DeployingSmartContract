import { Web3 } from 'web3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const __dirname = path.resolve();
dotenv.config();

const { ACCOUNT04, SIGNER_PRIVATE_KEY_ACC04 } = process.env;

// Set up a connection to the Infura network
const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/9a8bbaf756724d5684cb7d177ba624c0'));

const bytecodePath = path.join(__dirname, 'bytecode.bin');
const bytecode = '0x' + fs.readFileSync(bytecodePath, 'utf8');
// console.log("bytecode:\n", bytecode);

const abiPath = path.join(__dirname, 'abi.json');
const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
// console.log("abi:\n", abi);

const contract = new web3.eth.Contract(abi);

const deployFn = async() => {
	const privateKey = '0x' + SIGNER_PRIVATE_KEY_ACC04;
	const acc = web3.eth.accounts.privateKeyToAccount(privateKey);
	web3.eth.accounts.wallet.add(acc);

	const account = ACCOUNT04;
	
	const contractDeployer = contract.deploy({
		data: bytecode,
		arguments: [],
	});

	// To Deploy the Smart Contract
	const contractAddress = await contractDeployer.send({
		from: account,
		gas: 5000000,
		gasPrice: web3.utils.toWei('50', 'gwei'),
	}).then((newContractInstance) => {
		const contractAdd = newContractInstance.options.address;
        console.log("Contract address: ", contractAdd);
		const deployedAddressPath = path.join(__dirname, 'ContractAddress.bin');
		fs.writeFileSync(deployedAddressPath, contractAdd);
		return contractAdd;
    }).catch((error) => {	
		console.log("Error occured.. Contract already Deployed..\n" + error);
		return error;
	});

	return contractAddress;
}

deployFn();