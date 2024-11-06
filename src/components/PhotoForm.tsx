import React from 'react';
import { Camera } from 'lucide-react';
import { submitPhotoRequest } from '../services/api';

interface PhotoFormProps {
  isDark: boolean;
  language: 'en' | 'ru';
}

const styles = {
  en: ['Professional Portrait', 'Corporate Headshot', 'Creative Portrait', 'Fashion Editorial'],
  ru: ['Профессиональный портрет', 'Корпоративный портрет', 'Креативный портрет', 'Фэшн-фотография']
};

const roles = {
  en: ['Student', 'Professional', 'Entrepreneur', 'Blogger', 'Artist'],
  ru: ['Студент', 'Профессионал', 'Предприниматель', 'Блогер', 'Художник']
};

const purposes = {
  en: ['Portfolio', 'Social Media', 'Professional Network', 'Dating Profile'],
  ru: ['Портфолио', 'Социальные сети', 'Профессиональная сеть', 'Сайт знакомств']
};

const ageRanges = {
  en: ['18-24', '25-34', '35-44', '45-54', '55+'],
  ru: ['18-24', '25-34', '35-44', '45-54', '55+']
};

const text = {
  firstName: {
    en: 'First Name',
    ru: 'Имя'
  },
  email: {
    en: 'Email',
    ru: 'Email'
  },
  photoStyle: {
    en: 'Photo Style',
    ru: 'Стиль фото'
  },
  role: {
    en: 'Role',
    ru: 'Роль'
  },
  purpose: {
    en: 'Purpose',
    ru: 'Цель'
  },
  ageRange: {
    en: 'Age Range',
    ru: 'Возраст'
  },
  uploadSelfie: {
    en: 'Upload Selfie',
    ru: 'Загрузить селфи'
  },
  uploadFile: {
    en: 'Upload a file',
    ru: 'Загрузить файл'
  },
  dragDrop: {
    en: 'or drag and drop',
    ru: 'или перетащите'
  },
  fileTypes: {
    en: 'PNG, JPG, GIF up to 10MB',
    ru: 'PNG, JPG, GIF до 10МБ'
  },
  selected: {
    en: 'Selected',
    ru: 'Выбрано'
  },
  processing: {
    en: 'Processing...',
    ru: 'Обработка...'
  },
  generate: {
    en: 'Generate Photo Set',
    ru: 'Создать набор фото'
  },
  pricing: {
    en: 'First photo is free • Additional photos $1 each',
    ru: 'Первое фото бесплатно • Дополнительные фото 100₽'
  },
  success: {
    en: 'Success!',
    ru: 'Успех!'
  },
  successMessage: {
    en: 'Your information has been submitted. You will receive your photos by email shortly.',
    ru: 'Ваша информация отправлена. Вы получите фотографии на email в ближайшее время.'
  },
  createAnother: {
    en: 'Create Another Photo Set',
    ru: 'Создать ещё один набор'
  }
};

export default function PhotoForm({ isDark, language }: PhotoFormProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    email: '',
    firstName: '',
    photoStyle: styles[language][0],
    role: roles[language][0],
    purpose: purposes[language][0],
    ageRange: ageRanges[language][0],
    photo: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      email: '',
      firstName: '',
      photoStyle: styles[language][0],
      role: roles[language][0],
      purpose: purposes[language][0],
      ageRange: ageRanges[language][0],
      photo: null,
    });
    setIsSubmitted(false);
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.photo) {
        throw new Error('Please select a photo');
      }

      await submitPhotoRequest({
        ...formData,
        photo: formData.photo,
      });

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = `w-full px-4 py-2 rounded-lg ${
    isDark 
      ? 'bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500' 
      : 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-600'
  } border focus:border-transparent`;

  const labelClasses = `block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`;

  if (isSubmitted) {
    return (
      <div className={`text-center p-8 ${isDark ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'} rounded-xl border`}>
        <h3 className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mb-4`}>
          {text.success[language]}
        </h3>
        <p className={`${isDark ? 'text-emerald-100' : 'text-emerald-700'} mb-6`}>
          {text.successMessage[language]}
        </p>
        <button
          onClick={resetForm}
          className={`px-6 py-3 ${
            isDark 
              ? 'bg-emerald-600 hover:bg-emerald-700' 
              : 'bg-emerald-500 hover:bg-emerald-600'
          } text-white font-medium rounded-lg transition-colors`}
        >
          {text.createAnother[language]}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className={`p-4 ${
          isDark 
            ? 'bg-red-900/20 border-red-500/30 text-red-400' 
            : 'bg-red-50 border-red-200 text-red-600'
        } border rounded-lg`}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>{text.firstName[language]}</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className={inputClasses}
          />
        </div>
        
        <div>
          <label className={labelClasses}>{text.email[language]}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>{text.photoStyle[language]}</label>
          <select
            name="photoStyle"
            value={formData.photoStyle}
            onChange={handleInputChange}
            className={inputClasses}
          >
            {styles[language].map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClasses}>{text.role[language]}</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
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
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className={inputClasses}
          >
            {purposes[language].map(purpose => (
              <option key={purpose} value={purpose}>{purpose}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClasses}>{text.ageRange[language]}</label>
          <select
            name="ageRange"
            value={formData.ageRange}
            onChange={handleInputChange}
            className={inputClasses}
          >
            {ageRanges[language].map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className={labelClasses}>{text.uploadSelfie[language]}</label>
        <div className={`mt-2 flex justify-center rounded-lg border border-dashed ${
          isDark ? 'border-gray-700' : 'border-gray-300'
        } px-6 py-10`}>
          <div className="text-center">
            <Camera className={`mx-auto h-12 w-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className={`mt-4 flex text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <label className={`relative cursor-pointer rounded-md bg-transparent font-semibold ${
                isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'
              } focus-within:outline-none focus-within:ring-2 focus:ring-purple-500`}>
                <span>{text.uploadFile[language]}</span>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                  className="sr-only"
                />
              </label>
              <p className="pl-1">{text.dragDrop[language]}</p>
            </div>
            <p className={`text-xs leading-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {text.fileTypes[language]}
            </p>
            {formData.photo && (
              <p className={`mt-2 text-sm ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {text.selected[language]}: {formData.photo.name}
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg 
          hover:from-purple-700 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
          ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'} 
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? text.processing[language] : text.generate[language]}
      </button>

      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center mt-4`}>
        {text.pricing[language]}
      </p>
    </form>
  );
}