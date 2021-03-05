import React from "react"
import DisplayCard from "./DisplayCard"

/**
 * List of Image Display Cards displaying text such as 'What is My House Worth?"
 */
const DisplayCards = ({ isAboutMe }) => {
  return (
    <div className="container">
      <div className={`row ${isAboutMe ? "" : "mt-5"}`}>
        <DisplayCard
          backgroundImage={"houseworth.jpg"}
          position={true}
          right={1}
          lineone={"What Is My"}
          linetwo={"Home Worth?"}
          subtitle={"Let Us Help You!"}
          paragraph={
            "We're here to make sure you get the best price - Get a Comparative Market Analysis"
          }
          isAboutMe={isAboutMe}
          urlLink={"/what-is-my-home-worth"}
        />
        <DisplayCard
          backgroundImage={"dreamhouse.jpg"}
          position={false}
          right={isAboutMe ? 1 : 0}
          lineone={"Find My"}
          linetwo={"Dream Home"}
          subtitle={"Let Us Help You!"}
          paragraph={
            "We're here to make sure you can find your dream home. Tell us what you're looking for!"
          }
          isAboutMe={isAboutMe}
          urlLink={"/find-my-dream-home"}
        />
      </div>
    </div>
  )
}

export default DisplayCards