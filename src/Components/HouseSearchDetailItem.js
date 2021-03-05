import React from "react"
import HouseDetailItem from "./HouseDetailItem"
import SchoolDetailRow from "./SchoolDetailRow"
import ImageCarosel from "./ImageCarosel"
import Constants from "../Constants/Constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed } from "@fortawesome/free-solid-svg-icons"
import { faShower } from "@fortawesome/free-solid-svg-icons"
import { faRuler } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { faHammer } from "@fortawesome/free-solid-svg-icons"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap"
import PropertyHistDetailItem from "./PropertyHistDetailItem"
import CanvasJSReact from "../canvasjs-3.2.6/canvasjs.react"
import SearchForSale from "../Components/SearchForSale"
import AWSService from "../Services/AWSService"

const awsService = AWSService.getInstance()

const CanvasJSChart = CanvasJSReact.CanvasJSChart

const houseConstants = Constants.getInstance()


class HouseSearchDetailItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      editedHomePrice: 525000,
      editedDownPayment: 105000,
      editedMortgageTerm: 30,
      editedInterestRate: 3.376,
      editedDownPercent: (105000 / 525000) * 100,
      editedPrincipal: 1857,
      homeDetails: {},
      isRefresh: true
    }

    this.toggle = this.toggle.bind(this)

    this.setHomeDetails = this.setHomeDetails.bind(this)

    awsService.getHouseDetails(this.props.houseId, this.setHomeDetails)

  }

  

  setHomeDetails(homeDetails) {
    if(homeDetails) {
    this.setState((prevState) => ({
      ...prevState,
      homeDetails: homeDetails.body[0],
      isRefresh: false
    })) 
  }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState((prevState) => ({
        ...prevState,
        activeTab: tab,
      }))
    }
  }

  calculateMortgage(loanAmt, interestRate, termLen) {
    var interest = interestRate / 1200
    var term = termLen * 12
    return +Number(
      (loanAmt * interest * (1 + interest) ** term) /
        ((1 + interest) ** term - 1)
    ).toFixed(2)
  }

  changeHomePrice = (event) => {
    event.persist()
    var loan = event.target.value - this.state.editedDownPayment
    this.setState((prevState) => ({
      ...prevState,
      editedHomePrice: event.target.value,
      editedDownPercent: Number(
        (this.state.editedDownPayment / event.target.value) * 100
      ).toFixed(2),
      editedPrincipal: this.calculateMortgage(
        loan,
        prevState.editedInterestRate,
        prevState.editedMortgageTerm
      ),
    }))
  }

  changeDownPayment = (event) => {
    event.persist()
    var loan = this.state.editedHomePrice - event.target.value
    this.setState((prevState) => ({
      ...prevState,
      editedDownPayment: event.target.value,
      editedDownPercent:
        (event.target.value / this.state.editedHomePrice) * 100,
      editedPrincipal: this.calculateMortgage(
        loan,
        prevState.editedInterestRate,
        prevState.editedMortgageTerm
      ),
    }))
  }

  changeDownPercent = (event) => {
    event.persist()
    var loan =
      this.state.editedHomePrice -
      (event.target.value / 100) * this.state.editedHomePrice
    this.setState((prevState) => ({
      ...prevState,
      editedDownPercent: event.target.value,
      editedDownPayment:
        (event.target.value / 100) * this.state.editedHomePrice,
      editedPrincipal: this.calculateMortgage(
        loan,
        prevState.editedInterestRate,
        prevState.editedMortgageTerm
      ),
    }))
  }

  changeMortgageTerm = (event) => {
    event.persist()
    var loan = this.state.editedHomePrice - this.state.editedDownPayment
    var term = event.target.value
    this.setState((prevState) => ({
      ...prevState,
      editedMortgageTerm: event.target.value,
      editedPrincipal: this.calculateMortgage(
        loan,
        prevState.editedInterestRate,
        term
      ),
    }))
  }

  changeInterestRate = (event) => {
    event.persist()
    var loan = this.state.editedHomePrice - this.state.editedDownPayment
    this.setState((prevState) => ({
      ...prevState,
      editedInterestRate: event.target.value,
      editedPrincipal: this.calculateMortgage(
        loan,
        event.target.value,
        prevState.editedMortgageTerm
      ),
    }))
  }

  render() {
    const DonutChartOptions = {
      animationEnabled: true,
      title: {
        text: "Monthly Payment",
      },
      legend: {
        horizontalAlign: "right", // "center" , "right"
        verticalAlign: "center", // "top" , "bottom"
        fontSize: 15,
      },
      subtitles: [
        {
          text:
            "$" +
            (
              this.state.editedPrincipal +
              (this.state.homeDetails.mortgage &&
                this.state.homeDetails.mortgage.estimate.monthly_property_taxes) +
              (this.state.homeDetails.mortgage &&
                this.state.homeDetails.mortgage.estimate.monthly_home_insurance) +
              (this.state.homeDetails.mortgage &&
                this.state.homeDetails.mortgage.estimate.hoa_fees)
            ).toFixed(2),
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "0'%'",
          dataPoints: [
            {
              name: "Principal & Interest",
              legendText:
                "Principal & Interest: $" +
                this.state.editedPrincipal.toFixed(2),
              y:
                (this.state.editedPrincipal * 100) /
                (this.state.editedPrincipal +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.monthly_property_taxes) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.monthly_home_insurance) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.hoa_fees) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate
                      .monthly_mortgage_insurance)),
            },
            {
              name: "Property Tax",
              legendText:
                "Property Tax: $" +
                (this.state.homeDetails.mortgage &&
                  this.state.homeDetails.mortgage.estimate.monthly_property_taxes),
              y:
                ((this.state.homeDetails.mortgage &&
                  this.state.homeDetails.mortgage.estimate.monthly_property_taxes) *
                  100) /
                (this.state.editedPrincipal +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.monthly_property_taxes) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.monthly_home_insurance) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.hoa_fees) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate
                      .monthly_mortgage_insurance)),
            },
            {
              name: "Home Insurance",
              legendText:
                "Home Insurance: $" +
                (this.state.homeDetails.mortgage &&
                  this.state.homeDetails.mortgage.estimate.monthly_home_insurance),
              y:
                ((this.state.homeDetails.mortgage &&
                  this.state.homeDetails.mortgage.estimate.monthly_home_insurance) *
                  100) /
                (this.state.editedPrincipal +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.monthly_property_taxes) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.monthly_home_insurance) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.hoa_fees) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate
                      .monthly_mortgage_insurance)),
            },
            {
              name: "HOA Fees",
              legendText:
                "HOA Fees: $" +
                (this.state.homeDetails.mortgage &&
                  this.state.homeDetails.mortgage.estimate.hoa_fees),
              y:
                (this.state.homeDetails.mortgage &&
                  this.state.homeDetails.mortgage.estimate.hoa_fees * 100) /
                (this.state.editedPrincipal +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.monthly_property_taxes) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.monthly_home_insurance) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.hoa_fees) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate
                      .monthly_mortgage_insurance)),
            },
            {
              name: "Mortgage Insurance",
              legendText:
                "Mortgage Insurance: $" +
                (this.state.homeDetails.mortgage &&
                  this.state.homeDetails.mortgage.estimate
                    .monthly_mortgage_insurance),
              y:
                ((this.state.homeDetails.mortgage &&
                  this.state.homeDetails.mortgage.estimate
                    .monthly_mortgage_insurance) *
                  100) /
                (this.state.editedPrincipal +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.monthly_property_taxes) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.monthly_home_insurance) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate.hoa_fees) +
                  (this.state.homeDetails.mortgage &&
                    this.state.homeDetails.mortgage.estimate
                      .monthly_mortgage_insurance)),
            },
          ],
        },
      ],
    }

    let address = houseConstants.getHouseAddress(this.state.homeDetails.address)

    return (
      <div key={1}>
        { this.state.isRefresh && <div className="loading-page">
          <div className="spinner-container">
              <div className="spinner-border" style={{color: "rgb(0, 95, 105)"}} role="status">
                <span className="sr-only">Loading...</span>
                </div> 
          </div>
        </div>
        }
      { !this.state.isRefresh && <div className="container mt-3">
        <div className="row justify-content-center">
          <div className={`${this.props.breakPoint ? 'col-10' : 'col-8'}`}>
            <ImageCarosel images={this.state.homeDetails.photos} detailPage={true} />
            <div className="row">
              <div className="col-12 col-md-8 text-center text-md-left">
                <b>{`${address[0]} ${address[1]}`}</b>
              </div>
              <div className="col-12 col-md-4 text-center text-md-right">
                <b>${houseConstants.getHousePrice(this.state.homeDetails.price)}</b>
              </div>
            </div>
            <div className="row container text-center mt-3">
              <div className="col-md-2 col-4 pl-0 pr-0 mr-0">
                <FontAwesomeIcon icon={faBed} size={"2x"} style={{color: 'rgb(0, 95, 105)'}} />
                <span style={{ display: "block" }}>Beds</span>
                <b>{this.state.homeDetails.beds}</b>
              </div>
              <div className="col-md-2 col-4 pl-0 pr-0 mr-0">
                <FontAwesomeIcon icon={faShower} size={"2x"} style={{color: 'rgb(0, 95, 105)'}}/>
                <span style={{ display: "block" }}>Baths</span>
                <b>{this.state.homeDetails.baths}</b>
              </div>
              <div className="col-md-2 col-4 pl-0 pr-0 mr-0">
                <FontAwesomeIcon icon={faRuler} size={"2x"} style={{color: 'rgb(0, 95, 105)'}} />{" "}
                <span style={{ display: "block" }}> Sq Ft</span>
                <b>
                  {this.state.homeDetails.building_size &&
                    this.state.homeDetails.building_size.size}
                </b>
              </div>
              <div className="col-md-2 col-4 mt-3 mt-md-0 pl-0 pr-0 mr-0">
                <FontAwesomeIcon icon={faHome} size={"2x"} style={{color: 'rgb(0, 95, 105)'}}/>{" "}
                <span style={{ display: "block" }}> Type</span>
                <b>{houseConstants.getHouseType(this.state.homeDetails.prop_type)}</b>
              </div>
              <div className="col-md-2 col-4 mt-3 mt-md-0 pl-0 pr-0 mr-0">
                <FontAwesomeIcon icon={faHammer} size={"2x"} style={{color: 'rgb(0, 95, 105)'}} />{" "}
                <span style={{ display: "block" }}> Built</span>
                <b>{this.state.homeDetails.year_built}</b>
              </div>
              <div className="col-md-2 col-4 mt-3 mt-md-0 pl-0 pr-0 mr-0">
                <FontAwesomeIcon icon={faCalendarAlt} size={"2x"} style={{color: 'rgb(0, 95, 105)'}} />{" "}
                <span style={{ display: "block" }}> On Market</span>
                <b>
                  {houseConstants.getListDate(this.state.homeDetails.list_date)} days
                </b>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <p>{this.state.homeDetails.description}</p>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className={`${this.props.isSmallSizeDevice ? 'col-6' : 'col-12'} text-center`}>
              <Nav className="justify-content-center" pills style={{display: this.props.isSmallSizeDevice ? 'inherit' : 'flex'}}>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={
                      this.state.activeTab === "1" ? "active" : ""
                  }
                    onClick={() => {
                      this.toggle("1")
                    }}
                  >
                    Features
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={
                      this.state.activeTab === "2" ? "active" : ""
                    }
                    onClick={() => {
                      this.toggle("2")
                    }}
                  >
                    Schools
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={
                      this.state.activeTab === "3" ? "active" : ""
                    }
                    onClick={() => {
                      this.toggle("3")
                    }}
                  >
                    Listing Agent
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={
                      this.state.activeTab === "4" ? "active" : ""
                    }
                    onClick={() => {
                      this.toggle("4")
                    }}
                  >
                    Property History
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={
                      this.state.activeTab === "5" ? "active" : ""
                    }
                    onClick={() => {
                      this.toggle("5")
                    }}
                  >
                    Mortgage
                  </NavLink>
                </NavItem>
              </Nav>
              </div>
            </div>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane key={1} tabId="1">
                <div className="row mt-2">
                  <div
                    className="col-12 pl-1"
                    style={{
                      backgroundColor: "#ccc",
                      border: "1px solid #999",
                      borderRadius: "3px",
                    }}
                  >
                    Location Information
                  </div>
                </div>
                <div className="row mb-2">
                  <HouseDetailItem
                    header={"County"}
                    value={
                      this.state.homeDetails.address &&
                      this.state.homeDetails.address.county
                    }
                    firstRow={true}
                    key={"County"}
                  />
                  <HouseDetailItem
                    header={"City"}
                    value={
                      this.state.homeDetails.address && this.state.homeDetails.address.city
                    }
                    firstRow={true}
                    key={"City"}
                  />
                </div>
                <div className="row">
                  <HouseDetailItem
                    header={"Latitude"}
                    value={
                      this.state.homeDetails.address && this.state.homeDetails.address.lat
                    }
                    firstRow={false}
                    key={"Latitude"}
                  />
                  <HouseDetailItem
                    header={"Longitude"}
                    value={
                      this.state.homeDetails.address && this.state.homeDetails.address.lon
                    }
                    firstRow={false}
                    key={"Longitude"}
                  />
                </div>

                {this.state.homeDetails.features &&
                  this.state.homeDetails.features.map((feature, index) => {
                    var isFirstRow = true
                    var count = 0
                    var noHeaderDes = ""
                    return [
                      <div className="row" key={index}>
                        <div
                          className="col-12 pl-1"
                          style={{
                            backgroundColor: "rgb(211, 211, 211)",
                            border: "1px solid #999",
                            borderRadius: "3px",
                          }}
                        >
                          {feature.category}
                        </div>
                      </div>,
                      <div className="row" key={index+".1"}>
                        {feature.text.map((description, index) => {
                          var containsHeader = description.includes(":")
                          if (isFirstRow) {
                            if (count > 1) {
                              isFirstRow = false
                            }
                          }

                          if (containsHeader) {
                            if (index === feature.text.length - 1) {
                              if (noHeaderDes !== "") {
                                count = count + 2
                                return [
                                  <HouseDetailItem
                                    header={description.substring(
                                      0,
                                      description.indexOf(":")
                                    )}
                                    value={description.substring(
                                      description.indexOf(":") + 1,
                                      description.length
                                    )}
                                    firstRow={isFirstRow}
                                    key={index}
                                  />,
                                  <HouseDetailItem
                                    header={feature.category}
                                    value={noHeaderDes.substring(
                                      0,
                                      noHeaderDes.length - 2
                                    )}
                                    firstRow={!(count > 2)}
                                    key={index + '.1'}
                                  />,
                                ]
                              } else {
                                count++
                                return (
                                  <HouseDetailItem
                                    header={description.substring(
                                      0,
                                      description.indexOf(":")
                                    )}
                                    value={description.substring(
                                      description.indexOf(":") + 1,
                                      description.length
                                    )}
                                    firstRow={isFirstRow}
                                    key={index}
                                  />
                                )
                              }
                            } else {
                              count++
                              return (
                                <HouseDetailItem
                                  header={description.substring(
                                    0,
                                    description.indexOf(":")
                                  )}
                                  value={description.substring(
                                    description.indexOf(":") + 1,
                                    description.length
                                  )}
                                  firstRow={isFirstRow}
                                  key={index}
                                />
                              )
                            }
                          } else {
                            noHeaderDes = noHeaderDes.concat(description + ", ")
                            if (index === feature.text.length - 1) {
                              count++
                              return (
                                <HouseDetailItem
                                  header={feature.category}
                                  value={noHeaderDes.substring(
                                    0,
                                    noHeaderDes.length - 2
                                  )}
                                  firstRow={isFirstRow}
                                  key={index}
                                />
                              )
                            }
                            return (<div/>)
                          }
                        })}
                      </div>,
                    ]
                  })}
              </TabPane>

              <TabPane key={2} tabId="2">
                <Table className="mt-2 table-responsive" hover>
                  <thead style={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    <tr>
                      <th>
                        <a href="https://www.greatschools.org/" target="_blank" rel="noreferrer">
                          GreatSchools
                        </a>{" "}
                        Rating
                      </th>
                      <th>School Name</th>
                      <th>Grades</th>
                      <th>Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.homeDetails.schools &&
                      this.state.homeDetails.schools.map(function(school, index) {
                        return(
                        <SchoolDetailRow school={school} key={index} />
                      )})}
                  </tbody>
                </Table>
              </TabPane>

              <TabPane key={3} tabId="3">
                <div
                  className="row mt-2"
                  style={{
                    borderBottom: "2px solid #ccc",
                    borderTop: "2px solid #ccc",
                  }}
                >
                  <div className={`${this.props.isSmallSizeDevice ? 'col-12' : 'col-6'}`}>
                    <div className="row">
                      <div className="col-12">Listing Agent:</div>
                      <div className="col-12">
                        REALTOR®{" "}
                        {this.state.homeDetails.agents &&
                            this.state.homeDetails.agents[0] &&
                            this.state.homeDetails.agents[0].href && this.state.homeDetails.agents[0].href !== "" ? <a
                            href={"https://"+this.state.homeDetails.agents[0].href}
                            target="_blank"
                            rel="noreferrer"
                          >
                    
                             {this.state.homeDetails.agents[0].name}
                          </a> : this.state.homeDetails.agents[0].name}
                        
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-12">Brokered By:</div>
                      <div className="col-12">
                        {this.state.homeDetails.broker &&
                          this.state.homeDetails.broker.name}
                      </div>
                      <div className="col-12">
                        {this.state.homeDetails.broker.phone1 &&
                          this.state.homeDetails.broker.phone1.number.replace(
                            /(\d{3})(\d{3})(\d{4})/,
                            "($1)$2-$3"
                          )}
                      </div>
                      <div className="col-12">
                        {this.state.homeDetails.office &&
                          this.state.homeDetails.office.email}
                      </div>
                    </div>
                  </div>
                  <div className={`${this.props.isSmallSizeDevice ? 'col-12' : 'col-6'}`}>
                    <div
                      className="row"
                      style={{ borderBottom: "1px solid #ccc" }}
                    >
                      <div className="col-4 my-auto">Broker Location:</div>
                      <div className="col-8 my-auto">
                        {this.state.homeDetails.office && this.state.homeDetails.office.address &&
                          this.state.homeDetails.office.address.city}
                        ,{" "}
                        {this.state.homeDetails.office && this.state.homeDetails.office.address &&
                          this.state.homeDetails.office.address.state_code}
                      </div>
                    </div>
                    <div
                      className="row mt-2"
                      style={{ borderBottom: "1px solid #ccc" }}
                    >
                      <div className="col-4 my-auto">Data Source:</div>
                      <div className="col-8 my-auto">
                        {this.state.homeDetails.mls && this.state.homeDetails.mls.name}
                      </div>
                    </div>
                    <div
                      className="row mt-2"
                      style={{ borderBottom: "1px solid #ccc" }}
                    >
                      <div className="col-4 my-auto">Property ID:</div>
                      <div className="col-8 my-auto">
                        {this.state.homeDetails.mls && this.state.homeDetails.mls.id}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-4">Source Copyright:</div>
                      <div className="col-8 my-auto">
                        {this.state.homeDetails.mls &&
                          this.state.homeDetails.mls.disclaimer.text}
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </TabPane>

              <TabPane key={4} tabId="4">
                <Table className={`mt-2 ${this.props.breakPointTable ? 'table-responsive' : ''}`} hover>
                  <thead style={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    <tr>
                      <th>Date</th>
                      <th>Event</th>
                      <th>Price</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.homeDetails.property_history &&
                      this.state.homeDetails.property_history.map(function(event, index) {
                        return(
                        <PropertyHistDetailItem event={event} key={index} />
                     )})}
                  </tbody>
                </Table>
              </TabPane>

              <TabPane key={5} tabId="5">
                <CanvasJSChart className="mt-2" options={DonutChartOptions} />
                <Form className="mt-2">
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="listPrice">Home Price</Label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            $
                          </InputGroupAddon>
                          <Input
                            type="number"
                            name="number"
                            id="listPrice"
                            defaultValue={this.state.homeDetails.price}
                            onChange={this.changeHomePrice}
                          />
                        </InputGroup>
                      </FormGroup>
                    </div>
                    <div className={`col-md-4 ${this.props.isSmallSizeDevice ? '' : 'pr-0'}`}>
                      <FormGroup>
                        <Label for="downPayment">Down Payment</Label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            $
                          </InputGroupAddon>
                          <Input
                            type="number"
                            name="number"
                            id="downPayment"
                            value={this.state.editedDownPayment}
                            onChange={this.changeDownPayment}
                          />
                        </InputGroup>
                      </FormGroup>
                    </div>
                    <div className={`col-md-2 ${this.props.isSmallSizeDevice ? '' : 'pl-0'}`}>
                      <FormGroup>
                        <Label for="downPaymentPerc">(%)</Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="number"
                            id="downPaymentPerc"
                            value={this.state.editedDownPercent}
                            onChange={this.changeDownPercent}
                          />
                          <InputGroupAddon addonType="append">
                            %
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="term">Mortgage Term</Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="number"
                            id="term"
                            value={this.state.editedMortgageTerm}
                            onChange={this.changeMortgageTerm}
                          />
                          <InputGroupAddon addonType="append">
                            years
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="interestRate">Interest Rate</Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="number"
                            id="interestRate"
                            value={this.state.editedInterestRate}
                            onChange={this.changeInterestRate}
                          />
                          <InputGroupAddon addonType="append">
                            %
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </div>
                  </div>
                </Form>
              </TabPane>
            </TabContent>
          </div>
          <div className="col-4 d-none d-lg-block">
            <SearchForSale props={this.props} />
          </div>
        </div>
      </div>
      }
      </div>
    )
  }
}
export default HouseSearchDetailItem