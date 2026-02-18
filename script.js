document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Loader Animation
    const loader = document.querySelector('.loader-wrapper');
    const progressFill = document.querySelector('.progress-fill');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        progressFill.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                initHeroAnimations();
            }, 500);
        }
    }, 200);

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Hero Animations
    function initHeroAnimations() {
        const tl = gsap.timeline();

        tl.from('.hero-bg', {
            scale: 1.3,
            duration: 2.5,
            ease: 'power2.out'
        })
            .from('.reveal-text', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=1.5')
            .from('.nav-content > *', {
                y: -20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.8');
    }

    // 4. Scroll Reveal Animations
    const revealUps = document.querySelectorAll('.reveal-up');
    revealUps.forEach((elem) => {
        const delay = elem.style.getPropertyValue('--delay') || 0;

        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 60,
            opacity: 0,
            duration: 1,
            delay: delay * 0.2,
            ease: 'power3.out'
        });
    });

    // Right & Left Reveals
    const revealLeft = document.querySelectorAll('.reveal-left');
    revealLeft.forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%'
            },
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        });
    });

    const revealRight = document.querySelectorAll('.reveal-right');
    revealRight.forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%'
            },
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        });
    });

    // 5. Booking Form Handling
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerText = 'Success! We will contact you soon.';
                btn.style.background = '#22c55e';
                bookingForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 6. Mobile Menu Toggle (Simplified)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');

            // Animate links on open
            if (navLinks.classList.contains('active')) {
                gsap.fromTo('.nav-links li',
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2 }
                );
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // 7. Services Background Parallax
    gsap.fromTo('.services-section',
        { backgroundPosition: '50% 0%' },
        {
            backgroundPosition: '50% 20%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.services-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        }
    );

    // 8. Typing Effect (Vanilla JS Implementation)
    const typeWriterElement = document.getElementById('typewriter');
    if (typeWriterElement) {
        const texts = ["PREMIUM AUTO CARE SOLUTIONS", "EXPERT CAR DETAILING", "RELIABLE BATTERY SERVICE", "GENUINE AUTO ACCESSORIES"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'text-type__cursor';
        cursor.textContent = '|';
        typeWriterElement.parentElement.appendChild(cursor);

        // Blink cursor with GSAP
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.7,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });

        function typeEffect() {
            const currentText = texts[textIndex];
            let typeSpeed = 100;

            if (isDeleting) {
                typeWriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Deleting speed
            } else {
                typeWriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Typing speed
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before new text
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }
});
