import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

import { operation } from "./index.js";

const accountPath = "./accounts";

const createAccountInquirer = {
  name: "accountName",
  message: "Digite um nome para a sua conta:",
};

const depositInquirer = {
  name: "accountName",
  message: "Qual o nome da sua conta?",
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
    const { accountName } = await inquirer.prompt([createAccountInquirer]);

    if (!fs.existsSync(accountPath)) fs.mkdirSync(accountPath);

    if (fs.existsSync(`${accountPath}/${accountName}.json`)) {
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

export const deposit = async () => {
  try {
    const { accountName } = await inquirer.prompt([depositInquirer]);

    if (!existAccount(accountName)) {
      console.log(
        chalk.bgRed.black("Esta conta não existe, escolha outro nome.")
      );

      return deposit();
    }

    
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} accountName
 */
const existAccount = (accountName) => {
  return fs.existsSync(`${accountPath}/${accountName}.json`);
};
