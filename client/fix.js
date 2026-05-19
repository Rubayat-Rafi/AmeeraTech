const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');
c = c.replace(/\bclass=/g, 'className=')
     .replace(/stroke-linecap/g, 'strokeLinecap')
     .replace(/stroke-linejoin/g, 'strokeLinejoin')
     .replace(/stroke-width/g, 'strokeWidth')
     .replace(/fill-rule/g, 'fillRule')
     .replace(/clip-rule/g, 'clipRule');

c = c.replace(/style="([^"]+)"/g, (m, p) => {
    const styles = p.split(';').filter(x => x.trim()).map(x => {
        let [k, v] = x.split(':');
        k = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        return `${k}: "${v.trim()}"`;
    }).join(', ');
    return `style={{ ${styles} }}`;
});

fs.writeFileSync('src/App.jsx', c);
console.log('Fixed App.jsx');
