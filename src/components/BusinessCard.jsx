import React, { forwardRef } from 'react';
import QRCode from 'react-qr-code';
import './BusinessCard.css';

const BusinessCard = forwardRef(({ profileData }, ref) => {
  const name = profileData?.['이름'] || '박소순';
  const job = profileData?.['직업'] || '디지털·AI 활용 전문강사';
  const phone = '010-4561-0427';
  const email = 'spss88512@naver.com';
  const url = 'https://smartparksam-profile.vercel.app';
  const intro = profileData?.['하단문구'] || '디지털 초보자를 위한 스마트폰·AI 실습 교육';

  return (
    <div className="business-card-wrapper" ref={ref}>
      <div className="business-card">
        <div className="bc-header">
          <img src="/profile2.png" alt="Profile" className="bc-avatar" />
          <div className="bc-header-text">
            <h1 className="bc-name">강사 {name}</h1>
            <p className="bc-job">{job}</p>
          </div>
        </div>

        <div className="bc-divider"></div>

        <div className="bc-body">
          <p className="bc-intro">{intro}</p>
          
          <div className="bc-info">
            <div className="bc-info-item">
              <span className="bc-info-label">휴대폰</span>
              <span className="bc-info-value">{phone}</span>
            </div>
            <div className="bc-info-item">
              <span className="bc-info-label">이메일</span>
              <span className="bc-info-value">{email}</span>
            </div>
            <div className="bc-info-item">
              <span className="bc-info-label">웹사이트</span>
              <span className="bc-info-value" style={{ fontSize: '13px' }}>{url}</span>
            </div>
          </div>
        </div>

        <div className="bc-footer">
          <div className="bc-qr-container">
            <QRCode value={url} size={90} level="M" />
          </div>
          <div className="bc-qr-text">
            <p>카메라로 비추면<br/>프로필 앱으로<br/>연결됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BusinessCard;
