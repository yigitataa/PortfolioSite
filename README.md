# Yiğit Ata portfolio

React, TypeScript, Vite ve Motion ile kişisel portföy. Mevcut deniz fotoğrafı, açık/koyu tema, cam gezinme ve yedi projenin sırası korunur.

## Çalıştırma

Node.js 22.22.2 veya üzeri bir 22.x sürümü ve npm gereklidir.

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test
npm run lint
```

## Yayın çıktısı

### Vercel ile yayınlama

Vercel'de GitHub deposunu içe aktarın. `vercel.json`, Vite altyapısını, `npm ci` kurulumunu, yayın komutunu ve `dist` çıktı klasörünü otomatik ayarlar. `package.json` üzerinden Node.js 22.x seçilir.

Vercel build'i, `VERCEL_PROJECT_PRODUCTION_URL` sistem değişkeninden kalıcı yayın adresini alıp canonical, paylaşım görselleri ve sitemap için kullanır. System Environment Variables açık olmalıdır. İstenirse `SITE_URL` ile kendi alan adınız belirtilebilir; bu değer önceliklidir. Build sonunda 10 statik sayfa ve sitemap doğrulanır. Eksik yayın adresi veya başarısız doğrulama yayını durdurur.

Her rota kendi HTML dosyasından sunulur. `dist/404.html`, Vercel'in özel 404 sayfasıdır; bilinmeyen adreslere HTTP 404 döner. Yayından sonra ana sayfa, `/about`, proje detayları, CV, bir statik görsel ve bilinmeyen bir adres canlı sunucuda kontrol edilmelidir.

### Diğer statik hosting sağlayıcıları

`npm run build` TypeScript ve istemci derlemesini çalıştırır; aynı React sayfalarını sunucuda ön üretip `dist/index.html`, `dist/about/index.html`, yedi `dist/work/<slug>/index.html` ve `dist/404.html` dosyasını yazar. İçerik, başlık, açıklama ve paylaşım görseli JavaScript çalışmadan da bulunur. İstemci bu içeriği hydrate eder. Proje detayları ve uzun anlatılar ayrı paket olarak yüklenir.

Gerçek yayın alan adı belli olduğunda:

```bash
SITE_URL=https://alan-adiniz.tld npm run build
SITE_URL=https://alan-adiniz.tld node scripts/verify-build.mjs
```

`SITE_URL`, istemci canonical adresi, statik canonical/OG adresleri, sitemap ve robots için aynı kaynaktır. `VITE_SITE_URL` de desteklenir. Alan adı verilmezse mutlak adres uydurulmaz ve sitemap üretilmez; istemci açık origin üzerinden metaveriyi tamamlar. Paylaşım botlarının mutlak görsel adresi alması için yayın build'inde bu değer gereklidir.

Hosting, ön üretilen her rota için kendi HTML dosyasını sunmalı; bilinmeyen adreslere `404.html` ile **HTTP 404** dönmelidir. Bütün adresleri 200 yanıtıyla ana sayfaya yönlendirmeyin. Vite preview geliştirme kontrolüdür; gerçek hosting durum kodunu kanıtlamaz. Netlify, Vercel veya başka hosting seçildiğinde platforma uygun yönlendirme yapılandırması eklenmeli ve doğrudan proje adresleri test edilmelidir.

Yerel preview, temiz rota adreslerini ilgili HTML dosyasından sunar ve bilinmeyen adreslere HTTP 404 döner. Sunucu açıkken bu davranışı da denetlemek için `PREVIEW_URL=http://localhost:4173 node scripts/verify-build.mjs` çalıştırılabilir.

`node scripts/verify-build.mjs`, JavaScript çalıştırmadan on HTML dosyasındaki içerik, metaveri, CV bağlantıları, yerel görseller ve 404 noindex durumunu denetler. Alan adı ile çalıştırıldığında dokuz sitemap rotasını ve canonical adreslerini de kontrol eder.

## İçerik ve görseller

- `src/data/site.ts`: metinler, GitHub, LinkedIn, CV ve iletişim.
- `src/data/projectEntries.json`: proje kaydı, sıra, durum, teknoloji, ekran ve bağlantıların tek kaynağı. Sitemap de bu dosyayı kullanır.
- `src/data/projectCaseStudies.ts`: problem, çözüm, teknik karar, mevcut sınırlar ve kanıt kapsamı.
- `src/data/projectNarratives.ts`: ayrıntılı anlatılar ve veri/gizlilik açıklamaları.
- `src/data/projectDetails.ts`: detay sayfasına gerektiğinde yüklenen içerik.
- `src/data/imageManifest.json`: kaynak görsel boyutları ve responsive WebP eşleştirmeleri.
- `src/projects/ProjectGallery.tsx`: tüm ekranı oranını bozmadan gösteren galeri; özgün dosyaya büyütme bağlantısı.
- `public/documents/yigit-ata-cv.pdf`: kullanıcının sağladığı PDF'nin değiştirilmemiş kopyası.
- `public/social/`: portföy ve yedi proje için 1200×630 paylaşım önizlemeleri.

Yeni proje için `projectEntries.json` kaydı, kısa vaka özeti ve uzun anlatı ekleyin. Görseller `public/projects/` altında durur. Yeni/yenilenen görsellerden kaynakları üretmek için Python ve Pillow ile:

```bash
python3 scripts/optimize-images.py
python3 scripts/generate-social-images.py
```

Bu dönüştürmeler build sırasında Python gerektirmez; üretilmiş dosyalar depoda bulunur. Sosyal görsel scripti macOS Arial font yolunu kullanır; başka sistemde `font_path` ayarlanabilir. Özgün ekranlar büyütme bağlantıları için korunur.

Yeni role, kişisel katkıya, test sonucuna, canlı demoya veya başarı metriğine ilişkin iddialar yalnız doğrulanmış bilgiyle eklenmelidir. Ekran görüntüleri canlı entegrasyonun veya ölçülmüş sonucun kanıtı olarak sunulmaz.

## İletişim

Form yalnız e-posta ve mesaj ister. JavaScript ile [FormSubmit AJAX](https://formsubmit.co/ajax-documentation) kullanır; JavaScript kapalıyken standart POST gönderimi destekler. E-posta kopyalama ve doğrudan e-posta bağlantısı da bulunur.

Yayın öncesi FormSubmit aktivasyonu alıcı tarafından tamamlanmalı; gerçek gönderimle gelen kutusu, spam ve Yanıtla adresi teyit edilmelidir. Bu düzenleme sırasında gerçek e-posta gönderilmedi. Birim testler servisi taklit eder, teslimatı kanıtlamaz.

AJAX gönderimi tekrar gönderimi engeller ve 20 saniyede zaman aşımına uğrar. Hatalarda alanlar korunur; aynı mesajın tekrarında referans korunur. Başarı ekranı servisin kabulünü bildirir, gelen kutusu garantisi vermez. Mesaj alanının hatası `aria-invalid` ve `aria-describedby` ile ilişkilidir. Alan odaktayken mobil dock gizlenir; gerçek cihaz klavyesi ayrıca denenmelidir.

## Kontroller ve kapsam

`npm run test` gezinme, form hata/yeniden deneme davranışı, azaltılmış hareket, 404 metaverisi ve gerçek sitemap üretim dalını kapsar. CSS galeri ve dar menü ölçümleri tarayıcıda ayrıca yapılır. Kullanıcının hareket tercihi MotionConfig ve bileşen hook'larıyla uygulanır.

TypeScript derleme önbellekleri `node_modules/.cache/` altında tutulur. `node_modules`, `dist`, `coverage` ve `*.tsbuildinfo` dosyaları Git'e eklenmez. Görsel üretim scriptleri içerik güncellemeleri için, testler ve build doğrulama scripti ise yayın kontrolleri için korunur.
