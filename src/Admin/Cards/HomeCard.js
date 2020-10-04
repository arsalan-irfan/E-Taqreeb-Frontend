import React from 'react'

const HomeCard = ({name, number}) => {
    return (
        <div className="col-lg-4 col-md-4 col-sm-12">
        <div className="iq-card">
          <div className="iq-card-body border text-center rounded">
            <span className="font-size-16 text-uppercase">{name}</span>
            <h2 className="mb-4 display-3 font-weight-bolder ">{number}<small className="font-size-14 text-muted">/ year</small></h2>
            <ul className="list-unstyled line-height-4 mb-0">
              <li />
              <li />
              <li />
            </ul>
          </div>
        </div>
      </div>
          
    )
}

export default HomeCard;