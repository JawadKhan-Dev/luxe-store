/* ========================================
   LUXE STORE - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. LOADER
    // ============================================
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1800);
    });

    // ============================================
    // 2. STICKY HEADER ON SCROLL
    // ============================================
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });

    // ============================================
    // 3. MOBILE HAMBURGER MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => s.style.transition = 'all 0.3s ease');
        if (mobileMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans.forEach(s => {
                s.style.transform = '';
                s.style.opacity = '';
            });
        }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    // ============================================
    // 4. HERO SLIDER
    // ============================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let sliderInterval;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function startSlider() {
        sliderInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    document.getElementById('prevSlide').addEventListener('click', () => {
        clearInterval(sliderInterval);
        goToSlide(currentSlide - 1);
        startSlider();
    });

    document.getElementById('nextSlide').addEventListener('click', () => {
        clearInterval(sliderInterval);
        goToSlide(currentSlide + 1);
        startSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(sliderInterval);
            goToSlide(index);
            startSlider();
        });
    });

    startSlider();

    // ============================================
    // 5. SCROLL REVEAL ANIMATION
    // ============================================
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => revealObserver.observe(el));

    // ============================================
    // 6. PRODUCT FILTER TABS
    // ============================================
    const tabs = document.querySelectorAll('.tab');
    const productCards = document.querySelectorAll('.product-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;

            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.cat === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'scaleIn 0.3s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ============================================
    // 7. CART FUNCTIONALITY
    // ============================================
    let cartCount = 0;
    const cartCountEl = document.querySelector('.cart-count');

    document.querySelectorAll('.add-cart, .sales-add').forEach(btn => {
        btn.addEventListener('click', () => {
            cartCount++;
            cartCountEl.textContent = cartCount;

            // Animate cart icon
            cartCountEl.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCountEl.style.transform = 'scale(1)';
                cartCountEl.style.transition = 'transform 0.2s ease';
            }, 200);

            // Show toast notification
            showToast('Item added to cart! 🛒');
        });
    });

    // ============================================
    // 8. TOAST NOTIFICATION
    // ============================================
    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 32px;
            background: var(--gold);
            color: var(--black);
            padding: 14px 24px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 600;
            font-family: 'Montserrat', sans-serif;
            letter-spacing: 0.05em;
            z-index: 9999;
            animation: slideInToast 0.3s ease, slideOutToast 0.3s ease 2.5s forwards;
            box-shadow: 0 8px 24px rgba(201,168,76,0.4);
        `;

        // Add keyframes if not present
        if (!document.querySelector('#toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                @keyframes slideInToast {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutToast {
                    to { transform: translateX(100px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // ============================================
    // 9. STATS COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const step = target / 60;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current).toLocaleString();
                    if (el.closest('.stat-item').querySelector('p').textContent.includes('%')) {
                        el.textContent = Math.floor(current) + '%';
                    }
                }, 20);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ============================================
    // 10. TESTIMONIALS SLIDER
    // ============================================
    const track = document.getElementById('testimonialTrack');
    const cards = track.querySelectorAll('.testimonial-card');
    let testiIndex = 0;
    const cardsVisible = window.innerWidth < 768 ? 1 : 2;

    function updateTesti() {
        const maxIndex = cards.length - cardsVisible;
        if (testiIndex > maxIndex) testiIndex = 0;
        if (testiIndex < 0) testiIndex = maxIndex;
        const cardWidth = cards[0].offsetWidth + 24; // gap
        track.style.transform = `translateX(-${testiIndex * cardWidth}px)`;
    }

    document.getElementById('testiPrev').addEventListener('click', () => {
        testiIndex--;
        updateTesti();
    });

    document.getElementById('testiNext').addEventListener('click', () => {
        testiIndex++;
        updateTesti();
    });

    // Auto-rotate testimonials
    setInterval(() => {
        testiIndex++;
        updateTesti();
    }, 6000);

    // ============================================
    // 11. COUNTDOWN TIMERS
    // ============================================
    const countdowns = document.querySelectorAll('.countdown');

    countdowns.forEach(cd => {
        const targetDate = new Date(cd.dataset.date).getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                cd.innerHTML = '<span style="color:var(--gold)">Available Now!</span>';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            cd.querySelector('.days').textContent = String(days).padStart(2, '0');
            cd.querySelector('.hours').textContent = String(hours).padStart(2, '0');
            cd.querySelector('.mins').textContent = String(mins).padStart(2, '0');
            cd.querySelector('.secs').textContent = String(secs).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    });

    // ============================================
    // 12. BACK TO TOP
    // ============================================
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // 13. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});