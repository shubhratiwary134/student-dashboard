

---

```md
# 🎓 Student Dashboard — JoinEasy Internship Task-1

A fully functional **role-based Document & Assignment Management System** built with **React + TypeScript + TailwindCSS**, designed under a **12-hour build constraint**.  
This project demonstrates a clean modular architecture, persistent storage, and a sleek dark UI inspired by professional tools like **Figma** and **Linear**.

---

## 🚀 Features

### 🔐 Role-Based Authentication
- Login as either **Student** or **Admin** using a dropdown selector.  
- Auth data is persisted in **localStorage** — no backend required.  
- Auto-redirect based on role after login.

### 👨‍🎓 Student Dashboard
- View all assignments dynamically from localStorage.  
- Submit assignments with confirmation modals.  
- Progress summary tabs: Total, Completed, Pending, and Progress %.  
- Modern dark-themed UI with responsive grid layout.  
- Submission status and category badges for each assignment.

### 🧑‍💼 Admin Dashboard
- Toggle between **Student Progress** and **Manage Assignments** views.  
- View per-student completion stats with progress bars and pending counts.  
- Create new assignments via modal (instantly updates localStorage).  
- Responsive grid displaying all students and progress percentages.  

### 🎨 UI / UX Highlights
- Sleek **dark-matte color palette** (deep grays, blue-violet accents).  
- Modular reusable components for each section (Cards, Lists, Modals).  
- Smooth hover effects, consistent spacing, and typography balance.  
- Icons from **Lucide-React** and utility-first styling via **TailwindCSS**.

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | **React 18 + TypeScript** |
| Styling | **TailwindCSS** |
| Icons | **Lucide-React** |
| State & Storage | React Hooks + localStorage |
| Build Tool | **Vite** |
| Data | Mock data via `assignmentsData.ts`, `usersData.ts`, `submissionsData.ts` |

---

## 🧩 Project Structure

```

src/
┣ components/
│  ┣ admin/
│  │  ┣ AdminCard.tsx
│  │  ┣ AdminList.tsx
│  │  ┣ AddAssignmentButton.tsx
│  │  ┗ AddAssignmentForm.tsx
│  ┗ student/
│     ┣ AssignmentCard.tsx
│     ┣ AssignmentList.tsx
│     ┣ ConfirmModal.tsx
│     ┗ Tabs.tsx
┣ helpers/
│  ┣ storageHelpers.ts
│  ┗ studentHelpers.ts
┣ data/
│  ┣ assignmentsData.ts
│  ┣ usersData.ts
│  ┗ submissionsData.ts
┣ pages/
│  ┣ Login.tsx
│  ┣ StudentDashboard.tsx
│  ┗ AdminDashboard.tsx
┣ types/
│  ┗ types.ts
┗ main.tsx

````

---

## ⚙️ Setup & Run Locally

1. **Clone this repository**
   ```bash
   git clone https://github.com/shubhratiwary134/documentWeb.git
   cd documentWeb
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   ```
   http://localhost:5173
   ```

---

## 💾 Data Persistence

All data (users, assignments, submissions) is stored in **localStorage**.
On first launch, `initializeDummyData()` seeds mock data automatically.
To reset or refresh new fields, clear your browser’s localStorage.

---

## 🧠 Key Architectural Concepts

* **Phase 1:** Project setup + Role-based login
* **Phase 2:** Dummy data + localStorage integration
* **Phase 3:** Student Dashboard (functional + progress tracking)
* **Phase 4:** Admin Dashboard (progress & assignment management)

Each phase was designed modularly — ensuring that components remain reusable and scalable.

---

## 🪄 Design System

| Element            | Description           |
| ------------------ | --------------------- |
| Primary Background | `#0E0E10`             |
| Surface Background | `#1A1A1D`             |
| Border / Stroke    | `#2A2A2E`             |
| Accent Blue        | `#2563EB` → `#3B82F6` |
| Accent Purple      | `#8B5CF6`             |
| Text Primary       | `#E5E7EB`             |
| Text Secondary     | `#9CA3AF`             |

Consistent padding, rounded corners (`rounded-xl`), and subtle glow shadows (`shadow-[0_0_12px_rgba(59,130,246,0.15)]`) are used throughout.

---

## 🧰 Available Scripts

| Command           | Action                   |
| ----------------- | ------------------------ |
| `npm run dev`     | Start local dev server   |
| `npm run build`   | Build production bundle  |
| `npm run preview` | Preview production build |

---

## 📸 Screenshots

### 🔹 Student Dashboard

* Progress summary tabs
* Assignment grid with dark cards and gradient buttons

### 🔹 Admin Dashboard

* Student progress overview
* Manage assignments with modal form

*(All screenshots reflect live UI components, not mock images.)*

---

## 🧾 License

This project is for educational and internship evaluation purposes.
All rights reserved © 2025 Shubhra Tiwary.

---

## 💬 Contact

For queries or collaboration:
**Shubhra Tiwary**
📧 [shubhratiwary134@gmail.com](mailto:shubhratiwary134@gmail.com)
🌐 [GitHub — shubhratiwary134](https://github.com/shubhratiwary134)

---

```

```
