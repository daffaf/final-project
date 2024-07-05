# Project Name
sanbercode-be-57-final-project
## Deployment URL
The application is deployed at: [https://railway.app](https://final-project-express-daffa.up.railway.app/api)

## API Endpoints

### General
- **GET /** 
  - Description: Check if the server is running
  - Response: `{ "message": "server is running..", "data": "oke" }`

### Products
- **GET /api/products**
  - Description: Get all products
- **POST /api/products**
  - Description: Create a new product
- **GET /api/products/:id**
  - Description: Get a single product by ID
- **PUT /api/products/:id**
  - Description: Update a product by ID
- **DELETE /api/products/:id**
  - Description: Delete a product by ID

### Categories
- **GET /api/categories**
  - Description: Get all categories
- **POST /api/categories**
  - Description: Create a new category

### Authentication
- **POST /api/auth/login**
  - Description: User login
- **POST /api/auth/register**
  - Description: User registration
- **GET /api/auth/me**
  - Description: Get authenticated user info
  - Middleware: `authMiddleware`, `aclMiddleware(["admin"])`
- **PUT /api/auth/profile**
  - Description: Update user profile
  - Middleware: `authMiddleware`

### Orders
- **POST /api/orders**
  - Description: Create a new order
  - Middleware: `authMiddleware`
- **GET /api/orders/history**
  - Description: Get order history for the authenticated user
  - Middleware: `authMiddleware`


