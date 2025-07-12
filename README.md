# ReWear - Community Clothing Exchange

A sustainable fashion platform enabling users to exchange unused clothing through direct swaps or a point-based redemption system.

## 🌟 Current Features

### Authentication
- Email/password signup and login
- JWT-based authentication
- Protected routes
- Role-based access (User/Admin)

### Landing Page
- Featured items carousel
- Quick actions: "Start Swapping", "Browse Items", "List an Item"
- Dynamic item grid with search and filters

### Item Management
- Multi-image upload with preview
- Detailed item information
- Swap request system
- Points-based redemption

## 🛠 Tech Stack

### Frontend
- React with Vite
- TailwindCSS for styling
- Context API for state management
- React Router for navigation

### Backend
- Node.js with Express
- JWT for authentication
- MongoDB for data storage
- RESTful API design

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB

### Quick Start

1. Clone and Install
```bash
# Clone repository
git clone https://github.com/SirjanSingh/rewear.git
cd rewear

# Install dependencies
cd frontend && npm install
cd ../backend && npm install
```

2. Set up environment variables
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:3000

# Backend (.env)
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rewear
JWT_SECRET=your-secret-key
```

3. Start Development
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```
## 📝 API Documentation

Detailed API documentation is available in the [API.md](https://github.com/SirjanSingh/reWear/blob/main/backend/API_Documentation.md) file, including:
- Authentication endpoints
- Item management
- Swap operations
- Points system
- Admin functions
## 📝 API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login - User login
GET /api/auth/profile - Get user profile (protected)
```

### Items
```
GET /api/items - Get all items
POST /api/items - Create new item (protected)
GET /api/items/:id - Get single item
PUT /api/items/:id - Update item (protected)
```

## 👥 Team

- Frontend Development: [Sirjan, Kartik]
- Backend Development: [Param , Ali]
- UI/UX Design: [Kartik, Sirjan]

## 📱 Screenshots

[Add screenshots of key features when available]

## 🔄 Current Status

The project is in active development with a focus on:
- Implementing user authentication
- Connecting frontend to backend services
- Setting up the item listing functionality
- Developing the swap request system

## 🎯 Next Steps

1. Complete backend authentication integration
2. Implement real-time updates for item availability
3. Add image upload functionality
4. Develop the points system
5. Create admin dashboard
