# LearnLabz - Quick Start Guide

Get the LearnLabz frontend up and running in 5 minutes!

## 🚀 Quick Start (Development)

### 1. Prerequisites Check

```bash
node --version   # Should be v20.x or higher
npm --version    # Should be v10.x or higher
docker --version # (Optional) For containerized deployment
```

### 2. Clone & Install

```bash
# Clone repository (if not already done)
cd learnlabz

# Install dependencies
npm install
```

### 3. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# The .env file is already configured for development!
# Just verify the API URL is correct:
cat .env | grep API_URL
# Should show: NEXT_PUBLIC_API_URL=https://api.learnlabz.com/api
```

### 4. Start Development Server

```bash
npm run dev
```

Open **http://localhost:9002** in your browser 🎉

---

## 🧪 Test Login

Use these test credentials (from your backend):

```
Username: johndoe5
Password: securePassword123
```

Or use any credentials from your backend user database.

---

## 🐳 Quick Start (Docker)

### Development Mode

```bash
# Start development server with hot reload
docker-compose -f docker-compose.dev.yml up

# Access at http://localhost:9002
```

### Production Mode

```bash
# Build and start production container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 📁 Project Structure (Simplified)

```
learnlabz/
├── src/
│   ├── app/              # Pages (login, dashboards)
│   ├── components/       # React components
│   ├── hooks/            # useAuth and custom hooks
│   ├── services/         # API calls (auth.service.ts)
│   ├── lib/              # Utilities (api-client, logger)
│   └── types/            # TypeScript types
├── .env                  # Environment variables
├── docker-compose.yml    # Docker config
└── package.json          # Dependencies
```

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter
npm run typecheck        # Check TypeScript

# Docker
docker-compose up -d                          # Start production
docker-compose -f docker-compose.dev.yml up   # Start development
docker-compose logs -f                        # View logs
docker-compose down                           # Stop containers
```

---

## 🎯 What's Working

✅ **Login** - Real backend integration
✅ **Authentication** - JWT tokens with auto-refresh
✅ **Routing** - All role-based dashboards
✅ **UI** - Complete shadcn/ui components
✅ **Docker** - Production & development containers

---

## ⚠️ Troubleshooting

### Port 9002 Already in Use

```bash
# Kill process on port 9002
lsof -ti:9002 | xargs kill -9

# Or change port in package.json:
# "dev": "npx next dev --turbopack -p 9003"
```

### Login Fails

1. Check backend API is running at `https://api.learnlabz.com`
2. Check browser console for errors (F12)
3. Verify credentials are correct
4. Check network tab in DevTools

### Docker Won't Build

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Environment Variables Not Loading

```bash
# Ensure .env file exists
ls -la .env

# Restart dev server
# Press Ctrl+C then run: npm run dev
```

---

## 📚 More Documentation

- **Full README**: [README.md](README.md)
- **Upgrade Details**: [UPGRADE_SUMMARY.md](UPGRADE_SUMMARY.md)
- **Architecture**: [ARCHITECTURE_RECOMMENDATIONS.md](ARCHITECTURE_RECOMMENDATIONS.md)

---

## 🎓 User Roles & Dashboards

After login, you'll be redirected based on your role:

| Role | Dashboard URL | Features |
|------|--------------|----------|
| Super Admin | `/super-admin` | Platform management |
| Institute Admin | `/institute-admin` | Institute management |
| Tutor | `/tutor` | Class & student management |
| Student | `/student` | Learning & assignments |
| Parent | `/parent` | Child progress monitoring |

---

## ✨ Key Features

- **Real-time Auth**: Keycloak JWT with automatic refresh
- **Modern UI**: Beautiful design with Tailwind CSS
- **Type-Safe**: Full TypeScript support
- **Production-Ready**: Docker deployment
- **Logging**: Comprehensive debugging logs
- **Error Handling**: User-friendly error messages

---

## 🆘 Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review [UPGRADE_SUMMARY.md](UPGRADE_SUMMARY.md) for what's new
- Contact: support@learnlabz.com

---

**Happy Coding!** 🚀
