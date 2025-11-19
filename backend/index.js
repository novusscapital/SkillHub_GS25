// backend/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Caminhos dos arquivos
const ACCOUNTS_PATH = path.join(__dirname, "data", "accounts.json");
const PROFILES_PATH = path.join(__dirname, "data", "profiles.json");
const PROFESSIONALS_PATH = path.join(__dirname, "data", "professionals.json");

/* ----------------- mensagens ----------------- */
const MESSAGES_PATH = path.join(__dirname, "data", "messages.json");

function readMessages() {
  return safeReadJSON(MESSAGES_PATH, []);
}

function writeMessages(msgs) {
  safeWriteJSON(MESSAGES_PATH, msgs);
}

/**
 * GET /api/messages/:user1/:user2
 * Retorna as mensagens entre dois usuários
 */
app.get("/api/messages/:user1/:user2", (req, res) => {
  const { user1, user2 } = req.params;
  const messages = readMessages();

  const filtered = messages.filter(
    (m) =>
      (m.from === Number(user1) && m.to === Number(user2)) ||
      (m.from === Number(user2) && m.to === Number(user1))
  );

  res.json(filtered);
});

/**
 * POST /api/messages
 * Envia mensagem
 */
app.post("/api/messages", (req, res) => {
  const { from, to, content } = req.body;

  if (!from || !to || !content) {
    return res.status(400).json({ error: "Campos inválidos." });
  }

  const messages = readMessages();

  const newMessage = {
    id: Date.now(),
    from,
    to,
    content,
    createdAt: Date.now(), // timestamp
  };

  messages.push(newMessage);
  writeMessages(messages);

  res.status(201).json(newMessage);
});

/* ----------------- helpers genéricos de leitura/escrita ----------------- */

function safeReadJSON(filepath, defaultValue) {
  if (!fs.existsSync(filepath)) {
    return defaultValue;
  }
  const data = fs.readFileSync(filepath, "utf-8");
  if (!data.trim()) return defaultValue;

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler ${filepath}:`, err);
    return defaultValue;
  }
}

function safeWriteJSON(filepath, value) {
  fs.writeFileSync(filepath, JSON.stringify(value, null, 2), "utf-8");
}

/* ---------------------- helpers específicos ---------------------- */

function readAccounts() {
  return safeReadJSON(ACCOUNTS_PATH, []);
}
function writeAccounts(accounts) {
  safeWriteJSON(ACCOUNTS_PATH, accounts);
}

function readProfiles() {
  return safeReadJSON(PROFILES_PATH, []);
}
function writeProfiles(profiles) {
  safeWriteJSON(PROFILES_PATH, profiles);
}

function readProfessionals() {
  return safeReadJSON(PROFESSIONALS_PATH, []);
}
function writeProfessionals(professionals) {
  safeWriteJSON(PROFESSIONALS_PATH, professionals);
}

/**
 * Sincroniza um profile detalhado com o arquivo professionals.json
 * – mantém um registro “resumido” para aparecer nos cards.
 */
function upsertProfessionalFromProfile(profile) {
  const professionals = readProfessionals();

  // skills usadas na busca/card
  const summarySkills =
    (profile.technicalSkills && profile.technicalSkills.length > 0
      ? profile.technicalSkills
      : profile.skills) || [];

  const summary = {
    id: profile.id,
    name: profile.name || "",
    role: profile.role || "",
    skills: summarySkills,
    city: profile.city || "",
    area: profile.area || "",
    photo: profile.photo || ""
  };

  const idx = professionals.findIndex((p) => p.id === profile.id);

  if (idx === -1) {
    professionals.push(summary);
  } else {
    professionals[idx] = { ...professionals[idx], ...summary };
  }

  writeProfessionals(professionals);
}

/* --------------------------- ROTAS --------------------------- */

/**
 * POST /api/register
 * Cria conta + cria perfil “vazio” correspondente em profiles.json
 */
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Nome, email e senha são obrigatórios." });
  }

  const accounts = readAccounts();

  const exists = accounts.find((acc) => acc.email === email);
  if (exists) {
    return res
      .status(409)
      .json({ message: "Já existe uma conta com esse email." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newAccount = {
    id: Date.now(), // simples, suficiente pro protótipo
    name,
    email,
    passwordHash
  };

  accounts.push(newAccount);
  writeAccounts(accounts);

  // --- cria o perfil "vazio" do usuário real em profiles.json ---
  const profiles = readProfiles();

  const newProfile = {
    id: newAccount.id,
    name: newAccount.name,
    role: "",
    skills: [],
    city: "",
    area: "",
    photo: "",

    personal: {
      bio: "",
      age: "",
      country: ""
    },

    academic: {
      degree: "",
      institution: "",
      status: ""
    },

    experience: [],

    technicalSkills: [],
    softSkills: [],
    hobbies: []
  };

  profiles.push(newProfile);
  writeProfiles(profiles);

  // também já garante que esse user exista em professionals.json (resumido)
  upsertProfessionalFromProfile(newProfile);

  return res.status(201).json({
    message: "Conta criada com sucesso.",
    user: { id: newAccount.id, name: newAccount.name, email: newAccount.email }
  });
});

/**
 * POST /api/login
 */
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
    user: { id: account.id, name: account.name, email: account.email }
  });
});

/**
 * GET /profiles/:userId
 * Retorna o perfil detalhado do usuário real
 */
app.get("/profiles/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const profiles = readProfiles();

  const found = profiles.find((p) => p.id === userId);

  if (!found) {
    return res.status(404).json({ error: "Perfil não encontrado." });
  }

  res.json(found);
});

/**
 * PUT /profiles/:userId
 * Atualiza (ou cria) o perfil detalhado e sincroniza com professionals.json
 */
app.put("/profiles/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const newProfileData = req.body;

  let profiles = readProfiles();
  const index = profiles.findIndex((p) => p.id === userId);

  let updated;
  if (index === -1) {
    // se não tiver, cria novo
    updated = { ...newProfileData, id: userId };
    profiles.push(updated);
  } else {
    updated = { ...profiles[index], ...newProfileData, id: userId };
    profiles[index] = updated;
  }

  writeProfiles(profiles);

  // mantém professionals.json em sincronia
  upsertProfessionalFromProfile(updated);

  res.json({ message: "Perfil salvo com sucesso.", profile: updated });
});

/* MENSAGENS (h)*/

setInterval(() => {
  const messages = readMessages();
  const now = Date.now();

  const filtered = messages.filter(
    (msg) => now - msg.createdAt < 24 * 60 * 60 * 1000 // 24h
  );

  writeMessages(filtered);
}, 60 * 1000); // roda a cada 1 minuto


/* --------------------------- start --------------------------- */

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
