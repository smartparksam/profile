import { useState, useEffect } from 'react';
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

  const [standardLinks, setStandardLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('/api/links');
        if (response.ok) {
          const data = await response.json();
          setStandardLinks(data);
        } else {
          console.error('Failed to fetch links');
        }
      } catch (error) {
        console.error('Error fetching links:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, []);

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
      {isLoading ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>링크 불러오는 중...</p>
      ) : (
        standardLinks.map((link, index) => (
          <StandardCard 
            key={index}
            title={link.title}
            description={link.description}
            url={link.url}
            onClick={link.isContact ? (e) => { e.preventDefault(); setShowContactModal(true); } : undefined}
          />
        ))
      )}

      <footer className="profile-footer">
        <p className="footer-guide">
          스마트폰부터 생성형 AI까지<br />
          쉽고 따뜻한 디지털·AI 교육으로 함께합니다.
        </p>
        <p className="footer-copyright">
          ⓒ 박소순 디지털·AI 활용 전문강사
        </p>
      </footer>
      
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </>
  );
}

export default App;
