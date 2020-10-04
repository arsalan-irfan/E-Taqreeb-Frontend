import React, { useState} from 'react'
 

const Caterer = props => {
    const [users, setUsers] = useState([
        {
          imageURL:
            "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          name: "Caterer 1",
          time: "1 hour",
        },
        {
          imageURL:
            "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          name: "Caterer 1",
          time: "1 hour",
        },
        {
          imageURL:
            "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg",
          name: "Caterer 1",
          time: "1 hour",
        },
      ]);
      return (
        <div className="iq-card">
          <div className="iq-card-body">
            <ul className="request-list list-inline m-0 p-0">
              {" "}
              {users.map((user, key) => {
                return (
                  <li className="d-flex align-items-center">
                    <div className="user-img img-fluid">
                      {" "}
                      <img
                        src={user.imageURL}
                        alt="story-img"
                        className="rounded-circle avatar-40"
                      />{" "}
                    </div>{" "}
                    <div className="media-support-info ml-3">
                      <h6> {user.name} </h6> <p className="mb-0"> {user.time} </p>{" "}
                    </div>{" "}
                    <div className="d-flex align-items-center">
                      <a
                        href="javascript:void();"
                        className="mr-3 btn btn-primary rounded"
                      >
                        {" "}
                        View{" "}
                      </a>{" "}
                    </div>{" "}
                  </li>
                );
              })}
            </ul>{" "}
          </div>{" "}
        </div>
      );
}

export default Caterer
