import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'te' | 'ta' | 'bn' | 'gu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.jobs': 'Jobs',
    'nav.ai_assistant': 'AI Assistant',
    'nav.experts': 'Experts',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    
    // Dashboard
    'dashboard.welcome': 'Hello',
    'dashboard.farmer_subtitle': 'Find workers for your farm and get AI assistance',
    'dashboard.laborer_subtitle': 'Find work opportunities and increase your income',
    'dashboard.group_leader_subtitle': 'Manage your group and find work opportunities',
    'dashboard.expert_subtitle': 'Help farmers and share your knowledge',
    
    // Jobs
    'jobs.title': 'Available Jobs',
    'jobs.my_jobs': 'My Jobs',
    'jobs.post_new_job': 'Post New Job',
    'jobs.search_placeholder': 'Search jobs or locations...',
    'jobs.all_types': 'All Types',
    'jobs.harvesting': 'Harvesting',
    'jobs.planting': 'Planting',
    'jobs.picking': 'Picking',
    'jobs.weeding': 'Weeding',
    'jobs.apply_now': 'Apply Now',
    'jobs.workers_needed': 'workers needed',
    'jobs.per_day': '/day',
    'jobs.days': 'days',
    'jobs.applications': 'applications',
    'jobs.posted': 'Posted',
    
    // AI Assistant
    'ai.title': 'AI Agricultural Assistant',
    'ai.subtitle': 'Your personal farming advisor',
    'ai.welcome_message': 'Hello! I\'m your AI agricultural assistant. I can help you with farming, crops, weather, and agricultural techniques. You can speak to me in your preferred language.',
    'ai.input_placeholder': 'Type your question here...',
    'ai.quick_questions': 'Quick Questions',
    'ai.voice_chat': 'Voice Chat',
    'ai.voice_description': 'Press the mic button to ask questions with your voice',
    'ai.multilingual': 'Multiple Languages',
    'ai.multilingual_description': 'Chat in Hindi, English and other regional languages',
    'ai.audio_response': 'Audio Response',
    'ai.audio_description': 'Listen to AI responses in voice',
    'ai.typing': 'Typing...',
    'ai.listen': 'Listen',
    
    // Profile
    'profile.title': 'Profile',
    'profile.edit': 'Edit',
    'profile.save': 'Save',
    'profile.cancel': 'Cancel',
    'profile.statistics': 'Statistics',
    'profile.account_settings': 'Account Settings',
    'profile.notifications': 'Notifications',
    'profile.notifications_desc': 'Get notified about new jobs and messages',
    'profile.language': 'Language',
    'profile.language_desc': 'Choose your preferred language',
    'profile.privacy': 'Privacy',
    'profile.privacy_desc': 'Control your profile visibility',
    'profile.danger_zone': 'Danger Zone',
    'profile.delete_account': 'Delete Account',
    'profile.delete_warning': 'Warning: This action is irreversible. All your data will be permanently deleted.',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.view_all': 'View All',
    'common.close': 'Close',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.public': 'Public',
    'common.private': 'Private',
  },
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.jobs': 'नौकरियां',
    'nav.ai_assistant': 'AI सहायक',
    'nav.experts': 'विशेषज्ञ',
    'nav.profile': 'प्रोफाइल',
    'nav.logout': 'लॉग आउट',
    
    // Dashboard
    'dashboard.welcome': 'नमस्कार',
    'dashboard.farmer_subtitle': 'अपने खेत के लिए मजदूर ढूंढें और AI सहायता प्राप्त करें',
    'dashboard.laborer_subtitle': 'काम के अवसर खोजें और अपनी आय बढ़ाएं',
    'dashboard.group_leader_subtitle': 'अपने समूह का प्रबंधन करें और काम के अवसर खोजें',
    'dashboard.expert_subtitle': 'किसानों की मदद करें और अपना ज्ञान साझा करें',
    
    // Jobs
    'jobs.title': 'उपलब्ध काम',
    'jobs.my_jobs': 'मेरी नौकरियां',
    'jobs.post_new_job': 'नई नौकरी पोस्ट करें',
    'jobs.search_placeholder': 'काम या स्थान खोजें...',
    'jobs.all_types': 'सभी प्रकार',
    'jobs.harvesting': 'कटाई',
    'jobs.planting': 'रोपाई',
    'jobs.picking': 'तुड़ाई',
    'jobs.weeding': 'निराई',
    'jobs.apply_now': 'आवेदन करें',
    'jobs.workers_needed': 'मजदूर चाहिए',
    'jobs.per_day': '/दिन',
    'jobs.days': 'दिन',
    'jobs.applications': 'आवेदन',
    'jobs.posted': 'पोस्ट किया',
    
    // AI Assistant
    'ai.title': 'AI कृषि सहायक',
    'ai.subtitle': 'आपका व्यक्तिगत खेती सलाहकार',
    'ai.welcome_message': 'नमस्कार! मैं आपका AI कृषि सहायक हूं। मैं खेती, फसल, मौसम, और कृषि तकनीकों के बारे में आपकी मदद कर सकता हूं। आप मुझसे अपनी पसंदीदा भाषा में बात कर सकते हैं।',
    'ai.input_placeholder': 'अपना सवाल यहां लिखें...',
    'ai.quick_questions': 'त्वरित प्रश्न',
    'ai.voice_chat': 'आवाज से बात करें',
    'ai.voice_description': 'माइक बटन दबाकर अपनी आवाज में सवाल पूछें',
    'ai.multilingual': 'कई भाषाओं में',
    'ai.multilingual_description': 'हिंदी, अंग्रेजी और अन्य क्षेत्रीय भाषाओं में बात करें',
    'ai.audio_response': 'जवाब सुनें',
    'ai.audio_description': 'AI के जवाब को आवाज में सुन सकते हैं',
    'ai.typing': 'टाइप कर रहा है...',
    'ai.listen': 'सुनें',
    
    // Profile
    'profile.title': 'प्रोफाइल',
    'profile.edit': 'संपादित करें',
    'profile.save': 'सहेजें',
    'profile.cancel': 'रद्द करें',
    'profile.statistics': 'आंकड़े',
    'profile.account_settings': 'खाता सेटिंग्स',
    'profile.notifications': 'सूचनाएं',
    'profile.notifications_desc': 'नई नौकरियों और संदेशों के बारे में सूचना प्राप्त करें',
    'profile.language': 'भाषा',
    'profile.language_desc': 'अपनी पसंदीदा भाषा चुनें',
    'profile.privacy': 'गोपनीयता',
    'profile.privacy_desc': 'अपनी प्रोफाइल दृश्यता को नियंत्रित करें',
    'profile.danger_zone': 'खतरा क्षेत्र',
    'profile.delete_account': 'खाता हटाएं',
    'profile.delete_warning': 'चेतावनी: यह क्रिया अपरिवर्तनीय है। आपका सारा डेटा स्थायी रूप से हटा दिया जाएगा।',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.search': 'खोजें',
    'common.filter': 'फिल्टर',
    'common.view_all': 'सभी देखें',
    'common.close': 'बंद करें',
    'common.submit': 'जमा करें',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.public': 'सार्वजनिक',
    'common.private': 'निजी',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('agriconnect_language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('agriconnect_language', lang);
  };

  const t = (key: string): string => {
    const langTranslations = translations[language] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};