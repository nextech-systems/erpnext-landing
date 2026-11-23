(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const enquiry = document.getElementById("project-enquiry");

  if (typeof enquiry?.showModal === "function") {
    document.querySelectorAll("[data-enquiry-open]").forEach((trigger) => {
      trigger.hidden = false;
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        enquiry.showModal();
      });
    });

    enquiry.querySelector(".enquiry-close").addEventListener("click", () => {
      enquiry.close();
    });


    const form = enquiry.querySelector(".enquiry-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const fields = new FormData(form);
      const company = fields.get("company").trim();
      const lines = [
        "Name: " + fields.get("name").trim(),
        "Email: " + fields.get("email").trim()
      ];
      if (company) lines.push("Company: " + company);
      lines.push("", "Project details:", fields.get("message").trim());

      const subject = encodeURIComponent("Nextech Systems website enquiry");
      const body = encodeURIComponent(lines.join("\n").replace(/\r?\n/g, "\r\n"));
      window.location.href = "mailto:" + form.dataset.email + "?subject=" + subject + "&body=" + body;
    });

    enquiry.addEventListener("click", (event) => {
      if (event.target === enquiry) enquiry.close();
    });
  }
})();
