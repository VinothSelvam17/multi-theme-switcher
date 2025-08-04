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
    navButton: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition-all duration-200',
    navButtonActive: 'text-blue-600 bg-blue-50 border border-blue-200',
    
    card: 'bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 hover:shadow-md transition-all duration-300',
    cardHover: 'hover:shadow-lg hover:-translate-y-1',
    
    title: 'text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight',
    subtitle: 'text-xl text-slate-600 mb-8 leading-relaxed',
    text: 'text-slate-700 leading-relaxed',
    
    primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white px-8 flex items-center py-3 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200',
    secondaryButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-200',
    
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    spacing: 'space-y-8',
    
    accent: 'text-blue-600',
    accentBg: 'bg-blue-600'
  },
  
  theme2: {
    name: 'Dark Professional',
    body: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 font-serif',
    container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
    
    header: 'bg-slate-900/80 backdrop-blur-md border-b border-slate-700/60 shadow-xl',
    headerText: 'text-slate-100',
    logo: 'text-white font-bold text-xl',
    navButton: 'text-slate-300 hover:text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-200',
    navButtonActive: 'text-amber-400 bg-slate-700/60 border border-amber-400/30',
    
    card: 'bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/60 p-8 hover:bg-slate-800/80 transition-all duration-300',
    cardHover: 'hover:shadow-2xl hover:border-slate-600/60',
    
    title: 'text-4xl md:text-6xl font-bold text-white mb-8 leading-tight font-serif',
    subtitle: 'text-xl text-slate-300 mb-10 leading-relaxed font-serif',
    text: 'text-slate-200 leading-relaxed font-serif',
    
    primaryButton: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 flex items-center py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300',
    secondaryButton: 'bg-slate-700 hover:bg-slate-600 text-slate-200 px-8 py-4 rounded-xl font-bold border border-slate-600 transition-all duration-300',
    
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
    navButton: 'text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-200',
    navButtonActive: 'text-white bg-white/30 border-2 border-white/50 backdrop-blur-sm',
    
    card: 'bg-white rounded-3xl shadow-xl border-4 border-purple-200/50 p-8 hover:shadow-2xl hover:border-purple-300/60 transform hover:scale-105 transition-all duration-300',
    cardHover: 'hover:rotate-1',
    
    title: 'text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 leading-tight',
    subtitle: 'text-xl text-purple-700 mb-10 leading-relaxed font-bold',
    text: 'text-gray-700 leading-relaxed font-mono',
    
    primaryButton: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white px-8 flex items-center py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300',
    secondaryButton: 'bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 px-8 py-4 rounded-full font-bold border-2 border-purple-300 transition-all duration-300',
    
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
  const styles = themeStyles[theme as keyof typeof themeStyles];

  const navItems = [
    { key: 'home', label: 'Demo', icon: Home },
    { key: 'about', label: 'Themes', icon: Palette },
    { key: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <header className={`${styles.header} fixed top-0 left-0 right-0 z-50 transition-all duration-500`}>
      <div className={styles.container}>
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className={`${styles.logo} flex items-center space-x-2`}>
            <Layers size={28} />
            <span>ThemeSwitcher</span>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => navigate(key)}
                className={`${styles.navButton} ${
                  currentPage === key ? styles.navButtonActive : ''
                } flex items-center space-x-2`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className={`appearance-none px-4 py-2 rounded-lg border-2 transition-all cursor-pointer ${
                  theme === 'theme2' 
                    ? 'bg-slate-800 border-slate-600 text-white' 
                    : theme === 'theme3'
                    ? 'bg-white/20 border-white/30 text-white backdrop-blur-sm'
                    : 'bg-white border-slate-300 text-slate-900'
                } hover:border-opacity-60 focus:outline-none`}
              >
                <option value="theme1" className="text-slate-900">Minimalist</option>
                <option value="theme2" className="text-slate-900">Dark Pro</option>
                <option value="theme3" className="text-slate-900">Creative</option>
              </select>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${styles.navButton}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            theme === 'theme2' ? 'border-slate-700' :
            theme === 'theme3' ? 'border-white/20' :
            'border-slate-200'
          } transition-all duration-300`}>
            <nav className="space-y-2">
              {navItems.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    navigate(key);
                    setMobileMenuOpen(false);
                  }}
                  className={`${styles.navButton} ${
                    currentPage === key ? styles.navButtonActive : ''
                  } flex items-center space-x-3 w-full text-left`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
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
    <aside className="w-80 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/60 pt-20 min-h-screen">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Navigation</h2>
          <p className="text-slate-400 text-sm">Professional Dashboard</p>
        </div>
        
        <nav className="space-y-3">
          {navItems.map(({ key, label, icon: Icon, desc }) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`flex items-start space-x-4 w-full px-4 py-4 rounded-xl transition-all duration-200 ${
                currentPage === key
                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/30 text-amber-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon size={24} className="mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-bold text-lg">{label}</div>
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

const DemoCard: React.FC<{ item: DemoItem }> = ({ item }) => {
  const { theme } = useTheme();
  const styles = themeStyles[theme as keyof typeof themeStyles];

  return (
    <div className={`${styles.card} ${styles.cardHover} group`}>
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/400x400/${
              theme === 'theme2' ? '374151/f3f4f6' : 
              theme === 'theme3' ? 'a855f7/ffffff' : 
              '3b82f6/ffffff'
            }?text=${encodeURIComponent(item.title)}`;
          }}
        />
        {theme === 'theme3' && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            DEMO
          </div>
        )}
      </div>
      
      <h3 className={`text-lg font-bold mb-2 ${styles.text} line-clamp-2`}>
        {item.title}
      </h3>
      
      <p className={`text-sm mb-4 ${styles.text} opacity-80 line-clamp-2`}>
        {item.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {item.features.map((feature, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs rounded-full ${
              theme === 'theme2' 
                ? 'bg-amber-500/20 text-amber-400' 
                : theme === 'theme3'
                ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {feature}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <Star size={16} className="text-yellow-500 fill-current" />
          <span className={`text-sm font-medium ${styles.text}`}>
            {item.rating.rate}
          </span>
          <span className={`text-sm ${styles.text} opacity-60`}>
            ({item.rating.count} views)
          </span>
        </div>
        <span className={`text-sm font-medium ${styles.accent} capitalize`}>
          {item.category.replace('-', ' ')}
        </span>
      </div>
      
      <button className={`w-full ${styles.primaryButton} flex items-center justify-center space-x-2`}>
        <span>View Demo</span>
        <ArrowRight size={18} />
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className={styles.primaryButton}>
              Try Theme Switching
              <Palette size={20} className="ml-2" />
            </button>
            <button className={styles.secondaryButton}>
              View Code
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  mb-16`}>
          {features.map((feature, index) => (
            <div key={index} className={`${styles.card} text-center`}>
              <feature.icon size={48} className={`${styles.accent} mx-auto mb-4`} />
              <h3 className={`text-xl font-bold mb-2 ${styles.text}`}>
                {feature.title}
              </h3>
              <p className={`${styles.text} opacity-80`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
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
                <div className={`w-16 h-16 rounded-full border-4 border-gray-200 ${styles.accentBg} animate-spin`}
                     style={{ borderTopColor: 'transparent' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Layers size={24} className={styles.accent} />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.grid}>
              {demoItems.map((item) => (
                <DemoCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div className={`${styles.card} flex flex-col items-center`}>
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${styles.text}`}>
            Ready to Build Your Own Multi-Theme App?
          </h3>
          <p className={`text-lg mb-8 ${styles.text} opacity-80`}>
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
        <div className="text-center mb-16">
          <h1 className={styles.title}>
            Theme Gallery
          </h1>
          <p className={styles.subtitle}>
            Explore the unique characteristics and design philosophy behind each theme
          </p>
        </div>

        <div className={`${styles.spacing} mb-16`}>
          <div className={styles.card}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${styles.text}`}>
              About This
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
              <div key={index} className={styles.card}>
                <h3 className={`text-xl md:text-2xl font-bold mb-4 ${styles.text}`}>
                  {themeInfo.name}
                </h3>
                <p className={`${styles.text} mb-4 leading-relaxed`}>
                  {themeInfo.description}
                </p>
                <div className="space-y-2">
                  <h4 className={`font-bold ${styles.text}`}>Key Features:</h4>
                  <ul className={`${styles.text} space-y-1`}>
                    {themeInfo.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${styles.accentBg}`}></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className={theme === 'theme3' ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : styles.spacing}>
            <div className={styles.card}>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 ${styles.text}`}>
                Technical Implementation
              </h3>
              <ul className={`${styles.text} space-y-2`}>
                <li>• React Context API for theme management</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS for responsive styling</li>
                <li>• CSS transitions for smooth switching</li>
                <li>• Component-based architecture</li>
                <li>• Mobile-first responsive design</li>
              </ul>
            </div>

            <div className={styles.card}>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 ${styles.text}`}>
                Use Cases
              </h3>
              <ul className={`${styles.text} space-y-2`}>
                <li>• Multi-brand applications</li>
                <li>• User preference systems</li>
                <li>• A/B testing different designs</li>
                <li>• Accessibility accommodations</li>
                <li>• White-label solutions</li>
                <li>• Mood-based interfaces</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`${styles.card} flex flex-col items-center`}>
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${styles.text}`}>
            Experience All Three Themes
          </h3>
          <p className={`text-lg mb-8 ${styles.text} opacity-80`}>
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
        <div className="text-center mb-16">
          <h1 className={styles.title}>
            Get In Touch
          </h1>
          <p className={styles.subtitle}>
            Have questions about multi-theme implementation? Want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className={theme === 'theme3' ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : styles.spacing}>
          <div className={styles.card}>
            <h3 className={`text-2xl font-bold mb-6 ${styles.text}`}>
              Contact Information
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${styles.accentBg} bg-opacity-10`}>
                    <info.icon size={24} className={`${styles.accent} text-white`} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${styles.text}`}>
                      {info.title}
                    </h4>
                    <p className={`${styles.accent} font-medium`}>
                      {info.value}
                    </p>
                    <p className={`text-sm ${styles.text} opacity-70`}>
                      {info.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
              <h4 className={`font-bold mb-4 ${styles.text}`}>
                Development Status
              </h4>
              <div className={`space-y-2 text-sm ${styles.text} opacity-80`}>
                <div className="flex justify-between">
                  <span>Demo Version</span>
                  <span>v2.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated</span>
                  <span>August 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className={styles.accent}>Completed Development</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={`text-2xl font-bold mb-6 ${styles.text}`}>
              Send us a Message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                      theme === 'theme2' 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-amber-400' 
                        : theme === 'theme3'
                        ? 'bg-white border-purple-200 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                        : 'bg-white border-slate-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    }`}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                      theme === 'theme2' 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-amber-400' 
                        : theme === 'theme3'
                        ? 'bg-white border-purple-200 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                        : 'bg-white border-slate-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    }`}
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                    theme === 'theme2' 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-amber-400' 
                      : theme === 'theme3'
                      ? 'bg-white border-purple-200 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                      : 'bg-white border-slate-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                  Subject
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                    theme === 'theme2' 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-amber-400' 
                      : theme === 'theme3'
                      ? 'bg-white border-purple-200 text-gray-900 focus:border-purple-500'
                      : 'bg-white border-slate-300 text-gray-900 focus:border-blue-500'
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
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                  Message
                </label>
                <textarea
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none resize-none ${
                    theme === 'theme2' 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-amber-400' 
                      : theme === 'theme3'
                      ? 'bg-white border-purple-200 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                      : 'bg-white border-slate-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }`}
                  placeholder="Tell us about your project or ask questions about multi-theme implementation..."
                />
              </div>
              
              <button 
                type="submit" 
                className={`w-full ${styles.primaryButton} flex items-center justify-center space-x-2`}
              >
                <Mail size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        <div className={`${styles.card} mt-16`}>
          <h3 className={`text-2xl md:text-3xl font-bold mb-8 text-center ${styles.text}`}>
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className={`font-bold text-lg mb-2 ${styles.text}`}>
                How do I implement this in my project?
              </h4>
              <p className={`${styles.text} opacity-80 text-sm`}>
                The demo uses React Context for theme management with Tailwind CSS for styling. 
                You can download the source code and adapt it to your needs.
              </p>
            </div>
            <div>
              <h4 className={`font-bold text-lg mb-2 ${styles.text}`}>
                Can I add more themes?
              </h4>
              <p className={`${styles.text} opacity-80 text-sm`}>
                Absolutely! The theme system is extensible. Just add new theme objects to the 
                themeStyles configuration and update the selector.
              </p>
            </div>
            <div>
              <h4 className={`font-bold text-lg mb-2 ${styles.text}`}>
                Is this mobile-friendly?
              </h4>
              <p className={`${styles.text} opacity-80 text-sm`}>
                Yes! All themes are built with a mobile-first approach and work perfectly 
                across all device sizes with responsive design.
              </p>
            </div>
            <div>
              <h4 className={`font-bold text-lg mb-2 ${styles.text}`}>
                Can I use this commercially?
              </h4>
              <p className={`${styles.text} opacity-80 text-sm`}>
                This is a demo project. Check the license in the GitHub repository for 
                specific usage rights and commercial application guidelines.
              </p>
            </div>
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
    <div className={`${styles.body} transition-all duration-500 min-h-screen`}>
      <Header />
      {renderPage()}
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

export default AppWithProviders;
