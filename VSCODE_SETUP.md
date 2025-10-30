# VS Code Setup Guide for C.L.U.E Project

## 🚀 Quick Start in VS Code

### Step 1: Open Project in VS Code

```bash
cd /path/to/workspace
code .
```

### Step 2: Install Required Extensions

Open VS Code Extensions (Ctrl+Shift+X / Cmd+Shift+X) and install:

#### Essential Extensions:
1. **Python** (ms-python.python)
2. **Pylance** (ms-python.vscode-pylance)
3. **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
4. **Prettier - Code formatter** (esbenp.prettier-vscode)
5. **ESLint** (dbaeumer.vscode-eslint)
6. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)

#### Optional but Recommended:
7. **Path Intellisense** (christian-kohler.path-intellisense)
8. **Auto Rename Tag** (formulahendry.auto-rename-tag)
9. **GitLens** (eamodio.gitlens)
10. **Thunder Client** (rangav.vscode-thunder-client) - API testing

### Step 3: Configure Python Interpreter

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type "Python: Select Interpreter"
3. Choose the interpreter from your virtual environment: `./venv/bin/python`

### Step 4: Create Terminal Profiles

Add to your VS Code settings (File > Preferences > Settings > Open Settings (JSON)):

```json
{
  "terminal.integrated.profiles.windows": {
    "Django Backend": {
      "path": "cmd.exe",
      "args": ["/K", "venv\\Scripts\\activate.bat && python manage.py runserver"]
    }
  },
  "terminal.integrated.profiles.linux": {
    "Django Backend": {
      "path": "bash",
      "args": ["-c", "source venv/bin/activate && python manage.py runserver"]
    }
  },
  "terminal.integrated.profiles.osx": {
    "Django Backend": {
      "path": "zsh",
      "args": ["-c", "source venv/bin/activate && python manage.py runserver"]
    }
  }
}
```

### Step 5: Setup Environment Variables

#### Backend (.env in root)
```bash
cp .env.example .env
```
Edit `.env` with your actual values.

#### Frontend (.env in frontend/)
```bash
cd frontend
cp .env.example .env
```
Edit `.env` with your actual values.

### Step 6: Install Dependencies

#### Open Integrated Terminal (Ctrl+` or Cmd+`)

**Terminal 1 - Backend:**
```bash
# Create and activate virtual environment
python -m venv venv

# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup database
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
```

### Step 7: Run the Application

#### Method 1: Using Integrated Terminal

**Terminal 1 - Backend:**
```bash
# Make sure venv is activated
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### Method 2: Using VS Code Tasks (Recommended)

Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Django Backend",
      "type": "shell",
      "command": "${workspaceFolder}/venv/Scripts/python",
      "args": ["manage.py", "runserver"],
      "windows": {
        "command": "${workspaceFolder}\\venv\\Scripts\\python.exe"
      },
      "linux": {
        "command": "${workspaceFolder}/venv/bin/python"
      },
      "osx": {
        "command": "${workspaceFolder}/venv/bin/python"
      },
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated"
      },
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "Run Frontend",
      "type": "npm",
      "script": "dev",
      "path": "frontend/",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated"
      }
    },
    {
      "label": "Run Full Stack",
      "dependsOn": ["Run Django Backend", "Run Frontend"],
      "problemMatcher": []
    }
  ]
}
```

Now you can:
- Press `Ctrl+Shift+B` (Cmd+Shift+B on macOS) to run tasks
- Or use `Ctrl+Shift+P` > "Tasks: Run Task"

---

## 🔧 VS Code Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black",
  "python.analysis.typeCheckingMode": "basic",
  
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.tabSize": 4,
    "editor.insertSpaces": true
  },
  
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  "files.exclude": {
    "**/__pycache__": true,
    "**/*.pyc": true,
    "**/node_modules": true,
    "**/venv": true,
    "**/.git": true
  },
  
  "search.exclude": {
    "**/node_modules": true,
    "**/venv": true,
    "**/*.pyc": true,
    "**/staticfiles": true
  },
  
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

---

## 📂 Recommended Folder Structure in Explorer

```
workspace/
├── .vscode/          # VS Code configuration
├── frontend/         # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── admin_handling/   # Django apps
├── api/
├── clue/            # Django settings
├── manage.py
├── requirements.txt
└── .env
```

---

## 🐛 Debugging in VS Code

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Django: Debug Backend",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/manage.py",
      "args": ["runserver", "--noreload"],
      "django": true,
      "justMyCode": true,
      "console": "integratedTerminal"
    },
    {
      "name": "Frontend: Debug in Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/frontend/src",
      "sourceMaps": true
    }
  ],
  "compounds": [
    {
      "name": "Full Stack: Debug",
      "configurations": ["Django: Debug Backend", "Frontend: Debug in Chrome"]
    }
  ]
}
```

**To debug:**
1. Set breakpoints in your code (click left margin)
2. Press `F5` or go to Run > Start Debugging
3. Choose "Full Stack: Debug"

---

## ⌨️ Useful Keyboard Shortcuts

### General
- `Ctrl+P` / `Cmd+P` - Quick file open
- `Ctrl+Shift+P` / `Cmd+Shift+P` - Command palette
- `Ctrl+`` / `Cmd+`` - Toggle terminal
- `Ctrl+B` / `Cmd+B` - Toggle sidebar

### Editing
- `Alt+Up/Down` - Move line up/down
- `Shift+Alt+Up/Down` - Copy line up/down
- `Ctrl+/` / `Cmd+/` - Toggle comment
- `Ctrl+D` / `Cmd+D` - Select next occurrence

### Navigation
- `Ctrl+Tab` - Switch between files
- `F12` - Go to definition
- `Alt+Left/Right` - Navigate back/forward

---

## 📦 Snippets

Create custom snippets (File > Preferences > User Snippets):

**JavaScript React Snippets:**
```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "export default function ${1:ComponentName}() {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  )",
      "}"
    ]
  }
}
```

---

## 🔍 Testing API with Thunder Client

1. Install Thunder Client extension
2. Create new request
3. Set URL: `http://localhost:8000/api/departments/`
4. Set method: GET
5. Click Send

---

## 📚 Additional Tips

### Git Integration
- Use Source Control panel (Ctrl+Shift+G)
- Stage changes, commit, and push directly from VS Code

### Terminal Tips
- Split terminal: Click + icon dropdown > Split Terminal
- Rename terminal: Right-click terminal tab
- Clear terminal: Type `clear` or `cls`

### Workspace Recommendations
Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.vscode-pylance",
    "dsznajder.es7-react-js-snippets",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "christian-kohler.path-intellisense",
    "eamodio.gitlens"
  ]
}
```

This will prompt team members to install recommended extensions.

---

## 🆘 Common Issues

### Python Interpreter Not Found
- Make sure venv is created: `python -m venv venv`
- Reload VS Code window: Ctrl+Shift+P > "Reload Window"

### Port Already in Use
- Kill process using port 8000: `lsof -ti:8000 | xargs kill -9`
- Or change port: `python manage.py runserver 8001`

### ESLint/Prettier Not Working
- Reload VS Code
- Check output panel: View > Output > Select ESLint/Prettier

---

**Happy Coding in VS Code! 💻✨**
