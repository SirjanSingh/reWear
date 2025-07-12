# reWear API Documentation

This document provides comprehensive documentation for the reWear API, including data models, endpoints, and authentication details.

## Table of Contents
- [Data Models](#data-models)
  - [User Model](#user-model)
  - [Item Model](#item-model)
  - [SwapRequest Model](#swaprequest-model)
  - [PointRedemption Model](#pointredemption-model)
- [API Endpoints](#api-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Item Endpoints](#item-endpoints)
  - [Swap Endpoints](#swap-endpoints)
  - [Point Redemption Endpoints](#point-redemption-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)

## Data Models

### User Model
```typescript
{
  email: string;          // required, unique, lowercase
  password: string;       // required, min length: 6
  name: string;          // required
  isAdmin: boolean;      // default: false
  points: number;        // default: 0
  swapHistory: SwapRequest[];    // references to SwapRequest
  redemptionHistory: PointRedemption[];  // references to PointRedemption
  createdAt: Date;
  updatedAt: Date;
}
```

### Item Model
```typescript
{
  title: string;         // required
  description: string;   // optional
  category: string;      // e.g. "Men", "Women", "Kids"
  type: string;         // e.g. "Shirt", "Jeans"
  size: string;         // e.g. "M", "L", "XL"
  condition: string;    // e.g. "New", "Used"
  tags: string[];       // searchable tags
  images: string[];     // array of image URLs
  uploader: User;       // reference to User
  isAvailable: boolean; // default: true
  approved: boolean;    // default: true
  featured: boolean;    // default: false
  createdAt: Date;
}
```

### SwapRequest Model
```typescript
{
  requester: User;          // reference to User who sent request
  requestedItem: Item;      // reference to Item they want
  offeredItem: Item;        // reference to Item they're offering
  status: string;           // enum: ['Pending', 'Accepted', 'Declined', 'Completed']
  createdAt: Date;
}
```

### PointRedemption Model
```typescript
{
  user: User;              // reference to User
  item: Item;              // reference to Item
  pointsUsed: number;      // required
  status: string;          // enum: ['Pending', 'Completed']
  createdAt: Date;
}
```

## API Endpoints

### Authentication Endpoints

#### Public Routes

**Register New User**
```typescript
POST /api/auth/register
Body: {
  email: string,
  password: string,
  name: string,
  avatarUrl?: string
}
Response: {
  token: string,
  user: User
}
```

**User Login**
```typescript
POST /api/auth/login
Body: {
  email: string,
  password: string
}
Response: {
  token: string,
  user: User
}
```

#### Protected Routes (require authentication)

**Get User Profile**
```typescript
GET /api/auth/profile
Response: User
```

**Update User Profile**
```typescript
PUT /api/auth/profile
Body: {
  name?: string,
  avatarUrl?: string
}
Response: User
```

**Check Admin Status**
```typescript
GET /api/auth/users/:id/is-admin
Response: {
  isAdmin: boolean
}
```

#### Admin Routes

**Add Points to User**
```typescript
POST /api/auth/admin/add-points
Body: {
  userId: string,
  points: number
}
Response: {
  message: string,
  user: User
}
```

### Item Endpoints

#### Public Routes

**Get All Items**
```typescript
GET /api/items
Query params: {
  category?: string,
  type?: string,
  size?: string,
  condition?: string,
  search?: string
}
Response: Item[]
```

**Get Single Item**
```typescript
GET /api/items/:id
Response: Item
```

#### Protected Routes (require authentication)

**Create New Item**
```typescript
POST /api/items
Body: ItemModel (without id)
Response: Item
```

**Update Item**
```typescript
PUT /api/items/:id
Body: Partial<ItemModel>
Response: Item
```

**Delete Item**
```typescript
DELETE /api/items/:id
Response: {
  message: string
}
```

#### Admin Routes

**Get Pending Items**
```typescript
GET /api/items/admin/pending
Response: Item[]
```

**Approve Item**
```typescript
PUT /api/items/admin/:id/approve
Response: Item
```

**Toggle Featured Status**
```typescript
PUT /api/items/admin/:id/feature
Response: Item
```

### Swap Endpoints

All swap routes require authentication.

**Create Swap Request**
```typescript
POST /api/swaps/request
Body: {
  requestedItemId: string,
  offeredItemId: string
}
Response: SwapRequest
```

**Get User's Swap Requests**
```typescript
GET /api/swaps
Response: SwapRequest[]
```

**Update Swap Status**
```typescript
PUT /api/swaps/:id/status
Body: {
  status: 'Accepted' | 'Declined' | 'Completed'
}
Response: SwapRequest
```

### Point Redemption Endpoints

All redemption routes require authentication.

**Create Point Redemption**
```typescript
POST /api/redemptions
Body: {
  itemId: string,
  pointsUsed: number
}
Response: PointRedemption
```

**Get Redemption History**
```typescript
GET /api/redemptions
Response: PointRedemption[]
```

**Update Redemption Status (Admin Only)**
```typescript
PUT /api/redemptions/:id/status
Body: {
  status: 'Completed'
}
Response: PointRedemption
```

## Authentication

The API uses JWT (JSON Web Token) for authentication:

- All protected routes require a Bearer token in the Authorization header
- Format: `Authorization: Bearer <token>`
- Tokens are obtained from login/register endpoints
- Tokens expire in 1 day

Example:
```http
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Error Handling

All endpoints may return the following error structure:

```typescript
{
  message: string;    // Human-readable error message
  error?: string;    // Detailed error (only in development)
}
```

### Common HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Server Error 