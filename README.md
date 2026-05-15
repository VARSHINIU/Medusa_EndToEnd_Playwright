# 🛒 Medusa E-Commerce E2E Automation Project

## 📌 Project Overview
This project is an end-to-end automation testing framework built using **Playwright (JavaScript)** for the Medusa E-commerce application running on a local host environment. The framework validates both **UI workflows and backend functionality** using REST APIs and PostgreSQL database integration.

---

## ⚙️ Tech Stack
- Playwright (JavaScript)
- Node.js
- REST API Testing
- PostgreSQL Database
- Medusa E-commerce (Localhost setup)

---

## 🧪 Testing Scope

This framework covers:

### UI Testing
- End-to-end user flows (login, product browsing, cart, checkout)
- Validation of UI elements and user interactions

### API Testing
- REST API validation for backend services
- Request/response verification
- Data integrity checks

### Database Testing
- PostgreSQL database validation
- Backend data verification after API/UI actions

---

## 🏗️ Project Features
- End-to-end automation using Playwright
- UI + API + Database testing in a single framework
- Backend validation using PostgreSQL queries
- Localhost-based Medusa e-commerce application testing
- Reusable test structure with JavaScript

---

## 🚀 How to Run Locally

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run tests
npx playwright test
