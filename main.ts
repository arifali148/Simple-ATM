#!  /usr/bin/env node

import inquirer from "inquirer";

let myBalance = 10000;
let myPin = 1234;

while (true) {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: "Please enter your PIN:",
            type: "number"
        }
    ]);

    if (pinAnswer.pin === myPin) {
        console.log("Correct PIN");

        while (true) {
            let operationAns = await inquirer.prompt([
                {
                    name: "operation",
                    message: "Please select an option:",
                    type: "list",
                    choices: ["withdraw", "check balance", "exit"]
                }
            ]);

            if (operationAns.operation === "withdraw") {
                let amountAns = await inquirer.prompt({
                    name: "amount",
                    message: "Please enter the amount to withdraw:",
                    type: "number"
                });

                if (amountAns.amount > myBalance) {
                    console.log("Insufficient funds. Your balance is: " + myBalance);
                } else {
                    myBalance -= amountAns.amount;
                    console.log("Your remaining balance is: " + myBalance);
                }
            } else if (operationAns.operation === "check balance") {
                console.log("Your current balance is: " + myBalance);
            } else if (operationAns.operation === "exit") {
                console.log("Thank you...!");
                break;
            }

            let continueAns = await inquirer.prompt({
                name: "continue",
                message: "Do you want to perform another operation?",
                type: "confirm"
            });

            if (!continueAns.continue) {
                console.log("Thank you...!");
                break;
            }
        }
        break;
    } else {
        console.log("Incorrect PIN !!!");
    }
}