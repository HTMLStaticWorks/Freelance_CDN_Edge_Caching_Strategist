/**
 * EdgeFlux - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mob, #theme-toggle-dash');
    const htmlElement = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'dark';

    htmlElement.setAttribute('data-theme', currentTheme);
    updateAllThemeIcons(currentTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateAllThemeIcons(newTheme);
        });
    });

    function updateAllThemeIcons(theme) {
        themeToggles.forEach(toggle => {
            const isMobile = toggle.id.includes('-mob');
            if (isMobile) {
                // keep mobile toggle as an icon only (no trailing text)
                toggle.textContent = theme === 'dark' ? '🌙' : '☀️';
            } else {
                toggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            }
        });
    }

    // 2. RTL Management
    const rtlToggles = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mob, #rtl-toggle-dash');
    const currentDir = localStorage.getItem('dir') || 'ltr';

    htmlElement.setAttribute('dir', currentDir);

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const newDir = htmlElement.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    });

    // 3. Active Menu Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isDropdownItem = link.closest('.dropdown-menu');

        if (href === currentPath) {
            link.classList.add('active');
        }
    });

    // 3. Sticky Navbar
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const body = document.body;

    menuToggle?.addEventListener('click', () => {
        mobileNav.classList.add('active');
        body.style.overflow = 'hidden';
    });

    closeMenu?.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        body.style.overflow = '';
    });

    // Close mobile nav on link click
    mobileNav?.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // 5. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 6. Back to Top
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7. Pricing Toggle
    const pricingToggle = document.getElementById('pricing-checkbox');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');

    pricingToggle?.addEventListener('change', () => {
        if (pricingToggle.checked) {
            monthlyPrices.forEach(el => el.style.display = 'none');
            yearlyPrices.forEach(el => el.style.display = 'block');
        } else {
            monthlyPrices.forEach(el => el.style.display = 'block');
            yearlyPrices.forEach(el => el.style.display = 'none');
        }
    });

    // 8. Password Toggle
    document.querySelectorAll('.password-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            btn.textContent = type === 'password' ? '👁️' : '🙈';
        });
    });

    // 9. Countdown Timer (Coming Soon)
    const countdown = document.getElementById('countdown');
    if (countdown) {
        const targetDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000); // 30 days from now

        setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdown.innerHTML = `
                <div>${days}<span>Days</span></div>
                <div>${hours}<span>Hours</span></div>
                <div>${minutes}<span>Minutes</span></div>
                <div>${seconds}<span>Seconds</span></div>
            `;
        }, 1000);
    }

    // 10. Dashboard Sidebar & Content Switching
    const dashSidebarToggle = document.getElementById('dash-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.content-section');

    if (dashSidebarToggle && sidebar) {
        const closeSidebarBtn = document.querySelector('.close-sidebar-btn');

        function openSidebar() {
            sidebar.classList.add('open');
            body.style.overflow = 'hidden';
        }

        function closeSidebar() {
            sidebar.classList.remove('open');
            body.style.overflow = '';
        }

        dashSidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar.classList.contains('open')) closeSidebar();
            else openSidebar();
        });

        closeSidebarBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar();
        });

        // Close sidebar when clicking outside on small screens
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1023 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && !dashSidebarToggle.contains(e.target)) {
                closeSidebar();
            }
        });
    }

    if (menuItems.length > 0 && sections.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetId = item.getAttribute('data-target');
                if (!targetId) return;

                e.preventDefault();

                // Update Menu
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update Content
                sections.forEach(s => s.classList.remove('active'));
                const targetSection = document.getElementById(targetId);
                if (targetSection) targetSection.classList.add('active');

                // Close sidebar on small screens after selection
                if (window.innerWidth <= 1023 && sidebar) {
                    sidebar.classList.remove('open');
                    body.style.overflow = '';
                }
            });
        });
    }
});
