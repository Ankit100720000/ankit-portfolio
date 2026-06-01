const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

// Replace top fonts
css = css.replace(/@font-face \{[\s\S]*?\}/, '@import url(\'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@100..900&display=swap\');');

// Replace Root variables
const rootRegex = /:root\s*\{[\s\S]*?\}/;
css = css.replace(rootRegex, `:root {
  color-scheme: dark;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --bg: #000000;
  --bg-elev: #0a0a0a;
  --fg: #ffffff;
  --muted: #a1a1aa;
  --muted-2: #d4d4d8;
  --border: rgba(255, 255, 255, 0.15);
  --accent: #fd6f00;
  --accent-2: #fd6f00;
  --accent-3: #fd6f00;
  --pink: #e0a6bf;
  --orange: #fd6f00;
  --green: #9ed7b0;
  --font-display: 'Outfit', system-ui, sans-serif;
  --font-body: 'Outfit', system-ui, sans-serif;
  --font-serif: 'Cormorant Garamond', serif;
}`);

// Remove body pseudo elements
css = css.replace(/body::before\s*\{[\s\S]*?\}/, 'body::before { display: none; }');
css = css.replace(/body::after\s*\{[\s\S]*?\}/, 'body::after { display: none; }');

// Make components flat
css = css.replace(/\.glass-panel\s*\{[\s\S]*?\}/, '.glass-panel { @apply relative overflow-hidden rounded-lg; background: var(--bg-elev); border: 1px solid var(--border); transition: all 0.3s ease; }\n.glass-panel:hover { border-color: var(--accent); }');
css = css.replace(/\.glass-panel::after\s*\{[\s\S]*?\}/, '');

css = css.replace(/\.modern-card\s*\{[\s\S]*?\}/, '.modern-card { @apply relative overflow-hidden rounded-lg; background: var(--bg-elev); border: 1px solid var(--border); transition: all 0.3s ease; }\n.modern-card:hover { border-color: var(--accent); }');
css = css.replace(/\.modern-card::after\s*\{[\s\S]*?\}/, '');
css = css.replace(/\.modern-card:hover\s*\{[\s\S]*?\}/, '');

// Simplify buttons
css = css.replace(/\.btn-primary\s*\{[\s\S]*?\}/, '.btn-primary { font-family: var(--font-display); @apply inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-300; background: var(--accent); }\n.btn-primary:hover { background: #e06200; transform: translateY(-2px); }');
css = css.replace(/\.btn-primary::before\s*\{[\s\S]*?\}/, '');
css = css.replace(/\.btn-primary:hover::before\s*\{[\s\S]*?\}/, '');
css = css.replace(/\.btn-primary:hover\s*\{[\s\S]*?\}/, '');

css = css.replace(/\.btn-ghost\s*\{[\s\S]*?\}/, '.btn-ghost { font-family: var(--font-display); @apply inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300; }\n.btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }');
css = css.replace(/\.btn-ghost:hover\s*\{[\s\S]*?\}/, '');

// Remove complex auroras and gradients
css = css.replace(/\.aurora\s*\{[\s\S]*?\}/, '.aurora { display: none; }');
css = css.replace(/\.grid-overlay\s*\{[\s\S]*?\}/, '.grid-overlay { display: none; }');

// Make text white and clean up borders
css = css.replace(/border: 1px solid rgba\(255, 255, 255, 0.08\);/g, 'border: 1px solid var(--border);');
css = css.replace(/backdrop-filter: blur\(14px\) saturate\(120%\);/g, '');

fs.writeFileSync('src/index.css', css);
console.log("CSS updated");
