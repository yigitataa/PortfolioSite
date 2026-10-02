# Yiğit Ata portföy incelemesi

1 Ekim 2026

Sitenin görsel kimliği güçlü. En büyük gelişim alanı, ziyaretçinin teknik yetkinliğini, projelerdeki kişisel katkını ve çalışmanın gerçek kapsamını hızla doğrulayabilmesi. Tasarımın oluşturduğu iyi ilk izlenimi daha güçlü mesleki kanıtlarla desteklemek gerekiyor.

Bu değerlendirmede, seni işe almayı veya seninle proje geliştirmeyi düşünen ziyaretçiyi esas aldım. Görsel tercihlerle doğrulanmış hataları ayrı değerlendirdim. Projelerin teknik derinliğine ilişkin yorumlar, portföydeki anlatı ve görsellere dayanıyor; yedi uygulamanın tamamını ayrıca çalıştırıp backend davranışlarını doğruladığım anlamına gelmiyor.

## İncelemenin kapsamı ve doğrulama

Yerel siteyi `http://localhost:5173` üzerinde inceledim. Ana sayfa, Hakkımda, yedi proje detay sayfası, galeri seçimleri, iletişim bölümü ve bulunamayan proje sayfası kontrol edildi. Açık ve koyu temalar görüldü. 320×568, 390×844, 768×1024, 1024×768, 1280×720 ve 1440×900 ekran örnekleri kullanıldı. Bu ekran örnekleri gerçek iPhone/Safari veya Android klavye testi yerine geçmez.

Kaynak kodu, proje verileri, tasarım tokenları, yönlendirme, SEO yönetimi, form gönderim kodu ve mevcut testler incelendi. GitHub deposu oturum açmadan açıldı; altı proje klasörü dışarıdan görünür durumdaydı.

| Kontrol                                                                      | Sonuç                                                      |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Normal `npm run build`                                                       | Başarılı; alan adı verilmediğinden sitemap üretimi atlandı |
| `npm run lint`                                                               | ESLint ve Prettier başarılı                                |
| `npm run test`                                                               | 2 test dosyasında 22 test başarılı                         |
| `SITE_URL=https://portfolio-audit.example node scripts/generate-sitemap.mjs` | Başarısız; bağıl modül çözümleme hatası                    |
| Gezilen sayfalarda yakalanan tarayıcı hata/uyarı kayıtları                   | Kayıt görülmedi                                            |
| İletişim formunun gerçek e-posta teslimatı                                   | Doğrulanmadı; gerçek mesaj gönderilmedi                    |
| Yayındaki alan adı, hosting, Google indeks durumu                            | Bu incelemenin kapsamında doğrulanmadı                     |
| Lighthouse / gerçek kullanıcı Core Web Vitals                                | Ölçülmedi                                                  |

Uygulama kaynak kodu değiştirilmedi. Kontrol için production çıktısı yeniden üretildi; bu rapor ve dört ekran görüntüsü eklendi.

## 1. Korunması gereken güçlü yönler

**Kişisel ve hatırlanabilir açılış.** Fotoğrafın, adın ve deniz atmosferi birlikte kişisel bir kimlik oluşturuyor. Genel bir stok görsel veya terminal efektiyle değiştirmek bu kimliği zayıflatır. Açık temadaki gündüz ve koyu temadaki akşam görünümü anlamlı bir tasarım ayrıntısı.

**Kontrollü görsel sistem.** Soğuk nötr zemin, mavi vurgu, yuvarlatılmış görseller ve cam navigasyon birbiriyle uyumlu. Cam etkisi bütün içeriği kaplamıyor; metinler daha sakin yüzeylerde kalıyor. Bu, projenin kendi tasarım vizyonuyla da örtüşüyor.

**Sade ana yapı.** Ana sayfada açılış, projeler ve iletişim var. Ziyaretçi çok sayıda menü veya dekoratif bölümle uğraşmıyor. Masaüstü menüsünün kaydırınca küçülmesi alan kazandırıyor. 1280×720 örneğinde iki açılış düğmesi de ilk ekranda görünüyordu.

**Çalışmayı gösteren görseller.** Yedi projenin toplam 14 ekran görüntüsü var. Projeler yalnızca başlık veya teknoloji listesi olarak sunulmuyor. Detaylarda küçük önizlemeler, seçili durum ve büyük görsel bağlantısı mevcut.

**Dürüst kapsam anlatımı.** Yerel prototip, demo, eksik günlük ekranı ve doğrulanmamış entegrasyonlar açıkça belirtiliyor. Gerçek ödeme, kullanıcı hesabı veya eşitleme olmayan projelerde bunlar varmış gibi davranılmıyor. Bu açıklık korunmalı.

**Birbirinden farklı teknik konular.** Portföy metinlerinde doğal dil sorgusu, veri tablosu, reducer, model yanıtı doğrulama, API entegrasyonu, ilişkisel ve doküman veritabanları gibi konular var. Bunlar bir öğrenci portföyüne içerik açısından iyi bir temel sağlıyor.

**Düzenli uygulama altyapısı.** İçerik `src/data` altında; proje kartı, galeri ve detay şablonu veriden üretiliyor. Renk ve ölçüler tokenlarla tanımlı. Yeni proje için bütün sayfanın yeniden yazılması gerekmiyor. Mevcut testler gezinme ve formun hata durumlarını da kapsıyor.

**Erişilebilirlik için düşünülmüş başlangıç.** İçeriğe geç bağlantısı, görünür odak stilleri, form etiketleri, alternatif görsel metinleri ve galeride `aria-pressed` mevcut. Form hatada içeriği koruyor, gönderim sırasında tekrar gönderimi engelliyor ve 20 saniyelik zaman aşımı uyguluyor.

## 2. İlk ekranda mesleki konumlandırma

“Bilgisayar Mühendisliği Öğrencisi” eğitim durumunu anlatıyor. “Sadece üretiyorum.” kişisel yaklaşımını anlatıyor. Ancak ziyaretçi ilk ekrandan hangi tür geliştirme yaptığını ve hangi konuda seninle çalışabileceğini yeterince hızlı çıkaramıyor.

Mottunu koruyarak yanına somut bir üretim cümlesi eklemek iyi olur. Örneğin mevcut projelerle uyumlu bir taslak:

> React ve TypeScript ile arayüzler; API ve veritabanlarıyla çalışan uygulamalar geliştiriyorum.

Bu cümle bir uzmanlık seviyesi iddiası içermez; ürettiğin işin türünü anlaşılır kılar. Eskişehir Osmangazi Üniversitesi ve 4. sınıf bilgisi kısa bir profil özetinde görünür olabilir. Staj, yeni mezun pozisyonu veya proje işbirliği hedefin varsa bunu gerçek durumuna göre açıkça yazmak gerekir. Mezuniyet tarihi ya da uygunluk durumu tahmin edilmemeli.

GitHub, LinkedIn ve CV alanları şu an boş. Bu, en yüksek etkili eksiklerden biri. Ziyaretçi teknik profilini, eğitim geçmişini ve başvuru için gerekli bilgileri tek adımda göremiyor. [Site verisi](/Users/yigitata/Desktop/portfoliosites/src/data/site.ts:10) bu alanları zaten destekliyor.

GitHub profil bağlantısı, mevcutsa LinkedIn ve güncel bir PDF CV eklenmeli. GitHub ile CV yalnız footer'da kalmamalı; açılışın yakınında veya kısa profil özetinde kolayca bulunmalı. Öncelikli düğme “Projelerimi incele” kalabilir. CV bağlantısı bununla yarışmayan ikinci düzey bir bağlantı olabilir.

## 3. Proje vitrininin seçiciliği

Yedi projenin tamamı `featured: true`. TECHball geniş kartıyla öne çıkıyor; diğer altı proje benzer ağırlıkta sunuluyor. Bu düzen kapsamı gösteriyor, fakat hangi üç işin seni en iyi temsil ettiğini ziyaretçinin kendisinin seçmesini gerektiriyor.

Ana vitrinde üç güçlü iş seçmek, kalanları daha kompakt bir devam alanında sunmak daha iyi bir sıralama sağlar. Mühendislik ve tam yığın geliştirme hedefinde TECHball, Yata Market ve Kişisel Kitaplık; ön yüz ağırlıklı hedefte TECHball, YataClimate ve YataQuizing öne çıkarılabilir. Kişisel Kitaplık seçilirse tamamlanmamış günlük arayüzü ilk özette görünmeli.

Kartlarda alt başlıklar yararlı. Buna ek olarak ziyaretçinin kararını kolaylaştıracak iki kısa bilgi gerekir: projenin durumu ve ayırt edici teknik konusu. Örneğin “Yerel prototip · Doğal dil sorgusu” veya “Eğitim projesi · PostgreSQL + MongoDB”. Uzun teknoloji yığınları veya her karta çok sayıda rozet eklemek gerekmez.

Proje modelinde `role` ve `status` alanları var; mevcut kayıtlarda doldurulmamış. Sonuçta bütün detaylarda genel “2026 / Proje” etiketi görülüyor, kişisel rolün görünmüyor. Tamamlanmış demo, yerel prototip ve geliştirme aşamasını ayıran bir durum sistemi daha açıklayıcı olur. Mevcut üç durum gerekirse gerçek proje kapsamını ifade edecek şekilde genişletilebilir.

Ana sayfa kapaklarında `object-fit: cover` kullanılıyor. Bu görsel oranını korurken ekranın bazı kısımlarını kesiyor. Fotoğrafta kabul edilebilir bir kırpma, uygulama ekranında işlevi gizleyebilir. Kapağı uygulamanın ana eylemini gösteren özel bir kadraj olarak hazırlamak gerekir. Detay galerisinde ise ekranın tamamı görülebilmeli.

## 4. Proje detayları: anlatıyı kanıta dönüştürmek

Mevcut sayfalar yaklaşık 309-486 kelime içeriyor. Tek başına bu uzunluk aşırı değil. Sorun, önemli bilgilerin “Projenin hikâyesi” altında beş uzun paragraf içinde ve masaüstünde dar bir sütunda kalması.

Metinler çoğunlukla uygulamanın ne yapabildiğini anlatıyor. Şu soruların yanıtı daha görünür olmalı: Bu problemi neden seçtin? Sen ne yaptın? En zor karar neydi? Hangi alternatifi neden kullanmadın? Çalıştığını nasıl doğruladın? Neyi öğrendin?

Bir detayın ilk ekranı proje adı, kısa problem tanımı, durum, kişisel katkı, teknolojiler ve demo/kaynak kod bağlantılarını içermeli. Devamında “Problem”, “Çözüm”, “Teknik karar”, “Doğrulama” ve “Sınırlar” gibi içerikle anlam kazanan kısa parçalar bulunmalı. Her sayfaya aynı uzun şablonu doldurmak yerine projenin en önemli bir veya iki kararına odaklanmak daha güçlü olur.

Kaynak kodu bağlantıları şu an anlatının sonunda. 390×844 örneğinde Yata Market bağlantısı sayfanın yaklaşık 3221. pikselinde, YataOil bağlantısı yaklaşık 3853. pikselindeydi. Bunlar, projeyi doğrulamak isteyen ziyaretçi için birkaç ekranlık ek kaydırma demek. Aynı bağlantı ilk özette de görünmeli. [Detay bileşeni](/Users/yigitata/Desktop/portfoliosites/src/projects/ProjectDetail.tsx:77) bağlantıları yalnız alt bölümde üretiyor.

Hiçbir projede canlı demo bağlantısı yok. Her uygulamayı üretime açmak şart değil. Hesapsız ve izinli örnek veriyle çalışan bir demo, kısa bir ekran kaydı veya kolayca tekrarlanabilir yerel kurulum da doğrulanabilir kanıt sağlar. Demo olmayan projenin durumu ilk ekranda anlaşılmalı.

Veri ve gizlilik açıklamaları değerli. Uzun ve savunmacı bir sunuma dönüşmemeleri için ilk özette kısa kapsam bilgisi, devamında ayrıntılı teknik not kullanılabilir. Bilinen sınırlar gizlenmemeli; okuyucunun problem ve çözümü kavramasını destekleyen sırada anlatılmalı.

Ölçüm eklenirse gerçek veri kullanılmalı. “Performansı %70 artırdım” gibi ölçülmemiş sonuçlar yazılmamalı. Test senaryoları, bir hata düzeltmesinin önce/sonra davranışı, ölçülmüş sorgu süresi veya küçük bir kullanıcı denemesinin gözlemleri daha güvenilir kanıtlardır.

## 5. Her proje için ayrı değerlendirme

| Proje            | Portföy açısından güçlü tarafı                                                                                   | En yararlı sonraki adım                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| TECHball web     | Çok ölçütlü arama, özelleştirilebilir tablo, taktik tahtası ve doğal dil sorgusunu birleştiren en ayırt edici iş | İzinli örnek veriyle bir akış videosu veya demo; kişisel katkı ve sorgu doğrulama örneği                    |
| yatatodo         | Basit görev listesinden ileri giden planlama ve model çıktısı denetimi                                           | Eksik, yinelenen veya kapasiteyi aşan AI yanıtının nasıl düzeltildiğini göstermek                           |
| YataQuizing      | Başlangıç, soru ve sonuçtan oluşan tamamlanmış kullanıcı akışı                                                   | Örnek JSON, canlı oturum demosu ve sayaç/geri dönüş/cevap davranışını doğrulayan senaryolar                 |
| YataClimate      | Veri yoğun arayüz, arama ve detay yüklemesini birleştiren çalışma                                                | Arama iptali ve toplu istek kararını görselleştirmek; çevrimdışı ve yeniden deneme durumlarını iyileştirmek |
| Yata Market      | React arayüzü ile Express veri akışını birlikte gösterebilmesi                                                   | Galeri kırpmasını düzeltmek; kalıcı ürün verisi ve yönetim erişimi gibi bir tamamlanma adımı seçmek         |
| Kişisel Kitaplık | PostgreSQL ile MongoDB arasında ilişkilerin ve silme kurallarının ele alınması                                   | İki veritabanını neden seçtiğini açıklamak; günlük arayüzü ve tutarlılık senaryosunu tamamlamak             |
| YataOil          | Dış kaynağın başarısızlığını ve veri güvenilirliğini ürünün parçası olarak ele alması                            | İlan detayı ve yakıt akışını uçtan uca doğrulamak; canlı ve fixture veri ayrımını görünür yapmak            |

**TECHball:** Vitrindeki büyük kartı hak ediyor. Buna karşılık kaynak kodu bağlantısı da demo bağlantısı da yok. Böylece en güçlü görünen iş aynı zamanda ziyaretçinin bağımsız olarak en zor değerlendirebildiği iş oluyor. Örnek bir soru, oluşan filtre/sorgu, bulunan adaylar ve açıklama arasındaki ilişkiyi göster. Oyuncu verisinin tamamını dağıtmadan aynı arayüz mantığını gösteren özgün örnek veri kullanılabilir. Bu bir veri hakkı hukuki değerlendirmesi değildir; portföyde zaten belirtilen kapsamı uygulanabilir demo önerisine dönüştürür.

**yatatodo:** “AI destekli yapılacaklar listesi” çok genel bir sunum. Asıl güçlü anlatı, modelin verdiği planı doğrulamak ve kullanıcı kapasitesine uydurmak. Atlanan görev veya yinelenen kimlik örneği kısa bir teknik vaka olabilir. Portföy metni API anahtarının tarayıcıda saklandığını söylüyor; herkese açık sürüm planlanırsa anahtar yönetimi ayrıca ele alınmalı. Bu not mevcut uygulamanın güvenlik denetimi yerine geçmez.

**YataQuizing:** Üç ekran gerçek bir baştan sona akış gösteriyor. Küçük ama tamamlanmış bir ürün örneği olarak sunulabilir. Soruya geri dönüldüğünde sayaç ve cevapların nasıl ele alındığını açıklamak, geliştirme kararını görünür yapar. Hazır bir örnek JSON ile ziyaretçi uygulamayı hemen deneyebilir.

**YataClimate:** Renkli şehir kartları dikkat çekiyor; ancak tam ekran görüntüsü küçük kartta okunamayacak kadar fazla bilgi taşıyor. Kapakta birkaç şehir ve detayın ana bilgisi öne çıkarılabilir. Teknik olarak toplu özet isteği, detayda ek veri yükleme ve önceki arama isteğini iptal etme kararları anlatıda iyi malzeme. “48 şehir” doğrulanabilir bir kapsam bilgisi; tek başına başarı metriği olarak kullanılmamalı.

**Yata Market:** E-ticaret demosu yaygın bir proje türü; farkı API sınırları, hata durumları ve veri tutarlılığı üzerinden göstermek gerekir. Görsellerdeki ürün alanlarının büyük bölümü metin/yer tutucu görünümünde; temsilî ürün görselleri sunumu tamamlar. Sunucu belleğindeki ürün verisi ve erişim kontrolü olmayan yönetim ekranı anlatıda açıkça belirtilmiş. Bir sonraki aşama için kalıcı veritabanı veya yönetim yetkilendirmesi gibi tek bir somut hedef seçmek, yeni bir benzer uygulama eklemekten daha güçlü olur.

**Kişisel Kitaplık:** Teknik görüşme için iyi bir proje. “İki veritabanı kullandım” cümlesi tek başına avantaj değil; bu seçimin getirisi ve işletme/tutarlılık maliyeti anlatılmalı. Tek bir ilişkisel veritabanı alternatifini neden seçmediğini açıklayabiliyorsan kararın değeri artar. Günlük ekranının eksikliği ve ortak transaction bulunmaması görünür kalmalı. Bir mimari çizimi ve silme kuralının doğrulama örneği etkili olur.

**YataOil:** Amaç anlaşılır, fakat ilk açıklamada bile entegrasyon kapsamının ayrıca doğrulanması gerektiği yazıyor. Bu, dürüst olmakla birlikte projenin güven düzeyini sınırlıyor. “Çalışan: marka ve ilan araması; doğrulanacak: detay ve yakıt entegrasyonu” gibi kısa kapsam özeti daha kolay taranır. Dış kaynak engellendiğinde gösterilen kullanıcı durumu da ekran görüntüsü olarak sunulabilir.

## 6. Hakkımda sayfası ve AI kullanımının sunumu

Sayfa yaklaşık 270 kelime. Okunabilir satır genişliği ve rahat satır aralığı var. Çocukluk merakı, üretme motivasyonu ve mühendisliğe bakış kişisel bir ses oluşturuyor. Bunları bütünüyle kaldırmak gerekmez.

Mesleki açıdan eksik kalan bölüm bugünkü durumun: hangi alanlarda çalışıyorsun, hangi bilgiye ne kadar hâkimsin, şu anda neyi öğreniyorsun, hangi fırsatlara açıksın? Üniversite ve sınıf bilgisi var; beklenen mezuniyet, varsa staj/iş deneyimi ve CV bağlantısı yok. Bunlar gerçek bilgiyle tamamlanmalı. Deneyim yoksa üretilecek bir zaman çizelgesi yerine gerçek projeler ve öğrenme çıktıları kullanılmalı.

“Bu portfolyoyu da tek satır kodu kendim yazmadan” ifadesi açık ve dürüst. Ancak işe alım amacıyla bakıldığında, ziyaretçinin aklında hangi kısmın sana ait olduğu ve neyi bağımsız olarak açıklayabildiğin konusunda belirsizlik bırakabilir.

AI kullanımını saklamak yerine katkını somutlaştırmak daha doğru: hangi gereksinimleri belirledin, hangi çıktıyı değerlendirdin, hangi hatayı fark ettin, hangi testi çalıştırıp sonucu yorumladın, hangi kavramı öğrendin? Bunları yalnız gerçekten yaptıysan sahiplen. “Mimari kararların tamamını ben verdim” gibi doğrulanmamış bir iddia, mevcut açıklıktan daha kötü olur.

Her seçili proje için küçük bir “Benim katkım ve öğrendiklerim” parçası, genel AI açıklamasından daha ikna edici olur. Kendi açıklayabildiğin bir reducer, veri modeli, sorgu doğrulaması veya hata senaryosu üzerinden somut örnek ver.

## 7. Görsel iyileştirmeler

Tasarımın temelini yeniden kurmaya gerek görünmüyor. En yararlı görsel değişiklikler, içerik hiyerarşisini destekleyen küçük düzeltmeler.

İki açılış düğmesi çok benzer cam yüzeylere sahip. “Projelerimi incele” daha belirgin bir dolgu veya kontrastla ana eylem olarak ayrılabilir. İletişim düğmesi daha hafif kalabilir. Fotoğraf, metin ve düğmelerin mevcut sol/sağ kompozisyonu korunabilir.

İlk ekran ile ilk proje arasındaki boşluk geniş. Hero tam ekran; proje bölümünün üstünde de büyük boşluk var. Fotoğrafın karakterini koruyup proje başlığını ve ilk kapağı daha erken göstermek, kısa sürede değerlendirme yapan ziyaretçiye yardımcı olur. Bölüm boşluklarını bütün siteye aynı oranda azaltmak yerine bu geçişi ayarlamak yeterli olabilir.

Hero başlığında Geist, diğer başlıklarda işletim sisteminin yazı tipi kullanılıyor. Bu bilinçli bir eşleştirme olabilir; ancak başlıkların farklı cihazlarda farklı karaktere bürünmesine neden oluyor. Ortak bir başlık ailesi belirlemek daha tutarlı olur. Gövde metninde sistem fontu kullanmak başlı başına kusur değildir.

Proje adlarının yazımı değişken: `yatatodo`, `YataClimate`, `Yata Market`, `TECHball web`. Markalar böyle adlandırıldıysa korunabilir; fakat kapak, başlık ve repository açıklamasında aynı yazım kullanılmalı. Düğmelerde iç gezinme için kullanılan ↗ işareti, dış bağlantı hissi veriyor. İç eylemlerde → veya sade metin; dış bağlantılarda ↗ daha anlaşılır bir ayrım oluşturur.

Footer'daki yerel saat kişilik katıyor, fakat işe alım açısından GitHub/CV bağlantıları kadar yararlı değil. Saatin kaldırılması zorunlu değil; bilgi önceliği düşük olmalı. Başka sayfalardaki “Yukarı dön” ana sayfanın başına gidiyor. Bu durumda “Ana sayfaya dön” etiketi eylemi daha doğru açıklar.

## 8. Doğrulanmış yerleşim sorunları

**Galeri görseli çerçeveden büyük hesaplanıyor.** Galeri kapsayıcısında sabit `aspect-ratio`, grid yerleşimi ve `overflow: hidden` var. İç görselde `object-fit: contain` bulunmasına rağmen görüntünün yüksekliği kapsayıcıya sınırlandırılmıyor. `contain`, yalnız kendi kutusundaki görüntüye uygulanıyor; görsel elemanının kutusu çerçeveden büyükse dış kırpmayı engellemiyor.

1440×900 örneğinde TECHball Scout AI çerçevesi yaklaşık 358 px, iç görsel yaklaşık 408 px yüksekliğindeydi. 390×844 örneğinde Yata Market çerçevesi yaklaşık 166 px, görsel 312 px yüksekliğindeydi. Sonuçta katalog ekranının önemli bir bölümü görünmüyor. [İlgili CSS](/Users/yigitata/Desktop/portfoliosites/src/styles/base.css:924).

Düzeltmede görsel elemanının boyutu çerçeveye açıkça bağlanmalı veya galeri doğal görsel oranını kullanmalı. Grid içindeki minimum boyut davranışı da kontrol edilmeli. Başarı ölçütü: 14 görselin her biri tüm içeriğiyle görünür, oran bozulmaz ve seçilen görsel değişince sayfa düzeni sıçramaz. Büyük görsel bağlantısı bu hatanın yerine geçen bir çözüm değildir.

![Yata Market mobil galerisinde kırpma](/Users/yigitata/Desktop/portfoliosites/audit/2026-10-01/03-mobil-galeri-kirpma.jpg)

**320 px alt menüde metinler sıkışıyor.** Menü bağlantı kutuları 55 px genişliğe düşüyor. “Projelerim” ve “Hakkımda” yazıları mevcut iç boşluklarla rahat sığmıyor; ekranda aralarındaki ayrım kayboluyor. “Ana sayfa” iki satıra geçiyor. Bu, sayfanın genelinde yatay taşma olduğu anlamına gelmiyor; sorun menü içindeki metin düzeninde.

Çözüm, dar kırılımda tema düğmesini menüden ayırmak, kısa ve tutarlı etiketler kullanmak veya gezinmeyi farklı düzenlemek olabilir. Sadece fontu küçültmek okunabilirliği zayıflatır. Etiket değişikliği uygulama aşamasında ürün tercihi olarak değerlendirilmelidir. [Menü CSS'i](/Users/yigitata/Desktop/portfoliosites/src/styles/base.css:1157).

![320 px menü metinlerinin sıkışması](/Users/yigitata/Desktop/portfoliosites/audit/2026-10-01/02-mobil-menu-320.jpg)

390 px örneğinde form tek sütunda okunabilir durumdaydı. Dokunma alanları çoğunlukla 44-48 px veya daha yüksek. Gerçek mobil klavye açıldığında alt menünün giriş ve gönderme alanlarını örtüp örtmediği ayrıca denenmeli.

## 9. İletişim deneyimi

Yalnız e-posta ve mesaj istemek iyi bir karar. Gereksiz ad, telefon, konu listesi ve bütçe alanları ilk iletişimi zorlaştırır. Doğrudan e-posta ve kopyalama düğmesi alternatif sunuyor.

“Bir talep bırak”, “Talebi gönder” ve talep numarası bir destek masası çağrışımı yapıyor. Kişisel portföyde “Mesaj bırak” ve “Mesajı gönder” daha doğal olabilir. Referans gerçekten yazışma takibinde kullanılacaksa korunabilir. Ayrı bir durum sorgulama sistemi varmış izlenimi verilmemeli.

Kodu ve README'yi incelediğimde gerçek teslimatın kurulum sırasında doğrulanmadığı belirtiliyor. Servisin ilk kullanımdaki e-posta onayı kendi [kurulum belgesinde](https://formsubmit.co/) de bulunuyor. Aktivasyonun şu an tamamlanıp tamamlanmadığını bu inceleme belirlemedi.

Yayına hazırlıkta gerçek gönderimle alıcı gelen kutusu, spam klasörü ve Yanıtla adresi doğrulanmalı. Mevcut 22 testin içindeki form testleri servisi taklit ediyor; gelen kutusuna teslimi kanıtlamıyor. Kod, servisin olumlu yanıtını gelen kutusu garantisiyle eşitlememeye dikkat ediyor. Bu yaklaşım korunmalı.

FormSubmit'in aracı olduğu ve e-posta adresinin yanıt için kullanıldığı metinde açık. Bu iyi bir başlangıç. Kullanım büyürse mesaj saklama/işleme bilgisi ve spam denetimi gerçek ihtiyaç üzerinden ele alınabilir. Bu inceleme hukuki uygunluk değerlendirmesi değildir.

Alan bazlı hata ilişkileri geliştirilebilir: hata ilgili alanın hemen yanında görünmeli, gerektiğinde `aria-invalid` ve `aria-describedby` ile bağlanmalı. Yanıt süresi yazılacaksa gerçekten sürdürülebilir bir süre söylenmeli.

## 10. Erişilebilirlikte tamamlanması gerekenler

**Küçük metin kontrastı:** Açık temada `--text-tertiary` ile `--bg` arasındaki oran, token renklerinin sRGB bağıl parlaklığıyla hesaplandığında yaklaşık 4,315:1. Küçük etiketlerde normal metin için gereken 4,5:1 eşiğinin altında. Bu renk Hakkımda/404 etiketlerinde, proje bilgilerinin küçük başlıklarında ve görsel sayacında kullanılıyor. Ana gövde metni aynı sorunla değerlendirilmemeli; daha koyu `--text-secondary` kullanıyor. [W3C kontrast ölçütü](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) ve [renk tokenları](/Users/yigitata/Desktop/portfoliosites/src/styles/tokens.css:7).

**Rota değişiminde odak:** Hakkımda bağlantısına geçince sayfa başa kaydırılıyor, fakat klavye odağı navigasyondaki “Hakkımda” bağlantısında kalıyor. Yeni ana içeriğe odak aktarma ve sayfa değişimini anlaşılır biçimde duyurma iyileştirilmeli. Bu gözlem tek başına tam bir WCAG uygunsuzluk kararı değildir. [Sayfa kabuğu](/Users/yigitata/Desktop/portfoliosites/src/components/layout/PageShell.tsx:13).

**Azaltılmış hareket kapsamı:** Hero, reveal, manyetik hareket ve View Transition için tercih dikkate alınmış. FloatingNav `layout` animasyonu ve aktif menü göstergeleri ise kaynakta koşulsuz spring geçişleri kullanıyor; ScrollProgress de koşulsuz `useSpring` kullanıyor. CSS sürelerini sıfırlamak bütün JavaScript animasyonlarını kapatmaz. Ortak hareket politikası ve gerekli hook kontrolleri eklenmeli. Motion'un [erişilebilirlik rehberi](https://motion.dev/docs/react-accessibility) `MotionConfig reducedMotion="user"` ile transform/layout geçişlerini kullanıcı tercihine bağlamayı açıklıyor.

**Proje sayfasında yön bilgisi:** Detay sayfalarında “Projelerim” menüsü aktif görünmüyor. Bu sayfalar da proje gezinmesinin parçası; bölüm göstergesinin tutarlı olması yön bulmayı kolaylaştırır.

Klavye ve ekran okuyucu için bütün site sertifikalandırılmadı. Gözlenen olumlu yapı ile kalan test ihtiyacı birbirine karıştırılmamalı.

## 11. Teknik altyapı, performans ve SEO

**Yayın hazırlığında gerçek sitemap hatası:** `SITE_URL` verildiğinde üretim scripti `projects.ts` dosyasını JavaScript'e çevirip `data:` URL olarak import ediyor. Bu dosya `./projectNarratives` bağımlılığı taşıyor. Node, `data:` tabanından bağıl dosya importunu çözemediği için `ERR_UNSUPPORTED_RESOLVE_REQUEST` hatası oluşuyor. Normal derlemede alan adı verilmediğinden bu kod dalı çalışmıyor ve hata saklı kalıyor. [Script](/Users/yigitata/Desktop/portfoliosites/scripts/generate-sitemap.mjs:21).

Bu önce düzeltilmeli. Proje slug'larını saf bir rota verisinden almak veya bağımlılıkları da çözen bir derleme yaklaşımı kullanmak mümkün. Başarı ölçütü: alan adı tanımlı derleme geçer; sitemap ana sayfa, Hakkımda ve yedi proje için toplam dokuz doğru URL içerir; robots doğru sitemap adresini gösterir.

**Paylaşım ve tarama metaverisi:** Rota başlıkları, açıklamalar ve canonical React çalıştıktan sonra güncelleniyor. Başlangıç HTML'i bütün rotalarda genel portföy başlığını taşıyor. `og:image`, `twitter:image` ve favicon yok. Proje linki paylaşımında projeye özgü önizleme güvenilir biçimde hazırlanmış değil. [SEO bileşeni](/Users/yigitata/Desktop/portfoliosites/src/app/Seo.tsx:29), [HTML](/Users/yigitata/Desktop/portfoliosites/index.html:14).

Her rota için statik HTML ve uygun paylaşım görseli üretmek değerlendirilmeli. Google JavaScript çalıştırabilir; bununla birlikte bütün botlar çalıştırmaz ve Google da ön üretimi yararlı bir yaklaşım olarak açıklıyor. Bu, mevcut sitenin kesin indekslenmeyeceği iddiası değildir. [Google JavaScript SEO belgesi](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

**Canonical alan adı:** `site.canonicalUrl` boş olduğu için adres, açıldığı origin'den üretiliyor. Geliştirmede bu anlaşılır. Yayında tercih edilen alan adının, yönlendirmelerin ve sitemap alan adının tutarlı olması gerekir. `SITE_URL` kullanmak şu an site verisini otomatik doldurmuyor.

**404 ve fallback:** Kullanıcı için bulunamayan sayfa var; fakat SEO bileşeni `noindex` üretmiyor. Hosting bütün adresleri 200 durumuyla index dosyasına yönlendirirse soft-404 oluşabilir. Gerçek hosting davranışı ayrıca doğrulanmalı. Google'ın aynı [JavaScript SEO belgesi](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) anlamlı HTTP durumlarını ve istemci hata sayfasında `noindex` yaklaşımını açıklıyor. Normal sayfaya dönülünce hata sayfası metaverisi de temizlenmeli.

**JavaScript kapalı içerik:** `noscript` alanında “İletişim bilgilerim eklendiğinde burada görünecek” yazıyor; oysa e-posta zaten tanımlı. Bu yedek içeriğe gerçek e-posta, GitHub ve temel proje bağlantıları eklenmeli. Rota bazlı ön üretim yapılırsa bu yedek yapı da gözden geçirilebilir.

**Ölçülen dosya boyutları:** Production ana JavaScript dosyası 452,23 kB; gzip boyutu 145,92 kB. CSS 30,60 kB; gzip 7,45 kB. Proje görsellerinin tümü yaklaşık 5,28 MiB. İki hero görseli birlikte yaklaşık 587 KiB. Bu toplamlar ilk açılışta hepsinin indirildiği anlamına gelmez; proje kapaklarında lazy loading var.

Hero'da açık ve koyu görseller birlikte yükleniyor; tarayıcıda ikisinin de yüklendiği görüldü. Yüksek öncelik açık görsele verilmiş; koyu temada da açık görsel öncelik alıyor. Görünür tema görselini önce yükleyip diğerini daha sonra ön yüklemek iyi bir denge sağlayabilir.

Görsellerde responsive kaynaklar yok. Mobil, büyük kaynak dosyasını kullanıyor. Okunabilirlik korunarak WebP/AVIF ve farklı genişlikler denenebilir. Detay sayfaları ve bütün proje anlatıları aynı başlangıç JavaScript'inde yer alıyor; gerekirse rota bazlı ayırma veya statik ön üretim değerlendirilebilir. Framework değiştirmek ilk adım olmak zorunda değil.

Gerçek performans sonucu için yayındaki mobil ölçüm gerekir. İyi Core Web Vitals hedefleri LCP ≤2,5 sn, INP ≤200 ms ve CLS ≤0,1; değerlendirme gerçek ziyaretlerin yüzde 75 dilimine dayanır. Bu inceleme bu değerlerin sağlandığını iddia etmiyor. [Google Web Vitals rehberi](https://web.dev/articles/vitals).

**Bakım ayrıntıları:** Ana sayfada kullanılmayan Intro, Capabilities, Experience ve AboutTeaser bileşenleri ile ilişkili CSS bulunuyor. Bunların bilinçli olarak geleceğe mi bırakıldığı belirlenmeli; gereksiz stiller zamanla temizlenebilir. `public/.DS_Store` production çıktısına kopyalanıyor; dağıtımdan çıkarılmalı. Bunlar sitemap ve galeri hatalarından düşük öncelikli.

**Test kapsamı:** Geçen testler olumlu. Yine de sitemap'in alan adı tanımlı dalı, gerçek CSS galeri boyutları ve gerçek mobil menü düzeni mevcut birim testlerle yakalanmamış. Test sayısını artırmak yerine bu üç somut hata sınıfını kapsayan kontroller daha yararlı olur. JSDOM yerleşim testi yerine tarayıcıda görsel/boyut doğrulaması gerekir.

## 12. GitHub sunumu

[YapaytechTasks deposu](https://github.com/yigitataa/YapaytechTasks) oturum açmadan görünüyordu. Portföy bağlantılarının hedeflediği `01`, `02`, `03`, `04-05`, `DB-Task-1` ve ilan/yakıt klasörleri listeleniyordu. Bu olumlu.

Depo kökünde README görünmüyordu; açıklama, website ve topic alanları da doldurulmamıştı. Portföyden çıkan ziyaretçi yeni bir bağlam kurmak zorunda kalıyor. Kök README'de proje adı, klasör yolu, durum, teknolojiler, demo/kurulum ve portföy detay bağlantısını gösteren kısa bir tablo olmalı. `01` gibi klasörleri sırf görünüm için yeniden adlandırıp mevcut bağlantıları bozmak gerekmez.

Seçili işlerde kurulum adımları, ortam değişkeni örnekleri, örnek veri, test komutları ve bilinen sınırlar kolay bulunmalı. Yıldız veya takipçi sayısı proje kalitesinin gerekli bir ölçütü olarak görülmemeli.

## 13. Etkisine göre uygulama sırası

| Öncelik | İş                                                       | Başarılı olduğunun somut işareti                                 |
| ------- | -------------------------------------------------------- | ---------------------------------------------------------------- |
| İlk     | Sitemap üretimini düzelt                                 | Alan adı tanımlı build ve dokuz URL'li sitemap başarılı          |
| İlk     | Galeri kırpmasını düzelt                                 | 14 ekranın tamamı telefon ve masaüstünde görünür                 |
| İlk     | 320 px menü düzenini düzelt                              | Etiketler birbirine değmeden rahat okunur                        |
| İlk     | GitHub / LinkedIn / CV bilgilerini tamamla               | Profesyonel profil ve CV bir adımda erişilebilir                 |
| İlk     | Formun gerçek teslimatını doğrula                        | Alıcı gelen kutusu ve Yanıtla adresi teyit edilmiş               |
| Sonraki | Üç seçili proje belirle                                  | Ziyaretçi en temsilî işleri hemen ayırt eder                     |
| Sonraki | Rol, durum ve kaynak/demo bağlantılarını ilk özete al    | Teknik kapsam ve kanıt için uzun kaydırma gerekmez               |
| Sonraki | Seçili projelerde karar ve doğrulama örnekleri ekle      | Okuyucu kişisel katkını ve öğrenme düzeyini anlayabilir          |
| Sonraki | Açılış ve Hakkımda mesleki özetini güçlendir             | Ne yaptığın ve hedefin ilk okumada anlaşılır                     |
| Sonraki | Küçük metin kontrastı, odak ve hareket tercihini tamamla | Kullanıcı tercihleriyle tutarlı, okunabilir gezinme              |
| Devam   | Rota metaverisi, paylaşım görselleri, favicon ve 404 SEO | Linkler doğru önizlemeyle paylaşılır ve hatalar doğru ele alınır |
| Devam   | Görsel kaynakları, paketleme ve kullanılmayan stiller    | Ölçümle doğrulanmış veri/başlangıç maliyeti azalması             |

En değerli içerik yatırımı, üç projenin anlatısını ve kanıtını derinleştirmek. Mevcut yedi işe benzeyen sekizinci bir küçük proje eklemekten önce bir işi uçtan uca tamamlamak daha güçlü bir mesleki sinyal verir.

Her seçili proje için kullanıcı bir şeyi deneyebilmeli veya kısa videoda görebilmeli; sen de bir teknik kararı, bir hata senaryosunu ve bir öğrenme çıktısını açıklayabilmelisin. Portföyün görsel kimliği bu kanıtları destekleyecek kadar güçlü bir temele sahip.

## Ek masaüstü kanıtları

![Masaüstü koyu tema açılışı](/Users/yigitata/Desktop/portfoliosites/audit/2026-10-01/01-masaustu-koyu.jpg)

![Masaüstü proje detayı](/Users/yigitata/Desktop/portfoliosites/audit/2026-10-01/04-masaustu-proje-detayi.jpg)
