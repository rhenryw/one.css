const fs = require('fs');
const path = require('path');

function hexToRgb(hex){
  hex = hex.replace('#','').trim();
  if(hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
  const num = parseInt(hex,16);
  return { r: (num>>16)&255, g: (num>>8)&255, b: num&255 };
}
function srgbToLin(c){ c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
function luminance(hex){ const {r,g,b} = hexToRgb(hex); return 0.2126*srgbToLin(r) + 0.7152*srgbToLin(g) + 0.0722*srgbToLin(b); }
function contrast(hex1, hex2){ const L1 = luminance(hex1); const L2 = luminance(hex2); const lighter = Math.max(L1,L2); const darker = Math.min(L1,L2); return +( (lighter + 0.05) / (darker + 0.05) ).toFixed(2); }

const css = fs.readFileSync(path.join(__dirname,'..','dist','one.css'),'utf8');
const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
if(!rootMatch){ console.error('Could not find :root in dist/one.css — run build first'); process.exit(2); }
const varsBlock = rootMatch[1];
const vars = {};
varsBlock.split(/;\s*/).forEach(line=>{ const m = line.match(/--([a-z0-9-]+)\s*:\s*([^;]+)/i); if(m) vars[m[1].trim()] = m[2].trim(); });

function getVar(name, fallback){ return (vars[name] || fallback).replace(/\s*/g,''); }
const bg = getVar('bg','#ffffff');
const text = getVar('text','#000000');
const accent = getVar('accent','#0b5fff');

console.log('Checking contrast ratios (WCAG 2.1)');
console.log(' - text on background:', contrast(text,bg));
console.log(' - accent on background:', contrast(accent,bg));
console.log(' - accent contrast (accent-contrast on accent):', contrast(getVar('accent-contrast','#fff'), accent));

function report(name,ratio,level){
  const pass = level === 'AA' ? ratio>=4.5 : ratio>=3.0; // simplified
  console.log(`${name}: ${ratio} — ${pass? 'PASS':'FAIL'} (${level})`);
}
report('Body text / bg', contrast(text,bg), 'AA');
report('Accent / bg', contrast(accent,bg), 'AA');
report('Accent-contrast / accent', contrast(getVar('accent-contrast','#fff'), accent), 'AA');

// Suggestion: if accent/bg fails, suggest darkening/lightening accent
const ratio = contrast(accent,bg);
if(ratio < 4.5){ console.log('\nSuggestion: adjust --accent in styles/_settings.scss to increase contrast (darker for light bg, lighter for dark bg).'); }

process.exit(0);
