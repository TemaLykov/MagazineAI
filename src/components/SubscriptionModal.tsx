import React from 'react';
import { X } from 'lucide-react';
import SubscriptionCard from './SubscriptionCard';

interface SubscriptionModalProps {
  isDark: boolean;
  language: 'en' | 'ru';
  onClose: () => void;
}

const text = {
  title: {
    en: 'Choose Your Plan',
    ru: 'Выберите План'
  },
  basic: {
    title: {
      en: 'Basic',
      ru: 'Базовый'
    },
    description: {
      en: 'Perfect for getting started',
      ru: 'Идеально для начала'
    },
    features: {
      en: ['Bonus generations available', 'Basic features'],
      ru: ['Доступны бонусные генерации', 'Базовые функции']
    },
    action: {
      en: 'Current Plan',
      ru: 'Текущий План'
    }
  },
  pro: {
    title: {
      en: 'Pro',
      ru: 'Про'
    },
    description: {
      en: 'Best for regular use',
      ru: 'Лучший выбор для регулярного использования'
    },
    features: {
      en: ['50 generations included', 'All basic features', 'Priority processing'],
      ru: ['50 генераций включено', 'Все базовые функции', 'Приоритетная обработка']
    },
    action: {
      en: 'Upgrade Now',
      ru: 'Улучшить Сейчас'
    }
  },
  corporate: {
    title: {
      en: 'Corporate',
      ru: 'Корпоративный'
    },
    description: {
      en: 'For teams and businesses',
      ru: 'Для команд и бизнеса'
    },
    features: {
      en: ['Custom number of generations', 'Priority support', 'Custom features'],
      ru: ['Индивидуальное количество генераций', 'Приоритетная поддержка', 'Индивидуальные функции']
    },
    action: {
      en: 'Contact Us',
      ru: 'Связаться'
    }
  }
};

export default function SubscriptionModal({ isDark, language, onClose }: SubscriptionModalProps) {
  const handleUpgrade = () => {
    // TODO: Implement upgrade logic
    console.log('Upgrade to Pro clicked');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[28rem] transform transition-transform duration-300 ease-in-out z-50
        ${isDark ? 'bg-gray-900 border-l border-gray-800' : 'bg-white border-l border-gray-200'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {text.title[language]}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-gray-800 transition-colors
              ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-64px)]">
          {/* Basic */}
          <SubscriptionCard
            title={text.basic.title[language]}
            description={text.basic.description[language]}
            features={text.basic.features[language]}
            action={{
              label: text.basic.action[language],
              onClick: () => {},
            }}
            isDark={isDark}
          />

          {/* Pro */}
          <SubscriptionCard
            title={text.pro.title[language]}
            description={text.pro.description[language]}
            features={text.pro.features[language]}
            price={{
              amount: 400,
              discount: 70
            }}
            action={{
              label: text.pro.action[language],
              onClick: handleUpgrade,
            }}
            isDark={isDark}
            isPopular
          />

          {/* Corporate */}
          <SubscriptionCard
            title={text.corporate.title[language]}
            description={text.corporate.description[language]}
            features={text.corporate.features[language]}
            action={{
              label: text.corporate.action[language],
              onClick: () => {},
              href: 't.me/magazine_pro_bot'
            }}
            isDark={isDark}
          />
        </div>
      </div>
    </>
  );
}