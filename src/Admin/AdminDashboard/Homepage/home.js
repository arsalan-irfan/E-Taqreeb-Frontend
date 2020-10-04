import React from "react";
import HomeCard from "../../Cards/HomeCard";

import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
function Homepage({ userCounts , users, photographers, lawns}) {
  const {
    janCount,
    febCount,
    marCount,
    aprCount,
    mayCount,
    juneCount,
    julyCount,
    augCount,
    sepCount,
    octCount,
    novCount,
    decCount,
  } = userCounts;
 
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "No. of Users",
        backgroundColor: "#7FC9FF",
        borderColor: "#000000",
        borderWidth: 1,
        hoverBackgroundColor: "#008b9b",
        hoverBorderColor: "#000000",
        data: [
          janCount,
          febCount,
          marCount,
          aprCount,
          mayCount,
          juneCount,
          julyCount,
          augCount,
          sepCount,
          octCount,
          novCount,
          decCount,
        ],
      },
    ],
  };
  return (
    <div id="content-page" className="content-page">
      <div className="container">
        <div className="row">
          <HomeCard name="user" number={users.length} />
          <HomeCard name="lawns" number={lawns.length} />
          <HomeCard name="photographers" number={photographers.length}/>
        </div>
        <Bar
          data={data}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userCounts: state.admin.userCounts,
  users: state.admin.users? state.admin.users :[] ,
  lawns: state.admin.lawns? state.admin.lawns:[],
  photographers: state.admin.photographers?state.admin.photographers:[]
});
export default connect(mapStateToProps, {})(Homepage);
