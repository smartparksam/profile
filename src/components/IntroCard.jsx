import './IntroCard.css';

const IntroCard = ({ profileData }) => {
  const rawIntroText = profileData?.['소개글'] || '디지털 초보자를 위한\n스마트폰·생성형 AI 실습 교육을 진행합니다.\n쉽고 따뜻한 설명으로 디지털 자신감을 키워드립니다.';
  
  // 구글 시트에서 작성한 기호(\n) 또는 실제 줄바꿈을 화면에 맞게 처리
  const lines = rawIntroText.replace(/\\n/g, '\n').split('\n');

  return (
    <div className="intro-card">
      <p>
        {lines.map((line, index) => (
          <span key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  );
};

export default IntroCard;
