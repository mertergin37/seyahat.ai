// seyahatai.com - Global Konfigürasyon Dosyası
window.SeyahatAIConfig = {
    // Travelpayouts / Booking.com Affiliate ID (aid) değeriniz
    affiliateId: "YOUR_PARTNER_ID",
    
    // Destek hattı için WhatsApp telefon numaranız (Uluslararası formatta, boşluksuz)
    whatsappNumber: "905312198940",
    
    // Kullanıcıların doğrudan arama yapabileceği genel Booking.com ana linki
    getBookingSearchLink: function(destination = "") {
        return `https://www.booking.com/searchresults.tr.html?ss=${encodeURIComponent(destination)}&aid=${this.affiliateId}`;
    },
    
    // WhatsApp VIP yönlendirme linki oluşturucu
    getWhatsAppLink: function(destinationName) {
        const baseMessage = `Merhaba Seyahat AI! ${destinationName} için özel fiyat ve plan desteği almak istiyorum.`;
        return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(baseMessage)}`;
    }
};
