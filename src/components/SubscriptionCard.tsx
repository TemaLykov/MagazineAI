import React from 'react';
import { Star } from 'lucide-react';

interface SubscriptionCardProps {
  title: string;
  description: string;
  features: string[];
  price?: {
    amount: number;
    discount?: number;
  };
  action: {
    label: string;
    onClick: () => void;
    href?: string;
  };
  isDark: boolean;
  isPopular?: boolean;
}

export default function SubscriptionCard({
  title,
  description,
  features,
  price,
  action,
  isDark,
  isPopular
}: SubscriptionCardProps) {
  const cardClasses = `
    relative p-6 rounded-2xl border transition-all duration-300
    ${isDark 
      ? 'bg-gray-800/50 border-gray-700/50 hover:border-purple-500/50' 
      : 'bg-white border-gray-200 hover:border-purple-500/30'}
    ${isPopular ? 'md:shadow-xl md:scale-105' : 'shadow-lg'}
  `;

  const buttonClasses = `
    w-full py-3 px-4 rounded-lg font-medium transition-all duration-300
    ${isPopular
      ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white'
      : isDark
        ? 'bg-gray-700 hover:bg-gray-600 text-white'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
  `;

  // Calculate discounted price if discount is provided
  const discountedPrice = price?.discount
    ? Math.round(price.amount * (1 - price.discount / 100))
    : price?.amount;

  return (
    <div className={cardClasses}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${isDark ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'}
          `}>
            Most Popular
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>

      {/* Price */}
      {price && (
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Star className={isDark ? 'text-yellow-400' : 'text-yellow-500'} size={20} />
            {price.discount ? (
              <div className="flex items-center gap-2">
                <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {discountedPrice}
                </span>
                <span className={`text-xl line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {price.amount}
                </span>
              </div>
            ) : (
              <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {price.amount}
              </span>
            )}
          </div>
          {price.discount && (
            <div className={`mt-1 text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              Save {price.discount}%
            </div>
          )}
        </div>
      )}

      {/* Features */}
      <ul className={`mb-8 space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-purple-400' : 'bg-purple-600'}`} />
            {feature}
          </li>
        ))}
      </ul>

      {/* Action Button */}
      {action.href ? (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
        >
          {action.label}
        </a>
      ) : (
        <button
          onClick={action.onClick}
          className={buttonClasses}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}