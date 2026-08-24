# Sergi eklemek ve düzenlemek

Sitenin içeriği iki yerden geliyor:

| Ne | Nerede |
|---|---|
| Metinler (başlık, mekân, yıl, rol, açıklama) | `studio/projects.csv` — tablo, Numbers veya Excel'de açılır |
| Fotoğraflar | `studio/photos/<proje-adı>/` — ham fotoğrafları buraya at |

Tabloyu doldurup fotoğrafları klasöre atıyorsun, tek komut siteyi güncelliyor.
Fotoğrafları küçültmene, yeniden adlandırmana gerek yok — komut hallediyor.

---

## Yeni sergi eklemek

Terminali bu klasörde aç (`studionoframe`), sonra:

```bash
npm run new -- "Serginin Adı"
```

Bu komut tabloya boş bir satır ekler ve fotoğrafları için bir klasör açar. Sonra:

1. **Fotoğrafları at** → `studio/photos/serginin-adi/`
   Sıralama dosya adına göre: `01.jpg, 02.jpg…` ya da fotoğrafların kendi adları.
   **İlk fotoğraf kapak olur** — listede imlecin ucunda görünen ve proje
   sayfasını açan kare odur.
2. **Tabloyu doldur** → `studio/projects.csv`, en üstteki satır.
3. **Yayınla:**

```bash
npm run publish
```

Site 1–2 dakika içinde güncellenir.

---

## Var olan bir sergiyi düzenlemek

Metni değiştireceksen: tabloyu aç, düzelt, `npm run publish`.

Fotoğrafları değiştireceksen: `studio/photos/<proje-adı>/` klasörünü oluştur
(ya da varsa içini değiştir) ve istediğin fotoğrafları koy, sonra yayınla.
**Dikkat:** o klasör varsa, o projenin sitedeki fotoğraflarının tamamı silinip
klasördeki fotoğraflarla değiştirilir. Klasörü hiç açmazsan sitedeki
fotoğraflara dokunulmaz.

---

## Tablodaki sütunlar

| Sütun | Ne yazılır |
|---|---|
| `order` | Ana sayfadaki sıra. 1 en üstte. |
| `slug` | Adresi belirler: `noframe.studio/projects/vardiya`. Bir kez belirlensin, sonra değiştirme — eski link kırılır. |
| `title` | Serginin adı. |
| `venue` | Mekân: `Pera Museum, Istanbul` |
| `year` | `2025` ya da `2018–2019` |
| `role` | `Exhibition Design & Installation Management` |
| `summary` | Tek cümle. Google'da ve link paylaşımlarında görünür. Boş bırakırsan açıklamanın ilk cümlesi kullanılır. |
| `description` | Proje sayfasındaki metin. Uzun olabilir. `*italik*` yazabilirsin. |
| `role_de` | Rolün Almancası: `Ausstellungsgestaltung & Aufbauleitung` |
| `description_de` | Açıklamanın Almancası. **Boş bırakırsan** o sergi Almanca sitede İngilizce metinle görünür — kırılmaz. |

Başlık, mekân ve yıl çevrilmiyor: sergi adları özel isim, iki dilde de aynı kalıyor.
Almanca özet (`summary_de`) boşsa Almanca açıklamanın ilk cümlesi kullanılır.

---

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run new -- "Ad"` | Yeni sergi satırı + fotoğraf klasörü açar |
| `npm run publish` | Tablo + fotoğraflar → site → yayına gönderir |
| `npm run sync` | Aynısını yapar ama yayına göndermez (önce yerelde görmek için) |
| `npm run dev` | Siteyi kendi bilgisayarında açar: http://localhost:4321 |
| `npm run export` | Siteyi tabloya geri yazar (İngilizce + Almanca) |

`npm run export` şu durumda gerekli: siteyi tarayıcıdaki panelden
(`/admin/`) veya doğrudan dosyadan düzenlediysen. Tabloya dokunmadan önce
bunu çalıştır, yoksa tablo eski halini geri basar.

---

## Bir şey ters giderse

`npm run publish` bir sorun görürse durur ve nedenini yazar — yarım iş
yayınlanmaz. En sık çıkanlar:

- **"venue boş bırakılamaz"** → tabloda o satırın eksik sütununu doldur.
- **"Aynı slug iki kez var"** → iki satıra aynı `slug` yazılmış, birini değiştir.
- **"hiç fotoğraf yok"** → `studio/photos/<slug>/` klasörünü aç ve fotoğraf koy.

Yayınlanan her şey geri alınabilir: her yayın GitHub'da bir kayıt olarak
duruyor. Bir şeyi bozduğunu düşünürsen söyle, geri alırım.
