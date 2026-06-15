# 🌾 Makka - Premium Maize Business Website

Complete Full-Stack Web Application with Admin Panel

## 📦 Project Includes

### Frontend (Next.js)
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ 6 main sections (Hero, About, Products, Why Choose Us, Enquiry, Contact)
- ✅ Framer Motion animations
- ✅ Product showcase with quick view modal
- ✅ WhatsApp chat integration
- ✅ Enquiry form submission
- ✅ Contact information display
- ✅ Admin login page
- ✅ Full admin dashboard

### Admin Panel
- ✅ Secure JWT authentication
- ✅ Dashboard with statistics
- ✅ Product management (CRUD)
- ✅ Enquiry management with search
- ✅ About section editing
- ✅ Contact information management
- ✅ Responsive design

### Backend (Node.js + Express)
- ✅ RESTful API with all endpoints
- ✅ MongoDB integration
- ✅ JWT authentication & authorization
- ✅ Error handling
- ✅ CORS enabled
- ✅ Environment configuration
- ✅ Scalable architecture

### Database (MongoDB)
- ✅ Admin model with authentication
- ✅ Product model with all fields
- ✅ Enquiry model
- ✅ About model
- ✅ Contact model

## 🚀 Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/makka
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@makka.com
ADMIN_PASSWORD=admin@123
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Makka Premium Maize
NEXT_PUBLIC_WHATSAPP_NUMBER=+91XXXXXXXXXX
```

### 3. Start MongoDB

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (Cloud)
```

### 4. Run Backend

```bash
cd server
npm run dev
# Server: http://localhost:5000
```

### 5. Run Frontend

```bash
cd frontend
npm run dev
# Website: http://localhost:3000
```

### 6. Access Application

- Website: **http://localhost:3000**
- Admin Login: **http://localhost:3000/admin-login**
- Credentials: **admin@makka.com** / **admin@123**

## 📂 Project Structure

```
Makka/
├── frontend/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/                # Pages & layouts
│   │   ├── components/         # React components
│   │   ├── sections/           # Page sections
│   │   ├── services/           # API client
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Helpers
│   │   ├── styles/             # Global CSS
│   │   └── context/            # React context
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── server/                      # Node.js + Express Backend
│   ├── models/                 # MongoDB models
│   ├── controllers/            # Route controllers
│   ├── routes/                 # API routes
│   ├── middleware/             # Auth & error handling
│   ├── config/                 # Database config
│   ├── utils/                  # Helper functions
│   ├── app.js                 # Main server file
│   ├── package.json
│   └── .env
│
└── SETUP_GUIDE.md             # Comprehensive guide
```

## 🎯 Features Implemented

### Public Website
- ✅ Professional hero section
- ✅ About company section
- ✅ Product listings
- ✅ Why choose us benefits
- ✅ Enquiry form
- ✅ Contact information
- ✅ WhatsApp integration
- ✅ Footer with links
- ✅ Responsive navigation
- ✅ Smooth animations

### Admin Dashboard
- ✅ Login authentication
- ✅ Dashboard overview
- ✅ Product CRUD operations
- ✅ Enquiry management
- ✅ About content management
- ✅ Contact management
- ✅ Search functionality
- ✅ Status tracking

### Technical Features
- ✅ JWT authentication
- ✅ RESTful API design
- ✅ Error handling
- ✅ Form validation
- ✅ Input sanitization
- ✅ CORS protection
- ✅ Environment configuration
- ✅ Scalable structure

## 🔗 API Endpoints

### Auth
- `POST /api/auth/login` - Admin login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Enquiries
- `POST /api/enquiry` - Submit enquiry
- `GET /api/enquiry` - Get all enquiries
- `PATCH /api/enquiry/:id` - Update enquiry
- `DELETE /api/enquiry/:id` - Delete enquiry

### About
- `GET /api/about` - Get about content
- `PUT /api/about` - Update about content

### Contact
- `GET /api/contact` - Get contact info
- `PUT /api/contact` - Update contact info

### Admin
- `GET /api/admin/stats` - Dashboard stats

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- React Hook Form

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Cors
- Multer

## 📋 Checklist for Production

- [ ] Change admin password
- [ ] Generate new JWT_SECRET
- [ ] Setup MongoDB Atlas
- [ ] Configure domain
- [ ] Setup SSL certificate
- [ ] Configure CORS properly
- [ ] Add image upload service (Cloudinary)
- [ ] Setup email notifications
- [ ] Monitor performance
- [ ] Backup database regularly

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Customization Tips

### Change Company Name
1. Update in frontend `.env.local`
2. Update in Navbar and Footer components
3. Update in Backend README

### Change Colors
1. Update `tailwind.config.js` color scheme
2. Adjust primary/accent colors
3. Update component classes

### Add More Features
1. Create new MongoDB model
2. Add controller logic
3. Create API routes
4. Add frontend components
5. Connect to UI

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] MongoDB connected
- [ ] Admin login works
- [ ] Products display
- [ ] Enquiry form submits
- [ ] Contact info loads
- [ ] About section displays
- [ ] Animations work
- [ ] Responsive design works

## 🎉 Success!

Your complete Makka Premium Maize Business Website is ready to use!

For detailed setup instructions, see **SETUP_GUIDE.md**

Happy coding! 🚀
