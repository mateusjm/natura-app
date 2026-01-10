# Natura App

Aplicação **fullstack** composta por **Backend (NestJS)** e **Frontend (React + Vite)**.

Este README explica **detalhadamente** como configurar e iniciar o projeto **do zero**, pensando em quem nunca rodou a aplicação antes.


## 📁 Estrutura do Projeto

```
natura-app/
├── backend/        # API (NestJS)
├── frontend/       # Aplicação web (React + Vite)
└── README.md
```


# ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

* **Node.js** (versão 18 ou superior recomendada)
* **NPM** (vem junto com o Node)
* **MySQL** rodando localmente
* **Git**

Verifique no terminal:

```bash
node -v
npm -v
git -v
```



# 🚀 Backend (NestJS)

A partir da raiz do projeto:

```bash
cd backend
```

## 📦 Instalar dependências

```bash
npm install
```


## 🔐 Variáveis de Ambiente (Backend)

Crie um arquivo chamado **`.env`** na raiz do projeto dentro da pasta `backend`.

### 📄Siga o exemplo do `.env.example`

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=senha
DB_NAME=name
JWT_SECRET=seu-token
FRONTEND_URL=http://localhost:5173
```

📌 **Importante**:

* Nunca suba o arquivo `.env` para o GitHub
* Use o `.env.example` apenas como modelo


## ▶️ Rodar o Backend

```bash
npm run start
```

📍 O backend será iniciado em:

```
http://localhost:3000
```


# 🎨 Frontend (React + Vite)


A partir da raiz do projeto:

```bash
cd frontend
```


## 📦 Instalar dependências

```bash
npm install
```


## 🔐 Variáveis de Ambiente (Frontend)

Crie um arquivo chamado **`.env`** dentro da pasta `frontend`.

### 📄 `.env.example`

```env
VITE_API_URL=http://localhost:3000
```

📌 Observação:

* O Vite exige que as variáveis comecem com `VITE_`


## ▶️ Rodar o Frontend

```bash
npm run dev
```

📍 A aplicação estará disponível em:

```
http://localhost:5173
```


# 🔁 Fluxo de Inicialização

```bash
# Clonar o projeto
git clone https://github.com/mateusjm/natura-app.git

# Backend
cd natura-app/backend
npm install
npm run start

# Frontend
cd ../frontend
npm install
npm run dev
```

# 🧪 Tecnologias Utilizadas

### Backend

* NestJS
* TypeORM
* MySQL
* JWT Authentication

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* Material UI

---

# 📌 Observações Importantes

* Backend e Frontend devem estar rodando **simultaneamente**
* Certifique-se de que as portas **3000** e **5173** estejam livres
* Caso altere portas, atualize os arquivos `.env`

---

# ✅ Pronto!

Com isso, o projeto estará totalmente funcional em ambiente local.

Se tiver qualquer dúvida ou problema na inicialização, revise os passos acima ou as variáveis de ambiente.
