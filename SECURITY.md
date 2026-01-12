# 🔐 Security Guidelines for MedBill Analyzer

## 🚨 CRITICAL: Before Pushing to GitHub

### ✅ Pre-Deployment Security Checklist

- [ ] **Verify .env is in .gitignore** - It is! ✅
- [ ] **Never commit .env file** - Only commit .env.example
- [ ] **Remove any hardcoded API keys** - All keys use environment variables ✅
- [ ] **Check git history** - If you ever committed secrets, remove them from history
- [ ] **Rotate compromised keys** - If any secrets were exposed, regenerate them immediately
- [ ] **Review all files** - Do a final scan for sensitive data

---

## 🔒 Environment Variables Security

### Where Secrets Are Stored

```
✅ SAFE: .env (gitignored)
✅ SAFE: Environment variables in deployment platform
❌ UNSAFE: Hardcoded in source code
❌ UNSAFE: Committed to GitHub
❌ UNSAFE: Shared in public channels
```

### Current Environment Variables

```bash
VITE_OPENROUTER_API_KEY    # 🔴 CRITICAL - Never expose
VITE_DEFAULT_MODEL         # ✅ Safe to expose
VITE_APP_NAME             # ✅ Safe to expose
VITE_DEFAULT_COUNTRY      # ✅ Safe to expose
```

---

## 🛡️ Security Measures Implemented

### 1. **Environment Variable Protection**
- ✅ All API keys stored in `.env`
- ✅ `.env` is in `.gitignore`
- ✅ `.env.example` provided without real secrets
- ✅ All code uses `import.meta.env.VITE_*`

### 2. **No Hardcoded Secrets**
- ✅ Grep search confirmed no hardcoded API keys
- ✅ All sensitive data accessed via environment variables
- ✅ Validation checks for missing API keys

### 3. **Gitignore Coverage**
```gitignore
.env
.env.*local
*.key
*.pem
secrets/
credentials/
receipts/
uploads/
user-data/
```

### 4. **Client-Side Security**
- ✅ No server-side logic (pure frontend)
- ✅ API calls go directly to OpenRouter (no middleman)
- ⚠️ Note: API key is visible in browser network tab (inherent limitation of client-side apps)

---

## ⚠️ Important Limitations

### Client-Side API Keys

**Reality:** In a pure frontend app (no backend), the API key **will be visible** in:
- Browser DevTools → Network tab
- Compiled JavaScript bundle
- Browser memory

**This is acceptable IF:**
- ✅ You use OpenRouter's free tier (limited damage)
- ✅ You set up API key restrictions/rate limits on OpenRouter
- ✅ You monitor usage regularly
- ✅ You're okay with public usage of your key

**For Production:** Consider adding a backend proxy:
```
User → Your Backend → OpenRouter
     (API key hidden)
```

---

## 🚀 Deployment Best Practices

### Option 1: Static Hosting (Vercel, Netlify, GitHub Pages)

**Setup:**
1. Add environment variables in hosting platform dashboard
2. Platform injects them during build time
3. Never commit actual `.env` file

**Vercel Example:**
```bash
# In Vercel Dashboard → Settings → Environment Variables
VITE_OPENROUTER_API_KEY = sk-or-v1-xxxxx
VITE_DEFAULT_MODEL = anthropic/claude-3.5-sonnet
```

**Netlify Example:**
```bash
# In Netlify Dashboard → Site settings → Build & deploy → Environment
VITE_OPENROUTER_API_KEY = sk-or-v1-xxxxx
```

### Option 2: Self-Hosted

```bash
# On your server
cp .env.example .env
nano .env  # Edit with your real API key
npm run build
```

---

## 🔧 How to Protect Your OpenRouter API Key

### 1. **Set Up Rate Limits**
Log into OpenRouter → API Keys → Set:
- Daily spending limit
- Per-minute request limit
- Allowed models only

### 2. **Monitor Usage**
- Check OpenRouter dashboard daily
- Set up email alerts for unusual activity
- Track spend vs budget

### 3. **Rotate Keys Regularly**
```bash
# Every 30-90 days
1. Generate new API key on OpenRouter
2. Update your .env file
3. Delete old key on OpenRouter
```

### 4. **Use Separate Keys**
```bash
# Development
VITE_OPENROUTER_API_KEY=sk-or-dev-xxxxx

# Production
VITE_OPENROUTER_API_KEY=sk-or-prod-xxxxx
```

---

## 🔍 How to Check if You Accidentally Committed Secrets

### Scan Git History
```bash
# Check for accidentally committed secrets
git log --all --full-history -- .env

# Search commit history for API keys
git log -p | grep -i "sk-or-v1"
```

### Remove from History (if found)
```bash
# WARNING: This rewrites history!
# Use git-filter-repo or BFG Repo-Cleaner

# Install BFG
# https://rtyley.github.io/bfg-repo-cleaner/

# Remove .env from all commits
bfg --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

---

## 📋 Security Audit Checklist

### Before Every Push
- [ ] Run: `git status` - Check what's being committed
- [ ] Run: `git diff --cached` - Review changes
- [ ] Verify: `.env` is NOT in the list
- [ ] Verify: No API keys in source code
- [ ] Verify: `.env.example` has only placeholder values

### Before Public Release
- [ ] All secrets in environment variables ✅
- [ ] `.gitignore` includes `.env` ✅
- [ ] No hardcoded credentials ✅
- [ ] API key has usage limits set
- [ ] Monitoring/alerts configured
- [ ] README documents setup process ✅

---

## 🆘 If You Accidentally Expose Your API Key

### Immediate Actions:
1. **Delete the key** on OpenRouter immediately
2. **Generate new key** on OpenRouter
3. **Update your .env** with new key
4. **Remove from git history** (see above)
5. **Force push** to overwrite history
6. **Monitor usage** for the next 24-48 hours

### Notify:
- OpenRouter support (if usage detected)
- Your team (if collaborative project)

---

## ✅ Current Security Status

| Security Measure | Status |
|-----------------|--------|
| `.env` in `.gitignore` | ✅ Protected |
| `.env.example` without secrets | ✅ Safe |
| No hardcoded API keys | ✅ Verified |
| Environment variable usage | ✅ Implemented |
| API key validation | ✅ Runtime checks |
| Comprehensive .gitignore | ✅ Updated |
| Security documentation | ✅ Created |

**Status: READY FOR GITHUB** ✅

---

## 📚 Additional Resources

- [OpenRouter API Key Management](https://openrouter.ai/keys)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Git Secrets Removal](https://rtyley.github.io/bfg-repo-cleaner/)
- [OWASP Security Guidelines](https://owasp.org/)

---

## 🎯 Quick Setup for New Developers

```bash
# 1. Clone repo
git clone <your-repo>
cd react

# 2. Copy environment template
cp .env.example .env

# 3. Edit .env with your API key
nano .env

# 4. Install dependencies
npm install

# 5. Run locally
npm run dev
```

**Remember:** Never commit your `.env` file!
