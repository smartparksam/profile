import './StandardCard.css';

const StandardCard = ({ title, description, url }) => {
  return (
    <a href={url} className="standard-card" target="_blank" rel="noopener noreferrer">
      <h3 className="standard-title">{title}</h3>
      <p className="standard-desc">{description}</p>
    </a>
  );
};

export default StandardCard;
