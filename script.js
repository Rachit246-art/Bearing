/**
 * NEXORA PRECISION BEARINGS - LUXURY INTERACTIVE & ANIMATION ENGINE
 * Handcrafted Vanilla JavaScript for optimal performance, 60+ FPS fluid luxury UX
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
    }, { passive: true });

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
        }, 4500);
    }

    function resetHeroAutoSlide() {
        startHeroAutoSlide();
    }

    if (heroSlides.length > 0) {
        showHeroSlide(0);
        startHeroAutoSlide();

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
       5. MODAL SYSTEM (QUOTE & PRODUCT MODALS)
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

    /* ==========================================================================
       8. BESPOKE PRECISION CUSTOM RETICLE CURSOR
       ========================================================================== */
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isFinePointer) {
        let cursorDot = document.querySelector('.custom-cursor-dot');
        let cursorRing = document.querySelector('.custom-cursor-ring');

        if (!cursorDot) {
            cursorDot = document.createElement('div');
            cursorDot.className = 'custom-cursor-dot';
            document.body.appendChild(cursorDot);
        }

        if (!cursorRing) {
            cursorRing = document.createElement('div');
            cursorRing.className = 'custom-cursor-ring';
            document.body.appendChild(cursorRing);
        }

        let mouseX = -100, mouseY = -100;
        let ringX = -100, ringY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }, { passive: true });

        // Smooth spring physics for outer caliper ring
        function renderCursor() {
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;
            if (cursorRing) {
                cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
            }
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        // Hover scale on interactive elements
        const interactiveSelector = 'a, button, input, select, textarea, .product-card, .service-card, .industry-card, .pricing-card, .blog-card, .project-card, .btn, .hero-slider-arrow, .modal-close, .dot-btn, .hero-dot-btn, .scroll-gauge-btn';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveSelector)) {
                cursorRing.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactiveSelector)) {
                cursorRing.classList.remove('cursor-hover');
            }
        });

        document.addEventListener('mousedown', () => {
            cursorRing.classList.add('cursor-click');
        });

        document.addEventListener('mouseup', () => {
            cursorRing.classList.remove('cursor-click');
        });
    }

    /* ==========================================================================
       9. 3D PERSPECTIVE CARD TILT & CURSOR SPOTLIGHT TRACKING
       ========================================================================== */
    const tiltCards = document.querySelectorAll(
        '.product-card, .service-card, .industry-card, .pricing-card, .blog-card, .project-card, .why-card, .stat-item, .contact-card, .global-badge-card, .testimonial-card'
    );

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
            card.style.setProperty('--spotlight-x', `${x}px`);
            card.style.setProperty('--spotlight-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.removeProperty('--spotlight-x');
            card.style.removeProperty('--spotlight-y');
        });
    });

    /* ==========================================================================
       10. SCROLL-DRIVEN REVEAL SYSTEM & STAGGER ENGINE
       ========================================================================== */
    const revealTargets = document.querySelectorAll(
        '.section-header, .section-eyebrow, .section-title, .section-desc, .product-card, .service-card, .industry-card, .pricing-card, .blog-card, .project-card, .why-card, .stat-item, .contact-card, .cta-banner, .about-content, .about-media, .pricing-table-card'
    );

    // Group siblings for natural staggered arrivals
    const parentGroups = new Map();
    revealTargets.forEach(el => {
        if (!el.classList.contains('reveal-fade-up') && !el.classList.contains('reveal-fade-left') && !el.classList.contains('reveal-fade-right') && !el.classList.contains('reveal-scale-up')) {
            el.classList.add('reveal-fade-up');
        }

        const parent = el.parentElement;
        if (parent) {
            if (!parentGroups.has(parent)) parentGroups.set(parent, []);
            parentGroups.get(parent).push(el);
        }
    });

    // Apply stagger delays
    parentGroups.forEach(children => {
        if (children.length > 1) {
            children.forEach((child, idx) => {
                child.style.transitionDelay = `${(idx % 4) * 110}ms`;
            });
        }
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    
                    // Trigger number counter if contains stat values
                    const countElements = entry.target.querySelectorAll('[data-count], .stat-number, .stat-value, .metric-value');
                    countElements.forEach(animateCounter);
                    if (entry.target.hasAttribute('data-count') || entry.target.classList.contains('stat-number') || entry.target.classList.contains('stat-value')) {
                        animateCounter(entry.target);
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealTargets.forEach(el => revealObserver.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add('is-revealed'));
    }

    /* ==========================================================================
       11. DYNAMIC NUMBER COUNTER ANIMATION
       ========================================================================== */
    function animateCounter(el) {
        if (el.dataset.animated === 'true') return;

        const rawText = el.getAttribute('data-count') || el.textContent.trim();
        const match = rawText.match(/([^\d]*)([\d,.]+)([^\d]*)/);
        if (!match) return;

        const prefix = match[1] || '';
        const numStr = match[2].replace(/,/g, '');
        const suffix = match[3] || '';
        const targetNum = parseFloat(numStr);

        if (isNaN(targetNum)) return;

        el.dataset.animated = 'true';
        const hasDecimals = numStr.includes('.');
        const decimalPlaces = hasDecimals ? numStr.split('.')[1].length : 0;
        const duration = 1800;
        const startTime = performance.now();

        function stepCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = targetNum * easeProgress;

            let formatted = hasDecimals 
                ? currentVal.toFixed(decimalPlaces) 
                : Math.floor(currentVal).toLocaleString();

            el.textContent = `${prefix}${formatted}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(stepCounter);
            } else {
                el.textContent = `${prefix}${targetNum.toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })}${suffix}`;
            }
        }
        requestAnimationFrame(stepCounter);
    }

    /* ==========================================================================
       12. CIRCULAR SCROLL PROGRESS GAUGE & BACK-TO-TOP
       ========================================================================== */
    let scrollGauge = document.getElementById('scrollGauge');
    if (!scrollGauge) {
        scrollGauge = document.createElement('button');
        scrollGauge.id = 'scrollGauge';
        scrollGauge.className = 'scroll-gauge-btn';
        scrollGauge.setAttribute('aria-label', 'Scroll to Top');
        scrollGauge.innerHTML = `
            <svg class="scroll-gauge-svg" viewBox="0 0 48 48">
                <circle class="scroll-gauge-circle-bg" cx="24" cy="24" r="22"></circle>
                <circle class="scroll-gauge-circle-bar" id="scrollGaugeBar" cx="24" cy="24" r="22"></circle>
            </svg>
            <span class="scroll-gauge-arrow">&#8593;</span>
        `;
        document.body.appendChild(scrollGauge);
    }

    const scrollGaugeBar = document.getElementById('scrollGaugeBar');
    const circumference = 2 * Math.PI * 22; // ~138.23

    function updateScrollGauge() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

        if (scrollGaugeBar) {
            const offset = circumference - (scrollPercent * circumference);
            scrollGaugeBar.style.strokeDashoffset = offset;
        }

        if (scrollTop > 280) {
            scrollGauge.classList.add('visible');
        } else {
            scrollGauge.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', updateScrollGauge, { passive: true });
    updateScrollGauge();

    scrollGauge.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       13. AMBIENT GOLD DUST PARTICLES CANVAS ENGINE
       ========================================================================== */
    let dustCanvas = document.getElementById('ambientDustCanvas');
    if (!dustCanvas) {
        dustCanvas = document.createElement('canvas');
        dustCanvas.id = 'ambientDustCanvas';
        document.body.prepend(dustCanvas);
    }

    if (dustCanvas) {
        const ctx = dustCanvas.getContext('2d');
        let width = dustCanvas.width = window.innerWidth;
        let height = dustCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = dustCanvas.width = window.innerWidth;
            height = dustCanvas.height = window.innerHeight;
        }, { passive: true });

        const particleCount = isFinePointer ? 32 : 16;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.8 + 0.6,
                baseAlpha: Math.random() * 0.45 + 0.15,
                alpha: 0.3,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35 - 0.1,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }

        let mousePos = { x: -500, y: -500 };
        if (isFinePointer) {
            window.addEventListener('mousemove', (e) => {
                mousePos.x = e.clientX;
                mousePos.y = e.clientY;
            }, { passive: true });
        }

        let animFrameId = null;

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Subtle repulsion from cursor
                const dx = p.x - mousePos.x;
                const dy = p.y - mousePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120 && dist > 0) {
                    const force = (120 - dist) / 120 * 0.8;
                    p.x += (dx / dist) * force;
                    p.y += (dy / dist) * force;
                }

                // Alpha pulsing
                p.alpha = p.baseAlpha + Math.sin(Date.now() * p.pulseSpeed * 0.05) * 0.15;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(223, 183, 108, ${Math.max(0, p.alpha)})`;
                ctx.shadowColor = '#dfb76c';
                ctx.shadowBlur = 6;
                ctx.fill();
            });

            animFrameId = requestAnimationFrame(animateParticles);
        }

        // Throttle when page is hidden to preserve battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (animFrameId) cancelAnimationFrame(animFrameId);
            } else {
                animateParticles();
            }
        });

        animateParticles();
    }

    /* ==========================================================================
       14. BLUEPRINT ROTATING CALIPER WATERMARKS INJECTION
       ========================================================================== */
    const watermarkSvg = `
        <svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <g class="dial-spin-clockwise">
                <circle cx="200" cy="200" r="185" fill="none" stroke="#dfb76c" stroke-width="1" stroke-dasharray="4,6" opacity="0.6"/>
                <circle cx="200" cy="200" r="165" fill="none" stroke="#dfb76c" stroke-width="1.5" opacity="0.4"/>
                <circle cx="200" cy="200" r="135" fill="none" stroke="#dfb76c" stroke-width="0.75" stroke-dasharray="2,4" opacity="0.5"/>
                <!-- Degree tick marks -->
                ${Array.from({length: 24}).map((_, i) => {
                    const angle = (i * 15) * Math.PI / 180;
                    const x1 = 200 + Math.cos(angle) * 165;
                    const y1 = 200 + Math.sin(angle) * 165;
                    const x2 = 200 + Math.cos(angle) * 180;
                    const y2 = 200 + Math.sin(angle) * 180;
                    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#dfb76c" stroke-width="1" opacity="0.5"/>`;
                }).join('')}
            </g>
            <g class="dial-spin-counter">
                <circle cx="200" cy="200" r="105" fill="none" stroke="#dfb76c" stroke-width="1.2" opacity="0.5"/>
                <circle cx="200" cy="200" r="75" fill="none" stroke="#dfb76c" stroke-width="1" stroke-dasharray="6,4" opacity="0.4"/>
                <circle cx="200" cy="200" r="45" fill="none" stroke="#dfb76c" stroke-width="1" opacity="0.6"/>
                <!-- Rolling Elements Cross-Section -->
                ${Array.from({length: 8}).map((_, i) => {
                    const angle = (i * 45) * Math.PI / 180;
                    const cx = 200 + Math.cos(angle) * 90;
                    const cy = 200 + Math.sin(angle) * 90;
                    return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="14" fill="none" stroke="#dfb76c" stroke-width="1" opacity="0.6"/>`;
                }).join('')}
                <!-- Center Precision Crosshairs -->
                <line x1="200" y1="20" x2="200" y2="380" stroke="#dfb76c" stroke-width="0.75" stroke-dasharray="4,8" opacity="0.3"/>
                <line x1="20" y1="200" x2="380" y2="200" stroke="#dfb76c" stroke-width="0.75" stroke-dasharray="4,8" opacity="0.3"/>
            </g>
        </svg>
    `;

    // Inject into Hero, Why Choose Us, or CTA banners if existing
    const heroSection = document.querySelector('.hero-slider-section');
    if (heroSection && !heroSection.querySelector('.blueprint-watermark')) {
        const bm = document.createElement('div');
        bm.className = 'blueprint-watermark blueprint-hero-top';
        bm.innerHTML = watermarkSvg;
        heroSection.appendChild(bm);
    }

    const whySection = document.querySelector('.why-choose-section, .why-us-section');
    if (whySection && !whySection.querySelector('.blueprint-watermark')) {
        const bm = document.createElement('div');
        bm.className = 'blueprint-watermark blueprint-why-bottom';
        bm.innerHTML = watermarkSvg;
        whySection.appendChild(bm);
    }

    const ctaBanner = document.querySelector('.cta-banner, .cta-section');
    if (ctaBanner && !ctaBanner.querySelector('.blueprint-watermark')) {
        const bm = document.createElement('div');
        bm.className = 'blueprint-watermark blueprint-cta';
        bm.innerHTML = watermarkSvg;
        ctaBanner.appendChild(bm);
    }

    /* ==========================================================================
       15. MAGNETIC BUTTON ATTRACTION PHYSICS
       ========================================================================== */
    if (isFinePointer) {
        const magneticBtns = document.querySelectorAll('.btn-gold, .btn-primary, .hero-slider-arrow, .scroll-gauge-btn');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                // Move button up to 5px toward cursor
                btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

});