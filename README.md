# 🌐 Live Demo
Check out the live application: [TaskFlow Live](https://taskflow-production-c00c.up.railway.app)

# 🚀 TaskFlow - Premium Task Management System

TaskFlow ek high-performance, full-stack task management application hai jise **MERN Stack** aur **Luxury UI aesthetics** ke saath build kiya gaya hai. Ye system teams aur individuals ko unke projects aur tasks efficiently manage karne mein help karta hai.

## ✨ Features
*   **User Authentication:** Secure Signup/Login functionality using JWT.
*   **Project Workspace:** Multiple projects create karne aur unhe manage karne ki suvidha.
*   **Task Tracking:** Tasks create, update aur delete karne ke liye optimized CRUD operations.
*   **Luxury UI:** Vibrant animations aur hyper-realistic design elements ka use karke ek premium user experience diya gaya hai.
*   **Responsive Design:** Mobile, tablet aur desktop sabhi devices ke liye fully optimized.

## 🛠️ Tech Stack
*   **Frontend:** React.js, Vite, Tailwind CSS (Luxury Styling)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB Atlas (Cloud)
*   **State Management:** Context API / Redux
*   **Deployment:** Railway (Frontend & Backend)

## 🚀 Getting Started

### Prerequisites
*   Node.js installed
*   MongoDB Atlas account

### Installation
1.  **Repository Clone karein:**
    ```bash
    git clone [https://github.com/ansh-saraswat/task_flow.git](https://github.com/ansh-saraswat/task_flow.git)
    cd task_flow
    ```

2.  **Backend Setup:**
    ```bash
    cd server
    npm install
    ```
    `.env` file banayein aur ye variables add karein:
    `MONGO_URI`, `JWT_SECRET`, `PORT=5000`.

3.  **Frontend Setup:**
    ```bash
    cd ../client
    npm install
    ```
    `.env` file mein `VITE_API_URL` set karein.

4.  **Run the App:**
    ```bash
    # Backend (in server folder)
    npm start
    
    # Frontend (in client folder)
    npm run dev
    ```

## 🌐 Live Demo
Check out the live application: [TaskFlow Live](https://taskflow-production-c00c.up.railway.app)
