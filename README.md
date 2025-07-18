# 🧾 Trio Menu Website

Welcome to the official menu website for **Trio Egypt** – a dynamic and bilingual web app to browse food and drink items organized by category.

🌐 **Live Site:** [https://trio-egy-menu.vercel.app/](https://trio-egy-menu.vercel.app/)

---

## 📋 Project Overview

This website is built with **React**, **TypeScript**, **Tailwind CSS**, and **Firebase Firestore** as a backend database. It allows users to explore a structured, bilingual menu with categories and items in both **Arabic** and **English**, automatically adapting to the selected language.

---

## 🗂️ Firestore Structure

### 🔹 `categories` Collection

Each document represents a menu category (e.g., Pizza, Drinks).  
Fields include:
- `categoryId` (string, unique)
- `name` (string, localized)
- `language` (`ar` or `en`)
- `createdAt` / `updatedAt` (timestamps)

### 🔹 `menuItems` Collection

Each document represents a menu item belonging to a category.  
Fields include:
- `itemId` (string, unique)
- `name` (string, localized)
- `description` (string, localized)
- `categoryId` (reference to `categories`)
- `language` (`ar` or `en`)
- `price` (object: `small?`, `medium?`, `large?`)
- `createdAt` / `updatedAt` (timestamps)

---

## 🔧 Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Database:** Firebase Firestore (NoSQL)
- **Deployment:** Vercel

---

## 🌐 Features

- 🌍 Language switcher (Arabic / English)
- 📦 Realtime fetching from Firestore collections
- 📱 Responsive layout for mobile & desktop
- 📚 Categorized item display with pricing options (Small / Medium / Large)
- 🔄 Automatically synchronized menu updates
  
