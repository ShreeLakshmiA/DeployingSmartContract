# Step 1: To Install all dependencies
npm i

# Step 2: To Compile the Smart Contract and generate bytecode.bin and abi.json
## Already Done, can ignore
node compile.js

# Step 3: To deploy the compiled Smart Contract
node deploy.js

# Step 4: To interact with Smart Contract and Listen to the event
node listener.js
### NOTE
For Step 4, 1st execution should work fine.
For next executions, need to interchange from address in line 36, 46, 52 - ACCOUNT01
and in line 45 - ACCOUNT04

Repeat the same process by interchanging again for the next executions
(This is done to ensure that only Teacher can mark attendance)