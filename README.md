# 🚀 TaskFlow - Modern Task Management PWA

TaskFlow is a responsive, high-performance Task Management Progressive Web Application (PWA) built with **React**, **Firebase**, and modern Web APIs. It features real-time data persistence, secure user authentication, optimized mobile UI/UX, and PWA capabilities allowing installation directly onto desktop and iOS/Android devices.

🔗 **Live Demo:** [https://taskflow-21824.web.app](https://taskflow-21824.web.app)

---

## ✨ Features

- 📱 **Progressive Web App (PWA):** Fully installable on iOS and Android with custom home screen branding and native app behavior.
- 🔐 **Authentication:** Secure user sign-up and sign-in powered by Firebase Auth.
- ⚡ **Real-Time Database:** Live synchronization of user tasks and state using Firebase Firestore.
- 🎨 **Responsive UI/UX:** Styled with CSS Modules for scoped, maintainable styling and seamless adaptation across all screen sizes.
- 🛠️ **State & Navigation:** Built with React Hooks and React Router for fast single-page app (SPA) performance.

---

## 🛠️ Tech Stack

- **Frontend:** React, JavaScript (ES6+), CSS Modules, HTML5
- **Backend & Services:** Firebase Authentication, Cloud Firestore
- **Deployment & Hosting:** Firebase Hosting
- **Build Tool:** Vite

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mizuhar/taskflow.git
   cd taskflow
2. Configure Environment Variables
Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

3. Install Dependencies & Run
npm install
npm run dev