
const NewsItem=(props)=>{
    let { Title, Detail, Image ,NewsUrl,author,date,source} = props;
    return (
      <div>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%"}}>
    {source}</span>
          <img src={Image} className="card-img-top" alt="..." />
          
          <div className="card-body">
            <h5 className="card-title">{Title}</h5>
            <p className="card-text">{Detail}...</p>
            <a href={NewsUrl} target="_blank" className="btn btn-primary" rel="noreferrer">
              Read More
            </a>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
          </div>
        </div>
      </div>
    );
}
export default NewsItem;
