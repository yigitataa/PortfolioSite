# Portfolio iyileştirme görevleri

Kaynak: [İnceleme raporu](./PORTFOLIO_INCELEMESI.md). Başlangıç: 1 Ekim 2026.

Mevcut deniz fotoğrafı, açık/koyu tema, mavi vurgu, cam gezinme ve rota adresleri korunacak. Tasarım yaklaşımı: geliştirici portföyünde hedefli iyileştirme; mevcut görsel çeşitlilik, hareket ve yoğunluk korunur (6 / 5 / 4), azaltılmış hareket eksikleri tamamlanır. Yeni uzmanlık, kişisel katkı veya sonuç iddiası üretilmeyecek.

## Öncelikli görevler

| Durum      | İş                          | Kabul ölçütü                                                                                |
| ---------- | --------------------------- | ------------------------------------------------------------------------------------------- |
| Tamamlandı | Sitemap üretimi             | SITE_URL tanımlı build geçer; dokuz URL ve doğru robots adresi                              |
| Tamamlandı | Galeri kırpması             | 14 görsel × iki ekran × iki tema = 56 başarılı kontrol; contain, oran ve tam görünüm        |
| Tamamlandı | 320 px mobil menü           | Dört etiket ayrı; 48 px yüksekliğinde dokunma alanları; tema düğmesi ayrı                   |
| Tamamlandı | Odak ve klavye gezinmesi    | Rota/anchor sonrası içerik odağı, proje aktif menüsü, erişilebilir form hatası              |
| Tamamlandı | Kontrast ve hareket tercihi | Tersiyer metin tokenları güçlendirildi; Motion, geçişler ve pointer etkileri tercihe bağlı  |
| Tamamlandı | SEO ve yayın çıktısı        | On statik HTML, sekiz paylaşım görseli, favicon, ortak canonical ayarı, 404 noindex/preview |
| Tamamlandı | Görsel yükleme              | Tek hero görseli, responsive WebP, boyut bilgileri ve ayrı proje detay paketi               |
| Tamamlandı | Ana sayfa ve Hakkımda       | Somut üretim özeti, güçlü ana eylem, gerçek profiller ve CV'den doğrulanan deneyim          |
| Tamamlandı | Proje detayları             | Yedi projede problem/çözüm/karar/sınır/kanıt; mevcut kod/demo bağlantıları ilk özette       |
| Tamamlandı | İletişim ve footer          | Mesaj metinleri, odaklanan hata, normal POST yedeği, davranışla uyumlu geri dönüş, sarma    |
| Tamamlandı | Bakım temizliği             | Kullanılmayan bölüm bileşenleri/stilleri ve dağıtım .DS_Store temizlendi                    |
| Tamamlandı | Son doğrulama               | Build/lint/test geçti; mobil/masaüstü ve iki tema kontrol edildi; ölçüm ve sonuç raporu var |

## Bilgi gerekiyor

Kullanıcıdan GitHub (`yigitataa`), LinkedIn (`yiğit-ata`) ve `Yigit_Ata_ATS_CV_Final.pdf` alındı. Profiller ve CV bağlantısı ana sayfa, Hakkımda, iletişim ve footer'da bulunur. PDF değiştirilmeden kopyalandı; byte/SHA-256 eşitliği kontrol edildi.

Kullanıcı “projeler aynı şekilde” dediği için üç proje seçme önerisi uygulanmadı; yedi proje mevcut sırası ve ağırlığıyla korundu.

| Durum           | Bilgi / yayın işi                                                                    | Etki                                                                          |
| --------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Bilgi gerekiyor | Gerçek yayın alan adı ve hosting                                                     | SITE_URL ve platform yönlendirmesi; yayın HTTP 404/canonical/sitemap kontrolü |
| Bilgi gerekiyor | Hedeflenen fırsat: staj, iş veya proje                                               | Ana sayfa daveti ve Hakkımda odağını daha özel hale getirmek                  |
| Bilgi gerekiyor | Proje bazında bizzat yapılan katkılar, öğrenme/karar örnekleri, doğrulanmış sonuçlar | Kişisel rol ve başarı iddiaları eklemek; mevcut sınırları güncellemek         |
| Bilgi gerekiyor | Paylaşılabilir demo adresi / video / örnek veri                                      | Kodu ve ekranı tamamlayan denenebilir kanıt                                   |
| Bekliyor        | Kullanıcının gerçek e-posta teslimat testi                                           | FormSubmit aktivasyonu, gelen kutusu/spam, Yanıtla adresi                     |
| Bekliyor        | Gerçek cihaz ve yayın ölçümü                                                         | Mobil klavye, hosting yönlendirmesi, Lighthouse ve kullanıcı performansı      |

Gerçek form teslimatı için alıcı gelen kutusu, spam klasörü ve Yanıtla adresi kullanıcı tarafından teyit edilmeli. Formun yerel testleri teslimatı kanıtlamaz. Yayın hosting HTTP 404 davranışı ve gerçek cihaz mobil klavye davranışı yerel tarayıcı kontrolünden ayrı doğrulanmalı.

## Diğer proje depolarındaki öneriler

- TECHball: izinli örnek veri, akış kaydı/demo ve sorgu doğrulama örneği.
- yatatodo: modelin eksik/yinelenen görevleri ve kapasite sınırını ele alma senaryoları; açık demo için API anahtarı mimarisi.
- YataQuizing: gerçek dosya şemasına uygun örnek JSON ve sayaç/geri dönüş testleri.
- YataClimate: ağ kesintisi, yeniden deneme ve arama iptali senaryoları.
- Yata Market: kalıcı ürün verisi veya yönetim yetkilendirmesiyle bir akışı tamamlamak; gerçek ürün görselleri.
- Kişisel Kitaplık: günlük arayüzü ve iki veritabanı arasında tutarlılık senaryoları.
- YataOil: ilan detayı ve yakıt entegrasyonunu uçtan uca doğrulama, fixture/canlı veri ayrımı.
- YapaytechTasks: kök README, proje tablosu, kurulum/ortam değişkenleri ve bilinen sınırlar.

## Doğrulama günlüğü

- 26 test, üç dosyada başarılı; ESLint ve Prettier başarılı.
- Normal build ve alan adı tanımlı build başarılı; tanımlı dalda dokuz sitemap URL'si ve robots denetlendi.
- JavaScript çalıştırılmadan on HTML dosyasında içerik/metaveri/görsel/CV bağlantıları denetlendi.
- Yerel preview'da dokuz doğrudan rota kendi HTML'ini sunuyor; bilinmeyen adres HTTP 404 dönüyor.
- 14 galeri görseli 320×568 ve 1440×900, açık/koyu temada kontrol edildi. [56 ölçüm](./galeri-dogrulama.json).
- Ana sayfa 320, 390, 768, 1024, 1280 ve 1440 px genişlikte iki temada ölçüldü; yatay taşma yok. [12 ölçüm](./ana-sayfa-dogrulama.json).
- Klavye ile proje bölümüne ve Hakkımda rotasına gidildi; odak sırasıyla work/main oldu. Formdaki boşluk mesajı gönderilmeden engellendi ve hatalı alana odaklandı. Alan odaktayken mobil kontroller gizlendi.
- Son üretim tarayıcı turunda yeni konsol hata/uyarı kaydı görülmedi. İlk turda bulunan yanlış preview HTML sunumu düzeltildi.
- Ayrıntılar ve kapsam sınırları: [Sonuç raporu](./UYGULAMA_SONUCU.md).
