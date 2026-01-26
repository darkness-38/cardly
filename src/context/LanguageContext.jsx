import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const translations = {
    tr: {
        // Navbar
        features: 'Özellikler',
        templates: 'Şablonlar',
        pricing: 'Fiyatlar',
        login: 'Giriş Yap',
        getStarted: 'Başla',
        dashboard: 'Dashboard',
        profile: 'Profil',
        logout: 'Çıkış',

        // Home
        newTemplates: 'Yeni Şablonlar Mevcut',
        heroTitle1: 'Kendi Alanını',
        heroTitle2: 'Dakikalar İçinde Oluştur.',
        heroDescription: 'İhtiyacın olan tek bağlantı. Tüm içeriklerini tek bir URL ile paylaş. Kod yazmana gerek yok.',
        startFree: 'Ücretsiz Başla',

        // Features
        coreFeatures: 'Temel Özellikler',
        featuresDescription: 'Çevrimiçi kitlenizi büyütmek ve dijital kimliğinizi yönetmek için ihtiyacınız olan her şey.',
        customizable: 'Özelleştirilebilir',
        customizableDesc: 'Kişisel markanızı özel temalar, yazı tipleri ve renklerle eşleştirin. Kod yazmadan tamamen sizin yapın.',
        analytics: 'Analitik',
        analyticsDesc: 'Görüntülemeleri ve tıklamaları takip ederek kitlenizi anlayın. Hangi içeriğin en iyi performansı gösterdiğini keşfedin.',
        fast: 'Hızlı',
        fastDesc: 'Takipçilerinizi meşgul tutmak için hız için optimize edilmiş. Hızlı yükleme süreleri daha iyi dönüşüm demektir.',

        // CTA
        readyToLaunch: 'Başlamaya Hazır mısın?',
        ctaDescription: 'Bugün alanını oluşturan binlerce yaratıcıya katıl. Başlamak ücretsiz ve 5 dakikadan az sürüyor.',

        // Footer
        privacyPolicy: 'Gizlilik Politikası',
        termsOfService: 'Kullanım Şartları',
        support: 'Destek',
        copyright: '© 2026 Cardly. Tüm hakları saklıdır.',

        // Phone mockup
        sampleUser: 'Örnek Kullanıcı',
        userTitle: 'Dijital Sanatçı & Tasarımcı 🎨',
        latestVideo: 'Son Video',
        portfolio: 'Portfolyo',
        shop: 'Mağaza',
        newsletter: 'Bülten',

        // Login
        welcomeBack: 'Tekrar Hoş Geldin',
        loginToAccount: 'Hesabına giriş yap',
        email: 'E-posta',
        password: 'Şifre',
        noAccount: "Hesabın yok mu?",
        register: 'Kayıt Ol',
        secure: 'Güvenli',
        encryption: '256-bit şifreleme',
        fastAccess: 'Hızlı',
        instantAccess: 'Anında erişim',

        // Register
        createAccount: 'Hesap Oluştur',
        startCreating: 'Kendi profilini oluşturmaya başla',
        fullName: 'Ad Soyad',
        confirmPassword: 'Şifre Tekrar',
        minChars: 'En az 6 karakter',
        retypePassword: 'Şifrenizi tekrar girin',
        alreadyHaveAccount: 'Zaten hesabın var mı?',
        passwordsDontMatch: 'Şifreler eşleşmiyor',
        passwordTooShort: 'Şifre en az 6 karakter olmalıdır',

        // Dashboard
        goodMorning: 'Günaydın',
        goodAfternoon: 'İyi günler',
        goodEvening: 'İyi akşamlar',
        welcomeToCardly: 'Cardly profiline hoş geldin. Bugün ne yapmak istersin?',
        quickAccess: 'Hızlı Erişim',
        myProfile: 'Profilim',
        viewProfile: 'Profil bilgilerini görüntüle',
        editProfile: 'Profili Düzenle',
        updateInfo: 'Bilgilerini güncelle',
        links: 'Bağlantılar',
        socialLinks: 'Sosyal medya linkleri',
        comingSoon: 'Yakında',
        overview: 'Genel Bakış',
        views: 'Görüntüleme',
        bio: 'Bio',
        location: 'Konum',
        website: 'Website',
        profileCompletion: 'Profil Tamamlama',
        fullNameItem: 'Ad soyad',
        profilePhoto: 'Profil fotoğrafı',

        // Profile
        user: 'Kullanıcı',
        memberSince: "'den beri üye",
        edit: 'Düzenle',
        shares: 'Paylaşım',
        followers: 'Takipçi',
        editProfileTitle: 'Profili Düzenle',
        avatarUrl: 'Avatar URL',
        aboutMe: 'Hakkımda',
        describeYourself: 'Kendinizi kısaca tanıtın...',
        cancel: 'İptal',
        save: 'Kaydet',
        profileUpdated: 'Profil başarıyla güncellendi!',
    },
    en: {
        // Navbar
        features: 'Features',
        templates: 'Templates',
        pricing: 'Pricing',
        login: 'Login',
        getStarted: 'Get Started',
        dashboard: 'Dashboard',
        profile: 'Profile',
        logout: 'Logout',

        // Home
        newTemplates: 'New Templates Available',
        heroTitle1: 'Create Your Space',
        heroTitle2: 'In Minutes.',
        heroDescription: 'The only link you\'ll ever need. Connect your audiences to all of your content with just one URL. No coding required.',
        startFree: 'Get Started Free',

        // Features
        coreFeatures: 'Core Features',
        featuresDescription: 'Everything you need to grow your audience online and manage your digital identity.',
        customizable: 'Customizable',
        customizableDesc: 'Match your personal brand with custom themes, fonts, and colors. Make it truly yours without writing code.',
        analytics: 'Analytics',
        analyticsDesc: 'Track views and clicks to understand your audience. Gain insights on what content performs best.',
        fast: 'Fast',
        fastDesc: 'Optimized for speed to keep your followers engaged. Fast loading times mean better conversion.',

        // CTA
        readyToLaunch: 'Ready to launch?',
        ctaDescription: 'Join thousands of creators building their space today. It\'s free to get started and takes less than 5 minutes.',

        // Footer
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        support: 'Support',
        copyright: '© 2026 Cardly. All rights reserved.',

        // Phone mockup
        sampleUser: 'Sample User',
        userTitle: 'Digital Artist & Designer 🎨',
        latestVideo: 'Latest Video',
        portfolio: 'Portfolio',
        shop: 'Shop',
        newsletter: 'Newsletter',

        // Login
        welcomeBack: 'Welcome Back',
        loginToAccount: 'Login to your account',
        email: 'Email',
        password: 'Password',
        noAccount: "Don't have an account?",
        register: 'Register',
        secure: 'Secure',
        encryption: '256-bit encryption',
        fastAccess: 'Fast',
        instantAccess: 'Instant access',

        // Register
        createAccount: 'Create Account',
        startCreating: 'Start creating your own profile',
        fullName: 'Full Name',
        confirmPassword: 'Confirm Password',
        minChars: 'At least 6 characters',
        retypePassword: 'Retype your password',
        alreadyHaveAccount: 'Already have an account?',
        passwordsDontMatch: 'Passwords do not match',
        passwordTooShort: 'Password must be at least 6 characters',

        // Dashboard
        goodMorning: 'Good morning',
        goodAfternoon: 'Good afternoon',
        goodEvening: 'Good evening',
        welcomeToCardly: 'Welcome to your Cardly profile. What would you like to do today?',
        quickAccess: 'Quick Access',
        myProfile: 'My Profile',
        viewProfile: 'View your profile information',
        editProfile: 'Edit Profile',
        updateInfo: 'Update your information',
        links: 'Links',
        socialLinks: 'Social media links',
        comingSoon: 'Coming Soon',
        overview: 'Overview',
        views: 'Views',
        bio: 'Bio',
        location: 'Location',
        website: 'Website',
        profileCompletion: 'Profile Completion',
        fullNameItem: 'Full name',
        profilePhoto: 'Profile photo',

        // Profile
        user: 'User',
        memberSince: ' member since',
        edit: 'Edit',
        shares: 'Shares',
        followers: 'Followers',
        editProfileTitle: 'Edit Profile',
        avatarUrl: 'Avatar URL',
        aboutMe: 'About Me',
        describeYourself: 'Describe yourself briefly...',
        cancel: 'Cancel',
        save: 'Save',
        profileUpdated: 'Profile updated successfully!',
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language');
        return saved || 'tr';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key) => {
        return translations[language][key] || key;
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
