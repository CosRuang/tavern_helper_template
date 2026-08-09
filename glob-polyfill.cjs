// Node 20 polyfill: fs.globSync（模板 webpack.config.ts 需要 Node 22+ 的 API）
const fs = require('node:fs');
const path = require('node:path');

if (typeof fs.globSync !== 'function') {
  // 展开 {a,b} 花括号
  function expandBraces(pattern) {
    const braceRe = /\{([^{}]+)\}/;
    let result = [pattern];
    while (result.some(r => braceRe.test(r))) {
      const next = [];
      for (const r of result) {
        const m = r.match(braceRe);
        if (!m) {
          next.push(r);
          continue;
        }
        for (const opt of m[1].split(',')) {
          next.push(r.replace(braceRe, opt));
        }
      }
      result = next;
    }
    return result;
  }

  // glob 模式转正则（用哨兵占位避免转义顺序问题）
  function toRegex(pat) {
    const GLOBSTAR = '\u0001'; // 代表 **/
    const STAR = '\u0002';     // 代表 *
    const QMARK = '\u0003';    // 代表 ?
    let re = pat
      .replace(/\*\*\//g, GLOBSTAR)
      .replace(/\*/g, STAR)
      .replace(/\?/g, QMARK);
    re = re.replace(/[.+^${}()|[\]\\]/g, '\\$&');
    re = re
      .split(GLOBSTAR).join('(?:.*/)?')
      .split(STAR).join('[^/]*')
      .split(QMARK).join('[^/]');
    return new RegExp('^' + re + '$');
  }

  function globSync(pattern) {
    const patterns = expandBraces(pattern);
    const roots = new Set();
    for (const p of patterns) {
      const parts = p.split('/');
      roots.add(parts[0]);
    }
    const regexes = patterns.map(toRegex);
    const out = [];

    const walk = dir => {
      let entries;
      try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
      } catch {
        return;
      }
      for (const entry of entries) {
        const full = path.join(dir, entry.name).replace(/\\/g, '/');
        if (entry.isDirectory()) {
          walk(full);
        } else if (regexes.some(r => r.test(full))) {
          out.push(full);
        }
      }
    };

    for (const r of roots) walk(r);
    return out;
  }

  fs.globSync = globSync;
  console.log('[polyfill] fs.globSync 已注入（Node 20 兼容）');
}
