import React from "react";
import Card from "../components/Card/CardComponent";
const LawnHome = () => {
  const descrition = "Loremlk sdds rew saldk qwe dpsf wqe sadj";
  const img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvxmphioPlkWbXJjqQq9NxDJpho2n0IszLfBmobc6HwpiQmqpX&usqp=CAU";

  return (
    <div>
      <div className="wrapper">
        {/* Right Sidebar Panel End*/}
        {/* <div className="header-for-bg">
          <div className="background-header position-relative">
            <img
              src=""
              className="img-fluid w-100 rounded rounded"
              // alt="header-bg"
            />
            <div className="title-on-header">
              <div className="data-block">
                <h2>Lawns & Banquets</h2>
              </div>
            </div>
          </div>
        </div> */}
        {/* Page Content  */}
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
                      <h4 className="card-title">Caterers </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <Card name={"ABC catererings"} desc={descrition} image={img} />
            </div>
            <div className="col-md-6 col-lg-4">
              <Card name={"ABC catererings"} desc={descrition} image={img} />
            </div>
            <div className="col-md-6 col-lg-4">
              <Card name={"ABC catererings"} desc={descrition} image={img} />
            </div>
            <div className="col-md-6 col-lg-4">
              <Card name={"ABC catererings"} desc={descrition} image={img} />
            </div>
            <div className="col-md-6 col-lg-4">
              <Card name={"ABC catererings"} desc={descrition} image={img} />
            </div>
            <div className="col-md-6 col-lg-4">
              <Card name={"ABC catererings"} desc={descrition} image={img} />
            </div>
            <div className="col-md-6 col-lg-4">
              <Card name={"ABC catererings"} desc={descrition} image={img} />
            </div>
            <div className="col-md-6 col-lg-4">
              <Card />
            </div>
            <div className="col-md-6 col-lg-4">
              <Card />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawnHome;
