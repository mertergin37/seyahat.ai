document.addEventListener('DOMContentLoaded', () => {
    // Current step index
    let currentStep = 1;
    const totalSteps = 3;
    
    // Quiz state object to hold selected options
    const quizState = {
        atmosphere: '',
        vibe: '',
        budget: ''
    };
    
    const steps = document.querySelectorAll('.quiz-step');
    const progressBar = document.querySelector('.progress-bar');
    const btnPrev = document.querySelector('.btn-quiz-prev');
    const btnNext = document.querySelector('.btn-quiz-next');
    const quizLoading = document.getElementById('quiz-loading');
    const quizStepsWrapper = document.querySelector('.quiz-steps-wrapper');
    
    // Option cards selection
    const optionCards = document.querySelectorAll('.option-card');
    
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const input = card.querySelector('input[type="radio"]');
            const name = input.name;
            const value = input.value;
            
            // Unselect sibling cards in this step
            const stepGroup = card.closest('.quiz-options');
            stepGroup.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            
            // Select clicked card
            card.classList.add('selected');
            input.checked = true;
            
            // Store state
            quizState[name] = value;
            
            // Enable next button
            btnNext.removeAttribute('disabled');
        });
    });
    
    // Update active step view, progress bar, and nav buttons
    function updateStep() {
        // Update steps active class
        steps.forEach(step => {
            if (parseInt(step.getAttribute('data-step')) === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update progress bar width
        const progressPercentage = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Manage previous button
        if (currentStep === 1) {
            btnPrev.setAttribute('disabled', 'true');
        } else {
            btnPrev.removeAttribute('disabled');
        }
        
        // Manage next/submit button text and disabled state
        if (currentStep === totalSteps) {
            btnNext.innerHTML = 'Rotamı Göster <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
        } else {
            btnNext.innerHTML = 'Sonraki Adım <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
        }
        
        // Check if an option is selected for the current step to enable next button
        const activeStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
        const checkedRadio = activeStepEl.querySelector('input[type="radio"]:checked');
        if (checkedRadio) {
            btnNext.removeAttribute('disabled');
        } else {
            btnNext.setAttribute('disabled', 'true');
        }
    }
    
    // Previous step click handler
    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStep();
        }
    });
    
    // Next / Submit step click handler
    btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStep();
        } else {
            // Hide progress bar and steps
            quizStepsWrapper.style.display = 'none';
            progressBar.parentElement.style.display = 'none';
            
            // Final submission - Recommendation Logic
            analizEtVeYonlendir(quizState.atmosphere, quizState.vibe, quizState.budget);
        }
    });
    
    // Initialize step
    updateStep();
});

function analizEtVeYonlendir(atmosfer, vibe, butce) {
    // Premium bekleme efekti için spinner'ı aktif et
    document.getElementById("spinner-container").style.display = "block";
    
    // Logları simüle et (Kullanıcıya premium hissettiren bekleme ekranı yazıları)
    const statusText = document.getElementById("status-text");
    setTimeout(() => { statusText.innerText = "Tercihleriniz analiz ediliyor..."; }, 800);
    setTimeout(() => { statusText.innerText = "En uygun uçak ve otel teklifleri taranıyor..."; }, 1800);

    // 3 saniye sonra yönlendir
    setTimeout(() => {
        let routeId = "";
        let routeTitle = "";

        // Eşleştirme Mantığı
        if (atmosfer === "tropikal" && vibe === "macera" && butce === "premium") {
            routeId = "bali-luxury-escape";
            routeTitle = "Bali Egzotik Kaçış";
        } else if (atmosfer === "tarihi" && vibe === "romantizm" && butce === "orta") {
            routeId = "cappadocia-cave-suites";
            routeTitle = "Kapadokya Mağara Rüyası";
        } else if (atmosfer === "karlı" && vibe === "sakinlik" && butce === "premium") {
            routeId = "swiss-alps-chalets";
            routeTitle = "İsviçre Alpleri Kış Masalı";
        } else {
            // Kombinasyon dışındaki ara durumlar için ana atmosfer tipine göre yedek yönlendirme
            if (atmosfer === "tropikal") {
                routeId = "bali-luxury-escape";
                routeTitle = "Bali Egzotik Kaçış";
            } else if (atmosfer === "tarihi") {
                routeId = "cappadocia-cave-suites";
                routeTitle = "Kapadokya Mağara Rüyası";
            } else {
                routeId = "swiss-alps-chalets";
                routeTitle = "İsviçre Alpleri Kış Masalı";
            }
        }

        // Giriş yapmış bir kullanıcı varsa geçmişe kaydet
        if (typeof SEYAHAT_AUTH !== 'undefined') {
            SEYAHAT_AUTH.addQuizResult(routeId, routeTitle);
        }

        window.location.href = `destinations/destinasyon.html?id=${routeId}`;
    }, 3000);
}
