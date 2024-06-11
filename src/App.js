import React, { Component } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import About from "./Components/About";
import LoadingBar from "react-top-loading-bar";

const pageSize = 5;

export default class App extends Component {
  state = {
    progress: 0
  };

  SetProgress = (progress) => {
    this.setState({ progress: progress });
  };

  createRoutes = () => [
    {
      path: "/Entertainment",
      element: (
        <News SetProgress={this.SetProgress} PageSize={pageSize} country={"in"} Category={"entertainment"} />
      ),
    },
    {
      path: "/",
      element: <News SetProgress={this.SetProgress} PageSize={pageSize} country={"in"} Category={"business"} />,
    },
    {
      path: "/Business",
      element: <News SetProgress={this.SetProgress} PageSize={pageSize} country={"in"} Category={"business"} />,
    },
    {
      path: "/General",
      element: <News SetProgress={this.SetProgress} PageSize={pageSize} country={"in"} Category={"general"} />,
    },
    {
      path: "/Health",
      element: <News SetProgress={this.SetProgress} PageSize={pageSize} country={"in"} Category={"health"} />,
    },
    {
      path: "/Science",
      element: <News SetProgress={this.SetProgress} PageSize={pageSize} country={"in"} Category={"science"} />,
    },
    {
      path: "/Sports",
      element: <News SetProgress={this.SetProgress} PageSize={pageSize} country={"in"} Category={"sports"} />,
    },
    {
      path: "/Technology",
      element: (
        <News SetProgress={this.SetProgress} PageSize={pageSize} country={"in"} Category={"technology"} />
      ),
    },
    {
      path: "/About",
      element: <About />,
    },
    {
      path: "/Home",
      element: <News SetProgress={this.SetProgress} PageSize={pageSize} country={"in"} Category={"business"} />,
    },
  ];

  render() {
    const router = createBrowserRouter(this.createRoutes());
    return (
      <div>
        <LoadingBar color='#f11946' progress={this.state.progress} height={3} />
        <Navbar />
        <RouterProvider router={router} />
      </div>
    );
  }
}
