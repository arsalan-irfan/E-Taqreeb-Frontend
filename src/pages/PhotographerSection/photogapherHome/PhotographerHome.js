import React, { useEffect } from "react";
import Card from "../../../components/Card/CardComponent";
import { connect } from "react-redux";
import axios from "axios";
const PhotographerHome = (props) => {
  useEffect(() => {
    setPhotographers(props.photographers);
  }, [props.photographers]);
  const domain = "https://e-taqreeb-api.herokuapp.com";
  const [photographers, setPhotographers] = React.useState(props.photographers);
  const [searchString, setSearchString] = React.useState("");
  const [range, setRange] = React.useState({ priceFrom: 0, priceTo: 0 });
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.token,
    },
  };
  // const searchLawnByName = _.debounce(async(e)=>{
  //   try {
  //     setSearchString(e.target.value)
  //     let res = await axios.post(`${domain}/photographer/search`,{searchString:e.target.value},config);
  //     if (res.data) {
  //       setPhotographers(res.data.photographers);
  //     }
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // },1000)

  const searchLawnByName = async (e) => {
    try {
      setSearchString(e.target.value);
      let res = await axios.post(
        `${domain}/photographer/search`,
        { searchString: e.target.value },
        config
      );
      if (res.data) {
        setPhotographers(res.data.photographers);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const searchLawnByRange = async (e) => {
    e.preventDefault()
    try {
      let {priceFrom,priceTo} = range 
      let res = await axios.post(
        `${domain}/photographer/range`,
        {priceFrom,priceTo},
        config
      );
      if (res.data) {
        setPhotographers(res.data.photographers);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const removeFilter = async (e) => {
    e.preventDefault()
    setPhotographers(props.photographers);
    setRange({
      ...range,
      priceTo:0,
      priceFrom:0
    })
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="birthday-block">
              <div className="iq-card">
                <div
                  className="iq-card-header d-flex justify-content-between"
                  style={{ border: "none" }}
                >
                  <div className="iq-header-title">
                    <div className="row">
                      <div className="col-4">
                        <h4 className="card-title">Photographers</h4>
                      </div>
                      <div className="col-8">
                        <div className="iq-search-bar">
                          <form action="#" className="searchbox">
                            <input
                              type="text"
                              className="text search-input"
                              placeholder="Type here to search..."
                              value={searchString}
                              onChange={(e) => {
                                searchLawnByName(e);
                              }}
                            />
                            <a className="search-link" href="#">
                              <i className="ri-search-line" />
                            </a>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Enter Your Range</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  
                  <form>
                    <div className="form-row">
                      <div className="col">
                      <label>
                          Price from:
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Price From"
                          value={range.priceFrom}
                          onChange={(e)=>{
                            setRange({
                              ...range,
                              priceFrom:e.target.value
                            })
                          }}
                        />
                      </div>
                      <div className="col">
                        <label>
                          Price to:
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Price to"
                          value={range.priceTo}
                          onChange={(e)=>{
                            setRange({
                              ...range,
                              priceTo:e.target.value
                            })
                          }}
                        />
                      </div>
                      <div className="col">
                          <div style={{marginTop:"12%"}}>
                          <button className="btn btn-primary rounded-pill  " onClick={(e)=>{searchLawnByRange(e);}}>Apply Filter</button>   
                           <button className="btn btn-danger rounded-pill  " onClick={(e)=>{removeFilter(e);}}>Remove Filter</button> 
                          </div>
  
                      </div>
 
                    </div>
                  </form>
                </div>
              </div>{" "}
            </div>
          </div>

          {photographers.map((photographer) => {
            return (
              <div className="col-md-6 col-lg-4">
                <Card
                  key={photographer._id}
                  name={photographer.company}
                  desc={photographer.description}
                  image={photographer.images[0].url}
                  data={photographer}
                  detailUrl={`/user/photographer/${photographer._id}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photographers: state.main.photographers,
});

export default connect(mapStateToProps)(PhotographerHome);
