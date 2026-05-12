const fs = require('fs');

// Fix app/settings/page.tsx
let content = fs.readFileSync('app/settings/page.tsx', 'utf-8');
content = content.replace(/You'll/g, "You&apos;ll");
fs.writeFileSync('app/settings/page.tsx', content, 'utf-8');

// Fix components/pages/dashboard.tsx
content = fs.readFileSync('components/pages/dashboard.tsx', 'utf-8');
content = content.replace(/Here's/g, "Here&apos;s");
fs.writeFileSync('components/pages/dashboard.tsx', content, 'utf-8');

console.log("Fixed both files");
