# Restaurant Management System API

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Product Requirements Document (PRD)](#product-requirements-document-prd)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Examples](#examples)

---

## 🎯 Project Overview

This is a RESTful API backend for a Restaurant Management System built with Node.js and Express. The API manages two main resources:
- **Person Management**: Handles restaurant staff (chef, waiter, manager)
- **Menu Management**: Handles menu items with taste preferences and sales tracking

**Base URL**: `http://localhost:3000`

---

## 📝 Product Requirements Document (PRD)

### 1. Product Vision
A robust backend API system for managing restaurant operations including staff management and menu item management.

### 2. Objectives
- Provide CRUD operations for restaurant staff
- Manage menu items with categorization by taste
- Enable filtering and searching capabilities
- Ensure data validation and error handling

### 3. Functional Requirements

#### 3.1 Person Management
- Create new staff members with role assignment
- Retrieve all staff members
- Filter staff by work type (chef, waiter, manager)
- Update staff information
- Delete staff records

#### 3.2 Menu Management
- Create new menu items
- Retrieve all menu items
- Filter menu items by taste (sweet, spicy, sour)
- Update menu item details
- Delete menu items

### 4. Non-Functional Requirements
- RESTful API design
- MongoDB database integration
- JSON request/response format
- Error handling with appropriate HTTP status codes
- Data validation using Mongoose schemas

### 5. API Endpoints Summary
- **Person Endpoints**: 5 endpoints (POST, GET, GET by workType, PUT, DELETE)
- **Menu Endpoints**: 5 endpoints (POST, GET, GET by tasteType, PUT, DELETE)
- **Health Check**: 1 endpoint (GET /)

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB (via Mongoose 9.0.2)
- **Body Parser**: body-parser 2.2.1
- **Development**: nodemon 3.1.11

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running on localhost:27017

### Step-by-Step Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd backend-folder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   - Ensure MongoDB is running on `mongodb://localhost:27017`
   - Database name: `hotels`

4. **Start the server**
   ```bash
   node server.js
   ```
   Or with nodemon for auto-restart:
   ```bash
   nodemon server.js
   ```

5. **Verify server is running**
   - Server will start on port 3000
   - You should see: `your port is serving on the PORT 3000`
   - You should see: `mongoDB connected successfully`

6. **Test the API**
   ```bash
   curl http://localhost:3000/
   ```
   Expected response: `Node js backend ready`

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Health Check

#### GET /
Check if the API is running.

**Response**
- **Status Code**: 200 OK
- **Body**: `Node js backend ready`

---

### Person Management Endpoints

#### 1. Create Person
**POST** `/person`

Create a new staff member.

**Request Body** (JSON):
```json
{
  "name": "John Doe",
  "age": 30,
  "work": "chef",
  "mobile": "1234567890",
  "email": "john.doe@example.com",
  "address": "123 Main St",
  "salary": 50000
}
```

**Required Fields**:
- `name` (String)
- `work` (String, enum: 'chef', 'waiter', 'manager')
- `mobile` (String)
- `email` (String, unique)
- `salary` (Number)

**Optional Fields**:
- `age` (Number)
- `address` (String)

**Response**
- **Status Code**: 200 OK
- **Body**: Created person object

**Error Responses**:
- `500 Internal Server Error`: Server error during creation

---

#### 2. Get All Persons
**GET** `/person`

Retrieve all staff members.

**Response**
- **Status Code**: 200 OK
- **Body**: Array of person objects
```json
[
  {
    "_id": "...",
    "name": "John Doe",
    "age": 30,
    "work": "chef",
    "mobile": "1234567890",
    "email": "john.doe@example.com",
    "address": "123 Main St",
    "salary": 50000
  }
]
```

**Error Responses**:
- `500 Internal Server Error`: Server error during fetch

---

#### 3. Get Persons by Work Type
**GET** `/person/:workType`

Filter staff members by their work type.

**URL Parameters**:
- `workType` (String): Must be one of: `chef`, `waiter`, `manager`

**Example**:
```
GET /person/chef
```

**Response**
- **Status Code**: 201 Created
- **Body**: Array of person objects matching the work type

**Error Responses**:
- `404 Not Found`: Invalid work type provided
- `500 Internal Server Error`: Server error during fetch

---

#### 4. Update Person
**PUT** `/person/:id`

Update an existing staff member's information.

**URL Parameters**:
- `id` (String): MongoDB ObjectId of the person

**Request Body** (JSON):
```json
{
  "name": "John Doe Updated",
  "salary": 55000
}
```
*Note: Only include fields you want to update*

**Response**
- **Status Code**: 201 Created
- **Body**: Updated person object

**Error Responses**:
- `404 Not Found`: Person not found in database
- `500 Internal Server Error`: Server error during update

---

#### 5. Delete Person
**DELETE** `/person/:id`

Delete a staff member from the database.

**URL Parameters**:
- `id` (String): MongoDB ObjectId of the person

**Response**
- **Status Code**: 201 Created
- **Body**:
```json
{
  "message": "data deleted Successfully"
}
```

**Error Responses**:
- `404 Not Found`: Person not found
- `500 Internal Server Error`: Server error during deletion

---

### Menu Management Endpoints

#### 1. Create Menu Item
**POST** `/menu`

Create a new menu item.

**Request Body** (JSON):
```json
{
  "name": "Chocolate Cake",
  "price": 12.99,
  "taste": "sweet",
  "is_drink": false,
  "ingredients": "chocolate, flour, sugar",
  "num_sales": 0
}
```

**Required Fields**:
- `name` (String)
- `price` (Number)
- `taste` (String, enum: 'sweet', 'spicy', 'sour')

**Optional Fields**:
- `is_drink` (Boolean, default: false)
- `ingredients` (String, default: empty string)
- `num_sales` (Number, default: 0)

**Response**
- **Status Code**: 201 Created
- **Body**: Created menu item object

**Error Responses**:
- `500 Internal Server Error`: Server error during creation

---

#### 2. Get All Menu Items
**GET** `/menu`

Retrieve all menu items.

**Response**
- **Status Code**: 201 Created
- **Body**: Array of menu item objects
```json
[
  {
    "_id": "...",
    "name": "Chocolate Cake",
    "price": 12.99,
    "taste": "sweet",
    "is_drink": false,
    "ingredients": "chocolate, flour, sugar",
    "num_sales": 0
  }
]
```

**Error Responses**:
- `500 Internal Server Error`: Server error during fetch

---

#### 3. Get Menu Items by Taste
**GET** `/menu/:tasteType`

Filter menu items by taste type.

**URL Parameters**:
- `tasteType` (String): Must be one of: `sweet`, `spicy`, `sour`

**Example**:
```
GET /menu/sweet
```

**Response**
- **Status Code**: 201 Created
- **Body**: Array of menu item objects matching the taste type

**Error Responses**:
- `404 Not Found`: Invalid taste type provided
- `500 Internal Server Error`: Server error during fetch

---

#### 4. Update Menu Item
**PUT** `/menu/:id`

Update an existing menu item.

**URL Parameters**:
- `id` (String): MongoDB ObjectId of the menu item

**Request Body** (JSON):
```json
{
  "price": 14.99,
  "num_sales": 50
}
```
*Note: Only include fields you want to update*

**Response**
- **Status Code**: 201 Created
- **Body**: Updated menu item object

**Error Responses**:
- `404 Not Found`: Menu item not found
- `500 Internal Server Error`: Server error during update

---

#### 5. Delete Menu Item
**DELETE** `/menu/:id`

Delete a menu item from the database.

**URL Parameters**:
- `id` (String): MongoDB ObjectId of the menu item

**Response**
- **Status Code**: 201 Created
- **Body**:
```json
{
  "message": "menu delete successfully"
}
```

**Error Responses**:
- `404 Not Found`: Menu item not found
- `500 Internal Server Error`: Server error during deletion

---

## 🗄 Database Schema

### Person Schema
```javascript
{
  name: String (required),
  age: Number (optional),
  work: String (required, enum: ['chef', 'waiter', 'manager']),
  mobile: String (required),
  email: String (required, unique),
  address: String (optional),
  salary: Number (required)
}
```

### Menu Schema
```javascript
{
  name: String (required),
  price: Number (required),
  taste: String (required, enum: ['sweet', 'spicy', 'sour']),
  is_drink: Boolean (default: false),
  ingredients: String (default: empty string),
  num_sales: Number (default: 0)
}
```

**Database**: MongoDB
**Database Name**: `hotels`
**Connection String**: `mongodb://localhost:27017/hotels`

---

## ⚠️ Error Handling

The API uses standard HTTP status codes:

- **200 OK**: Successful GET request
- **201 Created**: Successful POST, PUT, DELETE request
- **404 Not Found**: Resource not found or invalid parameter
- **500 Internal Server Error**: Server-side error

**Error Response Format**:
```json
{
  "error": "Error message description"
}
```

**Common Error Scenarios**:
1. Invalid work type (must be: chef, waiter, manager)
2. Invalid taste type (must be: sweet, spicy, sour)
3. Resource not found (invalid ID)
4. Validation errors (missing required fields)
5. Duplicate email (for Person model)

---

## 💡 Examples

### Example 1: Create a Chef
```bash
curl -X POST http://localhost:3000/person \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith",
    "age": 28,
    "work": "chef",
    "mobile": "9876543210",
    "email": "alice@example.com",
    "address": "456 Oak Ave",
    "salary": 60000
  }'
```

### Example 2: Get All Waiters
```bash
curl http://localhost:3000/person/waiter
```

### Example 3: Create a Menu Item
```bash
curl -X POST http://localhost:3000/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spicy Chicken Curry",
    "price": 15.99,
    "taste": "spicy",
    "is_drink": false,
    "ingredients": "chicken, spices, curry",
    "num_sales": 0
  }'
```

### Example 4: Get Sweet Menu Items
```bash
curl http://localhost:3000/menu/sweet
```

### Example 5: Update Menu Item
```bash
curl -X PUT http://localhost:3000/menu/<menu_id> \
  -H "Content-Type: application/json" \
  -d '{
    "price": 16.99,
    "num_sales": 100
  }'
```

### Example 6: Delete Person
```bash
curl -X DELETE http://localhost:3000/person/<person_id>
```

---

## 📝 Notes

- All timestamps and IDs are automatically generated by MongoDB
- Email addresses must be unique for Person model
- Work type and taste type are case-sensitive
- The API uses Mongoose validators to ensure data integrity
- All endpoints return JSON responses

---

## 🔧 Development

### Project Structure
```
backend-folder/
├── server.js              # Main server file
├── db.js                  # MongoDB connection
├── models/
│   ├── Person.js          # Person model schema
│   └── Menu.js            # Menu model schema
├── Routes/
│   ├── PersonRoutes.js    # Person endpoints
│   └── MenuRoutes.js      # Menu endpoints
└── package.json           # Dependencies
```

### Running in Development Mode
```bash
nodemon server.js
```

---

## 📄 License
ISC

## 👤 Author
Tushar

---

## 🎯 Summary

This API provides a complete backend solution for restaurant management with:
- ✅ Full CRUD operations for staff and menu
- ✅ Filtering capabilities by work type and taste
- ✅ Data validation and error handling
- ✅ RESTful API design
- ✅ MongoDB integration

For questions or issues, please refer to the error messages or check the server logs.

