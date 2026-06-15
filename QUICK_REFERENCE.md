# 🌾 MAKKA PROJECT - QUICK REFERENCE CARD

## 📍 File Locations & URLs

| Item | Location/URL |
|------|-------------|
| **Frontend Code** | `d:\web_project\Makka\frontend` |
| **Backend Code** | `d:\web_project\Makka\server` |
| **Website** | http://localhost:3000 |
| **Admin Login** | http://localhost:3000/admin-login |
| **API Server** | http://localhost:5000 |
| **API Health** | http://localhost:5000/api/health |

---

## 🔑 Default Credentials

**Admin Account:**
- Email: `admin@makka.com`
- Password: `admin@123`

⚠️ Change in `.env` for production!

---

## ⚙️ Environment Files

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Makka Premium Maize
NEXT_PUBLIC_WHATSAPP_NUMBER=+91XXXXXXXXXX
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/makka
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@makka.com
ADMIN_PASSWORD=admin@123
CORS_ORIGIN=http://localhost:3000
```

---

## 🚀 Startup Commands (Windows)

```batch
REM Terminal 1 - Backend
cd d:\web_project\Makka\server
npm run dev

REM Terminal 2 - Frontend
cd d:\web_project\Makka\frontend
npm run dev
```

---

## 📁 Key Files to Modify

### Frontend Customization
- **Colors**: `frontend/src/styles/tailwind.config.js`
- **Home Page**: `frontend/src/app/page.tsx`
- **Navigation**: `frontend/src/components/Navbar.tsx`
- **Footer**: `frontend/src/components/Footer.tsx`
- **Sections**: `frontend/src/sections/*.tsx`

### Backend Configuration
- **Main Server**: `server/app.js`
- **Database**: `server/config/database.js`
- **Models**: `server/models/*.js`
- **Controllers**: `server/controllers/*.js`
- **Routes**: `server/routes/*.js`

---

## 📊 Project Components

### Frontend (Next.js)
```
🎨 UI Components
├── Navbar - Navigation bar
├── Footer - Page footer
├── ProductCard - Product display
├── Modal - Pop-up dialog
└── WhatsAppButton - Chat button

📄 Pages
├── Home - Main website
├── Admin Login - Authentication
└── Admin Dashboard - Management

📋 Sections
├── Hero - Welcome section
├── About - Company info
├── Products - Product showcase
├── WhyChooseUs - Benefits
├── Enquiry - Feedback form
└── Contact - Contact info
```

### Backend (Express.js)
```
🔧 Controllers
├── authController - Login logic
├── productController - Product CRUD
├── enquiryController - Enquiry management
├── aboutController - About content
├── contactController - Contact info
└── adminController - Statistics

🛣️ Routes
├── /api/auth/* - Authentication
├── /api/products/* - Products API
├── /api/enquiry/* - Enquiries API
├── /api/about/* - About API
├── /api/contact/* - Contact API
└── /api/admin/* - Admin API

💾 Models
├── Admin - Users
├── Product - Maize products
├── Enquiry - Customer enquiries
├── About - Company info
└── Contact - Contact details
```

---

## ✅ Verification Checklist

### Before First Run
- [ ] Node.js 18+ installed
- [ ] MongoDB running
- [ ] Backend `.env` created
- [ ] Frontend `.env.local` created
- [ ] All dependencies installed

### After First Run
- [ ] Backend starts on port 5000
- [ ] Frontend starts on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can login with admin credentials
- [ ] API health check works
- [ ] No console errors

---

## 🎨 Customization Examples

### Change Primary Color
```javascript
// In tailwind.config.js, modify colors
primary: {
  600: "#16a34a",  // Change this
  700: "#15803d",  // And this
}
```

### Change Company Name
```typescript
// In app/page.tsx and components
const companyName = "Your Company Name"

// In .env files
NEXT_PUBLIC_APP_NAME=Your App Name
```

### Change WhatsApp Number
```env
# In frontend/.env.local
NEXT_PUBLIC_WHATSAPP_NUMBER=+911234567890
```

---

## 📱 Responsive Breakpoints

Website works on:
- ✅ Mobile (320px - 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (1024px+)

---

## 🔗 API Response Format

**Success Response:**
```json
{
  "data": { /* ... data ... */ },
  "message": "Success message"
}
```

**Error Response:**
```json
{
  "message": "Error message"
}
```

---

## 📦 Dependencies Summary

### Frontend (26 packages)
- react, react-dom, next
- tailwindcss, postcss, autoprefixer
- framer-motion
- axios
- react-hook-form
- react-icons
- react-hot-toast

### Backend (14 packages)
- express
- mongoose
- bcryptjs, jsonwebtoken
- cors, helmet, morgan
- multer
- express-validator

---

## 🌐 Website Structure

```
Home Page
├── Navigation Bar (Sticky)
├── Hero Section (CTA Buttons + Stats)
├── About Section (Company Info)
├── Products Section (Dynamic Products)
├── Why Choose Us (6 Benefit Cards)
├── Enquiry Section (Form)
├── Contact Section (Info + Map)
├── Footer (Links + Social)
└── WhatsApp Button (Floating)
```

---

## 👨‍💼 Admin Panel Structure

```
Admin Dashboard
├── Dashboard Page (Statistics)
├── Products Page
│   ├── View All
│   ├── Add New
│   ├── Edit
│   └── Delete
├── Enquiries Page
│   ├── View All
│   ├── Search
│   ├── Mark Contacted
│   └── Delete
├── About Page
│   ├── Edit Title
│   ├── Edit Description
│   ├── Edit Vision
│   ├── Edit Mission
│   └── Upload Image
└── Contact Page
    ├── Edit Address
    ├── Edit Phone
    ├── Edit Email
    ├── Edit WhatsApp
    ├── Update Map
    └── Social Links
```

---

## 🐛 Common Issues & Quick Fixes

| Problem | Solution |
|---------|----------|
| Port already in use | Change PORT in .env or kill process |
| Can't connect to MongoDB | Start mongod or check connection string |
| API not responding | Verify backend is running |
| CORS error | Check CORS_ORIGIN in backend .env |
| Admin login fails | Verify credentials in .env |
| Products not loading | Check if backend is connected to MongoDB |
| Styles not applying | Clear browser cache (Ctrl+Shift+Delete) |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `SETUP_GUIDE.md` | Complete setup instructions |
| `DEVELOPMENT_GUIDE.md` | Development workflow |
| `PROJECT_SUMMARY.md` | Detailed project summary |
| `setup.bat` | Windows setup script |
| `setup.sh` | Linux/Mac setup script |

---

## 💡 Pro Tips

1. **Development**: Keep two terminals open (one for backend, one for frontend)
2. **Debugging**: Use browser DevTools (F12) and check Network tab
3. **Testing**: Use Postman to test API endpoints
4. **Styling**: Use Tailwind CSS classes for consistency
5. **Animations**: Check Framer Motion docs for advanced animations
6. **Database**: Use MongoDB Atlas UI to view/edit data directly
7. **Deployment**: Test production build locally with `npm run build && npm start`

---

## 🎯 Feature Checklist

### Website Features
- ✅ Responsive design
- ✅ Hero section
- ✅ About section
- ✅ Product showcase
- ✅ Why choose us
- ✅ Enquiry form
- ✅ Contact section
- ✅ Footer
- ✅ WhatsApp button
- ✅ Animations

### Admin Features
- ✅ Authentication
- ✅ Dashboard
- ✅ Product CRUD
- ✅ Enquiry management
- ✅ Content management
- ✅ Search functionality
- ✅ Status tracking
- ✅ Responsive UI

### API Features
- ✅ Products endpoints
- ✅ Enquiry endpoints
- ✅ About endpoints
- ✅ Contact endpoints
- ✅ Admin endpoints
- ✅ Authentication
- ✅ Error handling
- ✅ Validation

---

## 🚀 Next Steps

1. **Immediate**: Run `setup.bat` or `setup.sh`
2. **Short Term**: Customize colors and add initial content
3. **Medium Term**: Test all features thoroughly
4. **Long Term**: Deploy to production and monitor

---

## 📞 Quick Help

- **Setup Issues**: See `SETUP_GUIDE.md`
- **Development Help**: See `DEVELOPMENT_GUIDE.md`
- **Project Details**: See `PROJECT_SUMMARY.md`
- **Code Structure**: See respective README files in folders
- **API Docs**: Check backend `/server/README.md`

---

**Happy Building! 🎉**

Version 1.0.0 | June 2024 | Production Ready
