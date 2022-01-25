import "./Home.css"

import React from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { connect } from "react-redux"
import { cardAction } from "../../redux/actions/card"
import Loading from "../../components/Loading"
import popularDefault from "../../assets/images/popular-default.jpg"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataPopular: [],
      isOk: false,
      selectValue: "Location",
      searchPopular: {}
    }
    this.handleDropdownChange = this.handleDropdownChange.bind(this)
  }

  componentDidMount() {
    this.props.cardDispatch()

    if (this.props.card.isFulfilled === true) {
      this.setState({
        dataPopular: this.props.card.vehiclePopular.popular,
        isOk: true
      })
    }
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value })
  }

  render() {
    // const history = this.props.history

    const success = this.state.isOk
    // const hostBackend = process.env.REACT_APP_HOST
    const popular = this.state.dataPopular
    if (!localStorage["user-role"]) {
      localStorage.setItem("user-role", "1")
    }
    const role = JSON.parse(localStorage["user-role"])

    const submitSearch = (e) => {
      e.preventDefault()
      const body = {
        name: e.target.name.value,
        location: e.target.location.value,
        date: e.target.date.value
      }
      this.setState({ searchPopular: body })
    }

    return (
      <main>
        <Header />
        {success ? (
          <>
            <div className="row bg-image p-5 jumbotron">
              <div className="col-lg-6 ">
                <div className="row mb-5 p-0">
                  <div className="f-playfair mb-5">
                    Explore and <br />
                    Travel
                  </div>
                  <div className="f-nunito-vehicle-finder mt-5 mb-3">
                    Vehicle Finder
                  </div>
                  <div className="line-jumbroton col-1 ms-3"></div>
                </div>

                <form className="row mb-5" onSubmit={submitSearch}>
                  {/* input Search */}
                  <div className="col-lg-12 p-0">
                    <input
                      type="text"
                      name="name"
                      className="input-type mb-5 ms-1"
                      placeholder="Type the vehicle (ex. motorbike"
                    />
                  </div>
                  <div className="row d-flex justify-content-between p-0">
                    {/* location */}
                    <div className="col-lg-5 mb-5 p-0">
                      <select
                        className="input-select dropdown-toggle p-2 ms-3"
                        value={this.state.selectValue}
                        onChange={this.handleDropdownChange}
                        name="location">
                        <option disabled>Location</option>
                        <option value="Jakarta">Jakarta</option>
                        <option value="Depok">Depok</option>
                        <option value="Bogor">Bogor</option>
                        <option value="Bandung">Bandung</option>
                      </select>
                    </div>

                    {/* Input Date */}
                    <div className="col-lg-5 mb-5 p-0">
                      <input
                        type="date"
                        className="input-date ms-3"
                        placeholder="Date"
                        name="date"
                      />
                    </div>
                  </div>

                  {/* Button Search */}
                  <div className="col-12 p-0">
                    <button className="btn-search" type="submit">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="row mb-5 ">
              <div className="col-lg-12 mb-5 ">
                <div className="container px-4 ">
                  <h3 className="mb-5 mt-5 f-playfair-main">Popular in town</h3>
                  <div className="row position-relative">
                    {/* <div className="next">
                      <i className="fas fa-angle-right"></i>
                    </div> */}
                    {popular.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          className="col-lg-3 col-md-6 card position-relative ">
                          <Link
                            to={`/vehicles/popular/detail/${item.id}`}
                            className="wrapper-img-home">
                            <img
                              src={popularDefault}
                              className="img-size "
                              alt="van_login"
                            />
                          </Link>
                          <div className="city-home col-9  shadow ">
                            <p className="mt-3">
                              {item.vehicle} <br />
                              <span className="color-subtitle">
                                {item.location}
                              </span>
                            </p>
                          </div>
                        </div>
                      )
                    })}

                    {role === "2" ? (
                      <div className="col-lg-12 col-sm-12 col-md-12 d-flex justify-content-center rounded-3 mt-5 container-input">
                        <Link to="/add-item" className="btn-add-item">
                          Add New Items
                        </Link>
                      </div>
                    ) : role === null ? (
                      <div></div>
                    ) : (
                      <div></div>
                    )}

                    {/* Testimonial */}
                    <div className="col-lg-12 mt-5">
                      <div className="container">
                        <div className="row d-flex flex-row justify-content-center align-item-center p-5">
                          <h3 className="f-playfair-main">Testimonials</h3>

                          <div className="col-lg-6 mt-5 d-flex flex-column justify-content-center">
                            <ul className="list-group d-flex flex-row align-item-center mb-3">
                              <li className="list-group-item border-0">
                                <i className="fas fa-star text-warning"></i>
                              </li>
                              <li className="list-group-item border-0">
                                <i className="fas fa-star text-warning"></i>
                              </li>
                              <li className="list-group-item border-0">
                                <i className="fas fa-star text-warning"></i>
                              </li>
                              <li className="list-group-item border-0">
                                <i className="fas fa-star text-warning"></i>
                              </li>
                              <li className="list-group-item border-0">
                                <i className="fas fa-star text-warning"></i>
                              </li>
                            </ul>

                            <div className="col-lg-8 mb-5">
                              <p className="f-mulish">
                                ”It was the right decision to rent vehicle here,
                                I spent less money and enjoy the trip. It was an
                                amazing experience to have a ride for wildlife
                                trip!”
                              </p>
                            </div>

                            <div className="col-lg-8">
                              <p className="f-nunito">Edward Newgate</p>
                              <p>Founder Circle</p>
                            </div>
                          </div>

                          <div className="col-lg-6 mt-5 d-flex flex-row justify-content-center">
                            <div className="bg-image img-cs position-relative">
                              <div className="circle-testimonial position-circle"></div>

                              <div className="plus">
                                <div className="vertikal"></div>
                                <div className="horizontal"></div>
                              </div>

                              <div className="rectangle">
                                <div className="left">
                                  <i className="fas fa-angle-left"></i>
                                </div>
                                <div className="right">
                                  <i className="fas fa-angle-right"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}

        <Footer />
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.card
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cardDispatch: () => {
      dispatch(cardAction())
    }
  }
}

const AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(Home)

export default AppWithRedux
