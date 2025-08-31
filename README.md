# 📌 OfficeApp

Modern ekiplerin iletişim ve iş takibini kolaylaştırmak için geliştirilmiş bir **ofis yönetim uygulaması**.
Uygulama; sohbet kanalları, proje ve görev yönetimi, etkinlik planlama, bildirimler ve ekip üyeleri için profil yönetimi sunar.

---

## 🚀 Özellikler

* **Sohbet ve Kanallar**

  * Genel ve özel kanallar oluşturma
  * Mesaj gönderme, emoji ile tepki verme
  * Gerçek zamanlı kanal değişimi

* **Proje Yönetimi**

  * Proje ekleme ve listeleme
  * Görev oluşturma, güncelleme ve silme
  * Görevlerin durumlarını değiştirme (`Tamamlandı`, `Devam Ediyor`, `Beklemede`)
  * Proje ilerlemesini otomatik hesaplama

* **Ekip Yönetimi**

  * Ekip üyeleri listesi
  * Yeni üye ekleme (isim, rol, e-posta, telefon)
  * Çevrimiçi/çevrimdışı durum gösterimi

* **Etkinlik Takvimi**

  * Etkinlik ekleme (başlık, tarih, saat, açıklama)
  * Katılımcı belirleme
  * Yaklaşan etkinlikleri listeleme

* **Kullanıcı Profili**

  * Profil görüntüleme ve güncelleme
  * Çalışma durumu ve saat dilimi ayarlama

* **Bildirimler**

  * Yeni mesaj ve etkinlikler için bildirim sayacı

---

## 🛠️ Teknolojiler

* [React 19](https://react.dev/)
* [TailwindCSS](https://tailwindcss.com/)
* [lucide-react](https://lucide.dev/) → ikon seti
* [React Scripts](https://www.npmjs.com/package/react-scripts)
* Testing: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`

---

## 📦 Kurulum

1. Projeyi klonla:

```bash
git clone https://github.com/kullanici/office-app.git
cd office-app
```

2. Gerekli bağımlılıkları yükle:

```bash
npm install
```

3. Geliştirme sunucusunu başlat:

```bash
npm start
```

4. Tarayıcıda aç:
   👉 `http://localhost:3000`

---

## 📂 Proje Yapısı

```
office-app/
├── node_modules/          
├── public/                
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tailwind.config.js
```

---

## 📖 Kullanım Senaryoları

* 👨‍💻 **Proje Yöneticisi** → Görev atar, projeleri takip eder, etkinlik planlar.
* 🎨 **Tasarımcı / Geliştirici** → Sohbet kanallarında iletişim kurar, görev günceller.
* 📅 **Ekip Üyesi** → Etkinliklere katılır, kendi profilini yönetir.

---

## 🧪 Test Çalıştırma

```bash
npm test
```

Testler **React Testing Library** ile yazılmıştır.

---

## 🚀 Build Alma

```bash
npm run build
```

Build çıktısı `build/` klasöründe oluşturulur.

---

## 📌 Yol Haritası (Geliştirme Önerileri)

* 🔗 Backend entegrasyonu (ör. Firebase veya Node.js API)
* 🔔 Gerçek zamanlı bildirimler (WebSocket / Socket.io)
* 📱 Mobil uyumlu geliştirmeler
* 🌙 Karanlık mod desteği
* 🗂️ Proje dosyaları paylaşım alanı

---

## 📜 Lisans

Bu proje MIT lisansı ile sunulmuştur.
