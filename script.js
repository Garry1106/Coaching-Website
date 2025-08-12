document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".team-carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const carouselWrapper = document.querySelector(".team-carousel-wrapper");

    if (!carousel) return; // Exit if the carousel isn't on the page

    const firstMember = carousel.querySelector(".team-member");
    const memberStyle = window.getComputedStyle(firstMember);
    const memberMarginRight = parseFloat(memberStyle.marginRight); // For gap compatibility
    const scrollAmount = firstMember.offsetWidth + memberMarginRight;

    let autoSlideInterval;

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            // Check if we are at the end of the carousel
            // scrollWidth is the total width of content, clientWidth is the visible width
            if (carousel.scrollLeft + carousel.clientWidth + 1 >= carousel.scrollWidth) {
                // If at the end, scroll back to the beginning
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Otherwise, scroll to the next item
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 5000); // Slide every 5 seconds
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Click event for the next button
    nextBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Click event for the previous button
    prevBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    // Pause auto-slide on hover
    carouselWrapper.addEventListener("mouseenter", stopAutoSlide);
    // Resume auto-slide when mouse leaves
    carouselWrapper.addEventListener("mouseleave", startAutoSlide);

    // Start the auto-sliding initially
    startAutoSlide();
});
// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

// Add `data-scroll-to` functionality for nav links
const navLinks = document.querySelectorAll('.nav-link[data-scroll-to]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
    });
});

// Update the URL hash when a section is scrolled into view (optional)
scroll.on('call', (func, obj) => {
    if (func === 'updateHash' && obj.isIntersecting) {
        window.location.hash = '#' + obj.target.id;
    }
}, { passive: true });

// Add "scrolled" class to navbar and show back-to-top button
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
scroll.on('scroll', (instance) => {
    if (instance.scroll.y > 50) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Start animation a bit before the element is fully in view
});

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle
document.getElementById('mobile-toggle').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('active');
});

// Initialize Locomotive Scroll
(function () {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.1,
        tablet: {
            smooth: true
        },
        smartphone: {
            smooth: true
        }
    });

    // Function to handle navbar and back-to-top button visibility
    function handleScroll() {
        const navbar = document.getElementById('navbar');
        const backToTopBtn = document.getElementById('back-to-top');
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollPosition > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Call handleScroll on initial load and whenever the page is scrolled
    window.addEventListener('load', handleScroll);
    document.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth scroll for internal links using Locomotive Scroll
    document.querySelectorAll('a[data-scroll-to]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navMenu.classList.remove('active');
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                scroll.scrollTo(targetElement);
            }
        });
    });

    // Function for fade-in animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });


    // Team Carousel functionality
    const carousel = document.querySelector('.team-carousel');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');
    const teamMembers = document.querySelectorAll('.team-member');
    let currentIndex = 0;

    function updateCarousel() {
        const memberWidth = teamMembers[0].getBoundingClientRect().width;
        const offset = -currentIndex * (memberWidth + 32); // 32px is the gap
        carousel.style.transform = `translateX(${offset}px)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : teamMembers.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < teamMembers.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Ensure carousel updates on window resize
    window.addEventListener('resize', updateCarousel);
    updateCarousel(); // Initial call to set correct position

})();

