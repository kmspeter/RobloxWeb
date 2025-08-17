import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  BookOpen, 
  Mail, 
  Satellite, 
  Dna, 
  Code, 
  Gamepad2,
  ChevronRight,
  Play,
  Star,
  CheckCircle
} from 'lucide-react';

/**
 * App.jsx — RobloxEdu 싱글 페이지 앱(SPA)
 *
 * ✅ 핵심 역할
 * - 상단 네비게이션(데스크톱/모바일)과 페이지 전환을 관리하는 루트 컴포넌트
 * - Home, About, Courses, Team, Contact 및 하위 코스(Satellite, Synthetic Biology, Coding, English Game) 렌더링
 * - Tailwind CSS 유틸리티 클래스로 반응형 UI 구성
 * - Lucide 아이콘으로 일관된 시각 언어 적용
 *
 * 🎨 디자인 시스템 (참고용)
 * - Primary Blue: #3B82F6 (tailwind: blue-600)
 * - Success Green: #10B981 (tailwind: green-600)
 * - Accent Yellow: #F59E0B (tailwind: yellow-600)
 * - 반응형 기준: 모바일 < 768px, 태블릿 768–1024px, 데스크톱 > 1024px
 *
 * ⚠️ 접근성/구조 관련 메모
 * - 현재 라우팅은 클라이언트 상태 기반(간단한 탭 전환)으로 URL 변경은 없음. 실제 라우팅이 필요하면 react-router 도입 고려.
 * - 아이콘은 대부분 장식적 요소. 스크린리더 배려가 필요하면 aria-hidden 또는 aria-label 추가를 검토.
 * - Contact 폼은 동작 예시 UI만 제공. 제출 핸들러/검증/백엔드 연동 필요(TODO 주석 참조).
 */

function App() {
  // 현재 활성 페이지 상태
  const [currentPage, setCurrentPage] = useState('home');
  // 모바일 햄버거 메뉴 열림/닫힘 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 상단 네비게이션 정의
  // - id는 Page 유니온 타입의 키와 정확히 일치해야 함
  // - submenu가 있는 경우 하위 코스 드롭다운을 데스크톱에서 hover로, 모바일에서 인라인으로 표시
  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Users },
    { 
      id: 'courses', 
      label: 'Learning Courses', 
      icon: BookOpen,
      submenu: [
        { id: 'satellite', label: 'Satellite', icon: Satellite },
        { id: 'synthetic-biology', label: 'Synthetic Biology', icon: Dna },
        { id: 'coding', label: 'Coding', icon: Code },
        { id: 'english-game', label: 'English Learning Game', icon: Gamepad2 }
      ]
    },
    { id: 'team', label: 'Our Team', icon: Users },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  // 네비게이션 버튼 클릭 시 페이지 전환 및 모바일 메뉴 닫기
  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  // 현재 페이지 상태에 따라 해당 섹션 컴포넌트 렌더링
  // 팁: 섹션이 커지거나 코드 분할이 필요하면 React.lazy/Suspense로 지연 로딩 고려
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'about':
        return <AboutPage />;
      case 'courses':
        return <CoursesPage onNavigate={handleNavigation} />;
      case 'satellite':
        return <SatellitePage />;
      case 'synthetic-biology':
        return <SyntheticBiologyPage />;
      case 'coding':
        return <CodingPage />;
      case 'english-game':
        return <EnglishGamePage />;
      case 'team':
        return <TeamPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header: 고정(sticky) 상단바 + 그림자. 스크롤 시 항상 상단에 유지됨 */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 브랜드 로고/타이틀 영역 */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                {/* 장식 아이콘: 스크린리더 배려가 필요하면 aria-hidden 추가 고려 */}
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800">RobloxEdu</span>
            </div>

            {/* Desktop Navigation (>= 1024px) */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.id} className="relative group">
                  {/* 상위 메뉴 버튼: 현재 탭/하위 중 하나가 활성화면 강조 */}
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === item.id || (item.submenu && item.submenu.some(sub => sub.id === currentPage))
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {/* submenu 존재 시 화살표 표시 */}
                    {item.submenu && <ChevronRight className="w-3 h-3" />}
                  </button>
                  
                  {/* 데스크톱 드롭다운: 부모 .group hover 시 표시 */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.submenu.map((subitem) => (
                        <button
                          key={subitem.id}
                          onClick={() => handleNavigation(subitem.id)}
                          className={`flex items-center space-x-2 w-full px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md transition-colors ${
                            currentPage === subitem.id ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                          }`}
                        >
                          <subitem.icon className="w-4 h-4" />
                          <span>{subitem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile menu button (< 1024px): 햄버거/닫기 토글 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              // 접근성: 실제 서비스에서는 aria-controls/aria-expanded를 추가하면 좋음
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation: 아코디언 형태로 상/하위 메뉴 표시 */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              {navigation.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`flex items-center space-x-2 w-full px-4 py-3 text-left rounded-md transition-colors ${
                      currentPage === item.id ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                  {item.submenu && (
                    <div className="ml-6 space-y-1">
                      {item.submenu.map((subitem) => (
                        <button
                          key={subitem.id}
                          onClick={() => handleNavigation(subitem.id)}
                          className={`flex items-center space-x-2 w-full px-4 py-2 text-left text-sm rounded-md transition-colors ${
                            currentPage === subitem.id ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <subitem.icon className="w-4 h-4" />
                          <span>{subitem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content: 상태 기반으로 섹션 렌더링 */}
      <main className="min-h-screen">
        {renderPage()}
      </main>

      {/* Footer: 간단한 사이트맵/회사 정보 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">RobloxEdu</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering students through interactive Roblox-based learning experiences.
              </p>
            </div>
            
            {/* 푸터 빠른 이동 링크: 코스 */}
            <div>
              <h3 className="font-semibold mb-4">Learning Courses</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => handleNavigation('satellite')} className="hover:text-white">Satellite</button></li>
                <li><button onClick={() => handleNavigation('synthetic-biology')} className="hover:text-white">Synthetic Biology</button></li>
                <li><button onClick={() => handleNavigation('coding')} className="hover:text-white">Coding</button></li>
                <li><button onClick={() => handleNavigation('english-game')} className="hover:text-white">English Learning Game</button></li>
              </ul>
            </div>
            
            {/* 푸터 빠른 이동 링크: 회사 */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => handleNavigation('about')} className="hover:text-white">About</button></li>
                <li><button onClick={() => handleNavigation('team')} className="hover:text-white">Our Team</button></li>
                <li><button onClick={() => handleNavigation('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            
            {/* 연락 안내(샘플 텍스트) */}
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <p className="text-gray-400 text-sm">
                Ready to start learning?<br />
                Get in touch with us today.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 RobloxEdu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ onNavigate }) {
  return (
    <div>
      {/* Hero Section: 브랜드 가치/주요 CTA 배치 */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Through
              <span className="text-blue-600"> Roblox</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover exciting educational experiences that combine gaming with real-world learning in STEM, coding, and language arts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* 주요 전환 버튼: 코스 페이지로 이동 */}
              <button 
                onClick={() => onNavigate('courses')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Learning</span>
              </button>
              {/* 보조 버튼: 소개 페이지로 이동 */}
              <button 
                onClick={() => onNavigate('about')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section: 서비스 강점 3가지 하이라이트 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose RobloxEdu?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine the excitement of gaming with rigorous educational content to create unforgettable learning experiences.
            </p>
          </div>

          {/* 카드 기반 레이아웃 + 호버 그림자 효과 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Learning</h3>
              <p className="text-gray-600">
                Engage with complex concepts through hands-on Roblox experiences that make learning fun and memorable.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proven Results</h3>
              <p className="text-gray-600">
                Our students show improved engagement and comprehension across STEM subjects and coding skills.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Content</h3>
              <p className="text-gray-600">
                Curriculum developed by educators and industry professionals to ensure quality and relevance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview: 인기 코스 미리보기 그리드 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600">Explore our most popular learning experiences</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* 개별 카드: 클릭 시 해당 코스 페이지로 이동 */}
            <div 
              onClick={() => onNavigate('satellite')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Satellite className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Satellite</h3>
              <p className="text-gray-600 text-sm">Learn about space technology and orbital mechanics</p>
            </div>

            <div 
              onClick={() => onNavigate('synthetic-biology')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <Dna className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Synthetic Biology</h3>
              <p className="text-gray-600 text-sm">Explore genetic engineering and biotechnology</p>
            </div>

            <div 
              onClick={() => onNavigate('coding')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <Code className="w-6 h-6 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Coding</h3>
              <p className="text-gray-600 text-sm">Master Lua programming and game development</p>
            </div>

            <div 
              onClick={() => onNavigate('english-game')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-600 transition-colors">
                <Gamepad2 className="w-6 h-6 text-yellow-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">English Game</h3>
              <p className="text-gray-600 text-sm">Improve language skills through interactive gameplay</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">About RobloxEdu</h1>
          
          <div className="prose prose-lg max-w-none">
            {/* 소개/미션/비전: 카피 문구와 2열 그리드 */}
            <p className="text-xl text-gray-600 mb-8">
              RobloxEdu is revolutionizing education by harnessing the power of interactive gaming to create immersive learning experiences. We believe that when students are engaged and having fun, they learn better and retain more.
            </p>

            <div className="grid md:grid-cols-2 gap-12 my-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To democratize quality STEM education by making complex concepts accessible and engaging through interactive Roblox experiences that inspire the next generation of innovators and problem-solvers.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  A world where every student has access to engaging, high-quality educational content that prepares them for the challenges and opportunities of tomorrow's technology-driven society.
                </p>
              </div>
            </div>

            {/* 차별점 강조 블록: 체크 아이콘 리스트 */}
            <div className="bg-blue-50 p-8 rounded-xl my-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Curriculum-Aligned Content:</strong> All our courses are designed to meet educational standards while maintaining the fun factor.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Expert Development Team:</strong> Our content is created by educators, game designers, and subject matter experts working together.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Continuous Innovation:</strong> We constantly update and expand our courses based on the latest educational research and technology trends.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoursesPage({ onNavigate }) {
  // 코스 메타데이터: UI 렌더링에 사용되는 정적 데이터
  const courses = [
    {
      id: 'satellite',
      title: 'Satellite Technology',
      description: 'Explore the fascinating world of satellites, orbital mechanics, and space communication systems through interactive simulations.',
      icon: Satellite,
      color: 'blue',
      level: 'Intermediate',
      duration: '8 weeks'
    },
    {
      id: 'synthetic-biology',
      title: 'Synthetic Biology',
      description: 'Dive into genetic engineering, CRISPR technology, and biotechnology applications in this cutting-edge course.',
      icon: Dna,
      color: 'green',
      level: 'Advanced',
      duration: '10 weeks'
    },
    {
      id: 'coding',
      title: 'Coding & Game Development',
      description: 'Master Lua programming and game development principles while creating your own Roblox experiences.',
      icon: Code,
      color: 'purple',
      level: 'Beginner to Advanced',
      duration: '12 weeks'
    },
    {
      id: 'english-game',
      title: 'English Learning Game',
      description: 'Improve vocabulary, grammar, and communication skills through engaging gameplay and interactive stories.',
      icon: Gamepad2,
      color: 'yellow',
      level: 'All Levels',
      duration: '6 weeks'
    }
  ];

  // 색상 토큰 매핑: Tailwind 유틸리티 클래스 조합을 객체로 관리
  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'group-hover:bg-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'group-hover:bg-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'group-hover:bg-purple-600' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', hover: 'group-hover:bg-yellow-600' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Learning Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive suite of educational experiences designed to make learning engaging, interactive, and effective.
          </p>
        </div>

        {/* 2열 카드 그리드: 그룹 호버 시 아이콘 배경/텍스트 컬러 전환 */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course) => {
            const colors = getColorClasses(course.color);
            return (
              <div
                key={course.id}
                onClick={() => onNavigate(course.id)}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mb-6 ${colors.hover} transition-colors`}>
                  <course.icon className={`w-8 h-8 ${colors.text} group-hover:text-white transition-colors`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-6">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex space-x-4">
                    <span className="text-gray-500">
                      <strong>Level:</strong> {course.level}
                    </span>
                    <span className="text-gray-500">
                      <strong>Duration:</strong> {course.duration}
                    </span>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SatellitePage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 영역: 아이콘 배지 + 제목/설명 */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Satellite className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Satellite Technology</h1>
            <p className="text-xl text-gray-600">
              Master the fundamentals of satellite systems, orbital mechanics, and space communication
            </p>
          </div>

          {/* 코스 개요: 3개 메타 패널 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
            <p className="text-gray-700 mb-6">
              This comprehensive course takes students on a journey through satellite technology, from basic orbital mechanics to advanced communication systems. Through interactive Roblox simulations, students will launch virtual satellites, calculate orbital trajectories, and design communication networks.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Duration</h3>
                <p className="text-gray-600">8 weeks</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Level</h3>
                <p className="text-gray-600">Intermediate</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Prerequisites</h3>
                <p className="text-gray-600">Basic Physics & Math</p>
              </div>
            </div>
          </div>

          {/* 학습 목표: 체크 리스트 6항목, 2열 */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">What You'll Learn</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Orbital Mechanics</h4>
                    <p className="text-gray-600 text-sm">Understanding gravity, velocity, and the physics of satellite orbits</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Satellite Types</h4>
                    <p className="text-gray-600 text-sm">LEO, MEO, GEO satellites and their specific applications</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Communication Systems</h4>
                    <p className="text-gray-600 text-sm">Radio waves, antennas, and data transmission protocols</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Mission Planning</h4>
                    <p className="text-gray-600 text-sm">Design satellite missions for specific objectives</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Ground Control</h4>
                    <p className="text-gray-600 text-sm">Operating and monitoring satellite systems from Earth</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Future Technologies</h4>
                    <p className="text-gray-600 text-sm">CubeSats, constellation networks, and emerging trends</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SyntheticBiologyPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Dna className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Synthetic Biology</h1>
            <p className="text-xl text-gray-600">
              Explore genetic engineering, CRISPR technology, and the future of biotechnology
            </p>
          </div>

          {/* 코스 개요 + 3개 메타 패널 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
            <p className="text-gray-700 mb-6">
              Dive into the revolutionary field of synthetic biology where students learn to design and engineer biological systems. Through virtual labs and interactive simulations in Roblox, explore DNA manipulation, protein engineering, and bioethics.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Duration</h3>
                <p className="text-gray-600">10 weeks</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Level</h3>
                <p className="text-gray-600">Advanced</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Prerequisites</h3>
                <p className="text-gray-600">Biology & Chemistry</p>
              </div>
            </div>
          </div>

          {/* 모듈 리스트: 섹션별 설명과 핵심 포인트 */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Course Modules</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Module 1: DNA & Genetic Code</h3>
                <p className="text-gray-600 mb-4">Understanding the building blocks of life and how genetic information is stored and expressed.</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>DNA structure and replication</li>
                  <li>Transcription and translation</li>
                  <li>Gene regulation mechanisms</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Module 2: CRISPR & Gene Editing</h3>
                <p className="text-gray-600 mb-4">Master the revolutionary CRISPR-Cas9 system and other gene editing technologies.</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>CRISPR mechanism and components</li>
                  <li>Designing guide RNAs</li>
                  <li>Applications and limitations</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Module 3: Bioethics & Safety</h3>
                <p className="text-gray-600 mb-4">Explore the ethical implications and safety considerations of synthetic biology.</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Ethical frameworks in biotechnology</li>
                  <li>Biosafety protocols</li>
                  <li>Regulatory landscape</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodingPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Coding & Game Development</h1>
            <p className="text-xl text-gray-600">
              Master Lua programming and create amazing games and experiences in Roblox
            </p>
          </div>

          {/* 개요 + 3개 메타 패널 */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
            <p className="text-gray-700 mb-6">
              From complete beginner to advanced developer, this comprehensive course teaches Lua programming through hands-on Roblox game development. Students will create their own games while learning fundamental programming concepts.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Duration</h3>
                <p className="text-gray-600">12 weeks</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Level</h3>
                <p className="text-gray-600">Beginner to Advanced</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Prerequisites</h3>
                <p className="text-gray-600">None</p>
              </div>
            </div>
          </div>

          {/* 학습 경로(5단계): 번호 배지 + 요약 설명 */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Learning Path</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Programming Fundamentals</h3>
                  <p className="text-gray-600">Variables, data types, operators, and basic syntax in Lua</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Control Structures</h3>
                  <p className="text-gray-600">Conditionals, loops, and functions to control program flow</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Roblox Studio</h3>
                  <p className="text-gray-600">Master the development environment and scripting tools</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Game Mechanics</h3>
                  <p className="text-gray-600">Physics, user input, GUI, and player interactions</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Final Project</h3>
                  <p className="text-gray-600">Design and develop a complete game from concept to publication</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnglishGamePage() {
  return (
    <div className="py-20">{/* 섹션 간 여백(상/하 5rem) */}
      <div className="container mx-auto px-4">{/* 중앙 정렬 + 좌우 패딩 */}
        <div className="max-w-4xl mx-auto">{/* 본문 최대 폭 제한으로 가독성 확보 */}
          {/* ── 1) 헤더 영역: 아이콘 배지 + 제목/설명 ─────────────────────── */}
          <div className="text-center mb-12">{/* 섹션 하단 여백 */}
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {/* 장식 아이콘: 필요 시 aria-hidden="true" 고려 */}
              <Gamepad2 className="w-10 h-10 text-yellow-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">English Learning Game</h1>
            <p className="text-xl text-gray-600">
              {/* 한 문장 미션 스테이트먼트: 코스의 핵심 가치/성과를 요약 */}
              Master English language skills through interactive storytelling and gameplay
            </p>
          </div>

          {/* ── 2) 코스 개요: 그라데이션 카드 + 3개 메타 패널 ──────────────── */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
            <p className="text-gray-700 mb-6">
              {/* 코스 소개: 학습 방식/활용 환경을 간략히 설명 */}
              This innovative course combines language learning with engaging gameplay. Students embark on interactive adventures that challenge their vocabulary, grammar, and communication skills while having fun in immersive Roblox environments.
            </p>
            {/* 메타 패널: Duration/Level/Skills — 추후 dl/dt/dd로의 의미론 개선 여지 */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Duration</h3>
                <p className="text-gray-600">6 weeks</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Level</h3>
                <p className="text-gray-600">All Levels</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Skills</h3>
                <p className="text-gray-600">Speaking, Writing, Reading</p>
              </div>
            </div>
          </div>

          {/* ── 3) Game Features: 학습 기능/콘텐츠 포인트를 카드로 소개 ──────── */}
          <div className="space-y-8">{/* 섹션 내부 블록 간격 */}
            <h2 className="text-3xl font-bold text-gray-900">Game Features</h2>
            {/* 2열 그리드: 반응형으로 md 이상에서 2열, 그 이하는 1열 */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* 카드 1: 스토리텔링 — 분기형 내러티브/대화형 UI */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Storytelling</h3>
                <p className="text-gray-600 mb-4">
                  {/* 내러티브 기반 과제: 문맥 속 어휘/표현을 학습 */}
                  Navigate through branching narratives where your language choices affect the story outcome.
                </p>
                <ul className="text-gray-600 space-y-2">{/* 불릿은 CSS 기호로 간결 표기 */}
                  <li>• Multiple story paths</li>
                  <li>• Character dialogue trees</li>
                  <li>• Context-based vocabulary</li>
                </ul>
              </div>

              {/* 카드 2: 어휘 챌린지 — 퍼즐/퀘스트를 통한 어휘력 강화 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Vocabulary Challenges</h3>
                <p className="text-gray-600 mb-4">
                  Solve puzzles and complete quests that require understanding and using new vocabulary.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Word association games</li>
                  <li>• Contextual definitions</li>
                  <li>• Progressive difficulty</li>
                </ul>
              </div>

              {/* 카드 3: 문법 어드벤처 — 실제 맥락에서의 규칙 적용 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Grammar Adventures</h3>
                <p className="text-gray-600 mb-4">
                  Master grammar rules through practical application in game scenarios.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Sentence construction</li>
                  <li>• Tense practice</li>
                  <li>• Real-time feedback</li>
                </ul>
              </div>

              {/* 카드 4: 소셜 러닝 — 안전한 환경에서의 대화/협력 학습 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Social Learning</h3>
                <p className="text-gray-600 mb-4">
                  Practice communication skills with other players in safe, moderated environments.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Group conversations</li>
                  <li>• Peer collaboration</li>
                  <li>• Cultural exchange</li>
                </ul>
              </div>
            </div>

            {/* TODO: 성취/배지/진도율 시각화 컴포넌트 연결(Progress, Badge, Leaderboard 등) */}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamPage() {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      bio: "Former NASA engineer with 15+ years in educational technology. PhD in Aerospace Engineering from MIT.",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2"
    },
    {
      name: "Mark Rodriguez",
      role: "Lead Game Developer",
      bio: "Veteran Roblox developer and computer science educator. Specialized in creating educational gaming experiences.",
      image: "https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2"
    },
    {
      name: "Dr. Emily Watson",
      role: "Curriculum Director",
      bio: "Educational specialist with expertise in STEM curriculum development. Former high school physics teacher.",
      image: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2"
    },
    {
      name: "James Kim",
      role: "Technology Lead",
      bio: "Full-stack developer with passion for educational technology. Expertise in scalable learning platforms.",
      image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2"
    }
  ];

  return (
    <div className="py-20">{/* 페이지 상/하 여백 */}
      <div className="container mx-auto px-4">
        {/* 섹션 타이틀/설명: 중앙 정렬 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate educators, developers, and innovators who are revolutionizing learning through interactive gaming experiences.
          </p>
        </div>

        {/* 팀 카드 그리드: md부터 2열, 가독성 위해 최대 폭 제한 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="text-center">{/* 카드 래퍼 */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">{/* 아바타 */}
                <img 
                  src={member.image} 
                  alt={member.name} /* 접근성: 인물 이름을 alt로 제공 */
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
              <p className="text-gray-600 max-w-sm mx-auto">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* 채용 CTA: 간단한 랜딩 컴포넌트 */}
        <div className="mt-20 bg-gray-50 p-12 rounded-xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for educational innovation. 
            Help us shape the future of learning!
          </p>
          {/* TODO: 실제 채용 페이지 링크 연결(예: onClick에서 router.push('/careers')) */}
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="py-20">{/* 섹션 상/하 여백 */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">{/* 최대 폭 제한으로 폼 가독성 확보 */}
          {/* 헤더: 타이틀/설명 */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Ready to transform education? We'd love to hear from you.
            </p>
          </div>

          {/* 2열 레이아웃: 좌 정보, 우 폼 */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* ── 좌측: 연락 안내 카드 리스트 ─────────────────────────────── */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <div className="space-y-6">{/* 항목 간 간격 */}
                {/* 이메일 안내 */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                    {/* TODO: mailto 링크 적용 검토 */}
                    <p className="text-gray-600">hello@robloxedu.com</p>
                    <p className="text-gray-600">support@robloxedu.com</p>
                  </div>
                </div>

                {/* 학교 파트너십 */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">For Schools</h3>
                    <p className="text-gray-600">Interested in bringing RobloxEdu to your school?</p>
                    <p className="text-gray-600">Contact our education specialists.</p>
                  </div>
                </div>

                {/* 기술 지원 */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Technical Support</h3>
                    <p className="text-gray-600">Need help with our platform?</p>
                    <p className="text-gray-600">Our technical team is here to assist.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 우측: 문의 폼(데모) ─────────────────────────────────────── */}
            <div className="bg-gray-50 p-8 rounded-xl">{/* 폼 컨테이너 */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              {/* 데모 폼: 현재는 기본 submit 동작. 실제 서비스에서는 onSubmit에서 preventDefault 및 API 연동 필요 */}
              <form className="space-y-6">{/* 폼 요소 간 여백 */}
                {/* 이름/성: 2열 구성 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* 이메일 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                {/* 주제 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option>General Inquiry</option>
                    <option>School Partnership</option>
                    <option>Technical Support</option>
                    <option>Course Information</option>
                  </select>
                </div>

                {/* 메시지 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* 제출 버튼: 실제 전송 전까지 type="button"으로 두고 모달/토스트 안내도 가능 */}
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>

                {/* TODO: 제출 상태(loading), 성공/실패 피드백(UI 토스트/알럿) 추가 */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
