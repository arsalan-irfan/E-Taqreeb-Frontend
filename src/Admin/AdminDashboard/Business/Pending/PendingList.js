import React, { useState } from "react";
import PropTypes from "prop-types";
import Lawn from "./Lawn";
import Photographer from "./Photographer";
import Caterer from "./Caterer";
import TabNavigation from "../../../../components/TabNavigation/TabNavigation";

const PendingList = (props) => {
  // const [state, setstate] = useState(initialState)
  const [list, setList] = useState(0);
  const openList = (event, type) => {
    setList(type);
  };
  return (
    <TabNavigation
      title='Pending List'
      name1="Lawn"
      component1={<Lawn />}
      name2="Photographer"
      component2={<Photographer />}
     
    />
  );
};

export default PendingList;
