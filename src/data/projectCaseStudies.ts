import type { Project } from "../types/project";

type CaseStudy = NonNullable<Project["caseStudy"]>;

// Scope and decisions come from the existing project narratives. These are
// presentation summaries, not new claims about personal ownership or test runs.
export const projectCaseStudies: Record<string, CaseStudy> = {
  "techball-web": {
    problem:
      "Geniş bir oyuncu havuzunda mevki, rol, maaş ve performans koşullarını birlikte değerlendirerek uygun adayları bulmak.",
    solution:
      "Çok ölçütlü filtreleme, özelleştirilebilir tablo, taktik tahtası ve doğal dilde Scout AI araması aynı araştırma alanında birleşiyor.",
    decision:
      "Python API, SQLite veritabanına salt okunur erişiyor. AI yorumu, yerel sorgunun bulduğu adayların sınırlı özeti üzerinden kuruluyor; sonuç ile kullanılan koşullar birlikte gösteriliyor.",
    limits:
      "Yerel prototip. Herkese açık demo ve kaynak kodu bağlantısı henüz yok. Kamuya açık bir sürüm için izinli örnek veri ve dış servis kapsamı hazırlanmalı.",
    evidence:
      "İki ekran görüntüsü oyuncu tablosu, taktik tahtası ve Scout AI sonucunu gösteriyor. Bu ekranlar canlı demo veya sorgu doğruluğuna ilişkin test sonucu yerine geçmiyor.",
  },
  yatatodo: {
    problem:
      "Günlük görevleri yalnızca kaydetmek yerine, kullanıcının ayırabileceği sınırlı süreye uygun bir sıraya koymak.",
    solution:
      "Görev ekleme, düzenleme, tamamlama ve filtreleme; Gemini Flash ile önerilen sıra, süre ve gerekçeyle bir araya geliyor. Son karar kullanıcıda kalıyor.",
    decision:
      "Görevler saf reducer ile yönetiliyor. Model yanıtındaki bilinmeyen ve yinelenen kimlikler eleniyor, atlanan görevler ekleniyor; toplam süre kapasiteyi aşarsa yeniden ölçekleniyor.",
    limits:
      "Hesap ve cihazlar arası eşitleme yok. Görevler ve kullanıcı API anahtarı tarayıcıda saklanıyor; herkese açık sürüm için anahtar yönetimi ayrıca ele alınmalı.",
    evidence:
      "Ekran görüntüsü görevler ile günlük planı birlikte gösteriyor. Kaynak kodunda reducer ve plan yanıtı denetimi incelenebilir; ölçülmüş bir başarı veya performans sonucu sunulmuyor.",
  },
  yataquizing: {
    problem:
      "Soruları uygulama koduna sabitlemeden farklı içeriklerle süreli bir sınav oturumu oluşturmak.",
    solution:
      "Hazır quiz veya JSON yükleme ile başlıyor; süreli soru ekranı, cevap takibi ve açıklamalı sonuç özetiyle tamamlanıyor.",
    decision:
      "Soru içeriği ile sınav akışı ayrılıyor. Cevaplar soru konumuna göre state'te tutuluyor; yeniden başlatma cevapları ve sayaçları sıfırlıyor. JSON dosyası tarayıcıda okunuyor.",
    limits:
      "Sonuç geçmişi kalıcı tutulmuyor, hesap sistemi bulunmuyor. Sayaç ve geri dönüş davranışına ilişkin ayrıntılı test sonuçları bu portföyde paylaşılmadı.",
    evidence:
      "Üç ekran görüntüsü seçim, soru ve sonuç adımlarını gösteriyor. Kaynak bağlantısı dosya doğrulamasını ve sınav akışını incelemeye olanak veriyor; canlı demo henüz eklenmedi.",
  },
  yataclimate: {
    problem:
      "Farklı şehirlerin hava koşullarını karşılaştırmak ve saatlik değişimle haftalık tahmini anlaşılır biçimde okumak.",
    solution:
      "48 öncelikli şehir, şehir araması, favoriler ve ayrıntılı hava görünümü; sıcaklık, yağış ve rüzgâr bilgilerini aynı akışta sunuyor.",
    decision:
      "Şehir özetleri tek toplu Forecast isteğiyle alınıyor. Ağır saatlik ve haftalık veri detay açılınca yükleniyor; arama değiştiğinde önceki geocoding isteği iptal ediliyor.",
    limits:
      "Yeni hava verisi için bağlantı gerekiyor. Bazı arama ve şehir hatalarında çevrimdışı durum ile sonuç bulunamaması yeterince ayrışmıyor. Önbellek sayfa belleğiyle sınırlı.",
    evidence:
      "İki ekran şehir listesini ve detay görünümünü gösteriyor. Kaynak kodunda toplu istek, detay yükleme ve arama iptali incelenebilir; istek azalmasına ilişkin ölçülmüş bir oran sunulmuyor.",
  },
  "yata-market": {
    problem:
      "Ürün keşfinden sepete uzanan alışveriş akışını React arayüzü ve Express API ile birlikte kurmak.",
    solution:
      "Arama, kategori ve fiyat filtreleri, ürün detayı, favoriler, sepet ve demo ürün yönetimi aynı uygulamada çalışıyor.",
    decision:
      "Sepet ve favoriler ayrı Context/reducer'larda yönetiliyor. Sepet tutarı state'ten hesaplanıyor; bozuk tarayıcı kaydı boş sepetle ele alınıyor. API doğrulama ve hata katmanlarına ayrılıyor.",
    limits:
      "Ürünler sunucu belleğinde; yeniden başlatmada yönetim değişiklikleri kayboluyor. Yönetimde erişim kontrolü, gerçek ödeme, sipariş, stok ve kargo akışı bulunmuyor.",
    evidence:
      "Katalog ve sepet ekranları kullanıcı akışını gösteriyor. Kaynak bağlantısından arayüz ve REST uçları incelenebilir. Canlı mağaza veya gerçek ödeme sistemi olarak sunulmuyor.",
  },
  "kisisel-kitaplik": {
    problem:
      "Kitap ve yazar kataloglarını, okuma durumunu ve kitaplara bağlı notları bir kitaplık akışında düzenlemek.",
    solution:
      "Kitaplığım ve Yazarlar arayüzleri mevcut. Not ve alıntılar için Express API altyapısı var; okuma günlüğünün React ekranı henüz eklenmedi.",
    decision:
      "Katalog PostgreSQL'de, not ve alıntılar MongoDB'de tutuluyor. bookId ilişkisini uygulama servisi denetliyor; bağlı kayıt varken silme reddediliyor. İki veritabanı ortak transaction sağlamıyor.",
    limits:
      "Tek kullanıcılı yerel eğitim uygulaması. Günlük arayüzü ve erişim kontrolü eksik; silme öncesi kontrol eşzamanlı işlemlerde yarış koşulu taşıyabiliyor. Bu ayrımın maliyeti ayrıca değerlendirilmelidir.",
    evidence:
      "İki ekran kitap ve yazar yönetimini gösteriyor. Kaynak kodu veri modelleri ve silme kurallarını incelemeye açık; günlük arayüzü veya eşzamanlılık testi sonucu gösterilmiyor.",
  },
  yataoil: {
    problem:
      "Araç ilanı ile yakıt maliyetini tek araştırma akışında değerlendirmek ve eksik veriden yanıltıcı hesap üretmemek.",
    solution:
      "Marka kataloğu ve ham ilan araması mevcut. Maliyet ekranı aylık kilometre, tüketim ve litre fiyatı üzerinden yaklaşık gideri gösteriyor.",
    decision:
      "Marka slug'ı kaynak katalogla doğrulanıyor. Puppeteer sunucuda çalışıyor; katalog yanıtının live, cache veya fallback kaynağı belirtiliyor. Ham ilan araması kalıcı önbelleğe yazılmıyor.",
    limits:
      "Canlı kaynak erişimi garanti değil. Detay servisi ve CollectAPI yakıt entegrasyonunun uçtan uca tamamlandığı henüz doğrulanmış değil; görseldeki hesap ekranı bu garantiyi vermiyor.",
    evidence:
      "İlan listesi ve maliyet ekranı paylaşılmış. Proje anlatısı fixture/mock kontrollerini belirtiyor; paylaşılan kanıtlar canlı detay ve yakıt entegrasyonunun çalıştığını henüz doğrulamıyor.",
  },
};
