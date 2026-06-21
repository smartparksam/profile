import './DetailScreen.css';

const DetailScreen = ({ onBack }) => {
  return (
    <div className="detail-screen">
      <div className="detail-header">
        <button className="icon-back-button" onClick={onBack}>
          &#8592; 뒤로가기
        </button>
        <h2 className="detail-page-title">강사 소개</h2>
        <div style={{width: '75px'}}></div> {/* For flex spacing balance */}
      </div>

      <div className="detail-content">
        <div className="detail-section-card">
          <h3 className="section-title">1. 인사말</h3>
          <p className="section-text">
            <strong>디지털·AI 활용 전문강사 박소순</strong><br/><br/>
            스마트폰 활용, 생성형 AI, SNS 콘텐츠 제작, 디지털 문해력 교육을 쉽고 따뜻하게 전달하는 디지털·AI 활용 전문강사입니다.
          </p>
        </div>

        <div className="detail-section-card">
          <h3 className="section-title">2. 주요 활동</h3>
          <p className="section-text">
            현재 디지털콘텐츠 평생교육원 교수, SNS 소통연구소 부산 사상구 지국장으로 활동하고 있으며, 부산 사상구청, 여성문화회관, 롯데백화점본점, 복지관, 평생학습관, 가족센터 등 다양한 기관에서 스마트폰·디지털·AI 교육을 진행해 왔습니다.
          </p>
        </div>

        <div className="detail-section-card">
          <h3 className="section-title">3. 교육 분야</h3>
          <p className="section-text">
            주요 교육 분야는 스마트폰 기초 활용, 생성형 AI, ChatGPT 활용, SNS 콘텐츠 제작, 키오스크, 보이스피싱 예방, 디지털 문해력, 스마트폰활용지도사 자격증 과정입니다.
          </p>
        </div>

        <div className="detail-section-card">
          <h3 className="section-title">4. 자격 및 전문성</h3>
          <p className="section-text">
            스마트폰활용지도사, AI 챗GPT전문지도사, AI마케팅전문지도사, 디지털범죄예방전문지도사, 디지털문해교육전문지도사, 평생교육사, 사회복지사 등 다양한 자격을 보유하고 있습니다.
          </p>
        </div>

        <div className="detail-section-card">
          <h3 className="section-title">5. 저서와 수상</h3>
          <p className="section-text">
            또한 스마트폰 활용 교육 관련 저서를 다수 집필했으며, 과학기술정보통신부장관 표창장, 국회의원 표창장, 부산디지털배움터 우수상 등을 수상했습니다.
          </p>
        </div>

        <div className="detail-section-card">
          <h3 className="section-title">6. 교육 철학</h3>
          <p className="section-text detail-highlight">
            처음 배우는 분들도 부담 없이 따라올 수 있도록 쉽고 따뜻한 실습 중심 교육을 진행합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
