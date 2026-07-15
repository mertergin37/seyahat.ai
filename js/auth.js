// seyahat.ai - Kullanıcı Giriş/Kayıt ve Oturum Yönetim Scripti (LocalStorage Tabanlı)

const SEYAHAT_AUTH = {
    // 1. Oturum durumunu getirme
    getLoggedInUser: function() {
        const session = localStorage.getItem('seyahat_ai_session');
        return session ? JSON.parse(session) : null;
    },

    // 2. Kullanıcı veri tabanını getirme (email -> user şeklinde saklanır)
    _getUsersDB: function() {
        const db = localStorage.getItem('seyahat_ai_users');
        return db ? JSON.parse(db) : {};
    },

    // 3. Giriş Yap Simülasyonu
    login: function(email, password) {
        const users = this._getUsersDB();
        const user = users[email];
        
        if (!user) {
            return { success: false, message: 'Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.' };
        }
        if (user.password !== password) {
            return { success: false, message: 'Hatalı şifre girdiniz. Lütfen tekrar deneyin.' };
        }

        // Oturumu başlat (Şifreyi oturum nesnesinden temizle)
        const sessionUser = { ...user };
        delete sessionUser.password;
        localStorage.setItem('seyahat_ai_session', JSON.stringify(sessionUser));

        return { success: true, user: sessionUser };
    },

    // 4. Kayıt Ol Simülasyonu
    register: function(name, email, password) {
        const users = this._getUsersDB();
        
        if (users[email]) {
            return { success: false, message: 'Bu e-posta adresi zaten kullanımda.' };
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            level: 'Gold VIP Gezgin',
            registeredAt: new Date().toLocaleDateString('tr-TR'),
            favorites: [],
            quizHistory: []
        };

        // Veritabanına kaydet
        users[email] = newUser;
        localStorage.setItem('seyahat_ai_users', JSON.stringify(users));

        // Oturumu başlat (Şifreyi oturum nesnesinden temizle)
        const sessionUser = { ...newUser };
        delete sessionUser.password;
        localStorage.setItem('seyahat_ai_session', JSON.stringify(sessionUser));

        return { success: true, user: sessionUser };
    },

    // 5. Çıkış Yap
    logout: function() {
        localStorage.removeItem('seyahat_ai_session');
        window.location.reload();
    },

    // 6. Favori Ekle / Çıkar
    toggleFavorite: function(routeId) {
        const currentUser = this.getLoggedInUser();
        if (!currentUser) return { success: false, message: 'Lütfen önce giriş yapın.' };

        const users = this._getUsersDB();
        const user = users[currentUser.email];
        
        if (!user.favorites) user.favorites = [];
        
        const index = user.favorites.indexOf(routeId);
        let isAdded = false;
        if (index > -1) {
            user.favorites.splice(index, 1);
            isAdded = false;
        } else {
            user.favorites.push(routeId);
            isAdded = true;
        }

        // Veritabanını ve aktif oturumu güncelle
        users[currentUser.email] = user;
        localStorage.setItem('seyahat_ai_users', JSON.stringify(users));
        
        const sessionUser = { ...user };
        delete sessionUser.password;
        localStorage.setItem('seyahat_ai_session', JSON.stringify(sessionUser));

        return { success: true, isAdded: isAdded, favorites: user.favorites };
    },

    // 7. Favori mi?
    isFavorite: function(routeId) {
        const currentUser = this.getLoggedInUser();
        if (!currentUser) return false;
        
        const users = this._getUsersDB();
        const user = users[currentUser.email];
        return user && user.favorites && user.favorites.includes(routeId);
    },

    // 8. Quiz Sonucunu Geçmişe Ekle
    addQuizResult: function(routeId, routeTitle) {
        const currentUser = this.getLoggedInUser();
        if (!currentUser) return; // Giriş yapılmamışsa kaydetme

        const users = this._getUsersDB();
        const user = users[currentUser.email];
        
        if (!user.quizHistory) user.quizHistory = [];
        
        // Yeni sonucu ekle
        user.quizHistory.unshift({
            routeId: routeId,
            routeTitle: routeTitle,
            date: new Date().toLocaleDateString('tr-TR') + ' - ' + new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})
        });

        // Maksimum 10 geçmiş kaydı sakla
        if (user.quizHistory.length > 10) user.quizHistory.pop();

        // Veritabanını ve aktif oturumu güncelle
        users[currentUser.email] = user;
        localStorage.setItem('seyahat_ai_users', JSON.stringify(users));

        const sessionUser = { ...user };
        delete sessionUser.password;
        localStorage.setItem('seyahat_ai_session', JSON.stringify(sessionUser));
    },

    // 9. Navbar Üye Paneli Arayüzünü Güncelle
    updateNavbarAuthUI: function() {
        const navigationMenu = document.getElementById('navigation-menu');
        if (!navigationMenu) return;

        // Eski giriş/profil ögelerini temizle (varsa)
        const oldAuthItem = document.getElementById('navbar-auth-item');
        if (oldAuthItem) oldAuthItem.remove();

        const user = this.getLoggedInUser();
        const isSubdir = window.location.pathname.includes('/destinations/');
        const prefix = isSubdir ? '../' : './';

        const container = document.createElement('div');
        container.id = 'navbar-auth-item';
        container.className = 'nav-auth-wrapper';

        if (user) {
            // Giriş Yapılmışsa: Kullanıcı Profil Dropdown'u göster
            container.innerHTML = `
                <div class="user-dropdown">
                    <button class="nav-auth-btn user-profile-trigger" id="user-profile-trigger">
                        <span class="user-avatar-initials">${user.name.charAt(0).toUpperCase()}</span>
                        <span class="user-profile-name">${user.name.split(' ')[0]}</span>
                        <svg class="dropdown-chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="user-dropdown-menu" id="user-dropdown-menu">
                        <div class="user-dropdown-header">
                            <strong>${user.name}</strong>
                            <span>${user.email}</span>
                            <span class="user-badge-level">${user.level}</span>
                        </div>
                        <a href="${prefix}profil.html" class="user-dropdown-item">
                            👤 Profilim & Favorilerim
                        </a>
                        <a href="${prefix}quiz.html" class="user-dropdown-item">
                            🧭 Yeni Rota Analizi
                        </a>
                        <hr class="dropdown-divider">
                        <button type="button" class="user-dropdown-item logout-btn" id="nav-logout-btn">
                            🚪 Çıkış Yap
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Giriş Yapılmamışsa: Giriş Yap / Üye Ol butonu göster
            container.innerHTML = `
                <button type="button" class="nav-link login-trigger-btn" id="navbar-login-trigger" style="border: none; cursor: pointer; font-family: var(--font-sans);">
                    🔑 Giriş Yap
                </button>
            `;
        }

        // Menünün en sonuna (sağ köşeye) yerleştir
        navigationMenu.appendChild(container);

        // Çıkış yap düğmesine işleyici bağla
        const logoutBtn = document.getElementById('nav-logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Açılır menü (Dropdown) davranışını bağla
        const trigger = document.getElementById('user-profile-trigger');
        const menu = document.getElementById('user-dropdown-menu');
        
        if (trigger && menu) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!trigger.contains(e.target) && !menu.contains(e.target)) {
                    menu.classList.remove('active');
                }
            });
        }

        // Giriş butonunun modali açmasını sağla
        const loginTrigger = document.getElementById('navbar-login-trigger');
        if (loginTrigger) {
            loginTrigger.addEventListener('click', () => SEYAHAT_AUTH.openAuthModal());
        }
    },

    // 10. Modalı Ekrana Ekle ve Başlat (Varsa tetikler yoksa DOM'a ekler)
    initAuthModal: function() {
        if (document.getElementById('auth-modal-overlay')) return;

        const modalHtml = `
            <div class="auth-modal-overlay" id="auth-modal-overlay">
                <div class="auth-modal-box">
                    <button class="auth-modal-close" id="auth-modal-close-btn">&times;</button>
                    <div class="auth-modal-tabs">
                        <button class="auth-tab-btn active" data-tab="login-tab">Giriş Yap</button>
                        <button class="auth-tab-btn" data-tab="register-tab">Kayıt Ol</button>
                    </div>
                    
                    <!-- Giriş Formu -->
                    <div class="auth-modal-pane active" id="login-tab">
                        <form id="auth-login-form" class="auth-form-body">
                            <div class="auth-form-group">
                                <label for="auth-email-input">E-Posta Adresi</label>
                                <input type="email" id="auth-email-input" class="form-control" placeholder="adiniz@eposta.com" required>
                            </div>
                            <div class="auth-form-group">
                                <label for="auth-pass-input">Şifre</label>
                                <input type="password" id="auth-pass-input" class="form-control" placeholder="••••••••" required>
                            </div>
                            <div id="login-error-msg" class="auth-error-msg"></div>
                            <button type="submit" class="btn-search auth-submit-btn">Giriş Yap 🚀</button>
                        </form>
                    </div>

                    <!-- Kayıt Formu -->
                    <div class="auth-modal-pane" id="register-tab">
                        <form id="auth-register-form" class="auth-form-body">
                            <div class="auth-form-group">
                                <label for="reg-name-input">Adınız Soyadınız</label>
                                <input type="text" id="reg-name-input" class="form-control" placeholder="Örn: Ahmet Yılmaz" required>
                            </div>
                            <div class="auth-form-group">
                                <label for="reg-email-input">E-Posta Adresi</label>
                                <input type="email" id="reg-email-input" class="form-control" placeholder="adiniz@eposta.com" required>
                            </div>
                            <div class="auth-form-group">
                                <label for="reg-pass-input">Şifre</label>
                                <input type="password" id="reg-pass-input" class="form-control" placeholder="En az 6 karakter" minlength="6" required>
                            </div>
                            <div id="register-error-msg" class="auth-error-msg"></div>
                            <button type="submit" class="btn-search auth-submit-btn">Hesap Oluştur ✨</button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = modalHtml;
        document.body.appendChild(wrapper.firstElementChild);

        // Kapatma işlevleri
        const overlay = document.getElementById('auth-modal-overlay');
        const closeBtn = document.getElementById('auth-modal-close-btn');

        const closeModal = () => {
            overlay.classList.remove('active');
            document.getElementById('login-error-msg').innerText = '';
            document.getElementById('register-error-msg').innerText = '';
            document.getElementById('auth-login-form').reset();
            document.getElementById('auth-register-form').reset();
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        // Tab Değiştirme
        const tabs = overlay.querySelectorAll('.auth-tab-btn');
        const panes = overlay.querySelectorAll('.auth-modal-pane');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                panes.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                const target = tab.getAttribute('data-tab');
                document.getElementById(target).classList.add('active');
            });
        });

        // Form Gönderim - Giriş
        document.getElementById('auth-login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-email-input').value;
            const pass = document.getElementById('auth-pass-input').value;
            const errorMsg = document.getElementById('login-error-msg');

            const res = this.login(email, pass);
            if (res.success) {
                closeModal();
                this.updateNavbarAuthUI();
                // Eğer sayfa yenilenmesi gerekiyorsa (profil sayfasına yansımak için)
                if (window.location.pathname.includes('profil.html') || window.location.pathname.includes('destinasyon.html')) {
                    window.location.reload();
                }
            } else {
                errorMsg.innerText = res.message;
            }
        });

        // Form Gönderim - Kayıt
        document.getElementById('auth-register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name-input').value;
            const email = document.getElementById('reg-email-input').value;
            const pass = document.getElementById('reg-pass-input').value;
            const errorMsg = document.getElementById('register-error-msg');

            const res = this.register(name, email, pass);
            if (res.success) {
                closeModal();
                this.updateNavbarAuthUI();
                if (window.location.pathname.includes('profil.html') || window.location.pathname.includes('destinasyon.html')) {
                    window.location.reload();
                }
            } else {
                errorMsg.innerText = res.message;
            }
        });
    },

    // Modali Aç
    openAuthModal: function() {
        this.initAuthModal();
        const overlay = document.getElementById('auth-modal-overlay');
        if (overlay) overlay.classList.add('active');
    }
};

// Sayfa yüklendiğinde otomatik olarak başlat
document.addEventListener('DOMContentLoaded', () => {
    SEYAHAT_AUTH.initAuthModal();
    SEYAHAT_AUTH.updateNavbarAuthUI();
});
