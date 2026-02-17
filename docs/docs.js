/* Docs Scripts */

document.addEventListener('DOMContentLoaded', () => {
    if (window.Prism) {
        Prism.highlightAll();
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });

        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    const copyMdBtn = document.getElementById('copy-page-md');
    if (copyMdBtn && window.TurndownService) {
        copyMdBtn.addEventListener('click', () => {
            const turndownService = new TurndownService();
            const mainContent = document.querySelector('main').innerHTML;
            const markdown = turndownService.turndown(mainContent);

            navigator.clipboard.writeText(markdown).then(() => {
                const originalText = copyMdBtn.textContent;
                copyMdBtn.textContent = 'Copied!';
                setTimeout(() => copyMdBtn.textContent = originalText, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                copyMdBtn.textContent = 'Error';
            });
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            menuToggle.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
        });
    }

    document.querySelectorAll('pre').forEach(pre => {
        const btn = document.createElement('button');
        btn.className = 'copy-code-btn';
        btn.textContent = 'Copy';
        btn.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 2px 6px;
            font-size: 0.7rem;
            opacity: 0.7;
            border: 1px solid var(--border);
            border-radius: 4px;
            background: var(--surface);
            color: var(--color);
            cursor: pointer;
        `;

        // Make pre relative so button is positioned inside
        // But Prism usually wraps pre in a div or modifies it.
        // Actually, just append button
        if (getComputedStyle(pre).position === 'static') {
            pre.style.position = 'relative';
        }

        pre.appendChild(btn);

        btn.addEventListener('click', () => {
            const code = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = 'Copied!';
                setTimeout(() => btn.textContent = 'Copy', 2000);
            });
        });
    });
});
