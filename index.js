// externals
import inquirer from "inquirer";
import chalk from "chalk";

// internals
import fs from "fs";

console.log("initial setup");

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

const operation = async () => {
  try {
    const { action } = await inquirer.prompt(question);
    console.log(action);
  } catch (error) {
    console.error(error);
  }
};

operation();
