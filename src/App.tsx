import React from 'react';
import { Camera, Sparkles } from 'lucide-react';
import PhotoCarousel from './components/PhotoCarousel';
import PhotoForm from './components/PhotoForm';
import UserProfile from './components/UserProfile';
import OnboardingForm from './components/OnboardingForm';
import { useTelegram } from './hooks/useTelegram';
import { useUserRegistration } from './hooks/useUserRegistration';

function App() {
  const { isDark, setIsDark, language, setLanguage, user, isInitialized } = useTelegram();
  const { isRegistered, isLoading, markAsRegistered } = useUserRegistration(user?.id || null);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'ru' : 'en');

  // Get referrer ID from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const referrerId = urlParams.get('start');

  const text = {
    title: 'MagazinePro',
    subtitle: language === 'en'
      ? 'Transform your selfies into professional studio-quality photos with the power of AI'
      : 'Превратите ваши селфи в профессиональные студийные фотографии с помощью ИИ',
    samples: language === 'en' ? 'Sample Transformations' : 'Примеры преображений',
    createSet: language === 'en' ? 'Create Your Photo Set' : 'Создайте набор фотографий',
    footer: language === 'en'
      ? '© 2024 MagazineAI. All rights reserved.'
      : '© 2024 MagazineAI. Все права защищены.'
  };

  // Show nothing while initializing
  if (!isInitialized || isLoading) {
    return null;
  }

  // Show onboarding for both anonymous and new Telegram users
  if (!isRegistered) {
    return (
      <OnboardingForm
        telegramId={user?.id || 0}
        isDark={isDark}
        language={language}
        onComplete={(userId) => markAsRegistered(userId)}
        referrerId={referrerId || undefined}
        isAnonymous={!window.Telegram?.WebApp}
      />
    );
  }

  return (
    <UserProfile
      user={user}
      isDark={isDark}
      language={language}
      onThemeToggle={toggleTheme}
      onLanguageToggle={toggleLanguage}
    >
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Northern Lights Gradient Header */}
        <div className="fixed top-0 w-full h-96 bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-transparent pointer-events-none" />

        {/* Main Content */}
        <div className="relative container mx-auto px-4 py-12">
          {/* Header */}
          <header className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Camera className={`w-12 h-12 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              <h1 className={`text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent leading-[1.5] py-1`}>
                {text.title}
              </h1>
            </div>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              {text.subtitle}
            </p>
          </header>

          {/* Photo Carousel Section */}
          <section className="mb-16">
            <h2 className={`text-2xl font-semibold mb-8 text-center flex items-center justify-center gap-2
              ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <Sparkles className={isDark ? 'text-purple-400' : 'text-purple-600'} />
              {text.samples}
            </h2>
            <PhotoCarousel isDark={isDark} />
          </section>

          {/* Form Section */}
          <section className="max-w-3xl mx-auto">
            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-2xl p-8
              ${isDark ? 'border-gray-700/50' : 'border-gray-200'} border shadow-xl`}>
              <h2 className={`text-2xl font-semibold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {text.createSet}
              </h2>
              <PhotoForm
                isDark={isDark}
                language={language}
                telegramUser={user}
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className={`relative mt-24 py-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          <p>{text.footer}</p>
        </footer>
      </div>
    </UserProfile>
  );
}

export default App;