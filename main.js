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

    // Contact Form Submission to Google Sheet
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzZjTWwYu44wO0PZBsos1aGtbly0LStb3OBgpCktcWrwwIRn-zE7-b2Ui8nK0bL6EcbsA/exec';

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            formStatus.className = 'text-sm text-foreground/70 block';
            formStatus.textContent = 'Submitting your inquiry...';

            try {
                const formData = new FormData(contactForm);
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                });

                formStatus.className = 'text-sm text-emerald-600 dark:text-emerald-400 block';
                formStatus.textContent = 'Thank you! Your message has been received by our atelier.';
                contactForm.reset();

                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'hidden text-sm';
                }, 7000);
            } catch (err) {
                console.error('Submission error:', err);
                formStatus.className = 'text-sm text-red-600 dark:text-red-400 block';
                formStatus.textContent = 'Something went wrong. Please try again or email hello@mg-fashion.com.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
