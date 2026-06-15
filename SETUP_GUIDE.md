# 🌾 Makka - Premium Maize Business Website

## Complete Full-Stack Project Setup & Deployment Guide

This is a professional, production-ready full-stack web application for Makka Premium Maize Business with:
- Modern responsive frontend built with Next.js
- Powerful backend API with Node.js & Express
- MongoDB database
- Admin panel with authentication
- Complete product & enquiry management system

---

## 📋 Project Overview

### Technology Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (Animations)
- Axios (API Client)
- React Hook Form (Forms)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (File Uploads)
- Cloudinary (Image Storage)

**Database:**
- MongoDB (Local or Cloud)

---

## 🚀 Quick Start Guide

### Prerequisites

- Node.js 18+ installed
- MongoDB (Local or MongoDB Atlas account)
- npm or yarn package manager
- Git
- Code Editor (VS Code recommended)

### Step 1: Clone/Extract Project

```bash
cd d:\web_project\Makka
```

### Step 2: Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Configure environment variables
# Copy .env.local with your API URL (http://localhost:5000)

# Start development server
npm run dev

# Server runs on: http://localhost:3000
```

### Step 3: Backend Setup

```bash
# Navigate to backend (from project root)
cd server

# Install dependencies
npm install

# Configure environment variables (.env file)
# Update these important values:
# - MONGODB_URI
# - JWT_SECRET
# - ADMIN_EMAIL and ADMIN_PASSWORD
# - CLOUDINARY credentials (optional)

# Start development server
npm run dev

# Server runs on: http://localhost:5000
```

### Step 4: MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
# Windows: mongod (in command prompt)
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

---

## 📁 Project Structure

### Frontend (`/frontend`)
```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── admin-login/       # Admin login page
│   └── admin/             # Protected admin routes
│       ├── dashboard/     # Stats overview
│       ├── products/      # Product management
│       ├── enquiries/     # Enquiry management
│       ├── about/         # About content management
│       └── settings/      # Contact & settings
├── components/            # Reusable components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Footer
│   ├── ProductCard.tsx   # Product display
│   ├── Modal.tsx         # Modal component
│   ├── WhatsAppButton.tsx # WhatsApp integration
│   └── admin/AdminSidebar.tsx
├── sections/              # Page sections
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ProductsSection.tsx
│   ├── WhyChooseUsSection.tsx
│   ├── EnquirySection.tsx
│   └── ContactSection.tsx
├── services/              # API integration
│   └── api.ts            # Axios API client
├── context/               # React context
│   └── ContentContext.tsx
├── types/                 # TypeScript types
│   └── index.ts
├── utils/                 # Helper functions
│   └── helpers.ts
└── styles/                # Global styles
    └── globals.css
```

### Backend (`/server`)
```
├── config/                # Configuration
│   └── database.js       # MongoDB connection
├── models/               # MongoDB models
│   ├── Admin.js
│   ├── Product.js
│   ├── Enquiry.js
│   ├── About.js
│   └── Contact.js
├── controllers/          # Route handlers
│   ├── authController.js
│   ├── productController.js
│   ├── enquiryController.js
│   ├── aboutController.js
│   ├── contactController.js
│   └── adminController.js
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── enquiryRoutes.js
│   ├── aboutRoutes.js
│   ├── contactRoutes.js
│   └── adminRoutes.js
├── middleware/          # Express middleware
│   ├── auth.js         # JWT authentication
│   └── errorHandler.js
├── utils/              # Utility functions
│   └── initializeAdmin.js
├── uploads/            # File uploads directory
├── .env               # Environment variables
├── app.js            # Main server file
└── package.json
```

---

## 🔐 Environment Configuration

### Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Makka Premium Maize
NEXT_PUBLIC_WHATSAPP_NUMBER=+91XXXXXXXXXX
```

### Backend `.env`

```env
# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/makka
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/makka

# JWT
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d

# Admin Credentials (Initial Setup)
ADMIN_EMAIL=admin@makka.com
ADMIN_PASSWORD=admin@123

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🏃 Running the Application

### Development Mode (Both Frontend & Backend Running)

**Terminal 1 - Backend:**
```bash
cd d:\web_project\Makka\server
npm run dev
# Output: ✅ Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd d:\web_project\Makka\frontend
npm run dev
# Output: ▲ Next.js is running on http://localhost:3000
```

**Access the Application:**
- Website: http://localhost:3000
- Admin Login: http://localhost:3000/admin-login
- Default credentials: admin@makka.com / admin@123

---

## 🔑 Admin Panel Features

### Dashboard
- View total products count
- View total enquiries count
- View visitor statistics

### Product Management
- **Add Product**: Create new product entries
- **Edit Product**: Update product details
- **Delete Product**: Remove products
- Fields: Name, Description, Grade, Moisture %, Price, Image

### Enquiry Management
- **View Enquiries**: See all customer enquiries
- **Search Enquiries**: Filter by name, email, phone
- **Mark as Contacted**: Update enquiry status
- **Delete Enquiries**: Remove old enquiries

### About Management
- **Edit Title**: Company title
- **Edit Description**: Company description
- **Edit Vision**: Vision statement
- **Edit Mission**: Mission statement
- **Upload Image**: Company image

### Contact Management
- **Update Address**
- **Update Phone Number**
- **Update WhatsApp Number**
- **Update Email**
- **Add Google Map Embed**
- **Update Social Media Links**

---

## 📝 API Endpoints

### Authentication
- **POST** `/api/auth/login` - Admin login
  ```json
  {
    "email": "admin@makka.com",
    "password": "admin@123"
  }
  ```

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create product (Protected)
- **PUT** `/api/products/:id` - Update product (Protected)
- **DELETE** `/api/products/:id` - Delete product (Protected)

### Enquiries
- **GET** `/api/enquiry` - Get all enquiries (Protected)
- **POST** `/api/enquiry` - Create enquiry
- **PATCH** `/api/enquiry/:id` - Mark as contacted (Protected)
- **DELETE** `/api/enquiry/:id` - Delete enquiry (Protected)

### About
- **GET** `/api/about` - Get about content
- **PUT** `/api/about` - Update about content (Protected)

### Contact
- **GET** `/api/contact` - Get contact information
- **PUT** `/api/contact` - Update contact (Protected)

### Admin
- **GET** `/api/admin/stats` - Get dashboard statistics (Protected)

---

## 🎨 Website Features

### Public Features
✅ Responsive design (Mobile, Tablet, Desktop)
✅ Hero section with CTA buttons
✅ About section with company info
✅ Products showcase with cards
✅ Why Choose Us section with benefits
✅ Enquiry form with validation
✅ Contact information display
✅ WhatsApp chat integration
✅ Google Maps embed
✅ Social media links
✅ Smooth animations and transitions
✅ SEO optimized

### Admin Panel Features
✅ Secure JWT authentication
✅ Dashboard with statistics
✅ Full product CRUD operations
✅ Enquiry management system
✅ Content management (About, Contact)
✅ Responsive admin interface
✅ Error handling and validation

---

## 🚢 Production Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel:**
   - Visit https://vercel.com
   - Connect your GitHub repository
   - Set environment variables
   - Deploy automatically

### Backend Deployment (Heroku/Railway/Render)

**Option 1: Render.com**
1. Push code to GitHub
2. Visit https://render.com
3. Create new Web Service
4. Connect GitHub repository
5. Add environment variables
6. Deploy

**Option 2: Railway.app**
1. Push code to GitHub
2. Visit https://railway.app
3. Create new project
4. Connect GitHub
5. Add MongoDB addon
6. Deploy

**Environment variables for production:**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=generate_strong_secret_here
CORS_ORIGIN=https://yourdomain.com
ADMIN_EMAIL=admin@makka.com
ADMIN_PASSWORD=change_this_password
```

---

## 🔒 Security Considerations

### Before Production Deployment:

1. **Change Default Credentials**
   - Update `ADMIN_EMAIL` and `ADMIN_PASSWORD`
   - Generate new `JWT_SECRET`

2. **Enable HTTPS**
   - Use SSL certificates
   - Redirect HTTP to HTTPS

3. **Database Security**
   - Use MongoDB Atlas with IP whitelist
   - Enable authentication
   - Use strong passwords

4. **Environment Variables**
   - Never commit `.env` files
   - Use `.gitignore`
   - Store secrets securely

5. **API Security**
   - Add rate limiting
   - Validate all inputs
   - Implement CORS properly
   - Use helmet middleware

6. **Image Upload Security**
   - Validate file types
   - Use Cloudinary for storage
   - Set file size limits

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Verify MongoDB connection
- Check `.env` file configuration
- Check Node.js version (should be 16+)

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS configuration in backend
- Look for network errors in browser console

### MongoDB connection failed
- Verify MongoDB is running locally
- Check connection string in `.env`
- Verify credentials if using MongoDB Atlas
- Check firewall settings

### Admin login not working
- Verify admin user was created (check server logs)
- Check password in `.env`
- Verify JWT_SECRET is set
- Check browser console for errors

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📞 Support & Maintenance

### Regular Maintenance Tasks:
- Backup database regularly
- Monitor server logs
- Update dependencies monthly
- Review enquiries and respond promptly
- Optimize images for web
- Monitor website performance

### Contact Information:
- Update contact details in admin panel
- Keep product information current
- Monitor enquiry submissions
- Maintain social media links

---

## 📄 License

This is a private project for Makka Premium Maize Business.

---

## 🎉 You're All Set!

Your complete Makka Premium Maize Business Website is now ready!

**Next Steps:**
1. Run backend: `cd server && npm run dev`
2. Run frontend: `cd frontend && npm run dev`
3. Access at http://localhost:3000
4. Login to admin: http://localhost:3000/admin-login
5. Start managing your business!

Happy coding! 🚀
