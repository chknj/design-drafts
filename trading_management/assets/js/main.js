/* ------------------------------------------------------------------
   GNIDART agency — main.js  (no dependencies)
   ------------------------------------------------------------------ */
(function () {
  "use strict";
  const D = window.HAAN_DATA;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const IMG = (m, n) => `assets/img/models/${m.slug}/${String(n).padStart(2, "0")}.jpg`;

  /* ---------- header / menu ---------- */
  const header = $(".header");
  const darkHero = document.body.dataset.page === "index";
  const onScroll = () => {
    if (!header) return;
    const scrolled = window.scrollY > 24 || document.body.classList.contains("menu-open");
    header.classList.toggle("scrolled", scrolled);
    header.classList.toggle("on-dark", darkHero && !scrolled); // 히어로(어두운 배경) 위에서는 흰 글자
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const menuBtn = $(".btn-menu");
  const menu = $(".menu");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open);
      if (menu) menu.setAttribute("aria-hidden", !open);
      onScroll(); // 메뉴가 열리면 헤더 색을 잉크로 강제
    });
    $$(".menu a").forEach(a => a.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuBtn.setAttribute("aria-expanded", "false");
      if (menu) menu.setAttribute("aria-hidden", "true");
      onScroll();
    }));
  }
  // active nav
  const page = document.body.dataset.page;
  const navLinks = $$(".nav a, .menu ul a");
  const navKey = (href) => {
    const url = new URL(href, location.href);
    const file = url.pathname.split("/").pop();
    if (file === "models.html") {
      const cat = url.searchParams.get("cat");
      return ["women", "men"].includes(cat) ? cat : "models";
    }
    if (file === "model.html") {
      return (D.models.find(m => m.slug === url.searchParams.get("id")) || D.models[0]).gender;
    }
    return ["#about", "#contact"].includes(url.hash) ? url.hash.slice(1) : "";
  };
  const syncNav = (href = location.href) => {
    const active = navKey(href);
    navLinks.forEach(a => {
      const selected = navKey(a.href) === active;
      a.classList.toggle("active", selected);
      if (selected) a.setAttribute("aria-current", ["about", "contact"].includes(active) ? "location" : "page");
      else a.removeAttribute("aria-current");
    });
  };
  navLinks.forEach(a => a.addEventListener("click", e => {
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) syncNav(a.href);
  }));
  window.addEventListener("hashchange", () => syncNav());
  window.addEventListener("popstate", () => syncNav());
  syncNav();

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  const observeReveals = () => $$(".reveal:not(.in), .reveal-img:not(.in)").forEach(el => io.observe(el));

  /* ---------- card template ---------- */
  const inch = v => (v / 2.54).toFixed(1);
  function cardHTML(m, i, withPanel) {
    const tag = m.status === "NEW FACE" ? `<span class="tag new">New face</span>` : `<span class="tag">${m.status}</span>`;
    const panel = withPanel ? `
      <div class="panel" aria-hidden="true">
        <dl>
          <div><dt>Height</dt><dd>${m.height}</dd></div>
          <div><dt>Shoes</dt><dd>${m.shoes}</dd></div>
          <div><dt>Bust</dt><dd>${m.bust}</dd></div>
          <div><dt>Waist</dt><dd>${m.waist}</dd></div>
          <div><dt>Hips</dt><dd>${m.hips}</dd></div>
          <div><dt>Hair</dt><dd>${m.hair}</dd></div>
        </dl>
      </div>` : "";
    return `
      <a class="card reveal" href="model.html?id=${m.slug}" data-gender="${m.gender}">
        <div class="thumb">
          ${tag}
          ${withPanel ? `<span class="idx">${String(i + 1).padStart(2, "0")}</span>` : ""}
          <img src="${IMG(m, 0)}" alt="${m.name}" loading="lazy" width="900" height="1200">
          ${panel}
        </div>
        <div class="meta">
          <span class="name">${m.name}</span>
          <span class="origin">${m.origin}</span>
        </div>
      </a>`;
  }

  /* ---------- INDEX ---------- */
  if (page === "index") {
    // ticker
    const names = D.models.map(m => `<span>${m.name}<i>${m.origin.split(",")[0]}</i></span>`).join("");
    const track = $(".ticker-track");
    if (track) track.innerHTML = names + names; // 2회 반복 → -50% 이동으로 무한 루프
    // all model thumbnails
    const car = $(".carousel");
    if (car) {
      car.innerHTML = D.models.map((m, i) => cardHTML(m, i, false)).join("");
    }
  }

  /* ---------- MODELS LIST ---------- */
  if (page === "models") {
    const grid = $(".grid");
    const count = $("#model-count");
    const params = new URLSearchParams(location.search);
    let filter = ["women", "men"].includes(params.get("cat")) ? params.get("cat") : "all";
    const render = () => {
      const list = D.models.filter(m => filter === "all" || m.gender === filter);
      grid.innerHTML = list.map((m, i) => cardHTML(m, i, true)).join("");
      count.textContent = String(list.length).padStart(2, "0");
      $$(".tabs button").forEach(b => b.classList.toggle("active", b.dataset.cat === filter));
      observeReveals();
      history.replaceState(null, "", filter === "all" ? "models.html" : `models.html?cat=${filter}`);
      syncNav();
    };
    $$(".tabs button").forEach(b => b.addEventListener("click", () => { filter = b.dataset.cat; render(); }));
    render();
  }

  /* ---------- MODEL DETAIL ---------- */
  if (page === "model") {
    const slug = new URLSearchParams(location.search).get("id");
    const idx = Math.max(0, D.models.findIndex(m => m.slug === slug));
    const m = D.models[idx];
    const prev = D.models[(idx - 1 + D.models.length) % D.models.length];
    const next = D.models[(idx + 1) % D.models.length];
    document.title = `${m.name} — ${D.agency.name}`;
    $("#m-name").textContent = m.name;
    $("#m-origin").textContent = m.origin;
    $("#m-status").textContent = m.activity;
    $("#m-cat").textContent = m.gender;
    $("#m-cat").href = `models.html?cat=${m.gender}`;
    $("#m-prev").href = `model.html?id=${prev.slug}`; $("#m-prev b").textContent = prev.name;
    $("#m-next").href = `model.html?id=${next.slug}`; $("#m-next b").textContent = next.name;
    $("#m-mail").href = `mailto:${D.agency.email}?subject=Booking%20inquiry%20-%20${m.name}`;

    const sizes = $(".sizes");
    const drawSizes = (unit) => {
      const cm = unit === "cm";
      const rows = [
        ...(m.ageRange ? [["Age range", `${m.ageRange} years`]] : []),
        ["Height", cm ? `${m.height} cm` : `${Math.floor(m.height / 30.48)}'${Math.round((m.height / 2.54) % 12)}"`],
        ["Bust", cm ? `${Math.round(m.bust * 2.54)} cm` : `${m.bust}"`],
        ["Waist", cm ? `${Math.round(m.waist * 2.54)} cm` : `${m.waist}"`],
        ["Hips", cm ? `${Math.round(m.hips * 2.54)} cm` : `${m.hips}"`],
        ["Shoes", cm ? `${m.shoes} mm` : `US ${((m.shoes - 200) / 10 + 2).toFixed(1).replace(/\.0$/, "")}`],
        ["Hair", m.hair], ["Eyes", m.eyes],
      ];
      sizes.innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
      $$(".unit-toggle button").forEach(b => b.classList.toggle("active", b.dataset.unit === unit));
    };
    $$(".unit-toggle button").forEach(b => b.addEventListener("click", () => drawSizes(b.dataset.unit)));
    drawSizes("cm");

    const gal = $(".gallery");
    gal.innerHTML = Array.from({ length: m.photos }, (_, n) => `
      <figure class="reveal">
        <div class="ph reveal-img"><img src="${IMG(m, n)}" alt="${m.name} ${n + 1}" ${n ? 'loading="lazy"' : ""} width="900" height="1200"></div>
        <figcaption>${m.name} — ${String(n + 1).padStart(2, "0")} / ${String(m.photos).padStart(2, "0")}</figcaption>
      </figure>`).join("");
  }

  /* ---------- footer / agency info (모든 페이지) ---------- */
  $$("[data-agency]").forEach(el => {
    const v = D.agency[el.dataset.agency];
    if (v == null) return;
    if (el.tagName === "A" && el.dataset.agency === "email") el.href = "mailto:" + v;
    if (el.tagName === "A" && el.dataset.agency === "instagram") { el.href = v; return; }
    el.textContent = v;
  });
  $("#year") && ($("#year").textContent = new Date().getFullYear());

  observeReveals();
})();
