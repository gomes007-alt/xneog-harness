# xneog harness — Install & Run

The plugin-based agent harness, powered by your DeepSeek API key.

## Prerequisites

- **Node.js** `^22.19.0` or `>=24.0.0`
- A **DeepSeek API key** (`DEEPSEEK_API_KEY`)

## Install

```bash
npm install -g @xneog/dsh
```

This installs the `xneog-harness` command globally.

### From source (development / before npm publication)

```bash
git clone <your-repo-url> xneog
cd xneog
pnpm install
pnpm build
pnpm xneog-harness web          # source launch
```

## Configure your API key

```bash
# macOS / Linux
export DEEPSEEK_API_KEY="sk-..."

# Windows (PowerShell)
$env:DEEPSEEK_API_KEY = "sk-..."
```

You can also skip the environment variable and enter the key in the web GUI
onboarding the first time you launch it (it is stored in `~/.xneog-harness`,
or `%USERPROFILE%\.xneog-harness` on Windows).

## Run

```bash
# Web GUI (default: http://127.0.0.1:3080)
xneog-harness web
xneog-harness web --port 8080       # custom port

# Headless (one task, print result, exit)
xneog-harness --profile headless "run the tests"

# Show help
xneog-harness --help
```

## macOS

Verified working. If port `3080` is in use, pass `--port 3081`.

## Windows (including Windows Server)

1. Install Node.js 22.19+ (or 24+) — the LTS installer is fine.
2. Open **PowerShell 7+** (recommended; Windows PowerShell 5.1 works but pwsh is
   preferred because the shell tools use PowerShell).
3. Install and run:

   ```powershell
   npm install -g @xneog/dsh
   $env:DEEPSEEK_API_KEY = "sk-..."
   xneog-harness web
   ```

4. Open `http://127.0.0.1:3080` in the browser.

Windows notes:

- The Bash/terminal tools use **PowerShell** on Windows (`dsh-pwsh-local`).
- The sandbox adapts to Windows ACLs (`dsh-sandbox-windows-acl`) and uses
  ConPTY for the persistent PTY backend (`node-pty`).
- On Windows Server (headless), the web GUI still works — open the URL from any
  browser on the machine, or forward the port. By default it binds to
  `127.0.0.1` only (intentionally, for safety).
- If `npm install -g` triggers native builds, make sure the
  **Visual Studio Build Tools** (C++ workload) are present; prebuilt binaries
  cover the common platform matrix, so this is rarely needed.

## Data & home directory

All user data lives under one root:

- **macOS / Linux**: `~/.xneog-harness`
- **Windows**: `%USERPROFILE%\.xneog-harness`

Override it with the `DSH_HOME` environment variable (kept for compatibility).

## License

MIT. See `LICENSE` and `THIRD_PARTY_NOTICES.md`.
