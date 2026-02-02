# Cardly 🎴

Modern, stylish and customizable digital business card platform.

**Live Website:** [cardly.qzz.io](https://cardly.qzz.io)

## ✨ Features

- 🎨 **Multiple Templates** - Playful and Earthy designs
- 🌓 **Dark/Light Mode** - Automatic theme support with toggle
- 🌍 **Multi-Language** - Turkish and English
- 📱 **Responsive Design** - Mobile-friendly
- 🔗 **Customizable Links** - Social media, website, portfolio
- 📷 **Profile Photo Upload** - Cloudinary integration
- 🔐 **Firebase Auth** - Google sign-in

## 🛠️ Technologies

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Auth, Firestore)
- **Storage:** Cloudinary
- **Icons:** Material Symbols

## 🚀 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── templates/       # Template components
│   │   ├── PlayfulTemplate.jsx
│   │   └── EarthyTemplate.jsx
│   ├── editors/         # Template editors
│   │   ├── PlayfulEditor.jsx
│   │   └── EarthyEditor.jsx
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   ├── AccountSettings.jsx
│   └── ...
├── context/
│   ├── AuthContext.jsx
│   ├── LanguageContext.jsx
│   └── ThemeContext.jsx
└── firebase.js
```

## 🎨 Templates

### Playful
Fun, dynamic design with floating bubbles and organic shapes.

### Earthy
Natural, organic color palette with animated backgrounds and textured appearance. Shows up to 4 floating links; additional links appear as round icon buttons.

## ⚙️ Configuration

### Firebase
Configure your Firebase settings in `src/firebase.js`.

### Cloudinary
In `src/components/AccountSettings.jsx`:
```javascript
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';
const CLOUDINARY_UPLOAD_PRESET = 'your_preset';
```

## 📄 License

MIT License

---

Made with ❤️ by Cardly Team
