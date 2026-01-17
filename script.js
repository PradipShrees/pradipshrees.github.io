(function () {
  const root = document.documentElement;

  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme: load + toggle
  const themeToggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    // icon
    const icon = themeToggle?.querySelector("i");
    if (icon) {
      icon.className = next === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  }

  // init icon
  if (themeToggle) {
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current);

    themeToggle.addEventListener("click", () => {
      const now = root.getAttribute("data-theme") || "dark";
      setTheme(now === "dark" ? "light" : "dark");
    });
  }

  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".m-link");

  function openMenu(open) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle("show", open);
    mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("show");
      openMenu(!isOpen);
    });

    mobileLinks.forEach((a) => {
      a.addEventListener("click", () => openMenu(false));
    });
  }

  // Fake contact submit
  const fakeSubmit = document.getElementById("fakeSubmit");
  const formNote = document.getElementById("formNote");
  if (fakeSubmit && formNote) {
    fakeSubmit.addEventListener("click", () => {
      formNote.textContent =
        "This demo form doesn’t send yet. Connect it to AWS (API Gateway + Lambda) to receive messages.";
      setTimeout(() => (formNote.textContent = ""), 7000);
    });
  }
})();
