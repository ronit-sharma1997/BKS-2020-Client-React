import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HouseItemCard from "./HouseItemCard";
import Ridge from "../Pictures/91Ridge.jpg";
import Helene from "../Pictures/15Helene.jpg";
import Hallo from "../Pictures/16Hallo.jpg";
import Berkley from "../Pictures/236Berkley.jpg";
import East from "../Pictures/252East.jpg";
import Kennedy from "../Pictures/322kennedy.jpg";
import NewDurham from "../Pictures/505newdurham.jpg";
import drum from "../Pictures/11drum.jpg";

export default class SoldPropertyCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4
      },
      desktop: {
        breakpoint: { max: 3000, min: 992 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 992, min: 768 },
        items: 3
      },
      medium: {
        breakpoint: { max: 768, min: 576 },
        items: 3
      },

      mobile: {
        breakpoint: { max: 576, min: 0 },
        items: 1
      }
    };
    this.state = {
      boughtHouses: [
        {
          address: {
            line: "91 Ridge Road",
            city: "Rumson",
            state_code: "NJ",
            postal_code: "07760"
          },
          src: Ridge,
          value: "1,930,000"
        },
        {
          address: {
            line: "15 Helene Street",
            city: "Old Bridge",
            state_code: "NJ",
            postal_code: "08857"
          },
          src: Helene,
          value: "505,000"
        },
        {
          address: {
            line: "16 Hallo Street",
            city: "Edison",
            state_code: "NJ",
            postal_code: "08837"
          },
          src: Hallo,
          value: "425,000"
        },
        {
          address: {
            line: "11 Drum Street",
            city: "Iselin",
            state_code: "NJ",
            postal_code: "08830"
          },
          src: drum,
          value: "360,000"
        },
        {
          address: {
            line: "252 East Louis Place",
            city: "Iselin",
            state_code: "NJ",
            postal_code: "08830"
          },
          src: East,
          value: "350,000"
        },
        {
          address: {
            line: "505 New Durham Road",
            city: "Piscataway",
            state_code: "NJ",
            postal_code: "08854"
          },
          src: NewDurham,
          value: "230,000"
        },
        {
          address: {
            line: "236 Berkley Street",
            city: "Iselin",
            state_code: "NJ",
            postal_code: "08830"
          },
          src: Berkley,
          value: "335,000"
        },
        {
          address: {
            line: "322 Kennedy Street",
            city: "Iselin",
            state_code: "NJ",
            postal_code: "08830"
          },
          src: Kennedy,
          value: "285,000"
        }
      ]
    };
  }

  render() {
    return (
      <div className="row mt-5">
        <div className="container">
          <h3
            style={{
              color: "#005f69",
              fontFamily: "Noto Sans KR"
            }}
          >
            SOLD PROPERTIES
          </h3>
          <Carousel
            className="mt-4"
            responsive={this.responsive}
            arrows={true}
            autoPlay={true}
            infinite={true}
            keyBoardControl={false}
          >
            {this.state.boughtHouses.map(function(house, index) {
              return (
                <div key={index}>
                  <HouseItemCard house={house} />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    );
  }
}
