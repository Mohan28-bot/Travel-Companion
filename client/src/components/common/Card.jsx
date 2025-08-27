const Card = ({ imageUrl, title, description, link }) => {
  return (
    <div className="card">
      <div>
        <img src={imageUrl} alt={title}></img>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="..." target="_blank" rel="noreferrer">Link</a>
    </div>
  );
};

export default Card;
