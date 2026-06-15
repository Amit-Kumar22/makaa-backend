# Makka - Backend API Server

Backend server built with Express.js and MongoDB.

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/makka
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@makka.com
ADMIN_PASSWORD=admin@123
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Development

```bash
npm run dev
```

Server will start on http://localhost:5000

### Production

```bash
npm start
```

## Project Structure

```
server/
├── config/           # Database and environment configuration
├── models/           # MongoDB models
├── routes/           # API routes
├── controllers/      # Route controllers
├── middleware/       # Express middleware
├── services/         # Business logic services
├── utils/            # Utility functions
├── uploads/          # Uploaded files directory
└── app.js            # Main application file
```

## API Routes

- **Auth**: POST `/api/auth/login`
- **Products**: 
  - GET `/api/products`
  - POST `/api/products`
  - PUT `/api/products/:id`
  - DELETE `/api/products/:id`
- **Enquiries**:
  - GET `/api/enquiry`
  - POST `/api/enquiry`
  - PATCH `/api/enquiry/:id`
  - DELETE `/api/enquiry/:id`
- **About**:
  - GET `/api/about`
  - PUT `/api/about`
- **Contact**:
  - GET `/api/contact`
  - PUT `/api/contact`
- **Admin**: GET `/api/admin/stats`

## Database

Uses MongoDB for data persistence. Models:
- Admin
- Product
- Enquiry
- About
- Contact

## Technologies

- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Cloudinary for image storage
- CORS for cross-origin requests

## License

Private Project
