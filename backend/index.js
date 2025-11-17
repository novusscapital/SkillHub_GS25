// ---------------------------------------------
// IMPORTAÇÕES E CONFIGURAÇÃO INICIAL
// ---------------------------------------------
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ---------------------------------------------
// CAMINHOS DOS ARQUIVOS
// ---------------------------------------------
const ACCOUNTS_PATH = path.join(__dirname, "data", "accounts.json");
const PROFILES_PATH = path.join(__dirname, "data", "profiles.json");

// ---------------------------------------------
// FUNÇÕES: CONTAS
// ---------------------------------------------
function readAccounts() {
  if (!fs.existsSync(ACCOUNTS_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(ACCOUNTS_PATH, "utf-8"));
  } catch {
    console.error("Erro ao ler accounts.json");
    return [];
  }
}

function writeAccounts(accounts) {
  fs.writeFileSync(ACCOUNTS_PATH, JSON.stringify(accounts, null, 2), "utf-8");
}

// ---------------------------------------------
// ROTAS: REGISTRO E LOGIN
// ---------------------------------------------
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });

  const accounts = readAccounts();

  if (accounts.find((acc) => acc.email === email))
    return res.status(409).json({ message: "Já existe uma conta com esse email." });

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

  if (!email || !password)
    return res.status(400).json({ message: "Email e senha são obrigatórios." });

  const accounts = readAccounts();
  const account = accounts.find((acc) => acc.email === email);

  if (!account)
    return res.status(401).json({ message: "Credenciais inválidas." });

  const isValid = await bcrypt.compare(password, account.passwordHash);
  if (!isValid)
    return res.status(401).json({ message: "Credenciais inválidas." });

  return res.json({
    message: "Login realizado com sucesso.",
    user: { id: account.id, name: account.name, email: account.email },
  });
});

// ---------------------------------------------
// FUNÇÕES: PERFIS
// ---------------------------------------------
function readProfiles() {
  if (!fs.existsSync(PROFILES_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(PROFILES_PATH, "utf-8"));
  } catch {
    console.error("Erro ao ler profiles.json");
    return [];
  }
}

function writeProfiles(profiles) {
  fs.writeFileSync(PROFILES_PATH, JSON.stringify(profiles, null, 2), "utf-8");
}

// ---------------------------------------------
// ROTAS: PERFIS (GET e PUT)
// ---------------------------------------------
app.get("/profiles/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const profiles = readProfiles();

  const found = profiles.find((p) => p.userId === userId);
  if (!found) return res.status(404).json({ error: "Perfil não encontrado." });

  res.json(found.profile);
});

app.put("/profiles/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const newProfile = req.body;

  let profiles = readProfiles();
  const index = profiles.findIndex((p) => p.userId === userId);

  if (index === -1) {
    profiles.push({ userId, profile: newProfile });
  } else {
    profiles[index].profile = newProfile;
  }

  writeProfiles(profiles);
  res.json({ message: "Perfil salvo com sucesso." });
});

// ---------------------------------------------
// INICIAR SERVIDOR
// ---------------------------------------------
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
  