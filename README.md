# Cardly 🎴

Modern, şık ve kişiselleştirilebilir dijital kartvizit platformu.

**Live Website:** [cardly.qzz.io](https://cardly.qzz.io)

## ✨ Özellikler

- 🎨 **Çoklu Şablon Desteği** - Playful ve Earthy şablonları
- 🌓 **Karanlık/Aydınlık Mod** - Otomatik tema desteği
- 🌍 **Çok Dil Desteği** - Türkçe ve İngilizce
- 📱 **Responsive Tasarım** - Mobil uyumlu
- 🔗 **Özelleştirilebilir Linkler** - Sosyal medya, website, portfolio
- 📷 **Profil Fotoğrafı Yükleme** - Cloudinary entegrasyonu
- 🔐 **Firebase Auth** - Google ile giriş

## 🛠️ Teknolojiler

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Auth, Firestore)
- **Storage:** Cloudinary
- **Icons:** Material Symbols

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── templates/       # Şablon bileşenleri
│   │   ├── PlayfulTemplate.jsx
│   │   └── EarthyTemplate.jsx
│   ├── editors/         # Şablon düzenleyicileri
│   │   ├── PlayfulEditor.jsx
│   │   └── EarthyEditor.jsx
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   ├── AccountSettings.jsx
│   └── ...
├── context/
│   ├── AuthContext.jsx
│   └── LanguageContext.jsx
├── data/
│   └── templates.js
└── firebase.js
```

## 🎨 Şablonlar

### Playful
Eğlenceli, dinamik tasarım. Yüzen baloncuklar ve organik şekiller.

### Earthy
Doğal, organik renk paleti. Hareketli arka plan efektleri ve dokulu görünüm.

## ⚙️ Yapılandırma

### Firebase
`src/firebase.js` dosyasında Firebase yapılandırmanızı ayarlayın.

### Cloudinary
`src/components/AccountSettings.jsx` dosyasında:
```javascript
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';
const CLOUDINARY_UPLOAD_PRESET = 'your_preset';
```

## 📄 Lisans

MIT License

---

Made with ❤️ by Cardly Team
