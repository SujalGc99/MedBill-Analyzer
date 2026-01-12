# 🏥 MedBill Analyzer

**AI-Powered Medical Bill Analysis Tool**

> *A smart way to analyze medical bills and detect overcharging using artificial intelligence.*

[![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Powered by AI](https://img.shields.io/badge/Powered%20by-AI-ff6b6b?style=for-the-badge&logo=openai)](https://openrouter.ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🌟 What is This?

Have you ever looked at a medical bill and thought, "Is this even fair?" 

**MedBill Analyzer** uses AI to:
- 📸 **Scan** your medical bill (just upload an image!)
- 🔍 **Detect** where the bill is from automatically
- 💰 **Compare** prices to what's fair in any country
- ⚠️ **Warn** you if you're being overcharged
- 💾 **Generate** a corrected receipt with fair prices

No medical knowledge required. No complex setup. Just upload and get answers!

---

## ✨ Features

### 🤖 Smart AI Analysis
- **Auto-detects** bill country from currency symbols, hospital names, and phone codes
- **Cross-country comparison** - Compare Nepal bill to USA prices, or vice versa
- **Fair price ranges** for every item based on market data
- **Confidence scoring** - AI tells you how sure it is

### 🌍 Multi-Country Support
Currently supports:
- 🇳🇵 Nepal (NPR)
- 🇺🇸 USA (USD)
- 🇮🇳 India (INR)
- 🇧🇩 Bangladesh (BDT)
- 🇵🇰 Pakistan (PKR)
- 🇷🇺 Russia (RUB)

### 🎨 User-Friendly Interface
- **Beautiful design** with smooth animations
- **Two languages**: English & Nepali (नेपाली)
- **One-click re-analysis** if location detected wrong
- **Export to PDF** for your records

### 🔒 Privacy & Security
- **No backend** - everything runs in your browser
- **No data storage** - your bills stay on your device
- **Secure API calls** - direct to OpenRouter AI
- **Open source** - see exactly what the code does

---

## 🚀 Getting Started

### What You'll Need

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Check if installed: `node --version`

2. **OpenRouter API Key** (free to get!)
   - Sign up at: https://openrouter.ai/
   - Go to: https://openrouter.ai/keys
   - Click "Create Key" and copy it

### Step-by-Step Setup

#### 1️⃣ Clone or Download

```bash
# If you have git installed:
git clone https://github.com/yourusername/medbill-analyzer.git
cd medbill-analyzer/react

# Or download ZIP from GitHub and extract it
```

#### 2️⃣ Install Dependencies

```bash
# Open terminal/command prompt in the 'react' folder
npm install

# This will download all required packages
# Takes 1-2 minutes depending on your internet
```

#### 3️⃣ Set Up Your API Key

```bash
# Copy the example environment file
copy .env.example .env

# Windows users:
copy .env.example .env

# Mac/Linux users:
cp .env.example .env
```

Now open `.env` file in any text editor and add your API key:

```env
VITE_OPENROUTER_API_KEY=your_api_key_here_from_openrouter
VITE_APP_NAME=MedBill Analyzer
VITE_DEFAULT_COUNTRY=Nepal
VITE_DEFAULT_MODEL=anthropic/claude-3.5-sonnet
```

**Replace `your_api_key_here_from_openrouter` with your actual key!**

#### 4️⃣ Run the App

```bash
npm run dev
```

You should see:
```
VITE v6.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 5️⃣ Open in Browser

Open your browser and go to: **http://localhost:5173**

🎉 **That's it!** You're ready to analyze bills!

---

## 📱 How to Use

### First Analysis

1. **Upload Bill**
   - Click the upload area or drag & drop
   - Accepts: JPG, PNG, PDF
   - Max size: 10MB

2. **Select Countries**
   - **Bill Origin**: Where is this bill from?
   - **Compare With**: Which country's prices to compare?

3. **Click "Analyze Receipt"**
   - Phase 1: AI detects location (~5 seconds)
   - Phase 2: AI analyzes prices (~10 seconds)

4. **Review Results**
   - See which items are overpriced 🔴
   - See which items are fair ✅
   - Read detailed explanations for each

5. **Take Action**
   - Download PDF report
   - Generate fair receipt
   - Use for negotiations!

### If Location Detected Wrong

No problem! Just:
1. Look for the **yellow warning banner**
2. Click **"Re-analyze with Correct Location"**
3. Select the right countries
4. Click **"Re-analyze Now"**

No need to upload again! 🎯

---

## 🛠️ Project Structure

```
medbill-analyzer/
└── react/
    ├── src/
    │   ├── components/       # UI components
    │   ├── pages/            # Main pages
    │   ├── services/         # API calls
    │   ├── utils/            # Helper functions
    │   ├── constants/        # Config & prompts
    │   └── App.jsx           # Main app
    ├── public/               # Static files
    ├── .env.example          # Example config (safe to share)
    ├── .env                  # Your config (DO NOT SHARE!)
    ├── package.json          # Dependencies
    └── README.md             # This file!
```

---

## 🔐 Important Security Notes

### ⚠️ NEVER Share Your `.env` File!

Your `.env` file contains your API key. If someone gets it, they can use your API credits!

✅ **Safe to share:**
- All code files
- `.env.example`
- Screenshots
- PDF exports

❌ **NEVER share:**
- `.env` file
- Your API key
- Git doesn't track it (protected)

### Before Pushing to GitHub

```bash
# Always check what you're pushing:
git status

# Make sure .env is NOT in the list!
# If you see it, something is wrong - contact for help
```

See [SECURITY.md](./SECURITY.md) for more details.

---

## 🎨 Customization

### Change Default Language

Edit `src/contexts/LanguageContext.jsx`:
```javascript
const [language, setLanguage] = useState('ne'); // 'en' or 'ne'
```

### Use Different AI Model

Edit `.env`:
```bash
# Free model (slower but free)
VITE_DEFAULT_MODEL=qwen/qwen-2.5-vl-7b-instruct:free

# Paid model (faster and more accurate)
VITE_DEFAULT_MODEL=anthropic/claude-3.5-sonnet
```

### Add New Country

1. Edit `src/constants/prompts.js` - Add country to `SUPPORTED_COUNTRIES`
2. Edit `src/constants/prices.js` - Add price ranges
3. Edit `src/constants/translations.js` - Add translations

---

## 🐛 Troubleshooting

### "API key not configured" Error

**Problem:** `.env` file missing or API key not set

**Solution:**
```bash
# Make sure .env exists
dir .env

# If not, copy from example
copy .env.example .env

# Edit .env and add your key
notepad .env
```

### Bills Not Analyzing

**Problem:** Could be network, API key, or image format

**Solution:**
1. Check internet connection
2. Verify API key is correct
3. Try different image (JPG/PNG)
4. Check browser console (F12) for errors

### App Won't Start

**Problem:** Usually missing dependencies

**Solution:**
```bash
# Delete and reinstall
Remove-Item node_modules -Recurse -Force
npm install

# Try again
npm run dev
```

---

## 📚 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **AI**: OpenRouter API (Claude 3.5 Sonnet)
- **Icons**: Lucide React
- **PDF**: jsPDF + html2canvas
- **Charts**: Recharts

---

## 🌟 About the Creator

### Hi! I'm Sujal GC 👋

I'm an **18-year-old developer from Nepal** 🇳🇵, passionate about using technology to solve real-world problems.

**Why I built this:**

Growing up in Nepal, I've seen how confusing and sometimes unfair medical bills can be. People often don't know if they're being charged fairly, especially when comparing prices between countries. 

I built **MedBill Analyzer** to bring transparency to medical billing. Using AI, anyone can now:
- Check if their medical bills are fair
- Compare prices across different countries
- Get clear, actionable insights

**My Journey:**

I'm still learning and exploring the world of AI, web development, and problem-solving. This project is part of my journey to make useful tools that help people.

**Currently focused on:**
- 🤖 AI/ML applications
- 🌐 Full-stack web development
- 🏥 Healthcare technology
- 🚀 Building in public

**Connect with me:**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Sujal GC](https://linkedin.com/in/yourprofile)

> *"Trying to make a dent in the universe, one line of code at a time."*

---

## 🤝 Contributing

I'm learning and would love your help! Here's how you can contribute:

1. **Report Bugs**: Open an issue on GitHub
2. **Suggest Features**: Tell me what you'd like to see
3. **Improve Code**: Fork, make changes, send pull request
4. **Share Feedback**: What works? What doesn't?

All contributions, no matter how small, are appreciated! 🙏

---

## 📄 License

This project is open source under the **MIT License**.

Feel free to use, modify, and distribute as you like. Just give credit where it's due! 😊

---

## 🙏 Acknowledgments

- **OpenRouter** for making AI accessible
- **Anthropic** for Claude AI
- **React & Vite** for amazing developer experience
- **Tailwind CSS** for beautiful styling
- **Everyone** who gave feedback and helped me learn

---

## 📞 Support & Contact

**Need help?**
- 📧 Email: your.email@example.com
- 💬 GitHub Issues: [Report a bug](https://github.com/yourusername/medbill-analyzer/issues)
- 🌟 Found it useful? Give it a star!

**Want to support development?**
- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features
- 🔗 Share with others who might find it useful

---

## 🗺️ Roadmap

**Coming Soon:**
- [ ] More countries and currencies
- [ ] Mobile app version
- [ ] OCR improvements for handwritten bills
- [ ] Multi-language support (Hindi, Bengali, etc.)
- [ ] Real-time price database integration
- [ ] Community price reporting

**Ideas?** Let me know!

---

## ⚡ Quick Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install

# Update dependencies
npm update
```

---

## ❓ FAQ

**Q: Is this free?**  
A: Yes! The app is free. You just need your own OpenRouter API key (they have free tier).

**Q: Do you store my bills?**  
A: No! Everything happens in your browser. Nothing is sent to any server except OpenRouter for AI analysis.

**Q: How accurate is the AI?**  
A: Pretty good! But it's based on training data, not real-time prices. For best results, use paid models like Claude.

**Q: Can I use this commercially?**  
A: Yes! MIT license allows commercial use. Just give credit.

**Q: Will you add [feature]?**  
A: Maybe! Open an issue or send me a message!

---

<div align="center">

### Made with ❤️ in Nepal 🇳🇵

**If this helped you, give it a ⭐!**

[Report Bug](https://github.com/yourusername/medbill-analyzer/issues) · [Request Feature](https://github.com/yourusername/medbill-analyzer/issues) · [Contribute](https://github.com/yourusername/medbill-analyzer/pulls)

</div>
