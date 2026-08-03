import './ProfileHeader.css';

const ProfileHeader = ({ profileData }) => {
  const defaultTags = [
    '생성형 AI',
    '스마트폰 교육',
    '디지털 문해력',
    'AI 콘텐츠 제작'
  ];

  let tags = defaultTags;
  if (profileData && profileData['태그']) {
    tags = profileData['태그'].split(',').map(t => t.trim());
  }

  return (
    <div className="profile-header">
      <img
        src="/profile2.png"
        alt="Profile Avatar"
        className="profile-avatar"
      />
      <h1 className="profile-name">{profileData?.['이름'] || '박소순'}</h1>
      <p className="profile-job">{profileData?.['직업'] || '디지털·AI 활용 전문강사'}</p>
      
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
