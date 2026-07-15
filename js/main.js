// Immediately load stored theme to avoid visual flicker (FOUC)
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Main UI Interactions and Search Submissions
document.addEventListener('DOMContentLoaded', () => {
    // Force logo styling to prevent flex gaps or caching space issues
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.style.display = 'inline-block';
        logoLink.style.gap = '0';
    }

    // --- Sticky Header Effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger animation style
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on click of nav-link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // --- Search Widget Tab Switching ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.pane');

    if (tabButtons && panes) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetPaneId = button.getAttribute('data-tab');
                
                // Set active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Set active pane
                panes.forEach(pane => {
                    if (pane.id === targetPaneId) {
                        pane.classList.add('active');
                    } else {
                        pane.classList.remove('active');
                    }
                });
            });
        });
    }

    // --- Widget Redirect Redirection Logic ---
    const flightForm = document.getElementById('flight-form');
    const hotelForm = document.getElementById('hotel-form');
    const transferForm = document.getElementById('transfer-form');

    if (flightForm) {
        flightForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const from = document.getElementById('flight-from').value || 'Istanbul';
            const to = document.getElementById('flight-to').value;
            const date = document.getElementById('flight-date').value;
            const returnDate = document.getElementById('flight-return-date').value;
            
            if (!to) {
                alert('Lütfen bir varış noktası seçiniz veya yazınız.');
                return;
            }

            // Route to booking flight search or a fallback search
            const bookingFlightUrl = `https://www.booking.com/flights/search.html?dep_airport=${encodeURIComponent(from)}&arr_airport=${encodeURIComponent(to)}&chk_out=${date}&chk_in=${returnDate}&aid=${SeyahatAIConfig.affiliateId}`;
            window.open(bookingFlightUrl, '_blank');
        });
    }

    if (hotelForm) {
        hotelForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const destination = document.getElementById('hotel-destination').value;
            
            if (!destination) {
                alert('Lütfen gitmek istediğiniz şehri veya oteli yazın.');
                return;
            }

            // Route to booking hotel search using custom generator
            const bookingHotelUrl = SeyahatAIConfig.getBookingSearchLink(destination);
            window.open(bookingHotelUrl, '_blank');
        });
    }

    if (transferForm) {
        transferForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const from = document.getElementById('transfer-from').value;
            const to = document.getElementById('transfer-to').value;
            
            if (!from || !to) {
                alert('Lütfen alış ve bırakış noktalarını doldurunuz.');
                return;
            }

            // Route to booking taxi search or transfer page
            const taxiUrl = `https://www.booking.com/taxi/index.tr.html?aid=${SeyahatAIConfig.affiliateId}`;
            window.open(taxiUrl, '_blank');
        });
    }

    const activityForm = document.getElementById('activity-form');
    if (activityForm) {
        activityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('activity-destination').value;
            
            if (!query) {
                alert('Lütfen gitmek istediğiniz şehri veya etkinlik adını yazın.');
                return;
            }

            // Route to booking attractions search
            const bookingAttractionsUrl = `https://www.booking.com/attractions/search.html?query=${encodeURIComponent(query)}&aid=${SeyahatAIConfig.affiliateId}`;
            window.open(bookingAttractionsUrl, '_blank');
        });
    }

    // --- Dynamic Floating WhatsApp Button ---
    const createWhatsAppFloat = () => {
        if (document.getElementById('whatsapp-floating-bubble')) return;
        
        let destQuery = "Genel Destek ve Bilgi";
        
        // If on the destinasyon template page, grab query parameter to personalize support message
        if (window.location.pathname.includes('destinasyon.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const routeId = urlParams.get('id') || 'bali-luxury-escape';
            if (typeof SEYAHAT_ROUTES_DATA !== 'undefined' && SEYAHAT_ROUTES_DATA[routeId]) {
                destQuery = SEYAHAT_ROUTES_DATA[routeId].supportQuery;
            }
        }
        
        const floatLink = document.createElement('a');
        floatLink.id = 'whatsapp-floating-bubble';
        floatLink.className = 'whatsapp-float';
        floatLink.target = '_blank';
        floatLink.setAttribute('aria-label', 'WhatsApp Canlı Destek Hattı');
        
        if (typeof SeyahatAIConfig !== 'undefined') {
            floatLink.href = SeyahatAIConfig.getWhatsAppLink(destQuery);
        } else {
            floatLink.href = 'https://wa.me/905312198940';
        }
        
        // Vector WhatsApp SVG
        floatLink.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.908-6.993-1.88-1.88-4.36-2.91-7.002-2.912-5.43 0-9.857 4.417-9.86 9.861-.001 1.77.464 3.493 1.348 5.02L1.072 21.9l4.52-1.18c1.554.848 3.111 1.29 4.85 1.29z"/>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004z"/>
            </svg>
        `;
        
        document.body.appendChild(floatLink);
    };
    
    createWhatsAppFloat();

    // --- Autocomplete Setup ---
    const popularDestinations = [
        { name: "Bali, Endonezya", type: "Tropikal • Macera", icon: "🌴" },
        { name: "Kapadokya, Nevşehir", type: "Tarihi • Romantizm", icon: "🏛️" },
        { name: "St. Moritz, İsviçre Alpleri", type: "Kış • Sakinlik", icon: "❄️" },
        { name: "Maldivler, Hint Okyanusu", type: "Tropikal • Lüks", icon: "🏖️" },
        { name: "Amalfi Kıyıları, İtalya", type: "Romantizm • Kültür", icon: "🍋" },
        { name: "Zermatt, İsviçre", type: "Kış • Macera", icon: "🏔️" },
        { name: "Paris, Fransa", type: "Tarihi • Romantizm", icon: "🗼" }
    ];

    const setupAutocomplete = (inputId, dropdownId) => {
        const input = document.getElementById(inputId);
        const dropdown = document.getElementById(dropdownId);
        
        if (!input || !dropdown) return;
        
        // Show suggestions on focus
        input.addEventListener('focus', () => {
            renderSuggestions(input.value, dropdown, input);
        });
        
        // Filter suggestions on input
        input.addEventListener('input', (e) => {
            renderSuggestions(e.target.value, dropdown, input);
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    };
    
    const renderSuggestions = (query, dropdown, input) => {
        const filtered = popularDestinations.filter(d => 
            d.name.toLowerCase().includes(query.toLowerCase()) || 
            d.type.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filtered.length === 0) {
            dropdown.style.display = 'none';
            return;
        }
        
        dropdown.innerHTML = filtered.map(d => `
            <div class="autocomplete-suggestion" data-val="${d.name}">
                <span>${d.icon}</span>
                <div>
                    <strong style="font-size: 14px; font-weight: 600; color: #ffffff;">${d.name}</strong>
                    <small style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">${d.type}</small>
                </div>
            </div>
        `).join('');
        
        dropdown.style.display = 'block';
        
        // Bind click events on suggestions
        dropdown.querySelectorAll('.autocomplete-suggestion').forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.getAttribute('data-val');
                dropdown.style.display = 'none';
            });
        });
    };

    setupAutocomplete('hotel-destination', 'hotel-autocomplete');
    setupAutocomplete('flight-to', 'flight-autocomplete');
    setupAutocomplete('activity-destination', 'activity-autocomplete');

    // --- Dark/Light Mode Theme Toggle Setup ---
    const initThemeToggle = () => {
        const navMenu = document.getElementById('navigation-menu');
        if (!navMenu) return;
        
        // Prevent duplicate creation if script is loaded twice
        if (document.getElementById('theme-toggle-btn')) return;
        
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle-btn';
        toggleBtn.className = 'theme-toggle-btn';
        toggleBtn.setAttribute('type', 'button');
        toggleBtn.setAttribute('aria-label', 'Temayı Değiştir');
        
        // Set initial icon
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        toggleBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
        
        // Append at the end of the navigation menu
        navMenu.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', () => {
            const nowTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const nextTheme = nowTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
            
            // Toggle icon
            toggleBtn.innerHTML = nextTheme === 'dark' ? '☀️' : '🌙';
        });
    };
    
    initThemeToggle();
});
