// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Initialize World Map
function initWorldMap() {
    // Create a simple map for demo purposes
    // In a real implementation, you would use Leaflet.js with proper map data
    
    const mapContainer = document.getElementById('world-map');
    
    // Create interactive country spots
    const countries = [
        { name: "Vietnam", x: 75, y: 45, families: 12 },
        { name: "Japan", x: 85, y: 35, families: 8 },
        { name: "Italy", x: 50, y: 38, families: 10 },
        { name: "Mexico", x: 20, y: 40, families: 7 },
        { name: "Kenya", x: 60, y: 55, families: 5 },
        { name: "USA", x: 15, y: 35, families: 15 },
        { name: "France", x: 48, y: 37, families: 9 }
    ];
    
    // Create a simple SVG map representation
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 100 100");
    
    // Add background
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("width", "100");
    rect.setAttribute("height", "100");
    rect.setAttribute("fill", "#e8f4f8");
    svg.appendChild(rect);
    
    // Add continent shapes (simplified)
    const continents = [
        { d: "M10,40 L30,45 L35,30 L25,20 L15,25 L10,40", name: "North America", fill: "#d1e3ff" },
        { d: "M20,50 L40,55 L45,65 L30,70 L20,60 L20,50", name: "South America", fill: "#d1e3ff" },
        { d: "M45,35 L65,30 L70,45 L60,55 L50,50 L45,35", name: "Europe", fill: "#c8e6c9" },
        { d: "M70,30 L85,35 L90,50 L80,60 L70,55 L65,40 L70,30", name: "Asia", fill: "#ffecb3" },
        { d: "M50,60 L65,65 L60,80 L45,75 L40,65 L50,60", name: "Africa", fill: "#ffcdd2" },
        { d: "M75,70 L90,75 L85,90 L70,85 L75,70", name: "Australia", fill: "#e1bee7" }
    ];
    
    continents.forEach(continent => {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", continent.d);
        path.setAttribute("fill", continent.fill);
        path.setAttribute("stroke", "#fff");
        path.setAttribute("stroke-width", "0.5");
        path.setAttribute("class", "continent");
        svg.appendChild(path);
    });
    
    // Add country points
    countries.forEach(country => {
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", country.x);
        circle.setAttribute("cy", country.y);
        circle.setAttribute("r", "1.5");
        circle.setAttribute("fill", "#4A90E2");
        circle.setAttribute("stroke", "#fff");
        circle.setAttribute("stroke-width", "0.3");
        circle.setAttribute("class", "country-point");
        circle.setAttribute("data-country", country.name);
        circle.setAttribute("data-families", country.families);
        
        // Add hover effect
        circle.addEventListener('mouseenter', function() {
            this.setAttribute("r", "2");
            this.setAttribute("fill", "#F5A623");
            
            // Show tooltip
            const tooltip = document.createElementNS(svgNS, "text");
            tooltip.setAttribute("x", parseFloat(this.getAttribute("cx")) + 2);
            tooltip.setAttribute("y", parseFloat(this.getAttribute("cy")) - 2);
            tooltip.setAttribute("font-size", "2");
            tooltip.setAttribute("fill", "#2C3E50");
            tooltip.setAttribute("font-weight", "bold");
            tooltip.textContent = country.name;
            tooltip.setAttribute("id", "tooltip");
            svg.appendChild(tooltip);
        });
        
        circle.addEventListener('mouseleave', function() {
            this.setAttribute("r", "1.5");
            this.setAttribute("fill", "#4A90E2");
            
            // Remove tooltip
            const tooltip = document.getElementById("tooltip");
            if (tooltip) {
                svg.removeChild(tooltip);
            }
        });
        
        circle.addEventListener('click', function() {
            alert(`Khám phá ${country.families} gia đình từ ${country.name}!`);
        });
        
        svg.appendChild(circle);
    });
    
    // Add map title
    const title = document.createElementNS(svgNS, "text");
    title.setAttribute("x", "50");
    title.setAttribute("y", "10");
    title.setAttribute("text-anchor", "middle");
    title.setAttribute("font-size", "4");
    title.setAttribute("fill", "#2C3E50");
    title.setAttribute("font-weight", "bold");
    title.textContent = "Bản đồ Gia đình Toàn cầu";
    svg.appendChild(title);
    
    mapContainer.appendChild(svg);
}

// Language Switcher
const languageSelect = document.getElementById('language-select');
languageSelect.addEventListener('change', function() {
    const selectedLang = this.value;
    // In a real implementation, this would load translations
    alert(`Ngôn ngữ đã chuyển sang: ${this.options[this.selectedIndex].text}`);
    // You would typically make an API call or load a JSON translation file here
});

// Form Submission
const storyForm = document.querySelector('.story-form');
if (storyForm) {
    storyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const familyName = this.querySelector('input[type="text"]').value;
        const country = this.querySelector('select').value;
        const story = this.querySelector('textarea').value;
        const email = this.querySelector('input[type="email"]').value;
        
        // Validate
        if (!familyName || !country || !story) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        
        // In a real app, you would send this data to a server
        // For demo, we'll just show a success message
        alert(`Cảm ơn gia đình ${familyName} đã chia sẻ câu chuyện! Chúng tôi sẽ liên hệ qua email ${email} trong thời gian sớm nhất.`);
        
        // Reset form
        this.reset();
        
        // Update family count
        const familyCount = document.getElementById('family-count');
        if (familyCount) {
            const currentCount = parseInt(familyCount.textContent);
            familyCount.textContent = currentCount + 1;
        }
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            alert('Vui lòng nhập địa chỉ email!');
            return;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Vui lòng nhập địa chỉ email hợp lệ!');
            return;
        }
        
        alert(`Cảm ơn bạn đã đăng ký nhận bản tin với email: ${email}`);
        this.reset();
    });
}

// Event Participation
document.querySelectorAll('.btn-event').forEach(button => {
    button.addEventListener('click', function() {
        const eventTitle = this.closest('.event-card').querySelector('h3').textContent;
        alert(`Bạn đã đăng ký tham gia sự kiện: "${eventTitle}". Thông tin chi tiết sẽ được gửi qua email.`);
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initWorldMap();
    
    // Update counts with animation
    const familyCount = document.getElementById('family-count');
    const countryCount = document.getElementById('country-count');
    
    if (familyCount && countryCount) {
        // Simple counting animation
        let count = 0;
        const targetCount = 127;
        const speed = 50; // ms per increment
        
        const counter = setInterval(() => {
            count++;
            familyCount.textContent = count;
            
            if (count >= targetCount) {
                clearInterval(counter);
            }
        }, speed);
        
        // Set country count
        countryCount.textContent = "42";
    }
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Simple language translation example
const translations = {
    vi: {
        heroTitle: "Gia Đình Toàn Cầu",
        heroSubtitle: "Kết nối những trái tim, xóa nhòa mọi khoảng cách"
    },
    en: {
        heroTitle: "Global Family",
        heroSubtitle: "Connecting hearts, bridging distances"
    },
    es: {
        heroTitle: "Familia Global",
        heroSubtitle: "Conectando corazones, acortando distancias"
    },
    fr: {
        heroTitle: "Famille Mondiale",
        heroSubtitle: "Connecter les cœurs, combler les distances"
    }
};

// In a real implementation, you would have a more comprehensive translation system