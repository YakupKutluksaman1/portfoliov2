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

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
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

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-gradient">
                Artificial Intelligence & Image Processing
              </span>
              <br />
              <span className="text-white/90">Expert</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
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

            {/* CV Modal */}
            {showCVModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 max-w-2xl w-full mx-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-white">CV Request Form</h3>
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

                      const mailtoLink = `mailto:yakup.kutluksaman1@gmail.com?subject=${encodeURIComponent(`CV Request from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`)}`;

                      window.location.href = mailtoLink;
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
          </div>

          {/* Aşağı ok animasyonu */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <svg className="w-6 h-6 text-white/30 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Hafif dalgalanma efekti */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-wave-slow"></div>
            </div>

            {/* Yumuşak noktalar */}
            <div className="absolute inset-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float-slow ${25 + Math.random() * 10}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-16 text-white">About Me</h2>
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Sol taraf - Profil Kartı */}
              <div className="lg:w-1/2 relative">
                <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-blue-500/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10">
                        <span className="text-4xl">👨‍💻</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Yakup Kutluksaman</h3>
                        <p className="text-blue-400">Computer Engineer</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                          <span className="text-xl">🎓</span>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Education</p>
                          <p className="text-white">Iskenderun Technical University</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                          <span className="text-xl">🎯</span>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Expertise</p>
                          <p className="text-white">Artificial Intelligence & Image Processing</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                          <span className="text-xl">💡</span>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Interests</p>
                          <p className="text-white">Machine Learning, Deep Learning, LLMs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ taraf - Metin içeriği */}
              <div className="lg:w-1/2">
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                    <p className="leading-relaxed text-gray-300">
                      Hello, I'm Yakup Kutluksaman. I am a Computer Engineer passionate about artificial intelligence, image processing, and software development. I am currently pursuing my bachelor's degree in Computer Engineering at Iskenderun Technical University.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                    <p className="leading-relaxed text-gray-300">
                      Throughout my academic journey, as a student with a 3.1 GPA, I have developed a special interest in courses such as artificial intelligence, machine learning, and object-oriented programming. I continuously strive to improve myself in these areas and learn new technologies.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-green-500/30 transition-all duration-300">
                    <p className="leading-relaxed text-gray-300">
                      In the field of image processing, I have developed projects using techniques such as histogram equalization, HSV color space, and dynamic clustering. Additionally, I work on large language models (LLMs) and artificial intelligence technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Ana gradyan arka plan */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>

            {/* Hareketli çizgiler */}
            <div className="absolute inset-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
                  style={{
                    top: `${(i + 1) * 20}%`,
                    animation: `moveLines ${15 + i * 2}s linear infinite`,
                    animationDelay: `${i * 2}s`
                  }}
                ></div>
              ))}
            </div>

            {/* Parlayan noktalar */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `pulse ${3 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>

            {/* Gradient daireler */}
            <div className="absolute inset-0">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-96 h-96 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(147, 51, 234, 0.1)'} 0%, transparent 70%)`,
                    top: `${20 + i * 30}%`,
                    left: `${20 + i * 30}%`,
                    animation: `float ${20 + i * 5}s ease-in-out infinite`,
                    animationDelay: `${i * 3}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-16 text-white">My Skills</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Programming Languages */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:scale-110 transition-transform">
                    <span className="text-3xl">💻</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Programming Languages</h3>
                </div>

                <div className="space-y-6">
                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <span className="text-xl">🐍</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-blue-400 mb-2">Python</h4>
                        <p className="text-gray-400 text-sm">Developing data analysis and AI applications with NumPy, Pandas, OpenCV, TensorFlow, and PyTorch libraries</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <span className="text-xl">☕</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-blue-400 mb-2">Java</h4>
                        <p className="text-gray-400 text-sm">Strong foundation in object-oriented programming, data structures, and algorithms</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <span className="text-xl">⚡</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-blue-400 mb-2">C</h4>
                        <p className="text-gray-400 text-sm">Experience in system programming, memory management, and low-level programming</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artificial Intelligence & Machine Learning */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-purple-500/10 rounded-lg group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🤖</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Artificial Intelligence & ML</h3>
                </div>

                <div className="space-y-6">
                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <span className="text-xl">🧠</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-purple-400 mb-2">Machine Learning</h4>
                        <p className="text-gray-400 text-sm">Supervised and unsupervised learning, model training and optimization, data preprocessing and analysis</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <span className="text-xl">🔮</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-purple-400 mb-2">Deep Learning</h4>
                        <p className="text-gray-400 text-sm">CNN, RNN architectures, transfer learning, and model optimization</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <span className="text-xl">🗣️</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-purple-400 mb-2">LLMs</h4>
                        <p className="text-gray-400 text-sm">Developing chatbots and natural language processing applications with large language models</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <span className="text-xl">🤖</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-purple-400 mb-2">AI Agent Development</h4>
                        <p className="text-gray-400 text-sm">LangChain framework, RAG structure, Sequential Chain, and Custom Agent design</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Processing */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-green-500/10 rounded-lg group-hover:scale-110 transition-transform">
                    <span className="text-3xl">📸</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Image Processing</h3>
                </div>

                <div className="space-y-6">
                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <span className="text-xl">👁️</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-green-400 mb-2">OpenCV</h4>
                        <p className="text-gray-400 text-sm">Real-time image processing, object detection, and face recognition applications</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-green-400 mb-2">Image Analysis</h4>
                        <p className="text-gray-400 text-sm">Histogram equalization, edge detection, color space transformations, and filtering techniques</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <span className="text-xl">🔍</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-green-400 mb-2">Object Detection</h4>
                        <p className="text-gray-400 text-sm">Object detection and classification using YOLO, MediaPipe, and custom CNN models</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <span className="text-xl">✨</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-green-400 mb-2">Image Enhancement</h4>
                        <p className="text-gray-400 text-sm">Noise reduction, contrast enhancement, and image sharpening techniques</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools & IDEs */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-orange-500/10 rounded-lg group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🛠️</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Tools & IDEs</h3>
                </div>

                <div className="space-y-6">
                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <span className="text-xl">💻</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-orange-400 mb-2">Development Environments</h4>
                        <p className="text-gray-400 text-sm">Professional development experience with VS Code, PyCharm, and Jupyter Notebook</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <span className="text-xl">🔄</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-orange-400 mb-2">Version Control</h4>
                        <p className="text-gray-400 text-sm">Project management and collaboration with Git and GitHub</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <span className="text-xl">🤖</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-orange-400 mb-2">AI-Assisted Development</h4>
                        <p className="text-gray-400 text-sm">AI pair programming and smart code completion with Cursor IDE</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <span className="text-xl">🎯</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-orange-400 mb-2">AI Agent Integration</h4>
                        <p className="text-gray-400 text-sm">Automation of development processes with custom AI agents</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Dairesel gradyan */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.1)_0%,transparent_50%)] animate-pulse-slow"></div>

            {/* Izgara efekti */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(30, 64, 175, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(30, 64, 175, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>

            {/* Hareketli parçacıklar */}
            <div className="absolute inset-0">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-blue-400/20 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `floatParticle ${10 + Math.random() * 10}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>

            {/* Yüzen ışık çizgileri */}
            <div className="absolute inset-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-[2px] w-1/3 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
                  style={{
                    top: `${25 * (i + 1)}%`,
                    left: `${i % 2 === 0 ? '0' : '66.66%'}`,
                    animation: `floatLine ${15 + i * 2}s linear infinite`,
                    animationDelay: `${i * 2}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-16 text-white">My Projects</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Barrier-Free Communication System */}
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-blue-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                      <span className="text-4xl">🤟</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Barrier-Free Communication System</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-300 border border-blue-500/20">Python</span>
                        <span className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-300 border border-blue-500/20">OpenCV</span>
                        <span className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-300 border border-blue-500/20">MediaPipe</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    I developed an AI model that converts sign language to text and text to speech by processing camera input. This system aims to facilitate communication for visually and hearing impaired individuals.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                      <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400">◆</span>
                          Real-time hand gesture analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400">◆</span>
                          Text-to-speech conversion
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400">◆</span>
                          High accuracy rate
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-400">Role:</div>
                      <div className="text-sm text-white">Project Developer & AI Model Designer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AHAS Project */}
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-green-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                      <span className="text-4xl">🌱</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">AHAS</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-300 border border-green-500/20">Python</span>
                        <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-300 border border-green-500/20">TÜBİTAK 2209-A</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    This project, supported by TÜBİTAK 2209-A, involves developing a software application to optimize light conditions for plant growth in soilless agriculture systems.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                      <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <span className="text-green-400">◆</span>
                          Smart lighting control
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-400">◆</span>
                          Environmental data analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-400">◆</span>
                          Automation system
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-400">Role:</div>
                      <div className="text-sm text-white">Algorithm Designer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pie Chart Analysis */}
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-purple-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                      <span className="text-4xl">📊</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Pie Chart Analysis</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-300 border border-purple-500/20">LLM</span>
                        <span className="px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-300 border border-purple-500/20">Image Processing</span>
                        <span className="px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-300 border border-purple-500/20">Histogram</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    I developed an image processing algorithm that can analyze colors, percentages, and bar graph levels in graphical data. Additionally, I designed a chatbot that allows users to ask questions about graphs and receive comprehensive, analysis-focused responses based on processed data.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                      <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <span className="text-purple-400">◆</span>
                          Automatic graph analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-purple-400">◆</span>
                          LLM-powered interpretation
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-purple-400">◆</span>
                          Interactive querying
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-400">Role:</div>
                      <div className="text-sm text-white">Algorithm Developer & Chatbot Designer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smart Robot Assistant */}
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-red-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                      <span className="text-4xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Smart Robot Assistant</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-300 border border-red-500/20">Python</span>
                        <span className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-300 border border-red-500/20">OpenCV</span>
                        <span className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-300 border border-red-500/20">Raspberry Pi</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    I am developing a Raspberry Pi-based robot assistant equipped with image processing and object recognition capabilities that can play various games. The project is still in development phase, combining my skills in artificial intelligence and robotics.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                      <h4 className="text-white font-semibold mb-3">Development Stages:</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <span className="text-red-400">◆</span>
                          Real-time object detection and tracking
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-red-400">◆</span>
                          Hardware integration with Raspberry Pi
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-red-400">◆</span>
                          Game strategy development
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-400">Status:</div>
                      <div className="text-sm text-white">In Development</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI News Section */}
        <section id="news" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Animasyonlu arka plan */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-wave"></div>
            </div>

            {/* Izgara efekti */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(30, 64, 175, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(30, 64, 175, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-16 text-white">Latest AI News</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {isLoading ? (
                // Loading state
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
                      <div className="h-6 bg-white/10 rounded w-24"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      <div className="h-4 bg-white/10 rounded w-full"></div>
                      <div className="h-4 bg-white/10 rounded w-2/3"></div>
                    </div>
                  </div>
                ))
              ) : news.length > 0 ? (
                news.slice(0, 6).map((item, index) => (
                  <div key={index} className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="p-6 relative">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                          <span className="text-2xl">📰</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white">{item.source}</h3>
                      </div>
                      <div className="space-y-4">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block group/link">
                          <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                            <h4 className="text-blue-400 mb-2 group-hover/link:text-blue-300">{item.title}</h4>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                            <p className="text-gray-500 text-xs mt-2">
                              {new Date(item.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-400">
                  {error || 'An error occurred while loading the news. Please try again later.'}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Yumuşak dalgalanma */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5 animate-wave-vertical"></div>
            </div>

            {/* Hafif ızgara */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(30, 64, 175, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(30, 64, 175, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-16 text-white">Contact Me</h2>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left side - Contact Information */}
                <div className="space-y-8">
                  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                          <span className="text-2xl">📧</span>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Email</p>
                          <a href="mailto:yakup.kutluksaman1@gmail.com" className="text-white hover:text-blue-400 transition-colors">
                            yakup.kutluksaman1@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
                          <span className="text-2xl">📍</span>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Location</p>
                          <p className="text-white">Izmir, Konak</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-semibold text-white mb-6">Social Media</h3>

                    <div className="flex flex-col gap-4">
                      <a
                        href="https://linkedin.com/in/yakup-kutluksaman"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 p-4 bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-xl hover:from-blue-500/10 hover:to-blue-600/10 transition-all duration-300 border border-blue-500/10 hover:border-blue-500/30 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                          <span className="text-xl">🔗</span>
                        </div>
                        <div className="relative">
                          <span className="text-white group-hover:text-blue-400 transition-colors">LinkedIn</span>
                          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
                        </div>
                      </a>

                      <a
                        href="https://github.com/YakupKutluksaman1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 p-4 bg-gradient-to-br from-purple-500/5 to-purple-600/5 rounded-xl hover:from-purple-500/10 hover:to-purple-600/10 transition-all duration-300 border border-purple-500/10 hover:border-purple-500/30 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                          <span className="text-xl">🐱</span>
                        </div>
                        <div className="relative">
                          <span className="text-white group-hover:text-purple-400 transition-colors">GitHub</span>
                          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right side - Contact Form */}
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-6">Send Message</h3>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get('name');
                      const email = formData.get('email');
                      const phone = formData.get('phone');
                      const message = formData.get('message');

                      const mailtoLink = `mailto:yakup.kutluksaman1@gmail.com?subject=${encodeURIComponent(`CV Request from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`)}`;

                      window.location.href = mailtoLink;
                      setShowCVModal(false);
                    }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-gray-300">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                        placeholder="Your name"
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
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98]"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="py-8 relative">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Yakup Kutluksaman. All rights reserved.</p>
              <p className="mt-2">This website and its content is protected by copyright law. Any unauthorized use or reproduction of the materials on this site is strictly prohibited.</p>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes moveLines {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }

        @keyframes floatParticle {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(100px, 100px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        @keyframes floatLine {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
    </>
  );
}
