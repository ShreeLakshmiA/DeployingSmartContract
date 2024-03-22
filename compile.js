import solc from 'solc';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();

// To read the smart contract file content and save it the 'sourceCode' variable
const fileName = 'contracts/AttendanceContact.sol';
const contractName = 'AttendanceContact';

const contractPath = path.join(__dirname, fileName);
const sourceCode = fs.readFileSync(contractPath, 'utf8');

// solc compiler configuration
const input = {
    language: 'Solidity',
    sources: {
        [fileName]: {
            content: sourceCode,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

// To compile and parse the output to json
const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

// To extract the bytecode from compiled code, and write the output in bytecode.bin
const bytecode = compiledCode.contracts[fileName][contractName].evm.bytecode.object;
const bytecodePath = path.join(__dirname, 'bytecode.bin');
fs.writeFileSync(bytecodePath, bytecode);
console.log("bytecode:\n", bytecode);

// To extract the bytecode from compiled code, and write the output in abi.json
const abi = compiledCode.contracts[fileName][contractName].abi;
const abiPath = path.join(__dirname, 'abi.json');
fs.writeFileSync(abiPath, JSON.stringify(abi, null, '\t'));
console.log("abi:\n", abi);
