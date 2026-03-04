document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("docs-sidebar");

  if (sidebar) {
    sidebar.innerHTML = `
      <div class="logo"><img src="../img/logo.svg" alt="one.css" height="24"></div>
      <nav>
        <a href="index.html">Getting Started</a>
        <a href="colors.html">Colors & Theming</a>
        <a href="components.html">Components</a>
        <a href="forms.html">Forms</a>
        <a href="layout.html">Layout</a>
        <a href="demo.html">Demo</a>
      </nav>
      <div style="margin-top:auto">
        <button id="copy-page-md" class="small ghost">Copy Page as Markdown</button>
        <button id="theme-toggle" class="small outline" style="margin-top:0.5rem">Toggle Theme</button>
      </div>
    `;

    const page = window.location.pathname.split("/").pop() || "index.html";
    sidebar.querySelectorAll("nav a").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === page);
    });
  }

  if (window.Prism) {
    Prism.highlightAll();
  }

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        return;
      }
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    });

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }

  const copyPageButton = document.getElementById("copy-page-md");
  if (copyPageButton && window.TurndownService) {
    copyPageButton.addEventListener("click", () => {
      const turndownService = new TurndownService();
      const main = document.querySelector("main");
      if (!main) {
        return;
      }

      const markdown = turndownService.turndown(main.innerHTML);
      navigator.clipboard.writeText(markdown)
        .then(() => {
          const originalText = copyPageButton.textContent;
          copyPageButton.textContent = "Copied!";
          setTimeout(() => {
            copyPageButton.textContent = originalText;
          }, 2000);
        })
        .catch(() => {
          copyPageButton.textContent = "Error";
        });
    });
  }

  if (sidebar) {
    let menuToggle = document.getElementById("menu-toggle");
    if (!menuToggle) {
      menuToggle = document.createElement("button");
      menuToggle.id = "menu-toggle";
      menuToggle.className = "menu-toggle";
      menuToggle.textContent = "☰";
      menuToggle.type = "button";
      menuToggle.setAttribute("aria-label", "Toggle docs menu");
      document.body.appendChild(menuToggle);
    }

    const setMenuIcon = () => {
      menuToggle.textContent = sidebar.classList.contains("open") ? "✕" : "☰";
    };

    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      setMenuIcon();
    });

    sidebar.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 768px)").matches) {
          sidebar.classList.remove("open");
          setMenuIcon();
        }
      });
    });

    setMenuIcon();
  }

  document.querySelectorAll("pre").forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) {
      return;
    }

    const copyButton = document.createElement("button");
    copyButton.className = "copy-code-btn";
    copyButton.textContent = "Copy";
    copyButton.style.cssText = `
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

    if (getComputedStyle(pre).position === "static") {
      pre.style.position = "relative";
    }

    pre.appendChild(copyButton);
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(code.innerText).then(() => {
        copyButton.textContent = "Copied!";
        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 2000);
      });
    });
  });
});
