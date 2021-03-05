import React from "react"

const SchoolDetailRow = ({ school }) => (
  <tr>
    <th className="text-center" scope="row">
      {school.ratings.great_schools_rating
        ? school.ratings.great_schools_rating
        : "N/A"}
    </th>
    <td>{school.name ? school.name : ""}</td>
    <td>{school.grades ? school.grades.range.low + "-" + school.grades.range.high : ""}</td>
    <td>{school.distance_in_miles ? school.distance_in_miles + " mi" : ""}</td>
  </tr>
)
export default SchoolDetailRow