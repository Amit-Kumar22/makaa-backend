# 📋 Development Checklist & Quick Reference

## Pre-Development Setup

### System Requirements
- [ ] Node.js 18+ installed
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

### Initial Configuration
- [ ] Backend `.env` file created
- [ ] Frontend `.env.local` file created
- [ ] MongoDB running (local or connected to Atlas)
- [ ] All dependencies installed (`npm install`)

## Development Workflow

### Starting the Application

```bash
# Terminal 1 - Backend
cd server
npm run dev
# Expected: ✅ Server running on http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm run dev
# Expected: ▲ Next.js running on http://localhost:3000
```

### Accessing the Application

| Component | URL | Purpose |
|-----------|-----|---------|
| Website | http://localhost:3000 | View public website |
| Admin Login | http://localhost:3000/admin-login | Admin access |
| API Health | http://localhost:5000/api/health | API status check |

### Default Admin Credentials
- Email: `admin@makka.com`
- Password: `admin@123`

⚠️ **Important**: Change these in production!

## Common Development Tasks

### Adding a New Route (Backend)

1. Create controller in `/server/controllers/`
2. Create route in `/server/routes/`
3. Import and use in `/server/app.js`
4. Test with Postman or curl

### Adding a New Page (Frontend)

1. Create folder in `/frontend/src/app/`
2. Add `page.tsx` file
3. Import components as needed
4. Use layout for consistent styling

### Adding a New Component (Frontend)

1. Create file in `/frontend/src/components/`
2. Import in page or section
3. Style with Tailwind CSS
4. Add animations with Framer Motion

## File Structure Quick Reference

```
Frontend Key Files:
- src/app/page.tsx - Home page
- src/app/admin-login/page.tsx - Admin login
- src/app/admin/dashboard/page.tsx - Dashboard
- src/components/Navbar.tsx - Navigation
- src/services/api.ts - API client
- tailwind.config.js - Styling config

Backend Key Files:
- app.js - Main server
- models/*.js - Database schemas
- controllers/*.js - Business logic
- routes/*.js - API endpoints
- .env - Configuration
```

## Debugging Tips

### Frontend Debugging
- Open browser DevTools (F12)
- Check Network tab for API calls
- Check Console for errors
- Use React DevTools extension

### Backend Debugging
- Check server terminal for logs
- Use console.log() for debugging
- Check MongoDB data in Atlas UI
- Use Postman to test endpoints

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Kill process or use different port |
| Port 5000 in use | Kill process or change PORT in .env |
| MongoDB connection failed | Verify MongoDB is running |
| CORS error | Check CORS_ORIGIN in backend .env |
| API not responding | Verify backend is running |
| Admin login failing | Check admin credentials in .env |

## Testing Checklist

### Frontend
- [ ] Home page loads
- [ ] All sections visible
- [ ] Responsive design works
- [ ] Animations smooth
- [ ] Forms submit
- [ ] Navigation works
- [ ] Admin login accessible

### Backend
- [ ] Server starts without errors
- [ ] MongoDB connects
- [ ] Admin initialized
- [ ] All endpoints accessible
- [ ] JWT authentication works
- [ ] CORS enabled

### Integration
- [ ] Frontend connects to backend
- [ ] Products load from API
- [ ] Enquiries submit successfully
- [ ] Admin dashboard works
- [ ] Product management works
- [ ] Contact info loads

## Performance Optimization

### Frontend
- [ ] Images optimized
- [ ] Bundle size checked
- [ ] Animations performant
- [ ] API calls minimized
- [ ] Code splitting implemented

### Backend
- [ ] Database queries optimized
- [ ] Error handling implemented
- [ ] Request validation added
- [ ] Rate limiting considered
- [ ] Logging implemented

## Security Checklist

### Before Production
- [ ] Change admin password
- [ ] Generate new JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set up SSL certificate
- [ ] Configure firewall
- [ ] Enable database authentication
- [ ] Set up environment variables
- [ ] Review error messages (don't expose internals)

### Code Review
- [ ] No hardcoded secrets
- [ ] Input validation implemented
- [ ] SQL injection prevented
- [ ] XSS protection enabled
- [ ] CSRF tokens if needed
- [ ] Rate limiting added
- [ ] Logging implemented

## Deployment Preparation

### Frontend (Vercel)
- [ ] Push to GitHub
- [ ] Set environment variables
- [ ] Deploy to Vercel
- [ ] Test in production
- [ ] Monitor performance

### Backend (Render/Railway)
- [ ] Push to GitHub
- [ ] Set environment variables
- [ ] Deploy to hosting
- [ ] Verify API endpoints
- [ ] Monitor logs

## Useful Commands

```bash
# Backend
npm run dev          # Development mode
npm install          # Install dependencies
npm start            # Production mode

# Frontend
npm run dev          # Development mode
npm run build        # Build for production
npm start            # Start production build
npm run lint         # Run linter

# MongoDB
mongod              # Start MongoDB
mongo               # Connect to MongoDB

# Git
git add .           # Stage changes
git commit -m "msg" # Commit changes
git push            # Push to remote
```

## Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind Docs](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## Support & Help

### Getting Help
1. Check error message in console
2. Look in relevant log file
3. Check documentation
4. Search online for error message
5. Ask in developer communities

### Reporting Issues
- Describe what happened
- Include error message
- Provide steps to reproduce
- Share relevant code snippets
- Note your environment (OS, Node version, etc.)

---

**Last Updated**: 2024
**Project**: Makka Premium Maize Business Website
**Version**: 1.0.0
