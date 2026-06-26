# DRDO Clone Portal & Admin Dashboard CMS - Setup Guide

Welcome to the DRDO Portal Clone! This project consists of a React-based frontend (client), a Node/Express backend (server), and uses MongoDB as the database. Follow this guide to set up, configure, and run all components of the application.

---

## 🏗️ Architecture & Component Stack

| Component | Technology | Default Port / URL | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend (Client)** | React (v19), Vite, Bootstrap (v5), React Router (v7) | `http://localhost:5173` | User-facing portal and Admin Dashboard UI |
| **Backend (Server)** | Node.js, Express, Mongoose, JWT, Multer | `http://localhost:4000` | REST API routes, CMS CRUD logic, File Uploads |
| **Database** | MongoDB | `mongodb://127.0.0.1:27017/drdo_admin` | Data storage (NoSQL) |

---

## 🛠️ Prerequisites

Ensure you have the following installed on your system:
1. **Node.js** (v18.x or higher recommended)
2. **npm** (v9.x or higher)
3. **MongoDB** (Local instance or Docker container)

---

## 🚀 Step 1: Set Up & Run MongoDB

The backend server is configured to connect to MongoDB at:
`mongodb://127.0.0.1:27017/drdo_admin`

You can run MongoDB either locally as a system service or using Docker.

### Option A: Running via Docker (Recommended & Easiest)
If you have Docker installed, you can spin up a MongoDB instance instantly without local installations:
```bash
docker run -d --name drdo-mongo -p 27017:27017 mongo:latest
```

### Option B: Installing Locally on Linux (Ubuntu/Debian)
If you prefer to install MongoDB Community Edition directly on your Linux OS:

1. **Import the public key:**
   ```bash
   curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --oash /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
   ```
2. **Create list file:**
   ```bash
   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```
3. **Reload local package database:**
   ```bash
   sudo apt-get update
   ```
4. **Install MongoDB:**
   ```bash
   sudo apt-get install -y mongodb-org
   ```
5. **Start and enable the MongoDB service:**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```
6. **Verify status:**
   ```bash
   sudo systemctl status mongod
   ```

---

## 📦 Step 2: Set Up & Run the Backend (`server`)

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all backend packages: `express`, `mongoose`, `cors`, `bcryptjs`, `jsonwebtoken`, `multer`, and `nodemon` (as a development dependency).
   
3. **Run the server in Development Mode (with hot reloading):**
   ```bash
   npm run dev
   ```
   *Alternative (Production start):* `npm start`

4. **Database Seeding:**
   - **Automated Bootstrapping:** On initial startup, if the database is empty, the server automatically boots a seeding function `seedIfEmpty()` inside `index.js` to pre-populate all required tables (News, Bulletins, Forms, Products, etc.).
   - **Manual Seeding Scripts (Optional):** If you need to manually force seed specific sections at any point:
     - To seed Avalanche Bulletins and Forms/Manuals:
       ```bash
       node seed-new.js
       ```
     - To seed Schemes, Industry Support, Competitions, and Products:
       ```bash
       node seed-offerings.js
       ```

Once successfully started, you should see:
```text
✅ MongoDB connected
🚀 DRDO Admin API → http://localhost:4000
```

---

## 💻 Step 3: Set Up & Run the Frontend (`client`)

1. **Open a new terminal window and navigate to the client directory:**
   ```bash
   cd client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs the required UI libraries, including `@fontsource/noto-sans`, `bootstrap`, `react-icons`, `react-router-dom`, and translation support (`i18next`, `react-i18next`).

3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Access the application:**
   - Open your browser and go to: `http://localhost:5173` (or the port shown in your terminal).

---

## 🔐 Admin Dashboard Access & Credentials

The portal features an integrated Content Management System (CMS) to manage slides, alerts, news, press releases, etc.

* **Admin Portal URL:** `http://localhost:5173/admin` (or navigate via the footer/header login links)
* **Default Credentials:**
  * **Username:** `admin`
  * **Password:** `admin@123`

*(Note: JWT token session lasts for 12 hours once logged in).*

---

## 📁 File Upload Handling
The server creates a folder called `uploads/` automatically in the `server` directory to handle and store files:
* Images uploaded via the Admin Panel are stored in `server/uploads/images/`
* PDF documents are stored in `server/uploads/pdfs/`

*Ensure the backend process has write permissions for the `server/` directory.*

---

## 🔍 Troubleshooting & FAQs

### 1. MongoDB Connection Refused (`ECONNREFUSED 127.0.0.1:27017`)
* **Cause:** MongoDB service is not running or is configured to bind to a different IP.
* **Fix:** Ensure the MongoDB service is active. Run `sudo systemctl status mongod` on Linux, or verify your Docker container is running with `docker ps`.

### 2. CORS Errors in the Browser
* **Cause:** The backend allows requests only from designated local origins (`http://localhost:5173`, `http://localhost:5174`, `http://localhost:5175`). If your Vite dev server starts on a different port (e.g. `5176`), calls will be blocked.
* **Fix:** 
  * Check the port Vite is running on in the frontend console.
  * If needed, update the allowed origins array in `server/index.js` (line 30):
    ```javascript
    app.use(cors({ origin: ['http://localhost:5173','http://localhost:5174','http://localhost:5175', 'http://localhost:YOUR_PORT'] }));
    ```

### 3. Images or PDFs Fail to Upload
* **Cause:** The directory `server/uploads` may not exist or does not have write permissions.
* **Fix:** The server attempts to automatically create the folder recursively, but if it fails due to permissions, create them manually:
  ```bash
  mkdir -p server/uploads/images server/uploads/pdfs
  chmod -R 775 server/uploads
  ```
