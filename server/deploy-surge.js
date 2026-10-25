import { spawn } from 'node:child_process';
import path from 'node:path';

const email = 'alisher.shahnoza.buxoro@gmail.com';
const pass = 'Toy2026Buxoro#Charagon';
const domain = 'alisher-shahnoza-toy.surge.sh';
const distPath = path.resolve('dist');

console.log('Starting Surge deployment to:', domain);

const child = spawn('npx.cmd', ['surge', distPath, domain], {
  shell: true,
  stdio: ['pipe', 'pipe', 'pipe']
});

child.stdout.on('data', (data) => {
  const str = data.toString();
  process.stdout.write('[OUT] ' + str);
  if (str.toLowerCase().includes('email:')) {
    console.log('\nSending email...');
    child.stdin.write(email + '\n');
  } else if (str.toLowerCase().includes('password:')) {
    console.log('\nSending password...');
    child.stdin.write(pass + '\n');
  }
});

child.stderr.on('data', (data) => {
  process.stderr.write('[ERR] ' + data.toString());
});

child.on('close', (code) => {
  console.log('\nSurge finished with code:', code);
});
