// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');
const hero = document.getElementById('home');
const burger = document.getElementById('burger');
const navLinksContainer = document.getElementById('navLinks');

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe cards for animations
document.querySelectorAll('.team-card, .news-card, .recommendation-card').forEach(card => {
    observer.observe(card);
});

// Burger menu toggle with smooth animation
burger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    burger.classList.toggle('active');
});

// Enhanced navigation with smooth transitions
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const page = link.getAttribute('data-page');

        // If it's an external link (like documentation.html or news.html), let it navigate normally
        if (href && href !== '#') {
            return; // Allow normal navigation
        }

        e.preventDefault();

        // Add loading state
        document.body.style.opacity = '0.8';

        setTimeout(() => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Hide all sections and hero
            sections.forEach(s => s.classList.remove('active'));

            if (page === 'home') {
                hero.style.display = 'flex';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (page === 'documentation') {
                // Handle documentation section
                hero.style.display = 'none';
                document.getElementById('documentation').classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                hero.style.display = 'none';
                document.getElementById(page).classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Close mobile menu
            navLinksContainer.classList.remove('active');
            burger.classList.remove('active');

            // Remove loading state
            document.body.style.opacity = '1';
        }, 200);
    });
});

// Smooth scroll indicator with enhanced animation
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const firstSection = document.getElementById('team');
    firstSection.classList.add('active');
    hero.style.display = 'none';
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[data-page="team"]').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Enhanced card hover effects with touch support
const cards = document.querySelectorAll('.team-card, .doc-card, .news-card');
cards.forEach(card => {
    // Mouse events for desktop
    card.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(232, 220, 196, 0.2)';
        }
    });
    card.addEventListener('mouseleave', function() {
        if (window.innerWidth > 768) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        }
    });

    // Touch events for mobile
    card.addEventListener('touchstart', function(e) {
        if (window.innerWidth <= 768) {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }
    });
    card.addEventListener('touchend', function() {
        if (window.innerWidth <= 768) {
            this.style.transform = 'scale(1)';
        }
    });
});

// Prevent default on doc and news buttons with better UX
document.querySelectorAll('.doc-button, .read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Add visual feedback
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            alert('Fitur ini akan mengarah ke halaman detail dokumentasi/berita');
        }, 100);
    });
});

// Mobile menu close on outside click
document.addEventListener('click', (e) => {
    if (!navLinksContainer.contains(e.target) && !burger.contains(e.target) && navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        burger.classList.remove('active');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        burger.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Add scroll-based effects if needed
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Parallax effect for hero (subtle)
        if (hero.style.display !== 'none') {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }, 16); // ~60fps
});

// Random recommendations generator
function generateRandomRecommendations(currentMember, allMembers) {
    // Remove current member from the list
    const otherMembers = allMembers.filter(member => member.file !== currentMember);

    // Shuffle the array and pick 3 random members
    const shuffled = otherMembers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

// Member data for recommendations
const memberData = [
    {
        file: 'm_raihan_al_irsyad.html',
        name: 'M. Raihan Al Irsyad',
        role: 'Pencinta Buku & Literasi',
        description: 'Pecinta literatur dengan wawasan mendalam',
        image: 'm_raihan_al_irsyad.jpg'
    },
    {
        file: 'muhamad_rizki_firmansyah.html',
        name: 'Muhamad Rizki Firmansyah',
        role: 'Atlet & Olahragawan',
        description: 'Atlet berbakat dengan semangat juang tinggi',
        image: 'muhamad_rizki_firmansyah.jpg'
    },
    {
        file: 'rizkyan_dwi_fahrizah.html',
        name: 'Rizkyan Dwi Fahrizah',
        role: 'Designer Kreatif',
        description: 'Ahli desain dengan kreativitas luar biasa',
        image: 'rizkyan_dwi_fahrizah.jpg'
    },
    {
        file: 'muhammad_ariel_dwi_ardiansyah.html',
        name: 'Muhammad Ariel Dwi Ardiansyah',
        role: 'Programmer Handal',
        description: 'Developer berpengalaman dengan skill coding tinggi',
        image: 'muhammad_ariel_dwi_ardiansyah.jpg'
    },
    {
        file: 'mishbahul_ma_arif_al_jaly.html',
        name: 'Mishbahul Ma\'arif Al Jaly',
        role: 'Ahli Teknologi',
        description: 'Ekspert teknologi dengan inovasi terkini',
        image: 'mishbahul_ma_arif_al_jaly.jpg'
    },
    {
        file: 'muhammad_fathoni_firdaus.html',
        name: 'Muhammad Fathoni Firdaus',
        role: 'Pengembang Web',
        description: 'Spesialis pengembangan aplikasi web modern',
        image: 'muhammad_fathoni_firdaus.jpg'
    },
    {
        file: 'muhammad_andreas_athallah_saifa_anam.html',
        name: 'Muhammad Andreas Athallah Saifa Anam',
        role: 'Data Analyst',
        description: 'Analis data dengan kemampuan analitik tajam',
        image: 'muhammad_andreas_athallah_saifa_anam.jpg'
    },
    {
        file: 'rasya_aautar_ramadhani.html',
        name: 'Rasya Aautar Ramadhani',
        role: 'Digital Marketer',
        description: 'Strategis pemasaran digital yang inovatif',
        image: 'rasya_aautar_ramadhani.jpg'
    }
];

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure initial animations play
    document.querySelectorAll('.page-section.active .team-card, .page-section.active .news-card').forEach(card => {
        card.style.animationPlayState = 'running';
    });

    // Generate recommendations on page load for profile pages
    const recommendationsSection = document.querySelector('.recommendations-section');
    if (recommendationsSection) {
        // Get current page filename
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();

        // Generate random recommendations
        const recommendations = generateRandomRecommendations(currentFile, memberData);

        // Update the recommendations grid
        const recommendationsGrid = recommendationsSection.querySelector('.recommendations-grid');
        if (recommendationsGrid) {
            recommendationsGrid.innerHTML = recommendations.map(member => `
                <a href="${member.file}" class="recommendation-card">
                    <div class="recommendation-image">
                        <img src="../images/anggota/${member.image}" alt="${member.name}">
                    </div>
                    <div class="recommendation-content">
                        <h3>${member.name}</h3>
                        <div class="recommendation-role">${member.role}</div>
                        <p class="recommendation-description">${member.description}</p>
                    </div>
                </a>
            `).join('');
        }
    }
});
