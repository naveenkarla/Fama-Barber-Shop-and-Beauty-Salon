document.addEventListener('DOMContentLoaded', () => {

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => { // Optional delay for smoother transition
                preloader.classList.add('loaded');
            }, 500); // Adjust delay as needed, or remove timeout for instant hide
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header .nav-links a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile nav if open
                const mainNav = document.querySelector('header .nav-links');
                const header = document.querySelector('header');
                if (mainNav.classList.contains('nav-open')) {
                    mainNav.classList.remove('nav-open');
                    header.classList.remove('nav-open'); 
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    const headerScrollThreshold = 50; // Pixels to scroll before changing header
    window.addEventListener('scroll', () => {
        if (window.scrollY > headerScrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('header .nav-links');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
            document.querySelector('header').classList.toggle('nav-open'); // For hamburger icon state
        });
    }

    // Hero section carousel
    const heroSlides = document.querySelectorAll('#hero .hero-slide');
    let currentHeroSlide = 0;
    if (heroSlides.length > 1) {
        function showNextHeroSlide() {
            heroSlides[currentHeroSlide].classList.remove('active');
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            heroSlides[currentHeroSlide].classList.add('active');
        }
        setInterval(showNextHeroSlide, 5000); // Change slide every 5 seconds
    }


    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.testimonial-nav .prev');
    const nextButton = document.querySelector('.testimonial-nav .next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            // For scroll animations on testimonials, re-trigger if needed or handle differently
            // card.classList.remove('is-visible'); 
        });
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
            // Trigger scroll animation class if it was removed
            // setTimeout(() => testimonialCards[index].classList.add('is-visible'), 50); 
        }
    }

    if (testimonialCards.length > 0) {
        showTestimonial(currentTestimonial); 

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
                showTestimonial(currentTestimonial);
            });
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                showTestimonial(currentTestimonial);
            });
        }
    }


    // Scroll Animations with Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, obs) => { // Added obs to unobserve
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                obs.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // Update copyright year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;
            const currentlyActive = header.classList.contains('active'); // Check if the clicked one is already active

            // --- UNCOMMENT THIS BLOCK ---
            // Close other accordions
            accordionHeaders.forEach(h => {
                // If this header (h) is NOT the one we just clicked
                if (h !== header) {
                    // Remove its active class
                    h.classList.remove('active');
                    // Set its aria-expanded attribute to false
                    h.setAttribute('aria-expanded', 'false');
                    // The grid-template-rows will automatically handle collapsing via CSS
                }
            });
            // --- END OF UNCOMMENTED BLOCK ---

            // Toggle the clicked accordion
            // If it wasn't active before, this will make it active.
            // If it WAS active before, this will make it inactive (closing it).
            header.classList.toggle('active');
            header.setAttribute('aria-expanded', header.classList.contains('active')); // Directly set based on current state

            // No style manipulation needed here, CSS handles the visual change based on the 'active' class
        });
    });
    // Scroll to Top Button Functionality (NEW)
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after 300px scroll
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        // Smooth scroll to top on click is handled by the href="#hero" and html scroll-behavior
    }
});
