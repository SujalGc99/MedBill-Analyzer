# 🔐 Pre-Push Security Checklist

Run this checklist **BEFORE** every `git push` to ensure no secrets are exposed.

---

## ✅ Quick Security Scan

### 1. Check Git Status
```bash
cd react
git status
```

**Look for:**
- ❌ `.env` file (should NOT appear)
- ❌ Any files with API keys
- ✅ Only intended source files

---

### 2. Verify .env is Ignored
```bash
git check-ignore -v .env
```

**Expected output:**
```
.gitignore:11:.env    .env
```

If you see nothing, **STOP! .env is not being ignored!**

---

### 3. Search for Hardcoded Secrets
```bash
# Search for potential API keys
git grep -i "sk-or-v1"
git grep -i "api.*key.*=" 

# Search for common secret patterns
git grep -E "(password|secret|token|credential)\s*=\s*['\"][^'\"]*['\"]"
```

**Expected:** No results (or only comments/validation code)

---

### 4. Review Staged Changes
```bash
git diff --cached
```

**Check:**
- ❌ No API keys in the diff
- ❌ No `.env` file changes
- ✅ Only legitimate code changes

---

### 5. Final Confirmation
```bash
# List all tracked files
git ls-files | grep -E "\.env$|\.key$|secret"
```

**Expected:** No output (these files should NOT be tracked)

---

## 🚨 If You Find Issues

### Issue: `.env` file appears in `git status`

**Solution:**
```bash
# Remove from staging
git reset HEAD .env

# Verify it's in .gitignore
cat .gitignore | grep "^\.env$"

# If not in .gitignore, add it
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
```

---

### Issue: `.env` is already committed

**Solution:**
```bash
# Remove from git but keep local file
git rm --cached .env

# Commit the removal
git commit -m "Remove .env from version control"

# Add to .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"

# Push changes
git push origin main
```

---

### Issue: API key found in git history

**CRITICAL - Follow these steps:**

1. **Immediately revoke the key** on OpenRouter
2. **Generate new key**
3. **Update your .env**
4. **Clean git history:**

```bash
# Install BFG Repo Cleaner
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Remove the exposed key from all commits
java -jar bfg.jar --replace-text passwords.txt

# passwords.txt contains:
# sk-or-v1-OLD_KEY_HERE===>YOUR_KEY_WAS_REMOVED

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (WARNING: Rewrites history!)
git push origin --force --all
```

---

## ✅ Safe to Push Checklist

- [ ] `git status` shows no `.env` file
- [ ] `git check-ignore .env` confirms it's ignored
- [ ] No hardcoded API keys in code
- [ ] `git diff --cached` looks clean
- [ ] `.env.example` has only placeholders
- [ ] SECURITY.md is up to date
- [ ] README.md documents environment setup

**All checked?** ✅ Safe to push!

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 📝 Recommended Git Commit Messages

```bash
# Good examples
git commit -m "feat: Add location detection validation"
git commit -m "fix: Resolve price ratio validation error"
git commit -m "docs: Update security guidelines"
git commit -m "chore: Update dependencies"

# Bad examples (too vague)
git commit -m "update"
git commit -m "changes"
git commit -m "fix bug"
```

---

## 🎯 Post-Push Verification

### Verify on GitHub

1. Visit your repository on GitHub
2. Check `.env` is NOT visible
3. Check `.env.example` IS visible
4. Check SECURITY.md is visible
5. Clone in a fresh directory and verify app doesn't have your API key

```bash
# Clone to new location
git clone https://github.com/yourusername/medbill-analyzer test-clone
cd test-clone/react

# Check for your API key (should not exist)
grep -r "sk-or-v1-" .

# Should return: No matches
```

---

## 🛡️ Continuous Security

### Weekly
- [ ] Check OpenRouter usage dashboard
- [ ] Review git logs for suspicious commits
- [ ] Update dependencies `npm audit`

### Monthly  
- [ ] Rotate API keys
- [ ] Review access logs
- [ ] Update security documentation

### Quarterly
- [ ] Full security audit
- [ ] Update all dependencies
- [ ] Review API key permissions

---

## 📞 Emergency Contacts

**If secrets are exposed:**

1. OpenRouter Support: https://openrouter.ai/docs#rate-limits
2. GitHub Support: https://support.github.com/
3. Delete exposed key immediately!

---

**Remember:** Security is an ongoing process, not a one-time task!
