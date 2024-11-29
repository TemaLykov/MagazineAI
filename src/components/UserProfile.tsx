import React, { useState } from 'react';
import { ChevronRight, RefreshCw, Sun, Moon, Languages, X } from 'lucide-react';
import SubscriptionModal from './SubscriptionModal';

interface UserProfileProps {
  user: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
  } | null;
  isDark: boolean;
  language: 'en' | 'ru';
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
  children: React.ReactNode;
}

const text = {
  profile: {
    en: 'Profile',
    ru: 'Профиль'
  },
  telegramId: {
    en: 'Telegram ID',
    ru: 'Telegram ID'
  },
  subscription: {
    en: 'Subscription',
    ru: 'Подписка'
  },
  basic: {
    en: 'Basic',
    ru: 'Базовая'
  },
  theme: {
    en: 'Theme',
    ru: 'Тема'
  },
  language: {
    en: 'Language',
    ru: 'Язык'
  },
  light: {
    en: 'Light',
    ru: 'Светлая'
  },
  dark: {
    en: 'Dark',
    ru: 'Тёмная'
  },
  generations: {
    en: 'Generations',
    ru: 'Генерации'
  },
  bonusGenerations: {
    en: 'Bonus Generations',
    ru: 'Бонусные генерации'
  },
  inviteFriend: {
    en: 'Invite a friend and get a bonus generation',
    ru: 'Пригласи друга и получи бонусную генерацию'
  },
  welcomeMessage: {
    en: '🔥 Instant Pro Photos! Get stunning, professional pics in minutes with MagazinePro. Use my link and snag free bonus generations! 📸',
    ru: '🔥 Мгновенные Профи Фото! Получи потрясающие, профессиональные снимки за минуты с MagazinePro. Используй мою ссылку и хватай бесплатные бонусные генерации! 📸'
  },
  promoCode: {
    en: 'Promo Code',
    ru: 'Промокод'
  },
  enterPromoCode: {
    en: 'Enter promo code',
    ru: 'Введите промокод'
  },
  apply: {
    en: 'Apply',
    ru: 'Применить'
  },
  promoCodeSuccess: {
    en: 'Promo code applied successfully!',
    ru: 'Промокод успешно применен!'
  },
  promoCodeInvalid: {
    en: 'Invalid promo code.',
    ru: 'Неверный промокод.'
  },
  upgrade: {
    en: 'Upgrade',
    ru: 'Улучшить'
  }
};

export default function UserProfile({ user, isDark, language, onThemeToggle, onLanguageToggle, children }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Данные о подписке (заглушка, заменить на запрос к API)
  const subscriptionData = {
    type: 'Basic', // Заменить на данные из API
    generations: 0, // Заменить на данные из API
    bonusGenerations: 0 // Заменить на данные из API
  };

  const getInitials = () => {
    if (!user) return 'A';
    const firstName = user.first_name.charAt(0);
    const lastName = user.last_name ? user.last_name.charAt(0) : '';
    return `${firstName}${lastName}`.toUpperCase();
  };

  const handleRefreshSubscription = async () => {
    setIsRefreshing(true);
    // TODO: Добавить запрос к API для обновления данных о подписке
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleInviteFriend = () => {
    const telegramId = user?.id || 'unknown';
    const botLink = `t.me/magazine_pro_bot/MagazinePro?start=${telegramId}`;
    const message = encodeURIComponent(text.welcomeMessage[language]);
    const shareUrl = `tg://msg_url?url=${botLink}&text=${message}`;
    window.open(shareUrl, '_blank');
  };

  const [promoCode, setPromoCode] = useState('');
  const [promoCodeMessage, setPromoCodeMessage] = useState('');

  const handleApplyPromoCode = async () => {
    // TODO: Заменить на реальный запрос к API
    if (promoCode === 'test') { // Заглушка для успешного промокода
      setPromoCodeMessage(text.promoCodeSuccess[language]);
    } else {
      setPromoCodeMessage(text.promoCodeInvalid[language]);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Боковая панель */}
      <div className={`fixed top-0 left-0 h-full w-80 transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isDark ? 'bg-gray-900 border-r border-gray-800' : 'bg-white border-r border-gray-200'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {text.profile[language]}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg hover:bg-gray-800 transition-colors
              ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-64px)]">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              {user?.photo_url ? (
                <img
                  src={user.photo_url}
                  alt={user.first_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center text-xl font-medium
                  ${isDark ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'}`}>
                  {getInitials()}
                </div>
              )}
            </div>
            <div>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {user?.first_name} {user?.last_name}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                @{user?.username || 'anonymous'}
              </p>
            </div>
          </div>

          {/* Telegram ID */}
          <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {text.telegramId[language]}
            </p>
            <p className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user?.id || 'N/A'}
            </p>
          </div>

          {/* Subscription */}
          <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {text.subscription[language]}
                </p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {subscriptionData.type}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {text.generations[language]}: {subscriptionData.generations}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {text.bonusGenerations[language]}: {subscriptionData.bonusGenerations}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefreshSubscription}
                  disabled={isRefreshing}
                  className={`p-2 rounded-lg transition-colors
                    ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
                    ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <RefreshCw
                    size={20}
                    className={`${isRefreshing ? 'animate-spin' : ''} 
                      ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  />
                </button>
                <button
                  onClick={() => setShowSubscriptionModal(true)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                    ${isDark 
                      ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                      : 'bg-purple-500 hover:bg-purple-400 text-white'}`}
                >
                  {text.upgrade[language]}
                </button>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-2">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`w-full p-3 rounded-lg flex items-center justify-between
                ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
            >
              <div className="flex items-center space-x-3">
                {isDark ? (
                  <Moon size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                ) : (
                  <Sun size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                )}
                <span className={isDark ? 'text-white' : 'text-gray-900'}>
                  {text.theme[language]}
                </span>
              </div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {isDark ? text.dark[language] : text.light[language]}
              </span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={onLanguageToggle}
              className={`w-full p-3 rounded-lg flex items-center justify-between
                ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
            >
              <div className="flex items-center space-x-3">
                <Languages size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                <span className={isDark ? 'text-white' : 'text-gray-900'}>
                  {text.language[language]}
                </span>
              </div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {language.toUpperCase()}
              </span>
            </button>

            <div className="mb-4">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {text.promoCode[language]}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={text.enterPromoCode[language]}
                  className={`
                    p-2
                    rounded-lg
                    border
                    ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}
                    w-full
                    sm:w-auto
                    focus:outline-none focus:ring-2 focus:ring-purple-500
                  `}
                />
                <button
                  onClick={handleApplyPromoCode}
                  className={`
                    p-2
                    rounded-lg
                    ${isDark ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-purple-500 text-white hover:bg-purple-600'}
                    w-full
                    sm:w-auto
                    focus:outline-none focus:ring-2 focus:ring-purple-500
                  `}
                >
                  {text.apply[language]}
                </button>
              </div>
              {promoCodeMessage && (
                <p
                  className={`
                    text-sm
                    mt-1
                    ${promoCodeMessage === text.promoCodeSuccess[language] ? 'text-green-500' : 'text-red-500'}
                  `}
                  role="alert"
                >
                  {promoCodeMessage}
                </p>
              )}
            </div>

            {/* Invite Friend */}
            <button
              onClick={handleInviteFriend}
              className={`w-full p-3 rounded-lg flex items-center justify-between
                ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
            >
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                {text.inviteFriend[language]}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        {user?.photo_url ? (
          <img
            src={user.photo_url}
            alt={user.first_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-sm font-medium
            ${isDark ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'}`}>
            {getInitials()}
          </div>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          isDark={isDark}
          language={language}
          onClose={() => setShowSubscriptionModal(false)}
        />
      )}

      {/* Main Content */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}