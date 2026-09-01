const projects = [
  {
    title: "Bokra",
    category: "Fintech · Social Media · Campaign Design",
    year: "2026",
    status: "View full case study",
    description: "A representation-led campaign that helped middle- and lower-middle-income Egyptians see Bokra as a platform built for people like them.",
    tags: ["Key Visuals", "Social Media", "Campaign Systems", "Fintech"],
    color: "rgba(0, 184, 174, .28)",
    cover: "assets/bokra-family-cover.jpg",
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
    cover: "assets/thumbs/design/jupiter-relationships.jpg",
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
  }
];

const featuredClients = document.getElementById("featuredClients");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalKicker = document.getElementById("modalKicker");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");

function openProject(project) {
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
}

projects.slice(0, 3).forEach((project, index) => {
  const card = document.createElement("article");
  card.className = `featured-client-card featured-client-${index + 1} reveal`;
  card.style.setProperty("--project-color", project.color);
  card.tabIndex = 0;
  card.setAttribute("role", "link");
  card.setAttribute("aria-label", `View ${project.title} work`);
  card.innerHTML = `
    <div class="featured-client-media">
      <img src="${project.cover}" alt="${project.title} selected work" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" />
      <div class="featured-client-shade"></div>
      <div class="featured-client-orbit" aria-hidden="true"></div>
    </div>
    <div class="featured-client-head">
      <span class="featured-client-number">0${index + 1}</span>
      <span class="featured-client-year">${project.year}</span>
    </div>
    <div class="featured-client-copy">
      <p>${project.category}</p>
      <h3>${project.title}</h3>
      <div class="featured-client-action"><span>${project.status}</span><span aria-hidden="true">↗</span></div>
    </div>
  `;
  card.addEventListener("click", () => openProject(project));
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProject(project);
    }
  });
  featuredClients.appendChild(card);
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
