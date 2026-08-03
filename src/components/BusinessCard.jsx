import React, { forwardRef } from 'react';
import QRCode from 'react-qr-code';
import './BusinessCard.css';

const BusinessCard = forwardRef(({ profileData }, ref) => {
  const name = profileData?.['이름'] || '박소순';
  const job = profileData?.['직업'] || '디지털·AI 활용 전문강사';
  const phone = '010-4561-0427';
  const email = 'spss88512@naver.com';
  const url = 'smartparksam-profile.vercel.app';
  const fullUrl = 'https://' + url;

  return (
    <div className="business-card-wrapper" ref={ref}>
      <div className="business-card">
        <div className="bc-header">
          <img src="/profile2.png" alt="Profile" className="bc-avatar" />
          <div className="bc-header-text">
            <h1 className="bc-name">{name}</h1>
            <p className="bc-job">{job}</p>
          </div>
        </div>

        <div className="bc-divider"></div>

        <div className="bc-body">
          <div className="bc-intro">
            <p>디지털 초보자를 위한<br/>스마트폰·생성형 AI 실습 교육</p>
            <p style={{ marginTop: '12px' }}>쉽고 따뜻한 설명으로<br/>디지털 자신감을 키워드립니다.</p>
          </div>
          
          <div className="bc-info-section">
            <div className="bc-info-block">
              <span className="bc-info-title">강의 문의</span>
              <span className="bc-info-value">{phone}</span>
              <span className="bc-info-value">{email}</span>
            </div>
            
            <div className="bc-info-block">
              <span className="bc-info-title">프로필 바로가기</span>
              <span className="bc-info-value" style={{ letterSpacing: '-0.2px' }}>{url}</span>
            </div>
          </div>
        </div>

        <div className="bc-footer">
          <div className="bc-qr-container">
            <QRCode value={fullUrl} size={80} level="M" />
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
