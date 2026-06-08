(function () {
  const data = window.PORTFOLIO_DATA;
  const base = window.PORTFOLIO_BASE || "";

  if (!data) return;

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
    card.className = "item-card";
    if (item.href) card.href = link(item.href);

    const eyebrow = item.eyebrow || item.status || item.event || meta;
    const date = item.date ? `<span class="item-date">${escapeHtml(item.date)}</span>` : "";
    const status = eyebrow ? `<span class="item-eyebrow">${escapeHtml(eyebrow)}</span>` : "";

    card.innerHTML = `
      ${status}
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description || item.summary || "")}</p>
      ${date}
      ${tagsHtml(item.tags)}
    `;

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
          anchor.textContent = item.label;
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
      target.replaceChildren(
        ...data.sections.map((section) => {
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

  function setupTheme() {
    const toggle = document.querySelector("[data-theme-toggle]");
    const stored = localStorage.getItem("portfolio-theme");
    if (stored) document.documentElement.dataset.theme = stored;

    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const current = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = current;
      localStorage.setItem("portfolio-theme", current);
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
  setupTheme();
})();
