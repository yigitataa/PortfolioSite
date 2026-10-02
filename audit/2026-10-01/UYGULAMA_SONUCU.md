# Portfolio iyileştirme sonucu

1 Ekim 2026. Kaynak: [İlk inceleme](./PORTFOLIO_INCELEMESI.md). İş listesi: [Uygulama durumu](./UYGULAMA_DURUMU.md).

Deniz fotoğrafı, açık/koyu tema, mavi vurgu ve cam gezinme korundu. Kullanıcının tercihiyle yedi projenin sırası ve vitrindeki ağırlığı korunuyor. Düzenleme bu portfolio deposuyla sınırlı; diğer uygulama depolarındaki geliştirme önerileri iş listesinde ayrıca bulunuyor.

## Değişen davranışlar

### İlk üç hata

Sitemap artık TypeScript'i data URL üzerinden import etmiyor; proje slug'larını ortak JSON kaydından okuyor. Alan adı tanımlı build ana sayfa, Hakkımda ve yedi proje için dokuz doğru URL ve robots dosyası üretiyor. SITE_URL veya VITE_SITE_URL istemci ve statik canonical/share adreslerinde de aynı kaynağı kullanıyor.

Galeri sabit oranlı bir sahnede görseli contain ile gösteriyor. Ekranın üstü/altı kırpılmıyor; dosyanın özgün oranı korunuyor. Küçük önizlemeler ayrı 320 px kaynaklardan geliyor, “Görseli büyüt” bağlantısı özgün dosyayı açıyor.

320 px menüde dört bağlantı okunur ve ayrı. Dokunma alanlarının yüksekliği 48 px. Tema düğmesi sağ üstte ayrı bir cam yüzeyde. Ana sayfadaki CTA ve CV/profil bağlantıları 320×568 ekranda alt menüye değmeden görünüyor. Footer bağlantıları da satıra sarılarak taşıyor.

### İçerik ve kanıt

Ana sayfa artık React/TypeScript arayüzleri, Express API'leri ve veritabanlarıyla yapılan işleri tek somut cümlede açıklıyor. Ana proje eylemi mavi dolgu ile ayrışıyor; GitHub, LinkedIn ve CV ilk ekranda erişilebilir.

Sağlanan PDF değiştirilmeden `public/documents/yigit-ata-cv.pdf` olarak kopyalandı. Kaynak dosya ile byte eşitliği ve SHA-256 eşitliği doğrulandı. Hakkımda sayfasının ilk bölümüne CV'de bulunan eğitim, YAPAYTEK MERN stajı, İZAR/TEKNOFEST yazılım ekibi ve ilgili teknik çalışmalar eklendi. Kişisel hikâye ve AI kullanımına ilişkin açıklama korundu.

Her proje detayında beş kısa bölüm var: Problem, Çözüm, Teknik karar, Mevcut sınırlar, Ekranlar ve doğrulama kapsamı. Mevcut kaynak/demo bağlantıları ilk özete taşındı. Demo adresi bulunmayan projelerde açıkça belirtiliyor. Durumlar yerel prototip, demo veya eğitim projesi olarak ayrışıyor. Uzun eski anlatı erişilebilir bir açılır ayrıntı bölümünde duruyor; veri/gizlilik açıklaması görülebilir durumda.

Ekran görüntüleri, ölçülmüş başarı veya canlı entegrasyonun kanıtı olarak sunulmuyor. Yeni kullanıcı sayısı, performans metriği, kişisel rol veya başarı sonucu üretilmedi. Kişisel katkı ve daha güçlü kanıt, kullanıcıdan gelecek bilgiyle tamamlanabilir.

### Erişilebilirlik ve gezinme

Rota değişince ana içerik odaklanıyor. Bölüm bağlantısı ilgili bölüme odak taşıyor; hareket azaltma tercihinde anlık kaydırıyor. Proje detayında Projelerim menüsü aktif. Son proje dahil bütün detaylarda proje listesine dönüş bağlantısı var. Footer ana sayfada yukarı, diğer sayfalarda ana sayfaya dönüyor.

Hareket azaltma tercihi genel MotionConfig, gezinme vurgusu, ilerleme göstergesi, view transition ve pointer etkilerine uygulanıyor. Küçük metinler için açık temanın tersiyer tokenı koyulaştırıldı, koyu temanınki açıldı. Hesaplanan düz yüzey kontrastı açık ana zeminde yaklaşık 4,90:1; koyu ana zeminde 5,26:1 ve yükseltilmiş zeminde 4,76:1. Mobil profil bağlantılarının zemini fotoğraftan ayrıldı ve dokunma yüksekliği 44 px oldu. Bu token ölçümü bütün fotoğraf/cam arka planların bağımsız WCAG denetimi anlamına gelmez.

Formda doğal “Mesaj” metinleri kullanılıyor. Boşluklardan oluşan veya kısa mesaj gönderilmeden engelleniyor; hata aria-invalid/aria-describedby ile alana bağlı ve odak mesaja geliyor. Başarı ekranı servisin kabulünü bildiriyor. Normal POST yedeği, tekrar gönderimi önleme, zaman aşımı ve hata sonrası alanları koruma davranışları mevcut. Mobil alan odaktayken menü/tema kontrolleri gizleniyor.

### SEO, görüntüler ve bakım

Build on HTML üretir: ana sayfa, Hakkımda, yedi proje ve 404. Her dosyada JavaScript çalıştırılmadan doğru içerik, başlık, açıklama ve paylaşım metaverisi bulunur. Portföy ve projeler için sekiz 1200×630 paylaşım görseli ve YA favicon eklendi. 404 noindex; normal sayfaya dönünce metaverisi temizleniyor.

Üretim önizlemesi temiz adreslerde ilgili HTML'i sunar; bilinmeyen adrese HTTP 404 döner. İlk son kontrolde preview'ın `/work/techball-web` için ana sayfa HTML'i döndürdüğü yakalandı ve düzeltildi. Bu yanlış yanıtın oluşturduğu React hydration uyarısı son turda tekrarlanmadı. Gerçek hosting yine ayrıca ayarlanmalı.

14 proje ekranı ve iki hero fotoğrafı için responsive WebP kaynaklar üretildi; boyut bilgileri yerleşim sıçramasını azaltmak için kullanılıyor. Hero'da yalnız seçili temanın görseli bulunuyor. Proje detayları ve uzun anlatılar başlangıç JavaScript'inden ayrı yükleniyor. Kullanılmayan bölüm bileşenleri/verileri/stilleri ve dağıtıma sızan Finder dosyası temizlendi.

## Ölçülen dosya boyutları

| Kalem                         | İlk inceleme                  | Son çıktı                                                       |
| ----------------------------- | ----------------------------- | --------------------------------------------------------------- |
| Başlangıç JavaScript          | 452,23 kB / 145,92 kB gzip    | Yaklaşık 438,42 kB / 139,77 kB gzip                             |
| Proje detay paketi            | Başlangıç paketinin içinde    | 33,27 kB / 11,68 kB gzip; detayda yüklenir                      |
| CSS                           | 30,60 kB / 7,45 kB gzip       | Yaklaşık 29,90 kB / 7,17 kB gzip                                |
| 14 proje ekranının toplamı    | 5.533.337 byte özgün dosyalar | 640 px kaynaklar: 243.304 byte; 1600 px kaynaklar: 776.794 byte |
| İki hero fotoğrafının toplamı | 601.250 byte                  | 640 px kaynaklar: 57.008 byte; 1600 px kaynaklar: 184.660 byte  |

Görsel toplamları bütün dosyaların ilk açılışta indirildiğini göstermez. Kaynak seçimi ekran, yoğunluk ve önbelleğe bağlıdır. Özgün dosyalar büyütme bağlantıları için korunur; üretilmiş varyantlar depo boyutunu artırır. Mobil portre hero'da kadrajı net tutmak için geniş bir kaynak gerekebilir. Bu ölçümler Lighthouse, LCP, INP veya gerçek kullanıcı performansı sonucu değildir.

## Doğrulama

| Kontrol                        | Sonuç                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| TypeScript ve production build | Başarılı                                                                                               |
| Alan adı tanımlı build         | Başarılı; test origin'i yalnız denetim için kullanıldı                                                 |
| ESLint / Prettier              | Başarılı                                                                                               |
| Vitest                         | Üç dosyada 26 test başarılı                                                                            |
| Sitemap üretim dalı            | Gerçek script çağrısıyla dokuz rota/robots ve geçersiz origin testi başarılı                           |
| Statik HTML                    | On sayfada içerik, tekil metaveri, canonical/noindex, yerel dosyalar, CV ve proje bölümleri doğrulandı |
| Preview HTTP                   | Dokuz doğrudan rota doğru HTML; bilinmeyen adrese HTTP 404                                             |
| Galeri                         | 14 görsel × 320/1440 px × açık/koyu tema; 56 kontrol başarılı                                          |
| Ana sayfa                      | Altı ekran boyutu × iki tema; 12 ölçümde yatay taşma yok, bir hero görseli                             |
| Klavye / form                  | Bölüm odağı work, rota odağı main; boşluk mesajı engellendi, hata mesajı ve odak doğrulandı            |
| Son tarayıcı turu              | Yeni konsol hata/uyarı kaydı görülmedi                                                                 |

Ham ölçümler: [Galeri](./galeri-dogrulama.json), [Ana sayfa](./ana-sayfa-dogrulama.json). Son ekran görüntüleri bu klasörde `05-son-…` ve devamı adlarıyla bulunur.

## Kullanıcıdan veya yayın ortamından gerekenler

- Yayın alan adı ve hosting: SITE_URL ile son build, platform yönlendirmesi, gerçek HTTP 404, sitemap/canonical ve paylaşım botu kontrolü.
- Fırsat hedefi: staj, iş veya proje. Metin bu bilgi gelene kadar üretim odaklı ve genel.
- Proje başına kişisel katkı, karar/öğrenme örneği ve doğrulanmış sonuç. Ölçülmemiş sonuçları eklemek için varsayım yapılmadı.
- Varsa paylaşılabilir demo, kısa video veya izinli örnek veri.
- Gerçek form teslimat testi: FormSubmit aktivasyonu, gelen kutusu/spam ve Yanıtla adresi. Gerçek mesaj gönderilmedi; birim testler servisi taklit ediyor.
- Gerçek telefon klavyesi ve yayın performans ölçümü. Masaüstü tarayıcıdaki ekran boyutu kontrolü gerçek cihaz testi yerine geçmez.

Portfolio içinde uygulanabilir düzenlemeler tamamlandıktan sonra kalanlar bu bilgi ve yayın doğrulaması işleridir. Diğer uygulama depolarındaki işlere bu değişiklik kapsamında müdahale edilmedi.
