# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit: https://vercel.com/
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your repository: `SujalGc99/MedBill-Analyzer`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   VITE_OPENROUTER_API_KEY = your_api_key_here
   VITE_APP_NAME = MedBill Analyzer
   VITE_DEFAULT_COUNTRY = Nepal
   VITE_DEFAULT_MODEL = anthropic/claude-3.5-sonnet
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your app will be live at: `https://your-project.vercel.app`

---

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd "c:\Users\gcsuj\MyALLData\MedBill Analyzer\react"
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - What's your project's name? medbill-analyzer
# - In which directory is your code located? ./
# - Auto-detect project settings? Yes

# Add environment variables
vercel env add VITE_OPENROUTER_API_KEY

# Deploy to production
vercel --prod
```

---

## Environment Variables on Vercel

**CRITICAL**: Add these in Vercel Dashboard → Settings → Environment Variables

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_OPENROUTER_API_KEY` | Your OpenRouter API key | ✅ Yes |
| `VITE_APP_NAME` | MedBill Analyzer | No |
| `VITE_DEFAULT_COUNTRY` | Nepal | No |
| `VITE_DEFAULT_MODEL` | anthropic/claude-3.5-sonnet | No |

---

## Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- ✅ Deploy on every push to `main` branch
- ✅ Create preview URLs for pull requests
- ✅ Run build checks before deployment

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)
4. Wait for SSL certificate (automatic)

---

## Troubleshooting

### Build Fails

**Check:**
- Environment variables are set correctly
- Build command is `npm run build`
- Output directory is `dist`
- Node version compatible (18+)

### API Key Not Working

**Check:**
- Variable name is exactly `VITE_OPENROUTER_API_KEY`
- Value has no extra spaces
- Redeploy after adding variables

### 404 on Refresh

**Solution:** Already handled by `vercel.json` rewrites

---

## Project URLs

- **GitHub**: https://github.com/SujalGc99/MedBill-Analyzer
- **Vercel**: https://your-project.vercel.app (after deployment)

---

## Performance Tips

1. **Enable Edge Caching** (automatic on Vercel)
2. **Use CDN** for static assets (automatic)
3. **Monitor usage** in Vercel Analytics
4. **Set API rate limits** on OpenRouter

---

**Ready to deploy!** 🚀
