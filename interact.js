import { Web3 } from 'web3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';


const __dirname = path.resolve();
dotenv.config();

const { ACCOUNT01, ACCOUNT02, ACCOUNT03, ACCOUNT04, SIGNER_PRIVATE_KEY_ACC04, SIGNER_PRIVATE_KEY_ACC01 } = process.env;

const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/9a8bbaf756724d5684cb7d177ba624c0'));

// To read deployed Contract Address from the ContractAddress.bin file
const contractAddressPath = path.join(__dirname, 'ContractAddress.bin');
const contractAddress = fs.readFileSync(contractAddressPath, 'utf8');

// To read the abi from the abi.json file
const abiPath = path.join(__dirname, 'abi.json');
const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

const contract = new web3.eth.Contract(abi, contractAddress);

// To interact and perform transactions with smart contract
const interactFn = async() => {
    // To add accounts to the wallet
    const privateKey01 = '0x' + SIGNER_PRIVATE_KEY_ACC01;
	const acc01 = web3.eth.accounts.privateKeyToAccount(privateKey01);
	web3.eth.accounts.wallet.add(acc01);
    const privateKey04 = '0x' + SIGNER_PRIVATE_KEY_ACC04;
	const acc04 = web3.eth.accounts.privateKeyToAccount(privateKey04);
	web3.eth.accounts.wallet.add(acc04);
    
    // If places marked as *a is "ACCOUNT04", *b should be "ACCOUNT01". Vice versa.
    const receipt = await contract.methods.markAttendance(ACCOUNT02).send({
        from: ACCOUNT04,    //*a
    }).then((data) => {
        console.log('Attendance Marked..', data);
        return data;
    }).catch(err => {
        console.log(err);
        return err;
    });

    await contract.methods.changeTeacher(ACCOUNT01).send({    //*b
        from: ACCOUNT04,    //*a
    }).then((data) => {
        console.log('Teacher Changed..', data);
    }).catch(err => console.log(err));

    contract.methods.isMaxReached().call({
        from: ACCOUNT04,    //*a
    }).then((boolValue) => console.log(boolValue? "Max reached.." : "Max not reached.."))
    .catch(err => console.log(err));
    
    return receipt;

}

// interactFn();

export { interactFn };