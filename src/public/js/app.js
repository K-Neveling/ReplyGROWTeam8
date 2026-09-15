/**
 * Reply GROW Team 8 - Client Application Script
 * WCAG 2.1 AA Compliant Interaction & Dynamic Design
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const announcer = document.getElementById('live-announcer');
  const themeToggle = document.getElementById('theme-toggle');
  const projectsGrid = document.getElementById('projects-grid');
  const searchInput = document.getElementById('search-input');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const dialog = document.getElementById('submission-dialog');
  const form = document.getElementById('submission-form');
  const formFeedback = document.getElementById('form-feedback');

  let activeCategory = 'All';
  let searchQuery = '';

  /**
   * Announces dynamic text updates to screen readers via aria-live region.
   * @param {string} message
   */
  function announce(message) {
    if (announcer) {
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = message;
      }, 50);
    }
  }

  // --- Theme Management ---
  function initTheme() {
    const savedTheme = localStorage.getItem('rg-theme') || 'light';
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      const textSpan = themeToggle.querySelector('.theme-text');
      if (textSpan) {
        textSpan.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
    }
    localStorage.setItem('rg-theme', theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      announce(`Theme changed to ${newTheme} mode.`);
    });
  }

  // --- Projects Data Fetch & Render ---
  async function fetchProjects() {
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'All') {
        params.append('category', activeCategory);
      }
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      const res = await fetch(`/api/v1/projects?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const json = await res.json();
      renderProjects(json.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      projectsGrid.innerHTML = `
        <div class="card-description" role="alert">
          Unable to load projects at this time. Please try again later.
        </div>
      `;
      announce('Failed to load projects.');
    }
  }

  function renderProjects(projects) {
    if (!projectsGrid) return;

    if (projects.length === 0) {
      projectsGrid.innerHTML = `
        <div class="card-description">
          No projects match your current filter criteria.
        </div>
      `;
      announce('No matching projects found.');
      return;
    }

    projectsGrid.innerHTML = projects
      .map(
        (p) => `
        <article class="project-card" aria-labelledby="proj-${p.id}">
          <div>
            <span class="card-category">${escapeHtml(p.category)}</span>
            <h3 id="proj-${p.id}" class="card-title">${escapeHtml(p.title)}</h3>
            <p class="card-description">${escapeHtml(p.description)}</p>
          </div>
          <div class="card-footer">
            <span class="card-status">Status: ${escapeHtml(p.status)}</span>
            <span class="card-stars" aria-label="${p.stars} stars">★ ${p.stars}</span>
          </div>
        </article>
      `
      )
      .join('');

    announce(`Displaying ${projects.length} project${projects.length === 1 ? '' : 's'}.`);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // --- Category Filter Tabs (ARIA Tablist pattern with arrow navigation) ---
  filterTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      selectTab(tab);
    });

    tab.addEventListener('keydown', (e) => {
      let targetTab = null;
      if (e.key === 'ArrowRight') {
        targetTab = filterTabs[(index + 1) % filterTabs.length];
      } else if (e.key === 'ArrowLeft') {
        targetTab = filterTabs[(index - 1 + filterTabs.length) % filterTabs.length];
      }

      if (targetTab) {
        e.preventDefault();
        targetTab.focus();
        selectTab(targetTab);
      }
    });
  });

  function selectTab(selectedTab) {
    filterTabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });

    selectedTab.classList.add('active');
    selectedTab.setAttribute('aria-selected', 'true');
    selectedTab.setAttribute('tabindex', '0');

    activeCategory = selectedTab.getAttribute('data-category') || 'All';
    fetchProjects();
  }

  // --- Search Input with Debounce ---
  let debounceTimeout = null;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        searchQuery = e.target.value;
        fetchProjects();
      }, 250);
    });
  }

  // --- Accessible Modal Dialog ---
  function openDialog() {
    if (dialog && typeof dialog.showModal === 'function') {
      formFeedback.textContent = '';
      formFeedback.className = 'form-feedback';
      form.reset();
      dialog.showModal();
      const firstInput = dialog.querySelector('input');
      if (firstInput) firstInput.focus();
      announce('Project submission dialog opened.');
    }
  }

  function closeDialog() {
    if (dialog && dialog.open) {
      dialog.close();
      if (openModalBtn) openModalBtn.focus();
      announce('Project submission dialog closed.');
    }
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openDialog);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeDialog);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeDialog);

  // Close dialog on backdrop click
  if (dialog) {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        closeDialog();
      }
    });
  }

  // --- Form Submission Handling ---
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const titleInput = document.getElementById('project-title');
      const categoryInput = document.getElementById('project-category');
      const descInput = document.getElementById('project-desc');

      const title = titleInput.value.trim();
      const category = categoryInput.value;
      const description = descInput.value.trim();

      if (title.length < 3) {
        showFeedback('Title must be at least 3 characters long.', 'error');
        titleInput.focus();
        return;
      }

      if (description.length < 10) {
        showFeedback('Description must be at least 10 characters long.', 'error');
        descInput.focus();
        return;
      }

      try {
        const res = await fetch('/api/v1/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, category, description }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error?.message || 'Submission failed.');
        }

        showFeedback('Project submitted successfully!', 'success');
        announce('Project submitted successfully!');
        fetchProjects();

        setTimeout(() => {
          closeDialog();
        }, 800);
      } catch (err) {
        showFeedback(err.message, 'error');
        announce(`Error: ${err.message}`);
      }
    });
  }

  function showFeedback(msg, type) {
    if (formFeedback) {
      formFeedback.textContent = msg;
      formFeedback.className = `form-feedback ${type}`;
    }
  }

  // --- Initialize ---
  initTheme();
  fetchProjects();
});
