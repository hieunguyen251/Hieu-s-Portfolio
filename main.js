// Theme toggle with localStorage persistence
const btn = document.getElementById('theme-toggle');
const root = document.documentElement;
const themeKey = 'site-theme';

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
}

btn.addEventListener('click', () => {
  const current = localStorage.getItem(themeKey) || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem(themeKey, next);
});

// Load saved theme on startup
const savedTheme = localStorage.getItem(themeKey) || 'light';
setTheme(savedTheme);

// Contact form with validation & success message
const form = document.getElementById('contact-form');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  status.textContent = 'Sending...';

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 700));

  status.textContent = 'Thanks! Your message was sent.';
  form.reset();
});

// Dynamic projects loading with fallback
async function loadProjects() {
  const container = document.querySelector('.projects-grid');
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
    if (!res.ok) throw new Error('Network response not ok');
    const projects = await res.json();
    container.innerHTML = projects
      .map(
        (p) =>
          `<article class="project-card" tabindex="0"><h3>${p.title}</h3><p>${p.body.slice(
            0,
            100
          )}...</p></article>`
      )
      .join('');
  } catch (err) {
    // fallback to local projects
    const fallback = [
      { title: 'Local Project A', body: 'Description of local project A.' },
      { title: 'Local Project B', body: 'Description of local project B.' },
    ];
    container.innerHTML = fallback
      .map(
        (p) =>
          `<article class="project-card" tabindex="0"><h3>${p.title}</h3><p>${p.body}</p></article>`
      )
      .join('');
  }
}

loadProjects();
