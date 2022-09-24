import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

import { operation } from "./index.js";

const question = {
  name: "accountName",
  message: "Digite um nome para a sua conta:",
};

const balanceJSON = JSON.stringify({
  balance: 0,
});

export const createAccount = () => {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));
  buildAccount();
};

export const buildAccount = async () => {
  try {
    const { accountName } = await inquirer.prompt([question]);
    console.info(accountName);

    if (!fs.existsSync("./accounts")) fs.mkdirSync("./accounts");

    if (fs.existsSync(`accounts/${accountName}.json`)) {
      console.error(chalk.bgRed.black("Account already in use"));
      buildAccount();
      return;
    }

    fs.writeFileSync(`accounts/${accountName}.json`, balanceJSON, (error) => {
      throw new Error(error);
    });

    console.log("Parabéns, a sua conta foi criada!");
    operation();
  } catch (error) {
    console.error(error);
  }
};
