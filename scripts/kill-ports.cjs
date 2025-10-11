#!/usr/bin/env node

/**
 * 🔧 Kill processes on specific ports
 * Usage: npm run kill:ports
 * CommonJS format (.cjs) for compatibility
 */

const { execSync } = require('child_process');

const PORTS = [3000, 5000, 5173];

console.log('🔍 Checking for processes on ports...\n');

PORTS.forEach(port => {
  try {
    const result = execSync(`lsof -ti:${port}`, { encoding: 'utf-8', stdio: 'pipe' });
    const pids = result.trim().split('\n').filter(Boolean);
    
    if (pids.length > 0) {
      console.log(`⚠️  Port ${port} is in use by PID(s): ${pids.join(', ')}`);
      pids.forEach(pid => {
        try {
          execSync(`kill -9 ${pid}`, { stdio: 'pipe' });
          console.log(`   ✅ Killed process ${pid}`);
        } catch (error) {
          console.log(`   ❌ Failed to kill process ${pid}`);
        }
      });
    } else {
      console.log(`✅ Port ${port} is free`);
    }
  } catch (error) {
    // No process found on this port
    console.log(`✅ Port ${port} is free`);
  }
});

console.log('\n✅ All ports checked!\n');
