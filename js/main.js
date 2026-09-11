// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-M8JDYB1PP3');

// --- Global Functions (Required by inline HTML onclick attributes) ---
window.toggleContent = function(btn) {
    const content = btn.previousElementSibling;
    if(content) {
        content.classList.toggle("hidden");
        const isHidden = content.classList.contains("hidden");
        btn.innerHTML = isHidden ? 'Read More <i class="fas fa-chevron-down ml-1"></i>' : 'Read Less <i class="fas fa-chevron-up ml-1"></i>';
    }
};

window.goToSlide = function(carousel, index) {
    if(!carousel) return;
    const slides = carousel.querySelector('.slides');
    const imgs = slides.querySelectorAll('img');
    const dots = carousel.querySelectorAll('.dots span');
    if(!slides || !imgs.length) return;
    if (index < 0) index = imgs.length - 1;
    if (index >= imgs.length) index = 0;
    carousel.dataset.current = index;
    slides.style.transform = `translateX(-${index * 100}%)`;
    if(dots) {
        dots.forEach((d, i) => {
            if(i === index) d.classList.add('active');
            else d.classList.remove('active');
        });
    }
};

window.slideCarousel = function(elem, dir) {
    if(!elem) return;
    // elem might be the button or the carousel itself (for touch swipe)
    const carousel = elem.closest ? elem.closest('[data-carousel]') : elem;
    if(!carousel) return;
    const current = parseInt(carousel.dataset.current || 0);
    window.goToSlide(carousel, current + dir);
};

    // --- 1. Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        document.querySelectorAll('.mobile-menu-link').forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- 2. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                try {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } catch (err) {
                    // Ignore invalid selector errors for generic # links
                    console.warn("Invalid smooth scroll target:", href);
                }
            }
        });
    });

    // --- 3. Counter Animation ---
    const counterElement = document.querySelector('.counter'); 
    if (counterElement) {
        const statsSection = counterElement.closest('section') || counterElement;
        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target') || 0);
                if (target === 0) return;
                const increment = target / 100;
                let current = 0;
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
            });
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        
        observer.observe(statsSection);
    }

    // --- 4. Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('[name="name"]').value;
            const phone = this.querySelector('[name="phone"]').value;
            const email = this.querySelector('[name="email"]').value;
            const subject = this.querySelector('[name="subject"]').value;
            const message = this.querySelector('[name="message"]').value;
            
            const whatsappText = "*New Contact Form Inquiry*\n\n*Name:* " + name + "\n*Phone:* " + phone + "\n*Email:* " + email + "\n*Subject:* " + subject + "\n*Message:* " + message;
            const encodedText = encodeURIComponent(whatsappText);
            window.open("https://wa.me/919118033485?text=" + encodedText, '_blank');
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check mr-2"></i>Redirecting...';
            button.classList.add('bg-green-600');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-green-600');
                this.reset();
            }, 3000);
        });
    }

    // --- 5. FAQ Toggle ---
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            if(!answer) return;
            const icon = question.querySelector('i.fa-chevron-down, i.fa-chevron-up');
            
            if (answer) {
                answer.classList.toggle('hidden');
            }
            
            if (icon) {
                if (answer && answer.classList.contains('hidden')) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            }
        });
    });

    // --- 6. Generic Horizontal Slider ---
    window.initHorizontalSlider = function(sliderId, trackId, dotsId, itemCount) {
        const slider = document.getElementById(sliderId);
        const track = document.getElementById(trackId);
        const dots = document.getElementById(dotsId);
        
        if (!slider || !track || !dots) return;
        
        let currentIndex = 0;
        let autoScrollInterval;
        let slidesPerView = 1;
        
        function updateSlider() {
            if (window.innerWidth >= 1024) {
                slidesPerView = itemCount === 4 ? 4 : itemCount === 3 ? 3 : 2;
            } else if (window.innerWidth >= 768) {
                slidesPerView = 2;
            } else {
                slidesPerView = 1;
            }
            const slideWidth = 100 / slidesPerView;
            track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
            
            const dotButtons = dots.querySelectorAll('button');
            dotButtons.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-cricket-green');
                } else {
                    dot.classList.remove('bg-cricket-green');
                    dot.classList.add('bg-gray-300');
                }
            });
        }
        
        function nextSlide() {
            const maxIndex = itemCount - slidesPerView;
            if (currentIndex + 1 <= maxIndex) {
                currentIndex += 1;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }
        
        function startAutoScroll() {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(nextSlide, 3000);
        }
        
        const dotButtons = dots.querySelectorAll('button');
        dotButtons.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                startAutoScroll();
            });
        });
        
        window.addEventListener('resize', () => {
            updateSlider();
            startAutoScroll();
        });
        
        updateSlider();
        startAutoScroll();
    }
    
    // Initialize common horizontal sliders if they exist
    initHorizontalSlider('values-slider', 'values-track', 'values-dots', 4);
    initHorizontalSlider('team-slider', 'team-track', 'team-dots', 3);
    initHorizontalSlider('why-choose-slider', 'why-choose-track', 'why-choose-dots', 6);
    initHorizontalSlider('stats-slider', 'stats-track', 'stats-dots', 4);
    initHorizontalSlider('contact-slider', 'contact-track', 'contact-dots', 4);

    // --- 7. Product Page Image Carousels ---
    if(document.querySelector('[data-carousel]')) {
        document.querySelectorAll('[data-carousel]').forEach(carousel => {
            const slides = carousel.querySelector('.slides');
            if(!slides) return;
            const imgs = slides.querySelectorAll('img');
            const dotsContainer = carousel.querySelector('.dots');
            carousel.dataset.current = '0';
            
            if(dotsContainer) {
                dotsContainer.innerHTML = '';
                imgs.forEach((_, i) => {
                    const dot = document.createElement('span');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => window.goToSlide(carousel, i));
                    dotsContainer.appendChild(dot);
                });
            }
            
            const prevBtn = carousel.querySelector('.prev');
            const nextBtn = carousel.querySelector('.next');
            
            if (imgs.length <= 1) {
                if(prevBtn) prevBtn.style.display = 'none';
                if(nextBtn) nextBtn.style.display = 'none';
                if(dotsContainer) dotsContainer.style.display = 'none';
            } else {
                if(prevBtn) prevBtn.style.display = '';
                if(nextBtn) nextBtn.style.display = '';
                if(dotsContainer) dotsContainer.style.display = '';
            }
            
            // Removed duplicate event listeners since HTML uses inline onclick="slideCarousel(...)"
            
            let startX = 0;
            carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
            carousel.addEventListener('touchend', e => {
                const diff = startX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 40) {
                    window.slideCarousel(carousel.querySelector('.next') || carousel, diff > 0 ? 1 : -1);
                }
            }, {passive:true});
        });
    }

    // --- 8. Index Page Specific Sliders ---
    if (document.querySelector('.hero-slide')) {
        let currentHeroSlide = 0;
        const heroSlides = document.querySelectorAll('.hero-slide');
        const heroDots = document.querySelectorAll('.hero-dot');
        
        function showHeroSlide(index) {
            heroSlides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                    slide.style.opacity = '1';
                    slide.style.zIndex = '1';
                } else {
                    slide.classList.remove('active');
                    slide.style.opacity = '0';
                    slide.style.zIndex = '0';
                }
            });
            heroDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                    dot.style.backgroundColor = '#FFD700';
                } else {
                    dot.classList.remove('active');
                    dot.style.backgroundColor = 'white';
                }
            });
        }
        function nextHeroSlide() {
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            showHeroSlide(currentHeroSlide);
        }
        setInterval(nextHeroSlide, 4000);
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentHeroSlide = index;
                showHeroSlide(currentHeroSlide);
            });
        });
    }

    if (document.querySelector('.ambassador-track')) {
        let currentAmbassadorIndex = 0;
        const ambassadorTrack = document.querySelector('.ambassador-track');
        const ambassadorDots = document.querySelectorAll('.ambassador-dot');
        const totalAmbassadors = 8;
        let slidesPerView = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
        
        function updateAmbassadorSlider() {
            const slideWidth = 100 / slidesPerView;
            ambassadorTrack.style.transform = `translateX(-${currentAmbassadorIndex * slideWidth}%)`;
            ambassadorDots.forEach((dot, i) => {
                if (i === currentAmbassadorIndex) {
                    dot.classList.add('active');
                    dot.style.opacity = '1';
                } else {
                    dot.classList.remove('active');
                    dot.style.opacity = '0.5';
                }
            });
        }
        function nextAmbassadorSlide() {
            const maxIndex = totalAmbassadors - slidesPerView;
            currentAmbassadorIndex = (currentAmbassadorIndex + 1) > maxIndex ? 0 : currentAmbassadorIndex + 1;
            updateAmbassadorSlider();
        }
        setInterval(nextAmbassadorSlide, 3000);
        ambassadorDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentAmbassadorIndex = index;
                updateAmbassadorSlider();
            });
        });
        window.addEventListener('resize', () => {
            slidesPerView = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
            updateAmbassadorSlider();
        });
    }

    if (document.querySelector('.tournament-track')) {
        let currentTournamentIndex = 0;
        const tournamentTrack = document.querySelector('.tournament-track');
        const tournamentDots = document.querySelectorAll('.tournament-dot');
        const totalTournaments = 5;
        let tournamentSlidesPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        
        function updateTournamentSlider() {
            const slideWidth = 100 / tournamentSlidesPerView;
            tournamentTrack.style.transform = `translateX(-${currentTournamentIndex * slideWidth}%)`;
            tournamentDots.forEach((dot, i) => {
                if (i === currentTournamentIndex) {
                    dot.classList.add('active');
                    dot.style.opacity = '1';
                } else {
                    dot.classList.remove('active');
                    dot.style.opacity = '0.5';
                }
            });
        }
        function nextTournamentSlide() {
            const maxIndex = totalTournaments - tournamentSlidesPerView;
            currentTournamentIndex = (currentTournamentIndex + 1) > maxIndex ? 0 : currentTournamentIndex + 1;
            updateTournamentSlider();
        }
        setInterval(nextTournamentSlide, 3500);
        tournamentDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTournamentIndex = index;
                updateTournamentSlider();
            });
        });
        window.addEventListener('resize', () => {
            tournamentSlidesPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            updateTournamentSlider();
        });
    }

    function initIndexSlider(trackSelector, dotSelector, totalItems, desktopSlides, tabletSlides, intervalTime) {
        if (!document.querySelector(trackSelector)) return;
        let currentIndex = 0;
        const track = document.querySelector(trackSelector);
        const dots = document.querySelectorAll(dotSelector);
        let slidesPerView = window.innerWidth >= 1024 ? desktopSlides : window.innerWidth >= 768 ? tabletSlides : 1;
        
        function updateSlider() {
            const slideWidth = 100 / slidesPerView;
            track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
            dots.forEach((dot, i) => {
                dot.style.opacity = i === currentIndex ? '1' : '0.5';
            });
        }
        function nextSlide() {
            const maxIndex = totalItems - slidesPerView;
            currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
            updateSlider();
        }
        setInterval(nextSlide, intervalTime);
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        window.addEventListener('resize', () => {
            slidesPerView = window.innerWidth >= 1024 ? desktopSlides : window.innerWidth >= 768 ? tabletSlides : 1;
            updateSlider();
        });
    }

    initIndexSlider('.features-track', '.feature-dot', 4, 4, 2, 3000);
    initIndexSlider('.stats-track', '.stat-dot', 4, 4, 2, 3200);
    initIndexSlider('.testimonial-track', '.testimonial-dot', 6, 3, 2, 3400);
    initIndexSlider('.brand-partner-track', '.brand-partner-dot', 6, 6, 3, 2800);
    initIndexSlider('.event-gallery-track', '.event-gallery-dot', 4, 4, 2, 3600);

    // --- 9. Transition Styles Injection ---
    const style = document.createElement('style');
    style.textContent = `
        .hero-slide { transition: opacity 1s ease-in-out; }
        .hero-dot.active { background-color: #FFD700 !important; }
        .ambassador-dot.active, .tournament-dot.active, .feature-dot.active, .stat-dot.active, .testimonial-dot.active, .brand-partner-dot.active, .event-gallery-dot.active { opacity: 1 !important; }
    `;
    document.head.appendChild(style);
