const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const ACCOUNTS_PATH = path.join(__dirname, "data", "accounts.json");

function readAccounts() {
  if (!fs.existsSync(ACCOUNTS_PATH)) {
    return [];
  }

  const data = fs.readFileSync(ACCOUNTS_PATH, "utf-8");
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Erro ao ler accounts.json:", err);
    return [];
  }
}

function writeAccounts(accounts) {
  fs.writeFileSync(ACCOUNTS_PATH, JSON.stringify(accounts, null, 2), "utf-8");
}

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
  }

  const accounts = readAccounts();

  const exists = accounts.find((acc) => acc.email === email);
  if (exists) {
    return res.status(409).json({ message: "Já existe uma conta com esse email." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newAccount = {
    id: Date.now(),
    name,
    email,
    passwordHash,
  };

  accounts.push(newAccount);
  writeAccounts(accounts);

  return res.status(201).json({
    message: "Conta criada com sucesso.",
    user: { id: newAccount.id, name: newAccount.name, email: newAccount.email },
  });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  const accounts = readAccounts();
  const account = accounts.find((acc) => acc.email === email);

  if (!account) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const isValid = await bcrypt.compare(password, account.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  return res.json({
    message: "Login realizado com sucesso.",
    user: { id: account.id, name: account.name, email: account.email },
  });
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
