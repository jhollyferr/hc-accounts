import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

import { operation } from "./index.js";

const accountPath = "./accounts";

const createAccountInquirer = {
  name: "accountName",
  message: "Digite um nome para a sua conta:",
};

const accountInquirer = {
  name: "accountName",
  message: "Qual o nome da sua conta?",
};

const amountInquirer = {
  name: "amount",
  message: "Informe valor:",
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
    const { accountName } = await inquirer.prompt([accountInquirer]);

    if (!existAccount(accountName)) {
      console.log(
        chalk.bgRed.black("Esta conta não existe, escolha outro nome.")
      );

      return deposit();
    }

    const { amount } = await inquirer.prompt([amountInquirer]);

    addAmount(accountName, amount);

    operation();
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} accountName
 * @param {Number} amount
 */
const addAmount = (accountName, amount) => {
  try {
    const accountData = getAccount(accountName);

    if (!amount) {
      console.log(
        chalk.bgRed.black("Ocorreu um problema, tente novamente mais tarde!")
      );
      return deposit();
    }

    accountData.balance += Number(amount);

    fs.writeFileSync(
      `${accountPath}/${accountName}.json`,
      JSON.stringify(accountData),
      (error) => {
        throw new Error(error);
      }
    );

    console.log(
      chalk.green(`Foi depositado o valor de R$ ${amount} na sua conta!`)
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} accountName
 */
const getAccount = (accountName) => {
  try {
    const accountJSON = fs.readFileSync(`${accountPath}/${accountName}.json`, {
      encoding: "utf-8",
      flag: "r",
    });

    return JSON.parse(accountJSON);
  } catch (error) {
    console.error(error);
  }
};

export const getAccountBalance = async () => {
  try {
    const { accountName } = await inquirer.prompt([accountInquirer]);

    if (!existAccount(accountName)) return getAccountBalance();

    const { balance } = getAccount(accountName);

    console.log(
      chalk.bgBlue.black(`Olá,  o saldo da sua conta é de  R$ ${balance}`)
    );

    operation();
  } catch (error) {
    console.error(error);
  }
};

export const widthdraw = async () => {
  try {
    const { accountName } = await inquirer.prompt([accountInquirer]);

    if (!existAccount(accountName)) return widthdraw();

    const { amount } = await inquirer.prompt([amountInquirer]);
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
