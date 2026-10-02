# Proje ekran görüntüleri

Yedi projeye toplam **14 gerçek ekran görüntüsü** eklendi. Her projenin ilk görseli kartında ve detay sayfasındaki galeride görünür; diğer görseller galeri önizlemelerinden seçilebilir. Masaüstünde galeri anlatımın solunda kalır, küçük ekranlarda metinden önce gelir. Yatatodo için gönderilen tek görsel hem görev listesini hem günlük planı gösteriyor. YataQuizing için üç ayrı ekran gönderildi; üçünü de kullandık.

## TECHball web

1. `public/projects/techball-web/01-oyuncular.png` — eklendi: filtrelenmiş oyuncu tablosu ve taktik tahtası. Proje kartının ve detay sayfasının kapak görseli.
2. `public/projects/techball-web/02-scout-ai.png` — eklendi: Scout AI sorgu yanıtı ve oyuncu sonuçları. Detay sayfasının ikinci görseli.

## 01 · yatatodo

1. `public/projects/yatatodo/01-gorevler-ve-plan.png` — eklendi: görev listesi ve oluşturulmuş günlük plan.

## 02 · YataQuizing

1. `public/projects/yataquizing/01-quiz-secimi.png` — eklendi: quiz seçimi ve JSON dosyası yükleme.
2. `public/projects/yataquizing/02-soru.png` — eklendi: süreli soru ve cevap seçenekleri.
3. `public/projects/yataquizing/03-sonuc.png` — eklendi: skor ve cevap özeti.

## 03 · YataClimate

1. `public/projects/yataclimate/01-sehirler.png` — eklendi: öncelikli şehir kartları ve anlık hava özetleri.
2. `public/projects/yataclimate/02-sehir-detayi.png` — eklendi: Bursa detayı ve saatlik tahmin.

## 04-05 · Yata Market

1. `public/projects/yata-market/01-katalog.png` — eklendi: ürün kataloğu ve filtreler.
2. `public/projects/yata-market/02-sepet.png` — eklendi: sepet ve sipariş özeti.

## DB-Task-1 · Kişisel Kitaplık

1. `public/projects/kisisel-kitaplik/01-kitapligim.png` — eklendi: kitaplık, arama ve filtreler.
2. `public/projects/kisisel-kitaplik/02-yazarlar.png` — eklendi: yazar listesi ve düzenleme formu.

## Task-İlan-Yakıt-Hesaplayıcı-App · YataOil

1. `public/projects/yataoil/01-ilanlar.jpeg` — eklendi: Audi ilan listesi.
2. `public/projects/yataoil/02-maliyet.jpeg` — eklendi: araç detayı ve yakıt maliyeti hesabı.

## Görüntüleri siteye bağlama

Yeni bir görsel geldiğinde `public/projects/` altındaki ilgili proje klasörüne koyun. `src/data/projects.ts` içindeki `cover.src` ilk görüntüyü, `gallery` ise diğerlerini tutar. `alt` metni görüntünün gerçek içeriğini anlatmalıdır.
