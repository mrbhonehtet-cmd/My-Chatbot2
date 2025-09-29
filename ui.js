// UI-only enhancements; no business logic and no ID changes.
// - Fix mobile viewport height using CSS var --app-vh
// - Keep chat scrolled to bottom when new messages arrive
// - Minor input focus behavior on mobile

(function () {
  function setAppVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--app-vh', `${vh}px`);
  }

  // Set on load and on resize/orientation
  setAppVh();
  window.addEventListener('resize', setAppVh);
  window.addEventListener('orientationchange', setAppVh);

  // Smooth scroll to bottom helper
  function scrollToBottom(el) {
    if (!el) return;
    // Only autoscroll if already near the bottom to not disrupt manual scrollback
    const threshold = 80; // px
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    if (atBottom) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }

  // Auto-scroll #msgs when new nodes arrive
  function attachAutoScroll() {
    const msgs = document.getElementById('msgs');
    if (!msgs) return;

    // Initial scroll on load
    setTimeout(() => {
      msgs.scrollTop = msgs.scrollHeight;
    }, 0);

    const observer = new MutationObserver(() => scrollToBottom(msgs));
    observer.observe(msgs, { childList: true, subtree: false });
  }

  // Handle keyboard-inset friendly padding on composer (optional)
  function enhanceComposer() {
    const input = document.getElementById('user-input');
    const composer = input && input.closest('.composer');
    if (!input || !composer) return;

    input.addEventListener('focus', () => {
      // On focus, ensure latest messages visible
      const msgs = document.getElementById('msgs');
      if (msgs) {
        setTimeout(() => {
          msgs.scrollTop = msgs.scrollHeight;
        }, 100);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      attachAutoScroll();
      enhanceComposer();
      setupMobileDrawer();
    });
  } else {
    attachAutoScroll();
    enhanceComposer();
    setupMobileDrawer();
  }

  // =========================
  // Mobile drawer for .side
  // =========================
  function setupMobileDrawer() {
    const side = document.querySelector('.side');
    const fab = document.querySelector('.fab-settings');
    const backdrop = document.querySelector('.side-backdrop');
    const mainContent = document.getElementById('main-content');
    const closeBtn = document.querySelector('.close-drawer');
    if (!side || !fab || !backdrop) return;

    function isMobile() {
      return window.matchMedia('(max-width: 768px)').matches;
    }

    function openDrawer() {
      side.classList.add('open');
      backdrop.style.display = 'block';
      // allow display to apply before adding show for transition
      requestAnimationFrame(() => backdrop.classList.add('show'));
      document.body.classList.add('no-scroll');
    }

    function closeDrawer() {
      side.classList.remove('open');
      backdrop.classList.remove('show');
      document.body.classList.remove('no-scroll');
      // hide after transition ends
      const hide = () => {
        backdrop.style.display = 'none';
        backdrop.removeEventListener('transitionend', hide);
      };
      backdrop.addEventListener('transitionend', hide);
      // fallback in case transitionend doesn't fire
      setTimeout(hide, 250);
    }

    function isMainVisible() {
      if (!mainContent) return true;
      // Visible if not display:none
      return getComputedStyle(mainContent).display !== 'none';
    }

    function syncVisibility() {
      const show = isMobile() && isMainVisible();
      if (show) {
        fab.style.display = 'inline-flex';
        // ensure closed state without showing backdrop
        closeDrawer();
      } else {
        fab.style.display = 'none';
        closeDrawer();
      }
    }

    // Bind events once
    if (!fab._bound) {
      fab.addEventListener('click', () => {
        if (side.classList.contains('open')) closeDrawer();
        else openDrawer();
      });
      fab._bound = true;
    }

    if (!backdrop._bound) {
      backdrop.addEventListener('click', closeDrawer);
      backdrop._bound = true;
    }

    if (closeBtn && !closeBtn._bound) {
      closeBtn.addEventListener('click', closeDrawer);
      closeBtn._bound = true;
    }

    // Close on Escape
    if (!document._escBound) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
      });
      document._escBound = true;
    }

    // Sync on load and on resize/orientation
    syncVisibility();
    window.addEventListener('resize', syncVisibility);
    window.addEventListener('orientationchange', syncVisibility);

    // Observe main content becoming visible after modal flow
    if (mainContent && !mainContent._observed) {
      const obs = new MutationObserver(syncVisibility);
      obs.observe(mainContent, { attributes: true, attributeFilter: ['style', 'class'] });
      mainContent._observed = true;
    }
  }
})();
