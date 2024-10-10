import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
// document.title =
//       props.Category.charAt(0).toUpperCase() +
//       props.Category.slice(1);
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // constructor(props) {
  //   super(props);
  // }

  const UpdateFnc = async () => {
    const { country, Category, PageSize } = props;
    props.SetProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${Category}&apiKey=db1149931caa492e960137e4281d96e5&page=${page}&pageSize=${PageSize}`;
    try {
      setLoading(true);
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      let parsedData = await data.json();
      console.log("API response:", parsedData); // Check if this is logged
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching data:", error); // This will catch fetch errors
    } finally {
      setLoading(false);
      props.SetProgress(100);
    }
  };
  

  useEffect(() => {
    UpdateFnc();
  }, []);
  const fetchMoreData = async() => {
    const newPage = page + 1;
    setPage(newPage);
    const { country, Category, PageSize } = props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${Category}&apiKey=db1149931caa492e960137e4281d96e5&page=${newPage}&pageSize=${PageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };
  
  return (
    <div className="container">
      <h1
        className="text-center my-4"
        style={{ position: "relative", top: "40px" }}
      >
        NewsMonk - Top{" "}
        {props.Category.charAt(0).toUpperCase() + props.Category.slice(1)}{" "}
        Headlines
      </h1>
      {/* {state.loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((element, key) => {
              return (
                <div className="col-md-4 my-4" key={key}>
                  <NewsItem
                    Title={element.title || "The Title"}
                    Detail={element.description || "Details"}
                    Image={
                      element.urlToImage ||
                      "https://licindia.in/documents/d/guest/no_image_news"
                    }
                    NewsUrl={element.url}
                    author={element.author || "Unknown"}
                    date={element.publishedAt || "Unknown"}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default News;
