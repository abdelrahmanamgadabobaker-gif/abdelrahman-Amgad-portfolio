const projects = [
  {
    title: "Bokra",
    category: "Fintech · Social Media · Campaign Design",
    year: "2026",
    status: "View full case study",
    description: "A representation-led campaign that helped middle- and lower-middle-income Egyptians see Bokra as a platform built for people like them.",
    tags: ["Key Visuals", "Social Media", "Campaign Systems", "Fintech"],
    color: "rgba(0, 184, 174, .28)",
    cover: "assets/bokra-humanizing-finance.jpg",
    link: "bokra.html"
  },
  {
    title: "Jupiter Commz",
    category: "PR & Communications · Social Media",
    year: "2025",
    status: "View selected work",
    description: "A visual content system created for a PR agency, spanning brand communication, thought leadership, seasonal moments, recruitment, and corporate storytelling.",
    tags: ["Social Media", "Art Direction", "Brand Consistency", "PR Communication"],
    color: "rgba(22, 132, 127, .24)",
    cover: "assets/jupiter-relationships.jpg",
    link: "jupiter.html"
  },
  {
    title: "NSAS Avia Solutions",
    category: "Aviation & Travel · Social Media",
    year: "2025",
    status: "View selected work",
    description: "Aviation-focused social media campaigns combining destination storytelling, seasonal communication, airline offers, and event-based content.",
    tags: ["Social Media", "Art Direction", "Travel Campaigns", "Photo Compositing"],
    color: "rgba(28, 76, 132, .24)",
    cover: "assets/nsas-wizz-special-fare.webp",
    link: "nsas.html"
  },
  {
    title: "Touch by El Zenouki",
    category: "Home Appliances · Product Communication",
    year: "2025",
    status: "View selected work",
    description: "Consumer-focused visual communication that turns appliance features, practical benefits, and seasonal moments into clear and engaging social content.",
    tags: ["Product Advertising", "Social Media", "Retail Communication", "Arabic Typography"],
    color: "rgba(139, 199, 62, .24)",
    cover: "assets/touch-home-cover.jpg",
    link: "touch.html"
  },
  {
    title: "Trueval by El Zenouki",
    category: "Cookware · Product & Community Communication",
    year: "2025",
    status: "View selected work",
    description: "Cookware communication combining product education, audience engagement, seasonal moments, and retail-focused social media content.",
    tags: ["Product Advertising", "Community Engagement", "Seasonal Campaigns", "Arabic Typography"],
    color: "rgba(178, 40, 48, .24)",
    cover: "assets/trueval-giveaway-cover.jpg",
    link: "trueval.html"
  },
  {
    title: "Personal Explorations",
    category: "Branding · Posters · Print",
    year: "Ongoing",
    status: "Selected projects coming soon",
    description: "Independent branding, poster, and print projects created to explore new visual styles and strengthen conceptual thinking.",
    tags: ["Branding", "Posters", "Print", "Concept Design"],
    color: "rgba(200, 200, 200, .12)"
  }
];

const grid = document.getElementById("projectsGrid");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalKicker = document.getElementById("modalKicker");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");

projects.forEach((project, index) => {
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.style.setProperty("--project-color", project.color);
  card.tabIndex = 0;
  card.innerHTML = `
    ${project.cover ? `<img class="project-cover" src="${project.cover}" alt="${project.title} project cover" />` : ""}
    ${project.cover ? `<div class="project-cover-overlay"></div>` : ""}
    <div class="project-index">${String(index + 1).padStart(2, "0")}</div>
    <div class="project-top">
      <span>${project.category}</span>
      <span class="project-status">${project.status}</span>
    </div>
    <div class="project-bottom">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </div>
  `;

  const openProject = () => {
    if (project.link) {
      window.location.href = project.link;
      return;
    }

    modalKicker.textContent = `${project.category} · ${project.year}`;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join("");
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  card.addEventListener("click", openProject);
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") openProject();
  });

  grid.appendChild(card);
});

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();
