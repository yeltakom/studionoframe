# Sergi eklemek ve düzenlemek

Her serginin **bir klasörü** var: `studio/sergiler/<sergi>/`
İçinde fotoğraflar ve tek bir metin dosyası: `sergi.txt`. Hepsi bu.

```
studio/sergiler/
  tirailleurs/
    sergi.txt        ← başlık, mekân, yıl, rol, hat, metin
    kapak.jpg        ← kapak (ya da alfabetik ilk fotoğraf)
    02.jpg
    03.jpg
```

Klasörü doldur, `Yayınla.command` dosyasına çift tıkla; 1–2 dakika sonra site güncel.
Fotoğrafları küçültmene, adlandırmana gerek yok — telefon HEIC dahil hepsini araç hallediyor.

---

## Üç düğme (bu klasörde, çift tık)

| Dosya | Ne yapar |
|---|---|
| `Yeni sergi.command` | Adı sorar, klasörü ve `sergi.txt`'yi açar |
| `Önizle.command` | Siteyi bilgisayarında açar (yayınlamadan bakmak için) |
| `Yayınla.command` | Klasörler → site → yayın |

İlk çift tıkta macOS "Terminal'i açmak istiyor musun" diye sorabilir; evet de.

---

## sergi.txt

```
Başlık: Tirailleurs: Trials and Tribulations
Mekân: HKW, Berlin
Yıl: 2026
Rol: Exhibition Architecture
Hat: archives
Ana sayfa: evet
Özet: Tek cümle. Google'da ve link paylaşımında görünür. Boşsa metnin ilk cümlesi kullanılır.

--- Açıklama ---
Proje sayfasındaki metin. Paragraflar boş satırla ayrılır.
*İtalik* için yıldız.

--- Almanca ---
Rol: Ausstellungsarchitektur
Özet:

Almanca metin. Boş bırakırsan o sergi Almanca sitede İngilizce metinle görünür — kırılmaz.
```

| Satır | Ne yazılır |
|---|---|
| `Başlık` | Serginin adı. Uçan/kısa ad falan yok; olduğu gibi. |
| `Mekân` | `Pera Museum, Istanbul` |
| `Yıl` | `2025` ya da `2018–2019`. Sıralama bu yıla göre. |
| `Rol` | `Exhibition Design & Installation Management` |
| `Hat` | Araştırma hattı — beş taneden biri: **displacement** (yerinden edilme) · **archives** (direniş arşivleri) · **monographs** (monografiler) · **collections** (koleksiyonlar) · **commons** (müşterekler). Katalog numarası buradan çıkar: 2.3 = archives hattının 3. işi. Türkçesini yazsan da anlar. |
| `Ana sayfa` | `evet` → bu serginin kapağı ana sayfadaki büyük fotoğraflarda döner. |
| `Özet` | İsteğe bağlı. |

Başlık, mekân ve yıl çevrilmiyor: sergi adları özel isim, iki dilde de aynı.

---

## Fotoğraflar

- Klasöre at, bitti. JPG, PNG, HEIC, TIFF — fark etmez; 1800 px'e küçültülüp numaralanır.
- **Sıra dosya adına göre.** `01, 02, 03…` diye adlandırırsan istediğin sırada gelir.
- **Kapak:** adı `kapak` ya da `cover` ile başlayan fotoğraf, yoksa alfabetik ilki.
  Kapak = Works tablosunda yanda beliren, ana sayfada dönen, link paylaşımında çıkan kare.
- Proje sayfasında ilk fotoğraf 3:2 büyük açılış; kalanlar ikili, her üçüncüsü tam genişlik.
- Klasörde **hiç** fotoğraf yoksa sitedeki fotoğraflara dokunulmaz. Bir fotoğraf bile
  varsa o serginin sitedeki fotoğraflarının **tamamı** klasördekilerle değişir.

---

## Var olan bir sergiyi düzenlemek

Klasörünü aç, `sergi.txt`'yi ya da fotoğrafları değiştir, `Yayınla.command`.

## Sergi silmek

Klasörü sil, yayınla. Araç "klasörü olmayan proje sitede duruyor" derse
`src/content/projects/<sergi>.md` dosyasını da kaldır (ya da bana söyle).

## Klasör adı = adres

`studio/sergiler/vardiya/` → `noframe.studio/projects/vardiya`.
Klasör adını sonradan değiştirme; eski link kırılır. Türkçe karakter ve boşluk kullanabilirsin,
adres kendiliğinden `a-z` ve tire olur.

---

## Terminalden (aynı şeyler)

| Komut | Ne yapar |
|---|---|
| `npm run new -- "Ad"` | Yeni sergi klasörü + sergi.txt |
| `npm run publish` | Klasörler → site → yayın |
| `npm run sync` | Aynısı ama yayınlamaz (önce yerelde bakmak için) |
| `npm run dev` | Siteyi bilgisayarında açar: http://localhost:4321 |
| `npm run export` | Siteyi klasörlere geri yazar — yalnızca `/admin/` panelinden düzenlediysen gerekir |

---

## Bir şey ters giderse

Yayınlama bir sorun görürse durur ve nedenini yazar — yarım iş yayınlanmaz:

- **"sergi.txt içinde eksik: venue"** → o satırı doldur.
- **"Hat tanınmadı"** → beş addan birini yaz.
- **"hiç fotoğraf yok"** → klasöre fotoğraf koy.
- **"Değişen bir şey yok"** → zaten güncel.

Yayınlanan her şey geri alınabilir; her yayın GitHub'da bir kayıt. Bir şeyi
bozduğunu düşünürsen söyle, geri alırım.
