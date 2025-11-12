document.addEventListener('DOMContentLoaded', () => {

    /* =======================================
    1. Intersection Observers for Animations
    ======================================= */

    const animatedElements = document.querySelectorAll('.fade-in, .project-card');

    const appearOptions = { 
        threshold: 0.2, 
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, appearOptions);

    animatedElements.forEach(element => appearOnScroll.observe(element));


    /* =======================================
    2. Animate Skill Progress Bars
    ======================================= */

    const skills = document.querySelectorAll('.progress div[data-width]');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.getAttribute('data-width');
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 }); 

    skills.forEach(skill => skillObserver.observe(skill));


    /* =======================================
    3. Back to Top Button Logic
    ======================================= */

    const topBtn = document.getElementById('topBtn');
    const scrollThreshold = 400;

    function toggleTopButton() {
        if (window.scrollY > scrollThreshold) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', toggleTopButton);

    topBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* =======================================
    4. Typing Animation for Header
    ======================================= */

    // This text was updated in a previous step
    const textToType = "Computer Engineering Student | Specializing in Data Science, Data Analytics, and Full Stack Java Development";
    const typingElement = document.querySelector('.typing');
    const typingSpeed = 60; 

    function startTyping(element, text, speed) {
        let charIndex = 0;
        const timer = setInterval(() => {
            if (charIndex < text.length) {
                element.innerHTML += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(timer); 
            }
        }, speed);
    }

    const heroObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTyping(typingElement, textToType, typingSpeed);
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.5 }); 

    heroObserver.observe(document.querySelector('#hero')); 


    /* =======================================
    5. Smooth Scroll for Nav Links & Mobile Menu Close
    ======================================= */
    
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger-menu');

    // Toggle logic for the mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // for the 'X' animation
    });

    // Handle smooth scroll AND closing the mobile menu
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });

            // Close menu after clicking a link on mobile
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    /* =======================================
    6. Footer Year Update
    ======================================= */
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});