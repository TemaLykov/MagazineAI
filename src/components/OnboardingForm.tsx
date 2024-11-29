import React, { useState } from 'react';
import { registerUser } from '../services/userService';

interface OnboardingFormProps {
  telegramId: number;
  isDark: boolean;
  language: 'en' | 'ru';
  onComplete: (userId: number) => void;
  referrerId?: string;
  isAnonymous?: boolean;
}

const text = {
  title: {
    en: 'Complete Your Profile',
    ru: 'Заполните Профиль'
  },
  role: {
    en: 'What best describes you?',
    ru: 'Что лучше всего вас описывает?'
  },
  purpose: {
    en: 'How will you use the photos?',
    ru: 'Как вы будете использовать фотографии?'
  },
  submit: {
    en: 'Complete Registration',
    ru: 'Завершить Регистрацию'
  },
  anonymousWarning: {
    en: 'Note: Using the app without Telegram will limit some features.',
    ru: 'Примечание: Использование приложения без Telegram ограничит некоторые функции.'
  }
};

const roles = {
  en: ['Student', 'Professional', 'Entrepreneur', 'Content Creator', 'Artist', 'Blogger', 'Other'],
  ru: ['Студент', 'Профессионал', 'Предприниматель', 'Контент-мейкер', 'Художник', 'Блогер', 'Другое']
};

const purposes = {
  en: ['Social Media', 'Professional Network', 'Dating Profile', 'Personal Brand', 'Portfolio', 'Business', 'Other'],
  ru: ['Социальные сети', 'Профессиональная сеть', 'Сайт знакомств', 'Личный бренд', 'Портфолио', 'Бизнес', 'Другое']
};

export default function OnboardingForm({ telegramId, isDark, language, onComplete, referrerId, isAnonymous }: OnboardingFormProps) {
  const [formData, setFormData] = useState({
    firstName: '', // Will be filled from Telegram data
    role: roles[language][0],
    purpose: purposes[language][0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(telegramId, formData, referrerId);
      onComplete(telegramId);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const inputClasses = `w-full px-4 py-2 rounded-lg ${
    isDark 
      ? 'bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500' 
      : 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-600'
  } border focus:border-transparent`;

  const labelClasses = `block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`w-full max-w-md ${isDark ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-2xl p-8
        ${isDark ? 'border-gray-700/50' : 'border-gray-200'} border shadow-xl`}>
        <h2 className={`text-2xl font-semibold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {text.title[language]}
        </h2>

        {isAnonymous && (
          <div className={`mb-6 p-4 rounded-lg ${
            isDark ? 'bg-yellow-900/20 border-yellow-500/30 text-yellow-200' : 'bg-yellow-50 border-yellow-200 text-yellow-800'
          } border text-sm`}>
            {text.anonymousWarning[language]}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClasses}>{text.role[language]}</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className={inputClasses}
            >
              {roles[language].map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>{text.purpose[language]}</label>
            <select
              value={formData.purpose}
              onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
              className={inputClasses}
            >
              {purposes[language].map(purpose => (
                <option key={purpose} value={purpose}>{purpose}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg 
              hover:from-purple-700 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
              ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'} 
              transition-all duration-300`}
          >
            {text.submit[language]}
          </button>
        </form>
      </div>
    </div>
  );
}