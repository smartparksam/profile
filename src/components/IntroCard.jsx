import './IntroCard.css';

const IntroCard = ({ profileData }) => {
  const rawText = profileData?.['소개글'] || '디지털 초보자를 위한\n스마트폰·생성형 AI 실습 교육을 진행합니다.\n쉽고 따뜻한 설명으로 디지털 자신감을 키워드립니다.';
  
  // 구글 시트에서 사용자가 직접 입력한 \n 텍스트를 실제 줄바꿈 문자로 변환
  const formattedText = rawText.replace(/\\n/g, '\n');

  return (
    <div className="intro-card">
      <p style={{ whiteSpace: 'pre-line' }}>
        {formattedText}
      </p>
    </div>
  );
};

export default IntroCard;
