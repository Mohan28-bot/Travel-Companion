const Card = ({ imageUrl, title, description, link }) => {
  return (
    <div className="card">
      <div>
        <img src={imageUrl} alt={title}></img>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank">
        View More
      </a>
    </div>
  );
};

export default Card;
