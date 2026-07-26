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
    status: "Project assets coming next",
    description: "A range of social media concepts and branded communication pieces created for a PR and communications agency.",
    tags: ["Social Media", "Art Direction", "Brand Consistency"],
    color: "rgba(22, 132, 127, .24)"
  },
  {
    title: "NSAS Avia Solutions",
    category: "Travel & Aviation · Advertising",
    year: "2025",
    status: "Ready for curation",
    description: "Travel and aviation visuals combining destination storytelling, promotional messaging, and high-impact advertising composition.",
    tags: ["Advertising", "Travel", "Compositing", "Visual Storytelling"],
    color: "rgba(62, 94, 255, .23)"
  },
  {
    title: "Touch Elzenouki",
    category: "Home Appliances · Social Media",
    year: "2025",
    status: "Ready for curation",
    description: "Product-focused social media designs built around clear hierarchy, lifestyle context, and recognizable brand assets.",
    tags: ["Product Design", "Social Media", "Retail"],
    color: "rgba(132, 208, 75, .22)"
  },
  {
    title: "Trueval Elzenouki",
    category: "Cookware · Social Media",
    year: "2025",
    status: "Ready for curation",
    description: "Branded social media visuals for cookware and kitchen products, balancing product clarity with campaign storytelling.",
    tags: ["Product Visuals", "Social Media", "Campaign Design"],
    color: "rgba(178, 40, 48, .22)"
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
