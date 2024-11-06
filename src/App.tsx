import React from 'react';
import { Camera, Sparkles, Sun, Moon, Languages } from 'lucide-react';
import PhotoCarousel from './components/PhotoCarousel';
import PhotoForm from './components/PhotoForm';

function App() {
  const [isDark, setIsDark] = React.useState(true);
  const [language, setLanguage] = React.useState<'en' | 'ru'>('en');

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'ru' : 'en');

  const text = {
    title: 'MagazineAI',
    subtitle: language === 'en' 
      ? 'Transform your selfies into professional studio-quality photos with the power of AI'
      : 'Превратите ваши селфи в профессиональные студийные фотографии с помощью ИИ',
    samples: language === 'en' ? 'Sample Transformations' : 'Примеры преображений',
    createSet: language === 'en' ? 'Create Your Photo Set' : 'Создайте набор фотографий',
    footer: language === 'en' 
      ? '© 2024 MagazineAI. All rights reserved.'
      : '© 2024 MagazineAI. Все права защищены.'
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Theme and Language Toggles */}
      <div className="fixed top-4 right-4 z-50 flex gap-4">
        <button
          onClick={toggleLanguage}
          className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} 
            hover:opacity-80 transition-opacity flex items-center gap-2 shadow-lg border
            ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <Languages className="w-5 h-5" />
          <span className="text-sm font-medium">{language.toUpperCase()}</span>
        </button>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} 
            hover:opacity-80 transition-opacity shadow-lg border
            ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Northern Lights Gradient Header */}
      <div className="fixed top-0 w-full h-96 bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-transparent pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Camera className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
            <PhotoForm isDark={isDark} language={language} />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={`relative mt-24 py-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
        <p>{text.footer}</p>
      </footer>
    </div>
  );
}

export default App;