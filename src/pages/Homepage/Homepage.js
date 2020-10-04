import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/CardComponent";
import Modal from "react-bootstrap/Modal";
import SocialLoginModal from "../SocialLoginModal/SocialLoginModal";
import Slider from "../../Slider/Slider";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
const Homepage = (props) => {
  const [lawns, setLawns] = React.useState([]);
  const [photographers, setPhotographers] = React.useState([]);

  useEffect(() => {
    if (props.lawns && props.lawns.length > 0) {
      setLawns(props.lawns);
    }
  }, [props.lawns]);

  useEffect(() => {
    if (props.photographers && props.photographers.length > 0) {
      setPhotographers(props.photographers);
    }
  }, [props.photographers]);

  const caterername = "ABC caterers";
  const catererdesc = "Loremlk sdds rew saldk qwe dpsf wqe sadj";
  const catererimg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvxmphioPlkWbXJjqQq9NxDJpho2n0IszLfBmobc6HwpiQmqpX&usqp=CAU";
  const photoname = "ABC photographer";
  const photodesc = "Loremlk sdds rew saldk qwe dpsf wqe sadj";
  const photoimg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQh4vEcZ9hCsPnHfIcJNXZTaIXvmgyUgQWHemr2KTBKaFfYDSYQ&usqp=CAU";

  return (
    <div>
      {/* Required meta tags */}
      <SocialLoginModal/>
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
                    <h4 className="card-title">LAWNS</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    <Link to={"/user/lawns"}>View All</Link>
                  </div>
                </div>
              </div>
              <div className="iq-card-body">
                {lawns && lawns.length > 0 ? (
                  <Slider>
                    {lawns.map((lawn) => {
                      return (
                        <Card
                          key={lawn._id}
                          name={lawn.company}
                          desc={lawn.description}
                          image={lawn.images[0].url}
                          data={lawn}
                          detailUrl={`/user/lawn/${lawn._id}`}
                        />
                      );
                    })}
                  </Slider>
                ) : (
                  <h3>No Lawns to show !</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                    <h4 className="card-title">PHOTOGRAPHERS</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    <Link to={"/user/photographers"}>View All</Link>
                  </div>
                </div>
                </div>
                <div className="iq-card-body">
                  
                {photographers && photographers.length > 0 ? (
                    <Slider>
                      {photographers.map((photographer) => {
                        return (
                          <Card
                            key={photographer._id}
                            name={photographer.company}
                            desc={photographer.description}
                            image={photographer.images[0].url}
                            data={photographer}
                            detailUrl={`/user/photographer/${photographer._id}`}
                          />
                        );
                      })}
                    </Slider>
                  ) : (
                    <h3>No Photographers to show !</h3>
                  )}
                </div>
                

              
            </div>
          </div>
        </div>
      </div>


      {/* Wrapper END */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  showModal: state.auth.user ? state.auth.user.completeProfile : true,
  lawns: state.main.lawns,
  photographers: state.main.photographers,
});

export default connect(mapStateToProps, { loadUser })(Homepage);
