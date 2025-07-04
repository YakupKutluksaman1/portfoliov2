'use client'

import { useState, useEffect } from 'react';

// Image import'unu kaldırıyoruz çünkü kullanılmıyor
// import Image from "next/image";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMounted, setIsMounted] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCVModal, setShowCVModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Haberler yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setNews(data.news || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error instanceof Error ? error.message : 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll event listener to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'news', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Sabit navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-white">
              YK<span className="text-blue-500">.</span>
            </div>
            <div className="hidden md:flex space-x-1">
              {['home', 'about', 'skills', 'projects', 'news', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${activeTab === section
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* CV Modal */}
      {showCVModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-white">Request My CV</h3>
              <button
                onClick={() => setShowCVModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const email = formData.get('email');
                const phone = formData.get('phone');
                const message = formData.get('message');

                // E-posta gönderme işlemi
                const mailtoLink = `mailto:yakup.kutluksaman1@gmail.com?subject=CV Request from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AMessage: ${message}`;
                window.location.href = mailtoLink;

                // Modal'ı kapat
                setShowCVModal(false);
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  placeholder="Your email address"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm text-gray-300">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  placeholder="Your phone number"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-gray-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98]"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Ana içerik - Scroll snap container */}
      <main className="scroll-snap-container">
        {/* Hero Section */}
        <section id="home" className="scroll-snap-section relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
          {/* Animasyonlu arka plan */}
          <div className="absolute inset-0">
            {/* Gradyan arka plan */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>

            {/* Dalgalanma efekti */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-wave"></div>
            </div>

            {/* Yumuşak izgara çizgileri */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(30, 64, 175, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(30, 64, 175, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}></div>

            {/* Hareketli noktalar */}
            <div className="absolute inset-0">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-blue-400/30 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${20 + Math.random() * 10}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>

            {/* Parlayan çizgiler */}
            <div className="absolute inset-0">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
                  style={{
                    top: `${(i + 1) * 25}%`,
                    animation: `pulse ${8 + i * 2}s ease-in-out infinite`,
                    animationDelay: `${i * 2}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Mavi ışık çizgileri */}
          <div className="absolute w-full">
            <div className="absolute w-full h-[1px] bg-blue-500/20 blur-sm top-1/3 transform -translate-y-1/2">
              <div className="absolute w-1/4 h-full bg-blue-400/40 blur-md animate-pulse"></div>
            </div>
            <div className="absolute w-full h-[1px] bg-blue-500/20 blur-sm top-2/3 transform -translate-y-1/2">
              <div className="absolute w-1/4 h-full bg-blue-400/40 blur-md animate-pulse" style={{ right: 0 }}></div>
            </div>
          </div>

          {/* Ana içerik */}
          <div className="relative container mx-auto px-4 text-center z-10">
            <div className="mb-8">
              <div className="inline-block bg-blue-500/10 backdrop-blur-sm px-6 py-3 rounded-full text-blue-300 text-sm mb-4 border border-blue-500/20 animate-fade-in hover:bg-blue-500/20 transition-all duration-300">
                👋 Hello, I'm Yakup Kutluksaman
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-gradient">
                Artificial Intelligence & Image Processing
              </span>
              <br />
              <span className="text-white/90">Expert</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              I am a Computer Engineer who develops projects in the fields of artificial intelligence, image processing, and software development.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative bg-transparent border border-white/10 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:bg-white/5 hover:border-white/20 overflow-hidden"
              >
                <span className="relative z-10">View My Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </button>
              <button
                onClick={() => setShowCVModal(true)}
                className="group relative bg-purple-600/10 border border-purple-500/30 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:bg-purple-600/20 overflow-hidden"
              >
                <span className="relative z-10">Request My CV</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative bg-blue-600/10 border border-blue-500/30 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:bg-blue-600/20 overflow-hidden"
              >
                <span className="relative z-10">Contact Me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50">
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-sm mb-2">Scroll down</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </section>

        {/* Diğer bölümler burada devam edecek - mevcut içerik korunacak */}
        // ... existing code ...
      </main>
    </>
  );
}
