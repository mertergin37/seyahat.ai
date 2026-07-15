// seyahat.ai - Destinasyon Veritabanı (CORS Güvenlik Engellerini Aşmak İçin JS Formatındadır)
const SEYAHAT_ROUTES_DATA = {
  "bali-luxury-escape": {
    "title": "Bali Egzotik Kaçış",
    "badge": "Tropikal • Macera • Premium",
    "intro": "Ubud'un büyüleyici yağmur ormanlarından yükselen sabah sisleri, mistik Hindu tapınakları ve adrenalin dolu nehir raftingi. Bali, macera tutkunları için vahşi doğa ile üst düzey lüksü bir araya getiriyor.",
    "heroImage": "../assets/images/bali_hero.jpg",
    "weather": "28°C-31°C Yıllık Ort.",
    "airport": "Ngurah Rai Havalimanı (DPS)",
    "bestSeason": "Nisan - Ekim",
    "fallbackQuery": "Bali",
    "supportQuery": "Bali Egzotik Kaçış",
    "hotels": [
      {
        "name": "Four Seasons Resort Bali at Sayan",
        "rating": "9.4",
        "image": "../assets/images/bali_hotel_1.jpg",
        "location": "Ubud, Bali",
        "highlights": [
          "Ayung Nehri kıyısında özel havuzlu lüks villalar",
          "Gökyüzü köprüsüyle geçilen ikonik kase mimarisi",
          "Dünyaca ünlü Sacred River Spa ve yoga programları"
        ]
      },
      {
        "name": "Mandapa, a Ritz-Carlton Reserve",
        "rating": "9.6",
        "image": "../assets/images/bali_hotel_2.jpg",
        "location": "Ubud, Bali",
        "highlights": [
          "Geleneksel Bali mimarisine sahip lüks orman süitleri",
          "24 saat kişisel butler (kahya) hizmeti",
          "Kendi arazisinde yer alan özel pirinç tarlaları"
        ]
      },
      {
        "name": "Hanging Gardens of Bali",
        "rating": "8.8",
        "image": "../assets/images/bali_hotel_3.jpg",
        "location": "Payangan, Bali",
        "highlights": [
          "Orman manzaralı, ödüllü çift katlı sonsuzluk havuzu",
          "Vadiye uzanan özel teleferik ve ağaç ev konsepti",
          "Romantik nehir kıyısı akşam yemekleri"
        ]
      }
    ]
  },
  "cappadocia-cave-suites": {
    "title": "Kapadokya Mağara Rüyası",
    "badge": "Tarih • Romantizm • Orta Seviye",
    "intro": "Binlerce yıllık mağaraların modern lüksle buluştuğu taş odalar, her sabah gökyüzünü kaplayan yüzlerce rengarenk balon ve mistik vadilerin romantik atmosferi. Kapadokya, unutulmaz anlar için eşsiz bir tarih masalı sunuyor.",
    "heroImage": "../assets/images/cappadocia_hero.jpg",
    "weather": "-5°C (Kış) / 30°C (Yaz)",
    "airport": "Kayseri (ASR) / Nevşehir (NAV)",
    "bestSeason": "Eylül - Kasım / Nisan - Haziran",
    "fallbackQuery": "Nevşehir",
    "supportQuery": "Kapadokya Mağara Rüyası",
    "hotels": [
      {
        "name": "Museum Hotel - Unique Cappadocia",
        "rating": "9.1",
        "image": "../assets/images/cappadocia_hotel_1.jpg",
        "location": "Uchisar, Nevsehir",
        "highlights": [
          "Paha biçilemez antikalarla dekore edilmiş müze-otel konsepti",
          "Vadileri gören, yıl boyu ısıtmalı lüks açık kaya havuzu",
          "Relais & Châteaux ünvanlı gurme mutfağı"
        ]
      },
      {
        "name": "Sultan Cave Suites",
        "rating": "8.9",
        "image": "../assets/images/cappadocia_hotel_2.jpg",
        "location": "Goreme, Nevsehir",
        "highlights": [
          "Sosyal medyada dünyaca ünlü, sıcak hava balonları manzaralı teras",
          "Doğal taş oyması, serin tutan otantik yatak odaları",
          "Göreme Milli Parkı'nın kalbinde merkezi konum"
        ]
      },
      {
        "name": "Kelebek Special Cave Hotel",
        "rating": "9.2",
        "image": "../assets/images/cappadocia_hotel_3.jpg",
        "location": "Goreme, Nevsehir",
        "highlights": [
          "Gerçek peri bacaları içine oyulmuş eşsiz odalar",
          "Geleneksel Türk hamamı, sauna ve açık yüzme havuzu",
          "Kendi vadisinde organik kahvaltı ve şarap tadımları"
        ]
      }
    ]
  },
  "swiss-alps-chalets": {
    "title": "İsviçre Alpleri Kış Masalı",
    "badge": "Kış • Sakinlik • Premium",
    "intro": "Karlarla kaplı heybetli Alp zirvelerinin eteklerinde, şöminenin çıtırtısı eşliğinde tamamen size özel ve sakin bir kış rüyası. İsviçre Alpleri, gürültüden uzaklaşmak ve zihni dinlendirmek isteyenler için zirve konforu sunuyor.",
    "heroImage": "../assets/images/swiss_hero.jpg",
    "weather": "-8°C / 2°C (Kış Sezonu)",
    "airport": "Zürih (ZRH) / Cenevre (GVA)",
    "bestSeason": "Aralık - Mart",
    "fallbackQuery": "Swiss Alps",
    "supportQuery": "İsviçre Alpleri Kış Masalı",
    "hotels": [
      {
        "name": "The Chedi Andermatt",
        "rating": "9.4",
        "image": "../assets/images/swiss_hotel_1.jpg",
        "location": "Andermatt, İsviçre",
        "highlights": [
          "Modern Asya esintili benzersiz Alp mimarisi",
          "2400 m² genişliğinde, şömineli lüks Spa ve Wellness",
          "Michelin yıldızlı Asya mutfağı ve peynir mahzeni"
        ]
      },
      {
        "name": "Badrutt's Palace Hotel",
        "rating": "9.3",
        "image": "../assets/images/swiss_hotel_2.jpg",
        "location": "St. Moritz, İsviçre",
        "highlights": [
          "St. Moritz Gölü'nün nefes kesici manzarasına sahip tarihi saray",
          "Ski-in / Ski-out kayak pistlerine doğrudan erişim",
          "Rolls-Royce limuzin ile havalimanı karşılama servisi"
        ]
      },
      {
        "name": "Riffelalp Resort 2222m",
        "rating": "9.5",
        "image": "../assets/images/swiss_hotel_3.jpg",
        "location": "Zermatt, İsviçre",
        "highlights": [
          "Matterhorn Dağı manzaralı, 2222 metre yükseklikte konum",
          "Avrupa'nın en yüksek ısıtmalı açık havuz deneyimi",
          "Araç trafiğine kapalı, tamamen sessiz ve huzurlu dağ ormanı"
        ]
      }
    ]
  }
};
