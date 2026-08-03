import './IntroCard.css';

const IntroCard = ({ profileData }) => {
  return (
    <div className="intro-card">
      <p style={{ whiteSpace: 'pre-line' }}>
        {profileData?.['소개글'] || '디지털 초보자를 위한\\n스마트폰·생성형 AI 실습 교육을 진행합니다.\\n쉽고 따뜻한 설명으로 디지털 자신감을 키워드립니다.'}
      </p>
    </div>
  );
};

export default IntroCard;
