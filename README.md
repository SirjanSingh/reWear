# ReWear - Community Clothing Exchange

ReWear is a sustainable fashion platform that enables users to exchange unused clothing through direct swaps or a point-based redemption system. Our mission is to reduce textile waste by creating a vibrant community of conscious consumers who choose to reuse rather than discard wearable garments.

## 🌟 Features

### User Authentication
- Secure email/password signup and login
- JWT-based authentication
- Protected routes for authenticated users
- Role-based access control (User/Admin)

### Landing Page
- Modern, responsive design with featured items carousel
- Quick action buttons: "Start Swapping", "Browse Items", "List an Item"
- Dynamic item grid with search and filtering capabilities
- Real-time item availability updates

### User Dashboard
- Personal profile management
- Points balance tracking
- Uploaded items overview
- Swap request management
- Transaction history

### Item Management
- Multi-image upload with preview
- Detailed item information:
  - Title and description
  - Category and type (dynamic relationship)
  - Size and condition
  - Searchable tags
- Swap request system
- Points-based redemption

### Admin Panel
- Item listing moderation
- User management
- Content moderation tools
- Analytics dashboard

## 🛠 Technical Implementation

### Database Design (35%)
- **Schema Design**
  - User Model
    - Authentication details
    - Profile information
    - Points balance
    - Relationship mappings for items and swaps
  - Item Model
    - Detailed item attributes
    - Image storage
    - Status tracking
    - Owner relationships
  - SwapRequest Model
    - Request tracking
    - Item relationships
    - Status management
  - PointRedemption Model
    - Transaction records
    - Point calculations
    - Status tracking

- **Real-time Features**
  - WebSocket integration for live updates
  - Real-time swap request notifications
  - Live item availability updates
  - Instant messaging between users

### Coding Standards (40%)

#### Data Validation
- Frontend validation using form schemas
- Backend validation middleware
- Image upload restrictions
- Input sanitization

#### Dynamic Values
- Environment-based configuration
- Constants management
- Dynamic form fields
- Responsive UI breakpoints

#### Code Reusability
- Shared components:
  - Button
  - Input
  - Select
  - Modal
  - Image Gallery
  - Loading Spinner
- Custom hooks for common logic
- Utility functions
- Context providers for state management

#### Performance Optimization
- Lazy loading for images
- Code splitting
- Caching strategies
- Optimized database queries
- Debounced search
- Infinite scrolling

#### Error Handling
- Global error boundary
- Form validation feedback
- API error handling
- Fallback UI components
- User-friendly error messages

#### Code Quality
- ESLint configuration
- Prettier formatting
- TypeScript type checking
- Git hooks for pre-commit checks
- Modular architecture

### UI/UX Design (15%)

#### Responsive Design
- Mobile-first approach
- Fluid layouts
- Breakpoint optimization
- Touch-friendly interfaces

#### Navigation
- Breadcrumb navigation
- Pagination controls
- Search functionality
- Advanced filtering
- Category navigation

#### Visual Design
- Consistent color scheme
- Typography hierarchy
- Accessible contrast ratios
- Loading states
- Micro-interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (if using local database)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/rewear.git
cd rewear
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Environment Setup
```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

4. Start Development Servers
```bash
# Frontend
cd frontend
npm run dev

# Backend
cd ../backend
npm run dev
```

### Environment Variables

#### Frontend
```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

#### Backend
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rewear
JWT_SECRET=your-secret-key
```

## 📝 API Documentation

Detailed API documentation is available in the [API.md](API.md) file, including:
- Authentication endpoints
- Item management
- Swap operations
- Points system
- Admin functions

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- [Team Member 1] - Frontend Development
- [Team Member 2] - Backend Development
- [Team Member 3] - UI/UX Design
- [Team Member 4] - Testing & Documentation

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for frontend tooling
- [Express](https://expressjs.com/) for backend API
- [MongoDB](https://www.mongodb.com/) for database
