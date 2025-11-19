# SkillHub – Plataforma de Conexão Profissional  
Projeto GS25 – Desenvolvimento Web / Front-End

---

## Visão Geral

O SkillHub é uma plataforma web voltada para conectar profissionais de tecnologia a usuários que buscam conhecer talentos, visualizar perfis técnicos e interagir via chat.  
A aplicação foi estruturada em **React (frontend)** e **Node.js + Express (backend)**, utilizando arquivos JSON como base de dados local.

---

## Funcionalidades Principais

- Listagem de profissionais com foto, nome, cargo, cidade e principais skills.
- Filtros por área, cidade e tecnologia.
- Busca por nome.
- Modal com visualização completa do perfil.
- Sistema de recomendações por profissional.
- Chat interno entre usuários cadastrados.
- Sistema de autenticação (login e registro).
- Perfis prontos para testes.

---

## Contas de Teste

Estas contas estão pré-cadastradas para facilitar a avaliação:

| E-mail              | Senha |
|--------------------|-------|
| matheus@gmail.com  | 123   |
| miguel@gmail.com   | 123   |

---

## Tecnologias Utilizadas

### Frontend
- React
- Vite
- Tailwind CSS
- Context API
- Fetch API

### Backend
- Node.js
- Express.js
- Bcrypt (hash de senhas)
- JSON como base de dados (accounts, profiles, professionals, messages)

---

## Instalação e Execução

### 1. Clonar o Repositório
```
bash
git clone https://github.com/novusscapital/SkillHub_GS25.git
cd SkillHub_GS25
```
### 2. Backend (Servidor)
```
cd backend
npm install
npm start
```

O backend será iniciado em:
```
http://localhost:5000
```
### 3. Frontend (Aplicação React)
Em outro terminal:
```
cd ../frontend
npm install
npm run dev
```
A aplicação estará disponível em:
```
http://localhost:5173
```

### Como Utilizar

1. Inicie o backend.
2. Inicie o frontend.
3. Abra o navegador e acesse a porta do React.
4. Faça login com uma das contas de teste.
5. Navegue entre os profissionais, filtre, abra perfis completos e envie mensagens.

### Repositório Oficial
```
https://github.com/novusscapital/SkillHub_GS25.git
```

### Integrantes do Grupo
| Nome	             | RM
|--------------------|-------|
| Henrique Keigo Nakashima Minowa |	564091 |
| Eduardo Delorenzo Moraes |	561749 |
| Matheus Bispo Faria Barbosa |	562140 |