const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function getFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.git')) {
            getFiles(fullPath, files);
        } else {
            files.push(fullPath);
        }
    });
    return files;
}

const allFiles = getFiles(rootDir);
const jsFiles = allFiles.filter(f => f.endsWith('.js') && !f.includes('assets\\js\\') && !f.includes('assets/js/'));
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

// 1. Process JS Files: Remove duplicate theme code and replace API URL
jsFiles.forEach(file => {
    if (file === __filename || file.includes('refactor.js') || file.includes('fix_images.js') || file.includes('fix_quiz.js')) return;

    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Remove Dark Mode logic. We look for "const themeToggle = document.getElementById('themeToggle');" and remove everything after it.
    // Sometimes there are multiple "$(document).ready(...)" blocks before it.
    // Let's just find the index of "const themeToggle" or "//   Darkmode  //" and slice the string.
    
    const themeIndex = content.indexOf('const themeToggle =');
    const darkModeCommentIndex = content.indexOf('//   Darkmode');
    const cutIndex = darkModeCommentIndex !== -1 && (themeIndex === -1 || darkModeCommentIndex < themeIndex) ? darkModeCommentIndex : themeIndex;

    if (cutIndex !== -1) {
        content = content.substring(0, cutIndex).trimEnd() + '\n';
        modified = true;
    }

    // Replace API URL
    // e.g., 'http://192.168.160.58/Paris2024/api/Athletes' -> API_URL + 'Athletes'
    // e.g., "http://192.168.160.58/Paris2024/API/athletes" -> API_URL + 'athletes'
    const apiRegex = /['"`]http:\/\/192\.168\.160\.58\/Paris2024\/(?:api|API)\/([^'"`]*)['"`]/g;
    
    const initialContent = content;
    content = content.replace(apiRegex, (match, endpoint) => {
        // If it was in backticks like `http://192.168.160.58/Paris2024/api/Teams/${teamId}`
        // It becomes API_URL + `Teams/${teamId}`
        if (match.startsWith('`')) {
            return 'API_URL + `' + endpoint + '`';
        }
        return "API_URL + '" + endpoint + "'";
    });

    // Special case for basketballs/%7Bid%7D or something? Let's just let the regex catch it.
    
    // Also catch any base url variable like const apiUrl = ...
    // Because sometimes they define `const apiUrl = API_URL + 'Sports'` which is fine.

    if (content !== initialContent) {
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Processed JS: ${path.basename(file)}`);
    }
});

// 2. Process HTML Files: Inject the scripts
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Skip if already has config.js
    if (content.includes('config.js')) return;

    // Determine path depth
    const depth = file.includes('pages\\') || file.includes('pages/') ? (file.split(path.sep).length - rootDir.split(path.sep).length - 1) : 0;
    let prefix = '';
    for(let i=0; i<depth; i++) prefix += '../';
    
    // The scripts to inject
    const scriptsToInject = `
    <!-- Config and Theme Scripts -->
    <script src="${prefix}assets/js/config.js"></script>
    <script src="${prefix}assets/js/theme.js"></script>
    `;

    // Inject before the FIRST local script tag, OR just before </body>
    // Usually they have `<script src="athletes.js"></script>` at the end.
    // Let's find the first local script that isn't http or CDN.
    // Actually, safest is to inject right before `</body>` OR before the custom page script.
    // Let's just put it right before the last script tag that ends with `.js` or `</script>\n</body>`.
    
    // Let's inject it right before `</body>` to be safe, because theme script runs on DOMContentLoaded anyway,
    // and config just defines a global const which is hoisted or available globally.
    // Wait, if athletes.js uses API_URL, config.js MUST be loaded BEFORE athletes.js!
    // Let's inject it right before the first <script src="... local js ..."> tag, 
    // or if none, right before </body>.
    
    // A simple regex to find the first <script src="something.js"> that isn't http
    const localScriptRegex = /<script\s+src=["'](?!http)[^"']*?\.js["']><\/script>/;
    
    const match = content.match(localScriptRegex);
    if (match) {
        content = content.replace(match[0], scriptsToInject.trim() + '\n    ' + match[0]);
    } else {
        content = content.replace('</body>', scriptsToInject.trim() + '\n</body>');
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Injected scripts into HTML: ${path.basename(file)}`);
});

console.log('DRY Refactoring completed successfully.');
