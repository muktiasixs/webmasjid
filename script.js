// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================
    // Mobile Menu Toggle
    // ========================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ========================
    // Display Current Date
    // ========================
    function displayCurrentDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const today = new Date();
            const formattedDate = today.toLocaleDateString('id-ID', options);
            dateElement.textContent = formattedDate;
        }
    }
    
    displayCurrentDate();
    
    // ========================
    // Navbar Scroll Effect
    // ========================
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.06)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================
    // Smooth Scroll for Anchor Links
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================
    // Intersection Observer for Animations
    // ========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.event-card, .feature-item, .info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========================
    // Donation Button Handler
    // ========================
    const donationButton = document.querySelector('.btn-primary');
    if (donationButton) {
        donationButton.addEventListener('click', function() {
            alert('Terima kasih atas niat Anda untuk berdonasi! Silakan transfer ke rekening yang tertera atau hubungi pengurus masjid untuk informasi lebih lanjut.');
        });
    }
    
    // ========================
    // Animate Progress Bars on Scroll
    // ========================
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const donationStats = document.querySelector('.donation-stats');
    if (donationStats) {
        progressObserver.observe(donationStats);
    }
    
    // ========================
    // Prayer Times Update (Optional)
    // ========================
    // You can integrate with a real prayer times API here
    // Example: Using Aladhan API or similar
    
    function updatePrayerTimes() {
        // This is a placeholder. In production, you would fetch from an API
        // based on the user's location or masjid's coordinates
        
        // Example API call (commented out):
        /*
        fetch('https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=2')
            .then(response => response.json())
            .then(data => {
                const timings = data.data.timings;
                document.querySelector('.prayer-item:nth-child(1) .prayer-time').textContent = timings.Fajr;
                document.querySelector('.prayer-item:nth-child(3) .prayer-time').textContent = timings.Dhuhr;
                document.querySelector('.prayer-item:nth-child(5) .prayer-time').textContent = timings.Asr;
                document.querySelector('.prayer-item:nth-child(7) .prayer-time').textContent = timings.Maghrib;
                document.querySelector('.prayer-item:nth-child(9) .prayer-time').textContent = timings.Isha;
            })
            .catch(error => console.log('Error fetching prayer times:', error));
        */
    }
    
    // Uncomment to enable automatic prayer times updates
    // updatePrayerTimes();
    // setInterval(updatePrayerTimes, 3600000); // Update every hour
    
    // ========================
    // Active Navigation Highlighting
    // ========================
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - navbar.offsetHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.style.backgroundColor = '';
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.backgroundColor = 'var(--primary-100)';
                link.style.color = 'var(--primary-700)';
            }
        });
    });
    
    // ========================
    // Add Islamic Pattern Background
    // ========================
    function addIslamicPattern() {
        const sections = document.querySelectorAll('.about, .events');
        sections.forEach(section => {
            section.style.backgroundImage = "url('imgs/islamic_pattern_5.jpg')";
            section.style.backgroundSize = '400px 400px';
            section.style.backgroundRepeat = 'repeat';
            section.style.backgroundBlendMode = 'overlay';
            section.style.backgroundAttachment = 'fixed';
        });
    }
    
    // Add subtle pattern to backgrounds
    addIslamicPattern();
    
    // ========================
    // Lazy Loading Images
    // ========================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========================
    // Console Welcome Message
    // ========================
    console.log('%c🕌 Masjid Al-Noor Website', 'font-size: 20px; font-weight: bold; color: #004D40;');
    console.log('%cSelamat datang! Semoga website ini bermanfaat untuk jamaah.', 'font-size: 14px; color: #00796B;');
    console.log('%cDibuat dengan ❤️ oleh MiniMax Agent', 'font-size: 12px; color: #78909C;');
});

// ========================
// Service Worker Registration (Optional for PWA)
// ========================
if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA functionality
    /*
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
    */
}
