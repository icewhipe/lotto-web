#!/usr/bin/env node

/**
 * 🚀 ЛПТТ Project Launcher
 * Starts Backend + Frontend with proper checks
 * CommonJS format (.cjs) for compatibility
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
};

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️${colors.reset}  ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

// Check if port is in use
function isPortInUse(port) {
  try {
    execSync(`lsof -ti:${port}`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

// Kill process on port
function killPort(port) {
  try {
    const pids = execSync(`lsof -ti:${port}`, { encoding: 'utf-8', stdio: 'pipe' })
      .trim()
      .split('\n')
      .filter(Boolean);
    
    pids.forEach(pid => {
      execSync(`kill -9 ${pid}`, { stdio: 'pipe' });
    });
    return true;
  } catch {
    return false;
  }
}

// Check if PostgreSQL is running
function checkPostgreSQL() {
  try {
    execSync('psql -U vasiliidyahenko -d lptt_db -c "SELECT 1" > /dev/null 2>&1', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

// Check if Redis is running (optional)
function checkRedis() {
  try {
    execSync('redis-cli ping > /dev/null 2>&1', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

// Check if .env exists
function checkEnv() {
  return fs.existsSync(path.join(__dirname, '../backend/.env'));
}

// Check if node_modules exist
function checkDependencies() {
  const rootModules = fs.existsSync(path.join(__dirname, '../node_modules'));
  const backendModules = fs.existsSync(path.join(__dirname, '../backend/node_modules'));
  return { root: rootModules, backend: backendModules };
}

// Main start function
async function start() {
  console.clear();
  
  log.title('🚀 ЛПТТ PROJECT LAUNCHER');
  
  // 1. Check dependencies
  log.info('Checking dependencies...');
  const deps = checkDependencies();
  
  if (!deps.root) {
    log.error('Frontend dependencies not installed!');
    log.info('Run: npm install');
    process.exit(1);
  }
  
  if (!deps.backend) {
    log.error('Backend dependencies not installed!');
    log.info('Run: cd backend && npm install');
    process.exit(1);
  }
  
  log.success('Dependencies OK');
  
  // 2. Check .env
  log.info('Checking environment...');
  if (!checkEnv()) {
    log.error('Backend .env file not found!');
    log.info('Copy backend/.env.example to backend/.env');
    process.exit(1);
  }
  log.success('Environment OK');
  
  // 3. Check PostgreSQL
  log.info('Checking PostgreSQL...');
  if (!checkPostgreSQL()) {
    log.error('PostgreSQL is not running or database not created!');
    log.info('Run: brew services start postgresql@14');
    log.info('Then: createdb lptt_db');
    log.info('Then: cd backend && npx prisma migrate dev');
    process.exit(1);
  }
  log.success('PostgreSQL OK');
  
  // 4. Check Redis (optional)
  log.info('Checking Redis...');
  if (checkRedis()) {
    log.success('Redis OK (cache enabled)');
  } else {
    log.warning('Redis not running (cache disabled)');
    log.info('Optional: brew services start redis');
  }
  
  // 5. Check ports and kill if needed
  log.info('Checking ports...');
  const ports = [
    { port: 3000, name: 'Backend' },
    { port: 5000, name: 'Old Backend' },
    { port: 5173, name: 'Frontend' },
  ];
  
  ports.forEach(({ port, name }) => {
    if (isPortInUse(port)) {
      log.warning(`Port ${port} (${name}) is in use - killing...`);
      killPort(port);
      log.success(`Port ${port} freed`);
    }
  });
  
  log.success('All ports free');
  
  // 6. Start services
  log.title('🎯 STARTING SERVICES');
  
  console.log(`
╔════════════════════════════════════════════╗
║   🎓 ЛПТТ Электронный Дневник             ║
║                                            ║
║   🔧 Backend:  http://localhost:3000      ║
║   🎨 Frontend: http://localhost:5173      ║
║                                            ║
║   Press Ctrl+C to stop all services       ║
╚════════════════════════════════════════════╝
  `);
  
  // Start Backend
  const backend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '../backend'),
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });
  
  backend.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`${colors.bgBlue}${colors.bright} BACKEND ${colors.reset} ${line}`);
      }
    });
  });
  
  backend.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim() && !line.includes('Redis unavailable')) {
        console.log(`${colors.bgBlue}${colors.bright} BACKEND ${colors.reset} ${colors.red}${line}${colors.reset}`);
      }
    });
  });
  
  // Wait 2 seconds for backend to start
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Start Frontend
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '..'),
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });
  
  frontend.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`${colors.bgMagenta}${colors.bright} FRONTEND ${colors.reset} ${line}`);
      }
    });
  });
  
  frontend.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`${colors.bgMagenta}${colors.bright} FRONTEND ${colors.reset} ${colors.yellow}${line}${colors.reset}`);
      }
    });
  });
  
  // Handle shutdown
  const shutdown = () => {
    console.log('\n\n');
    log.warning('Shutting down services...');
    backend.kill('SIGINT');
    frontend.kill('SIGINT');
    setTimeout(() => {
      backend.kill('SIGKILL');
      frontend.kill('SIGKILL');
      log.success('All services stopped');
      process.exit(0);
    }, 2000);
  };
  
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  
  // Handle service crashes
  backend.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      log.error(`Backend crashed with code ${code}`);
      shutdown();
    }
  });
  
  frontend.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      log.error(`Frontend crashed with code ${code}`);
      shutdown();
    }
  });
}

// Run
start().catch(error => {
  log.error(`Failed to start: ${error.message}`);
  process.exit(1);
});
