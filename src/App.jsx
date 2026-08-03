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
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [linksRes, profileRes] = await Promise.all([
          fetch('/api/links'),
          fetch('/api/profile')
        ]);
        
        if (linksRes.ok) {
          const linksData = await linksRes.json();
          setStandardLinks(linksData);
        }
        
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfileData(profileData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (showDetail) {
    return <DetailScreen onBack={() => setShowDetail(false)} profileData={profileData} />;
  }

  const handleSaveContact = (e) => {
    e.preventDefault();
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:박;소순;;;
FN:강사 박소순
TITLE:디지털·AI 활용 전문강사
TEL;TYPE=CELL:010-4561-0427
EMAIL:spss88512@naver.com
URL:https://smartparksam-profile.vercel.app
NOTE:스마트폰·생성형 AI·디지털 문해력 교육
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '박소순_강사.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <ProfileHeader profileData={profileData} />
      <HighlightCard 
        title={profileData?.['메인제목'] || '쉽고 따뜻한 디지털·AI 교육'}
        description={profileData?.['메인설명'] || '스마트폰부터 생성형 AI까지 함께 배웁니다.'}
        url="#"
      />
      <IntroCard profileData={profileData} />
      <button 
        className="standard-card" 
        onClick={() => setShowDetail(true)}
        style={{ cursor: 'pointer', fontFamily: 'inherit', display: 'flex' }}
      >
        <h3 className="standard-title">강사 소개 자세히 보기</h3>
      </button>
      {isLoading ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>데이터 불러오는 중...</p>
      ) : (
        <>
          {standardLinks.map((link, index) => (
            <StandardCard 
              key={index}
              title={link.title}
              description={link.description}
              url={link.url}
              onClick={link.isContact ? (e) => { e.preventDefault(); setShowContactModal(true); } : undefined}
            />
          ))}
          <StandardCard 
            title="연락처 저장하기"
            description=""
            url="#"
            onClick={handleSaveContact}
          />
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b', marginTop: '-4px', marginBottom: '16px' }}>
            다음에 다시 보실 수 있도록 연락처로 저장해두세요.
          </p>
        </>
      )}

      <footer className="profile-footer">
        <p className="footer-guide" style={{ whiteSpace: 'pre-line' }}>
          {profileData?.['하단문구'] || '디지털 초보자를 위한 스마트폰·AI 실습 교육'}
        </p>
        <p className="footer-copyright">
          ⓒ {profileData?.['이름'] || '박소순'} {profileData?.['직업'] || '디지털·AI 활용 전문강사'}
        </p>
      </footer>
      
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </>
  );
}

export default App;
