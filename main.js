// MG Fashion - Main JS
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    const copyright = document.getElementById('copyright');
    if (copyright) {
        copyright.textContent = `© ${new Date().getFullYear()} MG Fashion. All rights reserved.`;
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });
    }

    // Scroll Animations (Simple Reveal)
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "none";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        reveal.style.opacity = "0";
        reveal.style.transform = "translateY(16px)";
        reveal.style.transition = "opacity 1.1s cubic-bezier(.2,.7,.2,1), transform 1.1s cubic-bezier(.2,.7,.2,1)";
        revealObserver.observe(reveal);
    });
});
