import React from "react";
import MainPageDescription from "../Components/MainPageDescription";
import SoldPropertyCarousel from "../Components/SoldPropertyCarousel";
import DisplayCard from "../Components/DisplayCard";

export default class MainPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-12 col-md-4">
            <DisplayCard
              lineOne={"What is my"}
              lineTwo={"Home"}
              lineThree={"Worth?"}
              url="/what-is-my-home-worth"
              right={false}
            />
          </div>
          <div className="col-12 col-md-4 mt-4 mt-md-0">
            <DisplayCard
              lineOne={"Find my"}
              lineTwo={"Dream"}
              lineThree={"Home!"}
              url="/find-my-dream-home"
              right={true}
            />
          </div>
        </div>
        <MainPageDescription props={this.props} isAboutMe={false} />
        <SoldPropertyCarousel />
      </div>
    );
  }
}
