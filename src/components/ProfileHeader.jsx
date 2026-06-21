import './ProfileHeader.css';

const ProfileHeader = () => {
  const tags = [
    '생성형 AI',
    '스마트폰 교육',
    '디지털 문해력',
    'AI 콘텐츠 제작'
  ];

  return (
    <div className="profile-header">
      <img
        src="/profile2.png"
        alt="Profile Avatar"
        className="profile-avatar"
      />
      <h1 className="profile-name">박소순</h1>
      <p className="profile-job">디지털·AI 활용 전문강사</p>
      
      <div className="profile-tags">
        {tags.map((tag, index) => (
          <span key={index} className="profile-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;
