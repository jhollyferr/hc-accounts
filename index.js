// externals
import inquirer from "inquirer";
import chalk from "chalk";

// internals
import fs from "fs";

import { createAccount } from "./account.js";

const choices = [
  "Criar conta",
  "Consultar saldo",
  "Depositar",
  "Sacar",
  "Sair",
];

const question = [
  {
    type: "list",
    name: "action",
    message: "O que você deseja fazer?",
    choices,
  },
];

export const operation = async () => {
  try {
    const { action } = await inquirer.prompt(question);

    defineAction(action);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} action
 */
const defineAction = (action) => {
  switch (action.toLocaleUpperCase()) {
    case "CRIAR CONTA":
      return createAccount();
    case "CONSULTAR SALDO":
      return;
    case "DEPOSITAR":
      return;
    case "SACAR":
      return;
    case "SAIR":
      return;
    default:
      throw new Error("Option not defined");
  }
};

operation();
