(function () {
  const data = window.PORTFOLIO_DATA;
  const base = window.PORTFOLIO_BASE || "";

  if (!data) return;

  const SOCIAL_ICONS = {
    X: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.74-8.851L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    GitHub: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    LinkedIn: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    YouTube: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    Instagram: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
  };

  const SUN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const MOON_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
  const HAMBURGER_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  const CLOSE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function get(path) {
    return path.split(".").reduce((current, key) => current && current[key], data);
  }

  function link(href) {
    if (!href) return "#";
    if (/^(https?:|mailto:|tel:|#)/i.test(href)) return href;
    return `${base}${href.replace(/^\/+/, "")}`;
  }

  function setBindings() {
    document.querySelectorAll("[data-bind]").forEach((node) => {
      const value = get(node.dataset.bind);
      if (value !== undefined) node.textContent = value;
    });

    document.querySelectorAll("[data-bind-href]").forEach((node) => {
      const value = get(node.dataset.bindHref);
      if (value !== undefined) node.setAttribute("href", link(value));
    });

    document.querySelectorAll("[data-bind-src]").forEach((node) => {
      const value = get(node.dataset.bindSrc);
      if (value !== undefined) node.setAttribute("src", link(value));
    });

    document.querySelectorAll("[data-home-link]").forEach((node) => {
      node.setAttribute("href", link("index.html"));
    });
  }

  function tagsHtml(tags) {
    if (!tags || !tags.length) return "";
    return `<div class="tags">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>`;
  }

  function createCard(item, meta) {
    const tagName = item.href ? "a" : "article";
    const card = document.createElement(tagName);
    if (item.href) card.href = link(item.href);
    if (item.newTab) { card.setAttribute("target", "_blank"); card.setAttribute("rel", "noopener noreferrer"); }

    const eyebrow = item.eyebrow || item.status || item.event || meta;
    const date = item.date ? `<span class="item-date">${escapeHtml(item.date)}</span>` : "";
    const status = eyebrow ? `<span class="item-eyebrow">${escapeHtml(eyebrow)}</span>` : "";

    if (item.thumbnail) {
      card.className = "item-card has-thumb";
      const thumbClass = item.thumbnailFull ? "item-card-thumb item-card-thumb--full" : "item-card-thumb";
      const thumbStyle = item.thumbnailPosition ? ` style="object-position:${escapeHtml(item.thumbnailPosition)}"` : "";
      card.innerHTML = `
        <img class="${thumbClass}"${thumbStyle} src="${escapeHtml(link(item.thumbnail))}" alt="${escapeHtml(item.title)}">
        <div class="item-card-body">
          ${status}
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description || item.summary || "")}</p>
          ${date}
          ${tagsHtml(item.tags)}
        </div>
      `;
    } else {
      card.className = "item-card";
      card.innerHTML = `
        ${status}
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description || item.summary || "")}</p>
        ${date}
        ${tagsHtml(item.tags)}
      `;
    }

    return card;
  }

  function renderCollection(selector, items, meta) {
    document.querySelectorAll(`[data-render="${selector}"]`).forEach((target) => {
      const limit = Number(target.dataset.limit || items.length);
      target.replaceChildren(...items.slice(0, limit).map((item) => createCard(item, meta)));
    });
  }

  function renderNav() {
    document.querySelectorAll("[data-render='nav']").forEach((target) => {
      target.replaceChildren(
        ...data.nav.map((item) => {
          const anchor = document.createElement("a");
          anchor.href = link(item.href);
          anchor.textContent = item.label;
          return anchor;
        })
      );
    });
  }

  function renderSocial() {
    document.querySelectorAll("[data-render='social']").forEach((target) => {
      target.replaceChildren(
        ...data.social.map((item) => {
          const anchor = document.createElement("a");
          anchor.href = link(item.href);
          anchor.setAttribute("aria-label", item.label);
          anchor.setAttribute("target", "_blank");
          anchor.setAttribute("rel", "noopener noreferrer");
          const icon = SOCIAL_ICONS[item.label];
          if (icon) {
            anchor.innerHTML = icon;
          } else {
            anchor.textContent = item.label;
          }
          return anchor;
        })
      );
    });
  }

  function renderProofPoints() {
    document.querySelectorAll("[data-render='proof-points']").forEach((target) => {
      target.replaceChildren(
        ...data.proofPoints.map((item) => {
          const block = document.createElement("div");
          block.className = "proof-item";
          block.innerHTML = `
            <span class="proof-value">${escapeHtml(item.value)}</span>
            <span class="proof-label">${escapeHtml(item.label)}</span>
          `;
          return block;
        })
      );
    });
  }

  function renderSections() {
    document.querySelectorAll("[data-render='sections']").forEach((target) => {
      const limit = Number(target.dataset.limit || data.sections.length);
      target.replaceChildren(
        ...data.sections.slice(0, limit).map((section) => {
          const panel = document.createElement("article");
          panel.className = "section-panel";
          panel.innerHTML = `
            <h3>${escapeHtml(section.title)}</h3>
            <p>${escapeHtml(section.description)}</p>
            <ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          `;
          return panel;
        })
      );
    });
  }

  function applyConditionalVisibility() {
    document.querySelectorAll("[data-show-if-many]").forEach((el) => {
      const key = el.dataset.showIfMany;
      const min = Number(el.dataset.showIfManyMin || 2);
      const items = data[key];
      if (!Array.isArray(items) || items.length < min) {
        el.hidden = true;
      }
    });
  }

  function renderBlogHeader() {
    const slug = document.body.dataset.blogSlug;
    if (!slug) return;

    const post = data.blogPosts.find((item) => item.slug === slug);
    if (!post) return;

    document.querySelectorAll("[data-post-title]").forEach((node) => {
      node.textContent = post.title;
    });
    document.querySelectorAll("[data-post-summary]").forEach((node) => {
      node.textContent = post.summary;
    });
    document.querySelectorAll("[data-post-date]").forEach((node) => {
      node.textContent = post.date;
    });
    document.querySelectorAll("[data-post-tags]").forEach((node) => {
      node.innerHTML = tagsHtml(post.tags);
    });
  }

  function updateAllToggleIcons(theme) {
    const label = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
    const icon = theme === "light" ? SUN_ICON : MOON_ICON;
    document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
      toggle.innerHTML = icon;
      toggle.setAttribute("aria-label", label);
    });
  }

  function setupTheme() {
    const stored = localStorage.getItem("portfolio-theme");
    const theme = stored === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    updateAllToggleIcons(theme);

    document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        localStorage.setItem("portfolio-theme", next);
        updateAllToggleIcons(next);
      });
    });
  }

  function setupHamburger() {
    const hamburger = document.querySelector("[data-hamburger]");
    const menu = document.getElementById("mobile-menu");
    if (!hamburger || !menu) return;

    hamburger.innerHTML = HAMBURGER_ICON;

    function toggleMenu(open) {
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      hamburger.setAttribute("aria-expanded", String(open));
      hamburger.innerHTML = open ? CLOSE_ICON : HAMBURGER_ICON;
      hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    hamburger.addEventListener("click", () => {
      toggleMenu(!menu.classList.contains("is-open"));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) toggleMenu(false);
    });
  }

  setBindings();
  renderNav();
  renderSocial();
  renderProofPoints();
  renderSections();
  renderCollection("landing-cards", data.landingCards, "Featured");
  renderCollection("projects", data.projects, "Project");
  renderCollection("talks", data.talks, "Talk");
  renderCollection("blog-posts", data.blogPosts, "Post");
  renderBlogHeader();
  applyConditionalVisibility();
  setupTheme();
  setupHamburger();
})();
