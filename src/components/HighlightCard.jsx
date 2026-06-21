import './HighlightCard.css';

const HighlightCard = ({ title, description, url }) => {
  return (
    <a href={url} className="highlight-card" target="_blank" rel="noopener noreferrer">
      <h2 className="highlight-title">{title}</h2>
      <p className="highlight-desc">{description}</p>
    </a>
  );
};

export default HighlightCard;
