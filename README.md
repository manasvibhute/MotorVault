# 🚗 AutoVibe Marketplace

A modern **full-stack vehicle marketplace** where users can explore, compare, save, and inquire about vehicles with a smooth, frontend-focused experience.

---

## 🧠 Problem Statement

The goal was to build a **frontend-heavy marketplace platform** that allows users to:

* Browse vehicles dynamically
* Compare up to 3 vehicles
* Save favorites (Garage)
* Send inquiries
* View analytics insights

---

## ⚙️ Tech Stack

### Frontend

* React (Hooks)
* Tailwind CSS
* Axios
* Recharts

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 🏗️ System Architecture

Frontend (React) communicates with Backend (Express) via REST APIs.

React → Axios → Express → MongoDB → Response → UI Render

---

## 🚀 Features

### 🔍 Discovery Dashboard

* Dynamic vehicle listing from API
* Clean card-based UI

### 📄 Vehicle Details

* Detailed specs view
* Save to Garage
* Add to Compare
* Inquiry form

### ⚖️ Compare System

* Compare up to 3 vehicles
* Backend validation (no duplicates)
* Dynamic comparison table

### ❤️ Garage (Wishlist)

* Stored using localStorage
* Persistent user experience

### 📊 Analytics Dashboard

* Visual charts (Recharts)
* Category-based insights
  *(Currently UI-based / mock data)*

---

## 🧠 Key Technical Decisions

* Used **MongoDB** for flexible schema design
* Implemented **event-driven architecture** for global UI updates
* Built reusable components with a **Layout wrapper**

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/manasvibhute/MotorVault.git
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=mongodb://manasvi:manasvi123@ac-v2gjt7l-shard-00-00.voiukhe.mongodb.net:27017,ac-v2gjt7l-shard-00-01.voiukhe.mongodb.net:27017,ac-v2gjt7l-shard-00-02.voiukhe.mongodb.net:27017/motorvault?retryWrites=true&w=majority&authSource=admin&replicaSet=atlas-q7kjqf-shard-0&tls=true
```

Run backend:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd my-app
npm install
npm run dev
```

---

### 4. Run Application

Open:

```
http://localhost:5173
```

---

## 🗄️ Database Collections

* vehicles
* compare
* inquiries
* views

---

## ⚠️ Assumptions & Limitations

* Analytics is currently using mock data
* No authentication implemented
* Filtering UI not fully connected

---

## 📌 Conclusion

This project focuses on **user experience, modular architecture, and scalable backend design**, making it easy to extend into a production-ready system.

---
