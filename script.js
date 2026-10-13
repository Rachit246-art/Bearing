/**
 * NEXORA PRECISION BEARINGS - INTERACTIVE ENGINE
 * Handcrafted Vanilla JavaScript for optimal performance and smooth luxury UX
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. STICKY HEADER & SCROLL BEHAVIOR
       ========================================================================== */
    const siteHeader = document.getElementById('siteHeader');

    window.addEventListener('scroll', () => {
        if (!siteHeader) return;
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       3. HERO BANNER AUTO-SLIDER (ROBUST & CONTINUOUS)
       ========================================================================== */
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot-btn');
    const heroPrevArrow = document.getElementById('heroPrevArrow');
    const heroNextArrow = document.getElementById('heroNextArrow');
    const countCurrent = document.getElementById('countCurrent');
    let currentHeroIndex = 0;
    let heroTimer = null;

    function showHeroSlide(index) {
        if (!heroSlides.length) return;
        
        if (index < 0) {
            index = heroSlides.length - 1;
        } else if (index >= heroSlides.length) {
            index = 0;
        }

        heroSlides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        heroDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        if (countCurrent) {
            countCurrent.textContent = String(index + 1).padStart(2, '0');
        }

        currentHeroIndex = index;
    }

    function startHeroAutoSlide() {
        if (heroTimer) clearInterval(heroTimer);
        heroTimer = setInterval(() => {
            showHeroSlide(currentHeroIndex + 1);
        }, 4500); // Transitions smoothly every 4.5 seconds
    }

    function resetHeroAutoSlide() {
        startHeroAutoSlide();
    }

    if (heroSlides.length > 0) {
        // Initialize first slide
        showHeroSlide(0);
        startHeroAutoSlide();

        // Arrow navigation
        if (heroPrevArrow) {
            heroPrevArrow.addEventListener('click', (e) => {
                e.preventDefault();
                showHeroSlide(currentHeroIndex - 1);
                resetHeroAutoSlide();
            });
        }

        if (heroNextArrow) {
            heroNextArrow.addEventListener('click', (e) => {
                e.preventDefault();
                showHeroSlide(currentHeroIndex + 1);
                resetHeroAutoSlide();
            });
        }

        // Dot navigation
        heroDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const idx = parseInt(dot.getAttribute('data-index'), 10);
                if (!isNaN(idx)) {
                    showHeroSlide(idx);
                    resetHeroAutoSlide();
                }
            });
        });
    }

    /* ==========================================================================
       4. TESTIMONIALS SLIDER
       ========================================================================== */
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot-btn');
    const prevTestimonialBtn = document.getElementById('prevTestimonial');
    const nextTestimonialBtn = document.getElementById('nextTestimonial');
    let currentTestimonialIndex = 0;
    let testimonialTimer = null;

    function showTestimonial(index) {
        if (!testimonialSlides.length) return;
        if (index < 0) index = testimonialSlides.length - 1;
        if (index >= testimonialSlides.length) index = 0;

        testimonialSlides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        testimonialDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        currentTestimonialIndex = index;
    }

    if (testimonialSlides.length > 0) {
        showTestimonial(0);

        testimonialTimer = setInterval(() => {
            showTestimonial(currentTestimonialIndex + 1);
        }, 6000);

        if (prevTestimonialBtn) {
            prevTestimonialBtn.addEventListener('click', () => {
                showTestimonial(currentTestimonialIndex - 1);
                clearInterval(testimonialTimer);
            });
        }

        if (nextTestimonialBtn) {
            nextTestimonialBtn.addEventListener('click', () => {
                showTestimonial(currentTestimonialIndex + 1);
                clearInterval(testimonialTimer);
            });
        }

        testimonialDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'), 10);
                if (!isNaN(idx)) {
                    showTestimonial(idx);
                    clearInterval(testimonialTimer);
                }
            });
        });
    }

    /* ==========================================================================
       5. MODAL SYSTEM (QUOTE MODAL)
       ========================================================================== */
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const modalId = trigger.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                e.preventDefault();
                targetModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            modalBackdrops.forEach(m => m.classList.remove('open'));
            document.body.style.overflow = '';
        });
    });

    modalBackdrops.forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalBackdrops.forEach(m => m.classList.remove('open'));
            document.body.style.overflow = '';
            closeSearchOverlay();
        }
    });

    /* ==========================================================================
       6. SEARCH OVERLAY
       ========================================================================== */
    const searchTrigger = document.getElementById('searchTrigger');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    function closeSearchOverlay() {
        if (searchOverlay) {
            searchOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (searchTrigger && searchOverlay) {
        searchTrigger.addEventListener('click', () => {
            searchOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (searchInput) setTimeout(() => searchInput.focus(), 100);
        });

        if (searchClose) {
            searchClose.addEventListener('click', closeSearchOverlay);
        }

        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) closeSearchOverlay();
        });

        if (searchInput && searchResults) {
            searchInput.addEventListener('input', (e) => {
                const q = e.target.value.toLowerCase().trim();
                if (q.length === 0) {
                    searchResults.innerHTML = `<div class="search-hint">Quick suggestions: <strong>Deep Groove</strong>, <strong>Tapered 32000</strong>, <strong>Spherical 22200</strong>, <strong>Wind Energy</strong></div>`;
                    return;
                }

                const matches = [
                    { title: 'Deep Groove Ball Bearings (Series 6000, 6200, 6300)', desc: 'High radial capacity and quiet operation', url: 'services-details.html' },
                    { title: 'Cylindrical Roller Bearings (Series N, NU, NJ, NUP)', desc: 'Heavy radial load capacity with brass cage', url: 'services-details.html' },
                    { title: 'Tapered Roller Bearings (Series 30200, 32200, 32300)', desc: 'Designed for combined high axial & radial loads', url: 'services-details.html' },
                    { title: 'Spherical Roller Bearings (Series 22200, 22300, 23000)', desc: 'Self-aligning heavy industrial solutions', url: 'services-details.html' },
                    { title: 'Renewable Energy Solutions', desc: 'Wind turbine main shaft and yaw drive bearings', url: 'project.html' },
                    { title: 'High-Speed Railway Hub Units', desc: 'Certified axle box bearings for rolling stock', url: 'project.html' }
                ].filter(item => item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q));

                if (matches.length > 0) {
                    searchResults.innerHTML = matches.map(m => `
                        <a href="${m.url}" style="display: block; padding: 0.85rem 0; border-bottom: 1px solid rgba(255,255,255,0.08); text-decoration: none;">
                            <strong style="color: #dfb76c; display: block; font-size: 0.95rem;">${m.title}</strong>
                            <span style="color: #a4a9b8; font-size: 0.8rem;">${m.desc}</span>
                        </a>
                    `).join('');
                } else {
                    searchResults.innerHTML = `<p style="color: #8c92a2; font-size: 0.88rem; margin-top: 1rem;">No direct matches found for "${q}". <a href="contact-us.html" style="color: #dfb76c;">Contact our engineers &rarr;</a></p>`;
                }
            });
        }
    }

    /* ==========================================================================
       7. FORMS & TOAST NOTIFICATION
       ========================================================================== */
    const toastNotice = document.getElementById('toastNotice');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(title, message) {
        if (!toastNotice) return;
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        toastNotice.classList.add('show');
        setTimeout(() => {
            toastNotice.classList.remove('show');
        }, 4500);
    }

    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('qName') ? document.getElementById('qName').value : 'Client';
            modalBackdrops.forEach(m => m.classList.remove('open'));
            document.body.style.overflow = '';
            quoteForm.reset();
            showToast('Quote Request Received', `Thank you, ${name}! An engineer will prepare your technical quote within 2 business hours.`);
        });
    }

    const contactPageForm = document.getElementById('contactPageForm');
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactPageForm.reset();
            showToast('Inquiry Dispatched', 'Thank you! A technical application engineer will contact you shortly.');
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.reset();
            showToast('Subscribed Successfully', 'Thank you for subscribing to Nexora engineering insights.');
        });
    }

});