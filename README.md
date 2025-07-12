# ReWear – Community Clothing Exchange

A **sustainable‑fashion** web platform that lets people swap their unused clothes either **directly** or through a **points‑based marketplace**. ReWear extends the life‑cycle of garments, keeps textile waste out of landfills, and builds a style‑sharing community.

🎥 Demo Video: Watch the full walkthrough ([Video Link](https://drive.google.com/drive/u/1/folders/18NikI8IwpQ0YrAMR4pG2nzHgFMCKFx7I))
---

## Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Getting Started](#-getting-started)
4. [Environment Variables](#-environment-variables)
5. [API Reference](#-api-reference)
6. [Screenshots & Demos](#-screenshots--demos)
7. [Roadmap](#-roadmap)
8. [Contributing](#-contributing)
9. [Team](#-team)
10. [License](#-license)

---

## Features

### Completed

* **Full‑stack Authentication** — email/password sign‑up & login, JWT sessions, role‑based guards (User & Admin).
* **Robust REST API** — every core endpoint for items, swaps, points, and admin operations is live (see API Reference below).
* **Landing & Home Pages** — hero banner, featured carousel, search + multi‑facet filters, responsive design.
* **Item Management**

  * Multi‑image upload with live preview & drag‑drop reorder.
  * Rich metadata: title, description, category, tags, size, condition badge, points value.
  * CRUD with optimistic UI updates.
* **Swap & Redemption Flows**

  * 1‑to‑1 swap request wizard.
  * Points wallet: earn by listing, redeem on any item.
* **Dashboards**

  * **User** — profile, inventory, active swaps, points history.
  * **Admin** — item moderation, user management, flag reports, manual points grants.
* **Integrations** — Cloudinary image hosting, Mailgun password‑reset emails, rate‑limited public API gateway.

### In Progress

Real‑time notifications (Socket.IO), review system post‑swap, in‑app chat, PWA offline support.

---

## Tech Stack

| Layer         | Tech                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------- |
| **Frontend**  | React (Vite) · TailwindCSS · React Router v6 · Context API + custom hooks · Lucide icons |
| **Backend**   | Node.js · Express 4 · Mongoose 7 · JWT · Multer · Cloudinary SDK                         |
| **Dev & Ops** | ESLint + Prettier · Husky pre‑commit hooks · dotenv · nodemon · concurrently             |

---

## Getting Started

### Prerequisites

* **Node 18+**
* **npm 9+** (or **pnpm** / **yarn**)
* **MongoDB** (local or Atlas cluster)

### 1 · Clone & Install

```bash
# Clone repo
$ git clone https://github.com/SirjanSingh/rewear.git && cd rewear

# Install workspaces
$ npm install --workspaces
```

### 2 · Configure .env Files  ➜  **see [Environment Variables](#-environment-variables)**

### 3 · Run Dev Servers

```bash
# from project root – React on :5173 & API on :3000
$ npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment Variables

### `frontend/.env`

```
VITE_API_URL=http://localhost:3000/api
```

### `backend/.env`

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rewear
JWT_SECRET=super‑secret‑key
CLOUDINARY_CLOUD_NAME=<your‑id>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
```

> **Never** commit secret keys – `.env*` is in `.gitignore`.

---

## API Reference

All endpoints are live and thoroughly tested. Full Swagger docs live in [`backend/API_Documentation.md`](backend/API_Documentation.md).

### Item Endpoints

| Scope  | Method   | Endpoint                  | Description                  |
| ------ | -------- | ------------------------- | ---------------------------- |
| Public | `GET`    | `/api/items`              | List all approved items      |
| Public | `GET`    | `/api/items/:id`          | Get item by ID               |
| User   | `POST`   | `/api/items`              | Create new item              |
| User   | `PUT`    | `/api/items/:id`          | Update own item              |
| User   | `DELETE` | `/api/items/:id`          | Delete (archive) own item    |
| Admin  | `GET`    | `/api/items/pending`      | View items awaiting approval |
| Admin  | `PUT`    | `/api/items/:id/approve`  | Approve or reject item       |
| Admin  | `PUT`    | `/api/items/:id/featured` | Toggle featured status       |

### Transaction Endpoints

#### Swap Requests

| Scope | Method | Endpoint                  | Description                      |
| ----- | ------ | ------------------------- | -------------------------------- |
| User  | `POST` | `/api/swaps`              | Create swap request              |
| User  | `GET`  | `/api/swaps/user`         | Get current user’s swap requests |
| User  | `PUT`  | `/api/swaps/:id/accept`   | Accept swap                      |
| User  | `PUT`  | `/api/swaps/:id/complete` | Mark as completed                |
| User  | `PUT`  | `/api/swaps/:id/decline`  | Decline swap                     |

#### Point Redemptions

| Scope | Method | Endpoint                 | Description                     |
| ----- | ------ | ------------------------ | ------------------------------- |
| User  | `POST` | `/api/points/redeem`     | Redeem points for item          |
| User  | `GET`  | `/api/points`            | Get redemption history & wallet |
| Admin | `PUT`  | `/api/points/:id/status` | Update redemption status        |

#### Admin Operations

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| `POST` | `/api/admin/points/add` | Manually add points to a user |

### Authentication

| Method | Endpoint                 | Description        |
| ------ | ------------------------ | ------------------ |
| `POST` | `/api/auth/register`     | Register user      |
| `POST` | `/api/auth/login`        | User login         |
| `GET`  | `/api/auth/profile`      | Get own profile    |
| `PUT`  | `/api/auth/profile`      | Update profile     |
| `GET`  | `/api/auth/admin-status` | Check admin status |

---

## Roadmap

* [ ] Real‑time Socket.IO notifications.
* [ ] Review & rating system post‑swap.
* [ ] In‑app messaging between users.
* [ ] PWA offline capabilities & push notifications.

---

## Contributing

1. **Fork** & create a branch:  `git checkout -b feature/awesome`
2. **Commit** using conventional commits.
3. **Push** & open a **PR** detailing your changes.

> We follow the Airbnb JS style guide + Prettier. Run `npm run lint:fix` before pushing.

---

## Team

<details>
<summary><strong>📬 Team Contacts</strong></summary>

| Role      | Member | Email                                                             |
| --------- | ------ | ----------------------------------------------------------------- |
| Front‑end | Sirjan | [sirjan.singh036@gmail.com](mailto:sirjan.singh036@gmail.com)     |
| Front‑end | Kartik | [kartikawasthi2022@gmail.com](mailto:kartikawasthi2022@gmail.com) |
| Back‑end  | Param  | [paramveer5404@gmail.com](mailto:paramveer5404@gmail.com)         |
| Back‑end  | Ali    | [lycanalan@gmail.com](mailto:lycanalan@gmail.com)                 |

</details>


---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

> Made with love by the ReWear Community – *reduce, reuse, **re‑wear***!
