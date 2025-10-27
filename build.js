const { execSync } = require('child_process');

// Set CI to false to prevent treating warnings as errors
process.env.CI = 'false';

try {
  console.log('Building with warnings allowed...');
  execSync('react-scripts build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
