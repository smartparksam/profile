import './StandardCard.css';

const StandardCard = ({ title, description, url, onClick }) => {
  if (onClick) {
    return (
      <button onClick={onClick} className="standard-card" style={{ cursor: 'pointer', fontFamily: 'inherit', display: 'flex', width: '100%' }}>
        <h3 className="standard-title">{title}</h3>
        {description && <p className="standard-desc">{description}</p>}
      </button>
    );
  }

  return (
    <a href={url} className="standard-card" target="_blank" rel="noopener noreferrer">
      <h3 className="standard-title">{title}</h3>
      {description && <p className="standard-desc">{description}</p>}
    </a>
  );
};

export default StandardCard;
