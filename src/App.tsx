import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { Home, Mail, Palette, Star, Menu, X, ArrowRight, Code, Zap, Layers } from 'lucide-react';

interface DemoItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  rating: {
    rate: number;
    count: number;
  };
}

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

interface RouterContextType {
  currentPage: string;
  navigate: (page: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('theme1');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

const RouterContext = createContext<RouterContextType | undefined>(undefined);

const Router: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const navigate = (page: string) => setCurrentPage(page);
  
  return (
    <RouterContext.Provider value={{ currentPage, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within a Router');
  return context;
};

const themeStyles = {
  theme1: {
    name: 'Minimalist',
    body: 'bg-gradient-to-br from-slate-50 via-white to-slate-100 font-inter',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    
    header: 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm',
    headerText: 'text-slate-800',
    logo: 'text-slate-900 font-bold text-xl',
    navButton: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95',
    navButtonActive: 'text-blue-600 bg-blue-50 border border-blue-200 scale-105',
    
    card: 'bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-500 hover:border-slate-300/80',
    cardHover: 'hover:shadow-2xl hover:-translate-y-2 hover:rotate-1',
    
    title: 'text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight animate-fade-in-up',
    subtitle: 'text-xl text-slate-600 mb-8 leading-relaxed animate-fade-in-up animation-delay-200',
    text: 'text-slate-700 leading-relaxed',
    primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white px-8 flex items-center py-3 rounded-lg font-medium shadow-md hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 hover:-translate-y-1 group',
    secondaryButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95',
    
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    spacing: 'space-y-8',
    
    accent: 'text-blue-600',
    accentBg: 'bg-blue-600'
  },
  
  theme2: {
    name: 'Dark Professional',
    body: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 font-serif',
    container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
    
    header: 'bg-slate-900/80 backdrop-blur-md border-b border-slate-700/60 shadow-2xl',
    headerText: 'text-slate-100',
    logo: 'text-white font-bold text-xl',
    navButton: 'text-slate-300 hover:text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95',
    navButtonActive: 'text-amber-400 bg-slate-700/60 border border-amber-400/30 scale-105 shadow-lg',
    
    card: 'bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/60 p-8 hover:bg-slate-800/80 transition-all duration-500 hover:border-slate-600/80',
    cardHover: 'hover:shadow-3xl hover:border-slate-600/60 hover:-translate-y-1 hover:scale-[1.02]',
    
    title: 'text-4xl md:text-6xl font-bold text-white mb-8 leading-tight font-serif animate-fade-in-up',
    subtitle: 'text-xl text-slate-300 mb-10 leading-relaxed font-serif animate-fade-in-up animation-delay-300',
    text: 'text-slate-200 leading-relaxed font-serif',
    
    primaryButton: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-8 flex items-center py-4 rounded-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 transition-all duration-400 hover:-translate-y-2 group',
    secondaryButton: 'bg-slate-700 hover:bg-slate-600 text-slate-200 px-8 py-4 rounded-xl font-bold border border-slate-600 hover:border-slate-500 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95',
    
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
    spacing: 'space-y-12',
    
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500'
  },
  
  theme3: {
    name: 'Colorful Creative',
    body: 'bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 font-mono',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    
    header: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-2xl',
    headerText: 'text-white',
    logo: 'text-white font-bold text-xl drop-shadow-lg',
    navButton: 'text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 hover:rotate-3',
    navButtonActive: 'text-white bg-white/30 border-2 border-white/50 backdrop-blur-sm scale-110 shadow-lg animate-pulse',
    
    card: 'bg-white rounded-3xl shadow-xl border-4 border-purple-200/50 p-8 hover:shadow-3xl hover:border-purple-300/60 transform hover:scale-105 transition-all duration-400',
    cardHover: 'hover:rotate-2 hover:-translate-y-3 hover:shadow-2xl',
    
    title: 'text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 leading-tight animate-bounce-subtle',
    subtitle: 'text-xl text-purple-700 mb-10 leading-relaxed font-bold animate-fade-in-up animation-delay-400',
    text: 'text-gray-700 leading-relaxed font-mono',
    
    primaryButton: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 text-white px-8 flex items-center py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-125 active:scale-95 transition-all duration-400 hover:-translate-y-3 hover:rotate-3 group animate-gradient-x',
    secondaryButton: 'bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 px-8 py-4 rounded-full font-bold border-2 border-purple-300 hover:border-purple-400 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 hover:-translate-y-1',
    
    grid: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6',
    spacing: 'space-y-10',
    
    accent: 'text-purple-600',
    accentBg: 'bg-gradient-to-r from-pink-500 to-purple-500'
  }
};

const Header: React.FC = () => {
  const { navigate, currentPage } = useRouter();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const styles = themeStyles[theme as keyof typeof themeStyles];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', label: 'Demo', icon: Home },
    { key: 'about', label: 'Themes', icon: Palette },
    { key: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <header className={`${styles.header} fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled ? 'backdrop-blur-xl shadow-2xl' : ''
    }`}>
      <div className={styles.container}>
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className={`${styles.logo} flex items-center space-x-2 hover:scale-105 transition-transform duration-300 cursor-pointer group`}>
            <Layers size={28} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="group-hover:tracking-wider transition-all duration-300">ThemeSwitcher</span>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map(({ key, label, icon: Icon }, index) => (
              <button
                key={key}
                onClick={() => navigate(key)}
                className={`${styles.navButton} ${
                  currentPage === key ? styles.navButtonActive : ''
                } flex items-center space-x-2 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className={`appearance-none px-4 py-2 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-105 focus:scale-105 ${
                  theme === 'theme2' 
                    ? 'bg-slate-800 border-slate-600 text-white hover:border-amber-400 focus:border-amber-400' 
                    : theme === 'theme3'
                    ? 'bg-white/20 border-white/30 text-white backdrop-blur-sm hover:bg-white/30 focus:bg-white/30'
                    : 'bg-white border-slate-300 text-slate-900 hover:border-blue-500 focus:border-blue-500'
                } hover:border-opacity-60 focus:outline-none hover:shadow-lg`}
              >
                <option value="theme1" className="text-slate-900">Minimalist</option>
                <option value="theme2" className="text-slate-900">Dark Pro</option>
                <option value="theme3" className="text-slate-900">Creative</option>
              </select>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${styles.navButton} group`}
            >
              <div className="relative">
                {mobileMenuOpen ? (
                  <X size={24} className="animate-spin-in" />
                ) : (
                  <Menu size={24} className="group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
        } border-t ${
          theme === 'theme2' ? 'border-slate-700' :
          theme === 'theme3' ? 'border-white/20' :
          'border-slate-200'
        }`}>
          <nav className="space-y-2">
            {navItems.map(({ key, label, icon: Icon }, index) => (
              <button
                key={key}
                onClick={() => {
                  navigate(key);
                  setMobileMenuOpen(false);
                }}
                className={`${styles.navButton} ${
                  currentPage === key ? styles.navButtonActive : ''
                } flex items-center space-x-3 w-full text-left animate-slide-in-left`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const Sidebar: React.FC = () => {
  const { navigate, currentPage } = useRouter();
  const navItems = [
    { key: 'home', label: 'Demo', icon: Home, desc: 'Multi-Theme Showcase' },
    { key: 'about', label: 'Themes', icon: Palette, desc: 'Theme Gallery' },
    { key: 'contact', label: 'Contact', icon: Mail, desc: 'Get In Touch' }
  ];

  return (
    <aside className="w-80 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/60 pt-20 min-h-screen animate-slide-in-left">
      <div className="p-6">
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-2">Navigation</h2>
          <p className="text-slate-400 text-sm">Professional Dashboard</p>
        </div>
        
        <nav className="space-y-3">
          {navItems.map(({ key, label, icon: Icon, desc }, index) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`flex items-start space-x-4 w-full px-4 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up group ${
                currentPage === key
                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/30 text-amber-400 shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:shadow-xl'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Icon size={24} className="mt-0.5 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
              <div className="text-left">
                <div className="font-bold text-lg group-hover:scale-105 transition-transform duration-300">{label}</div>
                <div className="text-sm opacity-75">{desc}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

const useDemoItems = () => {
  const [demoItems, setDemoItems] = useState<DemoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemoItems = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockDemoItems: DemoItem[] = [
          {
            id: 1,
            title: "Minimalist Design System",
            description: "Clean, modern interface with subtle shadows and refined typography for professional applications.",
            category: "ui-design",
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=400&fit=crop",
            features: ["Clean Typography", "Subtle Animations", "Professional Look"],
            rating: { rate: 4.8, count: 324 }
          },
          {
            id: 2,
            title: "Dark Professional Theme",
            description: "Sophisticated dark mode with elegant gradients and premium feel for power users.",
            category: "dark-mode",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
            features: ["Dark Mode", "Elegant Gradients", "Premium Feel"],
            rating: { rate: 4.9, count: 256 }
          },
          {
            id: 3,
            title: "Creative Colorful UI",
            description: "Vibrant, playful interface with bold colors and creative animations for artistic projects.",
            category: "creative",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=400&fit=crop",
            features: ["Bold Colors", "Creative Animations", "Artistic Flair"],
            rating: { rate: 4.7, count: 189 }
          },
          {
            id: 4,
            title: "Responsive Components",
            description: "All themes are fully responsive and adapt beautifully to any screen size or device.",
            category: "responsive",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop",
            features: ["Mobile First", "Adaptive Layout", "Cross-Device"],
            rating: { rate: 4.9, count: 412 }
          }
        ];
        
        setDemoItems(mockDemoItems);
      } catch (error) {
        console.error('Error fetching demo items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDemoItems();
  }, []);

  return { demoItems, loading };
};

const DemoCard: React.FC<{ item: DemoItem; index: number }> = ({ item, index }) => {
  const { theme } = useTheme();
  const styles = themeStyles[theme as keyof typeof themeStyles];

  return (
    <div 
      className={`${styles.card} ${styles.cardHover} group animate-fade-in-up`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative overflow-hidden rounded-xl mb-4 group/image">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover transition-all duration-500 group-hover/image:scale-125 group-hover/image:rotate-3"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/400x400/${
              theme === 'theme2' ? '374151/f3f4f6' : 
              theme === 'theme3' ? 'a855f7/ffffff' : 
              '3b82f6/ffffff'
            }?text=${encodeURIComponent(item.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
        {theme === 'theme3' && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse hover:animate-bounce">
            DEMO
          </div>
        )}
      </div>
      
      <h3 className={`text-lg font-bold mb-2 ${styles.text} line-clamp-2 group-hover:scale-105 transition-transform duration-300`}>
        {item.title}
      </h3>
      
      <p className={`text-sm mb-4 ${styles.text} opacity-80 line-clamp-2`}>
        {item.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {item.features.map((feature, featureIndex) => (
          <span
            key={featureIndex}
            className={`px-2 py-1 text-xs rounded-full transition-all duration-300 hover:scale-110 animate-fade-in-up ${
              theme === 'theme2' 
                ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' 
                : theme === 'theme3'
                ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 hover:from-pink-200 hover:to-purple-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
            style={{ animationDelay: `${(index * 150) + (featureIndex * 100)}ms` }}
          >
            {feature}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1 group/rating">
          <Star size={16} className="text-yellow-500 fill-current group-hover/rating:animate-spin" />
          <span className={`text-sm font-medium ${styles.text} group-hover/rating:scale-110 transition-transform duration-300`}>
            {item.rating.rate}
          </span>
          <span className={`text-sm ${styles.text} opacity-60`}>
            ({item.rating.count} views)
          </span>
        </div>
        <span className={`text-sm font-medium ${styles.accent} capitalize hover:scale-110 transition-transform duration-300 cursor-pointer`}>
          {item.category.replace('-', ' ')}
        </span>
      </div>
      
      <button className={`w-full ${styles.primaryButton} flex items-center justify-center space-x-2`}>
        <span>View Demo</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const styles = themeStyles[theme as keyof typeof themeStyles];
  const { demoItems, loading } = useDemoItems();

  const features = [
    { icon: Layers, title: "3 Unique Themes", desc: "Each with distinct personality" },
    { icon: Code, title: "React & TypeScript", desc: "Modern development stack" },
    { icon: Zap, title: "Instant Switching", desc: "Seamless theme transitions" }
  ];

  const content = (
    <div className={`${theme === 'theme2' ? 'pt-24' : 'pt-24'} pb-16`}>
      <div className={styles.container}>
        <div className={`text-center mb-16 ${styles.spacing}`}>
          <h1 className={styles.title}>
            Multi-Theme Switcher
          </h1>
          <p className={styles.subtitle}>
            Experience how different themes can completely transform user experience. 
            Switch between Minimalist, Dark Professional, and Creative modes to see the magic.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-500">
            <button className={styles.primaryButton}>
              Try Theme Switching
              <Palette size={20} className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
            </button>
            <button className={styles.secondaryButton}>
              View Code
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16`}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${styles.card} text-center group animate-fade-in-up hover:scale-105 transition-all duration-300`}
              style={{ animationDelay: `${600 + (index * 200)}ms` }}
            >
              <feature.icon size={48} className={`${styles.accent} mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`} />
              <h3 className={`text-xl font-bold mb-2 ${styles.text} group-hover:scale-105 transition-transform duration-300`}>
                {feature.title}
              </h3>
              <p className={`${styles.text} opacity-80`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <div className="text-center mb-12 animate-fade-in-up animation-delay-1000">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${styles.text}`}>
              Theme Demonstrations
            </h2>
            <p className={`text-lg ${styles.text} opacity-80`}>
              See how each theme transforms the same content
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className={`w-16 h-16 rounded-full border-4 border-gray-200 animate-spin`}
                     style={{ 
                       borderTopColor: theme === 'theme2' ? '#f59e0b' : theme === 'theme3' ? '#a855f7' : '#3b82f6',
                       borderRightColor: 'transparent'
                     }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Layers size={24} className={`${styles.accent} animate-pulse`} />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.grid}>
              {demoItems.map((item, index) => (
                <DemoCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>

        <div className={`${styles.card} flex flex-col items-center animate-fade-in-up animation-delay-1200 hover:scale-105 transition-all duration-500`}>
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${styles.text}`}>
            Ready to Build Your Own Multi-Theme App?
          </h3>
          <p className={`text-lg mb-8 ${styles.text} opacity-80 text-center max-w-2xl`}>
            Download the source code and customize these themes for your next project.
          </p>
          <button className={styles.primaryButton}>
            Get Source Code
          </button>
        </div>
      </div>
    </div>
  );

  return theme === 'theme2' ? (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        {content}
      </main>
    </div>
  ) : content;
};

const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  const styles = themeStyles[theme as keyof typeof themeStyles];

  const themeFeatures = [
    { 
      name: "Minimalist", 
      description: "Clean, professional design with subtle gradients and refined typography",
      features: ["Light color palette", "Subtle shadows", "Professional fonts", "Blue accents"]
    },
    { 
      name: "Dark Professional", 
      description: "Sophisticated dark mode with amber highlights and serif typography",
      features: ["Dark slate background", "Amber accents", "Serif fonts", "Elegant gradients"]
    },
    { 
      name: "Creative Colorful", 
      description: "Vibrant, playful interface with rainbow gradients and bold styling",
      features: ["Colorful gradients", "Rounded corners", "Monospace fonts", "Purple/Pink theme"]
    }
  ];

  const content = (
    <div className={`${theme === 'theme2' ? 'pt-24' : 'pt-24'} pb-16`}>
      <div className={styles.container}>
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className={styles.title}>
            Theme Gallery
          </h1>
          <p className={styles.subtitle}>
            Explore the unique characteristics and design philosophy behind each theme
          </p>
        </div>

        <div className={`${styles.spacing} mb-16`}>
          <div className={`${styles.card} animate-fade-in-up animation-delay-200 hover:scale-[1.02] transition-all duration-500`}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${styles.text} group-hover:scale-105 transition-transform duration-300`}>
              About This Demo
            </h2>
            <p className={`text-lg ${styles.text} mb-6 leading-relaxed`}>
              This multi-theme switcher demonstrates how a single React application can provide 
              completely different user experiences through dynamic theming. Each theme isn't just 
              a color change – it's a complete design system with unique typography, spacing, 
              animations, and layout approaches.
            </p>
            <p className={`${styles.text} leading-relaxed`}>
              Built with React, TypeScript, and Tailwind CSS, this demo showcases the power of 
              context-based theming and how modern web applications can adapt to user preferences 
              and different use cases.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`}>
            {themeFeatures.map((themeInfo, index) => (
              <div 
                key={index} 
                className={`${styles.card} animate-fade-in-up hover:scale-105 transition-all duration-500 group`}
                style={{ animationDelay: `${400 + (index * 200)}ms` }}
              >
                <h3 className={`text-xl md:text-2xl font-bold mb-4 ${styles.text} group-hover:scale-105 transition-transform duration-300`}>
                  {themeInfo.name}
                </h3>
                <p className={`${styles.text} mb-4 leading-relaxed`}>
                  {themeInfo.description}
                </p>
                <div className="space-y-2">
                  <h4 className={`font-bold ${styles.text}`}>Key Features:</h4>
                  <ul className={`${styles.text} space-y-1`}>
                    {themeInfo.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className={`flex items-center space-x-2 animate-fade-in-up hover:scale-105 transition-all duration-300`}
                        style={{ animationDelay: `${600 + (index * 200) + (featureIndex * 100)}ms` }}
                      >
                        <div className={`w-2 h-2 rounded-full ${styles.accentBg} animate-pulse`}></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className={theme === 'theme3' ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : styles.spacing}>
            <div className={`${styles.card} animate-fade-in-up animation-delay-1000 hover:scale-[1.02] transition-all duration-500 group`}>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 ${styles.text} group-hover:scale-105 transition-transform duration-300`}>
                Technical Implementation
              </h3>
              <ul className={`${styles.text} space-y-2`}>
                {[
                  "React Context API for theme management",
                  "TypeScript for type safety",
                  "Tailwind CSS for responsive styling",
                  "CSS transitions for smooth switching",
                  "Component-based architecture",
                  "Mobile-first responsive design"
                ].map((item, index) => (
                  <li 
                    key={index}
                    className={`animate-fade-in-up hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer`}
                    style={{ animationDelay: `${1200 + (index * 100)}ms` }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.card} animate-fade-in-up animation-delay-1200 hover:scale-[1.02] transition-all duration-500 group`}>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 ${styles.text} group-hover:scale-105 transition-transform duration-300`}>
                Use Cases
              </h3>
              <ul className={`${styles.text} space-y-2`}>
                {[
                  "Multi-brand applications",
                  "User preference systems",
                  "A/B testing different designs",
                  "Accessibility accommodations",
                  "White-label solutions",
                  "Mood-based interfaces"
                ].map((item, index) => (
                  <li 
                    key={index}
                    className={`animate-fade-in-up hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer`}
                    style={{ animationDelay: `${1400 + (index * 100)}ms` }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={`${styles.card} flex flex-col items-center animate-fade-in-up animation-delay-1600 hover:scale-105 transition-all duration-500`}>
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${styles.text}`}>
            Experience All Three Themes
          </h3>
          <p className={`text-lg mb-8 ${styles.text} opacity-80 text-center max-w-2xl`}>
            Use the theme selector in the header to switch between all available themes and see how dramatically the interface transforms.
          </p>
          <button className={styles.primaryButton}>
            Switch Themes Now
          </button>
        </div>
      </div>
    </div>
  );

  return theme === 'theme2' ? (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        {content}
      </main>
    </div>
  ) : content;
};

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const styles = themeStyles[theme as keyof typeof themeStyles];

  const contactInfo = [
    { icon: Mail, title: "Email Us", value: "vinothselva345@gmail.com", desc: "Questions about implementation" },
    { icon: Code, title: "GitHub", value: "https://github.com/VinothSelvam17/multi-theme-switcher", desc: "View source code & contribute" }
  ];

  const content = (
    <div className={`${theme === 'theme2' ? 'pt-24' : 'pt-24'} pb-16`}>
      <div className={styles.container}>
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className={styles.title}>
            Get In Touch
          </h1>
          <p className={styles.subtitle}>
            Have questions about multi-theme implementation? Want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className={theme === 'theme3' ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : styles.spacing}>
          <div className={`${styles.card} animate-fade-in-up animation-delay-200 hover:scale-[1.02] transition-all duration-500`}>
            <h3 className={`text-2xl font-bold mb-6 ${styles.text}`}>
              Contact Information
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-4 animate-fade-in-up hover:scale-105 transition-all duration-300 group cursor-pointer`}
                  style={{ animationDelay: `${400 + (index * 200)}ms` }}
                >
                  <div className={`p-3 rounded-lg ${styles.accentBg} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon size={24} className={`${styles.accent} text-white group-hover:rotate-12 transition-transform duration-300`} />
                  </div>
                  <div className="group-hover:translate-x-1 transition-transform duration-300">
                    <h4 className={`font-bold text-lg ${styles.text}`}>
                      {info.title}
                    </h4>
                    <p className={`${styles.accent} font-medium hover:underline`}>
                      {info.value}
                    </p>
                    <p className={`text-sm ${styles.text} opacity-70`}>
                      {info.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`mt-8 pt-6 border-t border-gray-200 dark:border-slate-700 animate-fade-in-up animation-delay-800`}>
              <h4 className={`font-bold mb-4 ${styles.text}`}>
                Development Status
              </h4>
              <div className={`space-y-2 text-sm ${styles.text} opacity-80`}>
                {[
                  { label: "Demo Version", value: "v2.0.0" },
                  { label: "Last Updated", value: "August 2025" },
                  { label: "Status", value: "Completed Development", accent: true }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between animate-fade-in-up hover:scale-105 transition-all duration-300`}
                    style={{ animationDelay: `${1000 + (index * 100)}ms` }}
                  >
                    <span>{item.label}</span>
                    <span className={item.accent ? styles.accent : ''}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.card} animate-fade-in-up animation-delay-400 hover:scale-[1.02] transition-all duration-500`}>
            <h3 className={`text-2xl font-bold mb-6 ${styles.text}`}>
              Send us a Message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['First Name', 'Last Name'].map((label, index) => (
                  <div 
                    key={label}
                    className={`animate-fade-in-up`}
                    style={{ animationDelay: `${600 + (index * 100)}ms` }}
                  >
                    <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                      {label}
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none hover:scale-[1.02] focus:scale-[1.02] ${
                        theme === 'theme2' 
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 hover:border-amber-300 focus:border-amber-400' 
                          : theme === 'theme3'
                          ? 'bg-white border-purple-200 text-gray-900 placeholder-gray-500 hover:border-purple-400 focus:border-purple-500'
                          : 'bg-white border-slate-300 text-gray-900 placeholder-gray-500 hover:border-blue-400 focus:border-blue-500'
                      }`}
                      placeholder={index === 0 ? "John" : "Doe"}
                    />
                  </div>
                ))}
              </div>
              
              <div className={`animate-fade-in-up animation-delay-800`}>
                <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'theme2' 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 hover:border-amber-300 focus:border-amber-400' 
                      : theme === 'theme3'
                      ? 'bg-white border-purple-200 text-gray-900 placeholder-gray-500 hover:border-purple-400 focus:border-purple-500'
                      : 'bg-white border-slate-300 text-gray-900 placeholder-gray-500 hover:border-blue-400 focus:border-blue-500'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              
              <div className={`animate-fade-in-up animation-delay-900`}>
                <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                  Subject
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'theme2' 
                      ? 'bg-slate-700 border-slate-600 text-white hover:border-amber-300 focus:border-amber-400' 
                      : theme === 'theme3'
                      ? 'bg-white border-purple-200 text-gray-900 hover:border-purple-400 focus:border-purple-500'
                      : 'bg-white border-slate-300 text-gray-900 hover:border-blue-400 focus:border-blue-500'
                  }`}
                >
                  <option>General Inquiry</option>
                  <option>Implementation Help</option>
                  <option>Collaboration</option>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Theme Customization</option>
                </select>
              </div>
              
              <div className={`animate-fade-in-up animation-delay-1000`}>
                <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                  Message
                </label>
                <textarea
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none resize-none hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'theme2' 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 hover:border-amber-300 focus:border-amber-400' 
                      : theme === 'theme3'
                      ? 'bg-white border-purple-200 text-gray-900 placeholder-gray-500 hover:border-purple-400 focus:border-purple-500'
                      : 'bg-white border-slate-300 text-gray-900 placeholder-gray-500 hover:border-blue-400 focus:border-blue-500'
                  }`}
                  placeholder="Tell us about your project or ask questions about multi-theme implementation..."
                />
              </div>
              
              <button 
                type="submit" 
                className={`w-full ${styles.primaryButton} flex items-center justify-center space-x-2 animate-fade-in-up animation-delay-1100`}
              >
                <Mail size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        <div className={`${styles.card} mt-16 animate-fade-in-up animation-delay-1200 hover:scale-[1.02] transition-all duration-500`}>
          <h3 className={`text-2xl md:text-3xl font-bold mb-8 text-center ${styles.text}`}>
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I implement this in my project?",
                answer: "The demo uses React Context for theme management with Tailwind CSS for styling. You can download the source code and adapt it to your needs."
              },
              {
                question: "Can I add more themes?",
                answer: "Absolutely! The theme system is extensible. Just add new theme objects to the themeStyles configuration and update the selector."
              },
              {
                question: "Is this mobile-friendly?",
                answer: "Yes! All themes are built with a mobile-first approach and work perfectly across all device sizes with responsive design."
              },
              {
                question: "Can I use this commercially?",
                answer: "This is a demo project. Check the license in the GitHub repository for specific usage rights and commercial application guidelines."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className={`animate-fade-in-up hover:scale-105 transition-all duration-300 group cursor-pointer`}
                style={{ animationDelay: `${1400 + (index * 150)}ms` }}
              >
                <h4 className={`font-bold text-lg mb-2 ${styles.text} group-hover:scale-105 transition-transform duration-300`}>
                  {faq.question}
                </h4>
                <p className={`${styles.text} opacity-80 text-sm group-hover:opacity-100 transition-opacity duration-300`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return theme === 'theme2' ? (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        {content}
      </main>
    </div>
  ) : content;
};

const App: React.FC = () => {
  const { currentPage } = useRouter();
  const { theme } = useTheme();
  const styles = themeStyles[theme as keyof typeof themeStyles];
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className={`${styles.body} transition-all duration-700 min-h-screen`}>
      <Header />
      <div className="animate-fade-in">
        {renderPage()}
      </div>
    </div>
  );
};

const AppWithProviders: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  );
};

const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes bounce-subtle {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @keyframes gradient-x {
    0%, 100% {
      background-size: 200% 200%;
      background-position: left center;
    }
    50% {
      background-size: 200% 200%;
      background-position: right center;
    }
  }

  @keyframes spin-in {
    from {
      transform: rotate(-180deg) scale(0.5);
      opacity: 0;
    }
    to {
      transform: rotate(0deg) scale(1);
      opacity: 1;
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }

  .animate-slide-in-left {
    animation: slide-in-left 0.6s ease-out forwards;
    opacity: 0;
  }

  .animate-bounce-subtle {
    animation: bounce-subtle 2s ease-in-out infinite;
  }

  .animate-gradient-x {
    animation: gradient-x 3s ease infinite;
  }

  .animate-spin-in {
    animation: spin-in 0.3s ease-out forwards;
  }

  .animate-fade-in {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }
  .animation-delay-500 { animation-delay: 500ms; }
  .animation-delay-600 { animation-delay: 600ms; }
  .animation-delay-800 { animation-delay: 800ms; }
  .animation-delay-900 { animation-delay: 900ms; }
  .animation-delay-1000 { animation-delay: 1000ms; }
  .animation-delay-1100 { animation-delay: 1100ms; }
  .animation-delay-1200 { animation-delay: 1200ms; }
  .animation-delay-1400 { animation-delay: 1400ms; }
  .animation-delay-1600 { animation-delay: 1600ms; }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default AppWithProviders;
