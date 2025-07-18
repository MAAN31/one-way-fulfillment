// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    
    // Mobile Navigation Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".site-nav ul");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function() {
            navMenu.classList.toggle("active");
            
            // Toggle hamburger animation
            menuToggle.classList.toggle("active");
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            }
        });
    }

    // Hero Slider Functionality
    const sliderDots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");
    let currentSlide = 0;

    if (sliderDots.length > 0) {
        // Dot click functionality
        sliderDots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                setActiveSlide(index);
            });
        });

        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentSlide = currentSlide === 0 ? sliderDots.length - 1 : currentSlide - 1;
                setActiveSlide(currentSlide);
            });
        }

        // Next button
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentSlide = currentSlide === sliderDots.length - 1 ? 0 : currentSlide + 1;
                setActiveSlide(currentSlide);
            });
        }

        // Auto-slide functionality (optional)
        setInterval(() => {
            currentSlide = currentSlide === sliderDots.length - 1 ? 0 : currentSlide + 1;
            setActiveSlide(currentSlide);
        }, 5000); // Change slide every 5 seconds
    }

    function setActiveSlide(index) {
        sliderDots.forEach(dot => dot.classList.remove("active"));
        if (sliderDots[index]) {
            sliderDots[index].classList.add("active");
        }
        currentSlide = index;
    }

    // Form Validation for Quote and Contact Forms
    const forms = document.querySelectorAll("form");
    
    forms.forEach(form => {
        form.addEventListener("submit", function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
    });

    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll("[required]");
        
        // Clear previous error messages
        const errorMessages = form.querySelectorAll(".error-message");
        errorMessages.forEach(msg => msg.remove());

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, "This field is required");
                isValid = false;
            } else if (field.type === "email" && !isValidEmail(field.value)) {
                showError(field, "Please enter a valid email address");
                isValid = false;
            } else if (field.type === "tel" && !isValidPhone(field.value)) {
                showError(field, "Please enter a valid phone number");
                isValid = false;
            }
        });

        return isValid;
    }

    function showError(field, message) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent = message;
        errorDiv.style.color = "#dc3545";
        errorDiv.style.fontSize = "14px";
        errorDiv.style.marginTop = "5px";
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = "#dc3545";
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        img.addEventListener("load", function() {
            this.style.opacity = "1";
        });
        
        img.addEventListener("error", function() {
            this.alt = "Image could not be loaded";
            this.style.backgroundColor = "#f8f9fa";
            this.style.border = "1px solid #dee2e6";
        });
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(".about, .mission, .cta-section");
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Error handling wrapper
    function safeExecute(fn) {
        try {
            fn();
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    // Initialize all functionality safely
    safeExecute(() => {
        console.log("ONE WAY FULFILLMENT website loaded successfully");
    });
});

// Handle window resize events
window.addEventListener("resize", function() {
    const navMenu = document.querySelector(".site-nav ul");
    const menuToggle = document.getElementById("menu-toggle");
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove("active");
        if (menuToggle) menuToggle.classList.remove("active");
    }
});
