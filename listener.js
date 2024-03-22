import { interactFn } from './interact.js';

const waitAndInteract = async() => {
    const receipt = await interactFn(); // To get the receipt from the transaction
    console.log("Emitting Event..", receipt.events);    // To print all the events during the markAttendance transaction

    console.log("End of routine");
};

waitAndInteract();




















    // contract.getPastEvents(
    //     'AttandanceMarked', 
    //     { 
    //         fromBlock: 0, 
    //         toBlock: 'latest' 
    //     },
    //     (error, events) => {
    //         if(error) {
    //             console.log("Error inside event: ", error);
    //         } else {
    //             console.log(events.count);
    //             console.log("Event:\n", JSON.stringify(events[0]));
    //         }
    //     }
    // );

    // .on('receipt', (receipt) => {
    //     console.log(receipt);
    // })
    // .on('confirmation', (confirmationNumber, receipt) => {
    //     console.log('Tx confirmed:', receipt);
    // })
    // .on('error', (error) => {
    //     console.error('Event error:', error);
    // });