import { useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import HighlightCard from './components/HighlightCard';
import IntroCard from './components/IntroCard';
import StandardCard from './components/StandardCard';
import DetailScreen from './components/DetailScreen';
import ContactModal from './components/ContactModal';
import './App.css'; // This is empty now

function App() {
  const [showDetail, setShowDetail] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const highlightData = {
    title: '쉽고 따뜻한 디지털·AI 교육',
    description: '스마트폰부터 생성형 AI까지 함께 배웁니다.',
    url: '#'
  };

  const standardLinks = [
    {
      title: '블로그｜스마트폰·AI 쉬운 활용법',
      description: '',
      url: 'https://blog.naver.com/smart_parksam'
    },
    {
      title: '인스타그램｜smart_parkssam',
      description: '',
      url: 'https://www.instagram.com/smart_parkssam/'
    },
    {
      title: '카카오 오픈채팅｜AI 디지털 전문교육',
      description: '',
      url: 'https://open.kakao.com/o/gvAn1Dui'
    },
    {
      title: '강의 문의하기',
      description: '',
      url: '#',
      isContact: true
    }
  ];

  if (showDetail) {
    return <DetailScreen onBack={() => setShowDetail(false)} />;
  }

  return (
    <>
      <ProfileHeader />
      <HighlightCard 
        title={highlightData.title}
        description={highlightData.description}
        url={highlightData.url}
      />
      <IntroCard />
      <button 
        className="standard-card" 
        onClick={() => setShowDetail(true)}
        style={{ cursor: 'pointer', fontFamily: 'inherit', display: 'flex' }}
      >
        <h3 className="standard-title">강사 소개 자세히 보기</h3>
      </button>
      {standardLinks.map((link, index) => (
        <StandardCard 
          key={index}
          title={link.title}
          description={link.description}
          url={link.url}
          onClick={link.isContact ? (e) => { e.preventDefault(); setShowContactModal(true); } : undefined}
        />
      ))}
      
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </>
  );
}

export default App;
