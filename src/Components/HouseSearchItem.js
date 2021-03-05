import React from "react";
import styled from "@emotion/styled/macro";
import { Link } from "react-router-dom";

const HouseSearchItem = ({
  thumbnail,
  address,
  beds,
  bathrooms,
  price,
  sqFt,
  houseId
}) => {
  const DisplayOver = styled.div({
    height: "100%",
    left: "0",
    position: "absolute",
    top: "0",
    width: "100%",
    zIndex: 2,
    transition: "background-color 350ms ease",
    backgroundColor: "transparent",
    padding: "20px 20px 0 20px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });

  const SubTitle = styled.h5({
    fontFamily: "Helvetica",
    transform: "translate3d(0,50px,0)",
    background: "none",
    transition: "transform 350ms ease",
    color: "white"
  });

  const DetailTitle = styled.h6({
    fontFamily: "Helvetica",
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
    color: "white",
    position: "absolute",
    left: "5.5vw",
    bottom: "100px"
  });

  const Paragraph = styled.p({
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
    color: "white"
  });

  const CTA = styled.div({
    position: "absolute",
    bottom: "20px",
    left: "20px"
  });

  const Hover = styled.div({
    opacity: 0,
    transition: "opacity 350ms ease"
  });

  const Background = styled.div({
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#000",
    position: "relative",
    width: "100%",
    height: "200px",
    cursor: "pointer",
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${thumbnail})`,
    [`:hover ${DisplayOver}`]: {
      backgroundColor: "rgba(95, 158, 160, 0.7)"
    },
    [`:hover ${SubTitle},:hover ${DetailTitle}, :hover ${Paragraph}`]: {
      transform: "translate3d(0,0,0)"
    },
    [`:hover ${Hover}`]: {
      opacity: 1
    },
    [`:hover ${SubTitle}`]: {
      color: "transparent"
    }
  });

  return (
    <Background>
      <DisplayOver>
        <SubTitle
          style={{ position: "absolute", left: "1rem", bottom: "3rem" }}
        >
          {address[0]}
          <br></br>
          {address[1]}
        </SubTitle>
        <span
          style={{
            position: "absolute",
            left: "1rem",
            top: "0.5rem",
            color: "white",
            padding: "5px"
          }}
        >
          ${price}
        </span>
        <span
          style={{
            position: "absolute",
            right: "1rem",
            top: "0.5rem",
            background: "rgba(255, 255, 255, 0.9)",
            fontSize: "14px",
            letterSpacing: "0.1em",
            color: "rgb(0, 95, 105)",
            padding: "5px"
          }}
        >
          For Sale
        </span>
        <Hover>
          <DetailTitle
            style={{
              top: "50%",
              left: "33%",
              transform: "translate(-50%, -50%)"
            }}
          >
            Beds<br></br>
            <span style={{ marginLeft: "0.75rem" }}>{beds}</span>
          </DetailTitle>
          <DetailTitle
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            Baths<br></br>
            <span style={{ marginLeft: "0.75rem" }}>{bathrooms}</span>
          </DetailTitle>
          <DetailTitle
            style={{
              top: "50%",
              left: "66%",
              transform: "translate(-50%, -50%)"
            }}
          >
            Sq. Ft<br></br>
            <span>{sqFt}</span>
          </DetailTitle>

          <CTA>
            <Link style={{ color: "white" }} to={`/home-search/${houseId}`}>
              View Details +
            </Link>
          </CTA>
        </Hover>
      </DisplayOver>
    </Background>
  );
};

export default HouseSearchItem;
