import React from "react"
import Constants from "../Constants/Constants"

const houseConstants = Constants.getInstance()

const PropertyHistDetailItem = ({ event }) => (
  <tr>
    <td>{houseConstants.getFormattedDate(event.date)}</td>
    <td>{event.event_name}</td>
    <td>${houseConstants.getHousePrice(event.price)}</td>
    <td>
      {event.datasource_name || event.datasource_name !== ""
        ? event.datasource_name
        : "N/A"}
    </td>
  </tr>
)
export default PropertyHistDetailItem