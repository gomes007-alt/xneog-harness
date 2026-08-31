import fs from 'node:fs';

const src = fs.readFileSync('/Users/erck/xneog-harness/packages/bundle/base/cordis.patch.yml', 'utf8');
const lines = src.split('\n');

const start = lines.findIndex(l => l === '    - id: permission');
let end = start + 1;
while (end < lines.length) {
  if (/^    - id: /.test(lines[end])) break;
  end++;
}

const block = lines.slice(start, end).join('\n');

// defaultPreset
const dpMatch = block.match(/^\s+defaultPreset:\s*(\S+)/m);
const defaultPreset = dpMatch ? dpMatch[1] : null;

// redTools list — capture all consecutive "- X" lines
const rtMatch = block.match(/^\s+redTools:\s*\n((?:\s+-\s+.+\n?)+)/m);
const redTools = rtMatch
  ? rtMatch[1].trim().split('\n').map(s => s.trim().replace(/^-\s*/, ''))
  : [];

// presets: find `presets:` then capture while next lines start with at least 8 spaces.
const psIdx = block.search(/^\s+presets:\s*$/m);
const presets = {};
if (psIdx !== -1) {
  const after = block.slice(block.indexOf('\n', psIdx) + 1);
  const subLines = after.split('\n');
  let i = 0;
  while (i < subLines.length) {
    const l = subLines[i];
    if (l === '' || /^\s{0,7}\S/.test(l) && !/^\s{10,}/.test(l)) {
      // end of block — but blank lines inside should be skipped
      if (l === '') { i++; continue; }
      break;
    }
    const nameMatch = l.match(/^\s+([\w-]+):\s*$/);
    if (!nameMatch) { i++; continue; }
    const name = nameMatch[1];
    const fields = {};
    i++;
    while (i < subLines.length) {
      const fl = subLines[i];
      if (fl === '') { i++; continue; }
      if (!/^\s{12,}/.test(fl)) break;
      const kv = fl.match(/^\s+(\w+):\s*(.*)$/);
      if (kv) fields[kv[1]] = kv[2].trim();
      i++;
    }
    presets[name] = fields;
  }
}

// Policy lives in the approval block above permission.
const policyMatch = src.match(/^\s+policy:\s*!!js\s*"([^"]+)"/m);
const policy = policyMatch ? policyMatch[1] : null;

const out = { defaultPreset, presets: { ...presets, redTools }, policy };
console.log(JSON.stringify(out, null, 2));