import React from "react";

function Comment() {
  return (
    <div>
      <hr />
      <div className="user-post">
        <ul className="post-comments p-0 m-0">
          <li className="mb-2">
            <div className="d-flex flex-wrap">
              <div className="user-img">
                <img
                  src="https://cdn.mangobaaz.com/wp-content/uploads/2019/07/kkimemevirak.png"
                  alt="userimg"
                  className="avatar-35 rounded-circle img-fluid"
                />
              </div>
              <div className="comment-data-block ml-3">
                <h6>Monty Carlo</h6>
                <p className="mb-0">Oh yeahhh!</p>
                <div className="d-flex flex-wrap align-items-center comment-activity">
                  <a href="javascript:void();">like</a>
                  {/* <a href="javascript:void();">reply</a> */}

                  <span> 5 min </span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="d-flex flex-wrap">
              <div className="user-img">
                <img
                  src="https://i.pinimg.com/originals/6a/9f/c2/6a9fc2755d3766df06e0702fd6ac9672.jpg"
                  alt="userimg"
                  className="avatar-35 rounded-circle img-fluid"
                />
              </div>
              <div className="comment-data-block ml-3">
                <h6>Paul Molive</h6>
                <p className="mb-0">Paisa laya?</p>
                <div className="d-flex flex-wrap align-items-center comment-activity">
                  <a href="javascript:void();">like</a>
                  {/* <a href="javascript:void();">reply</a> */}

                  <span> 5 min </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <form
          className="comment-text d-flex align-items-center mt-3"
          action="javascript:void(0);"
        >
          <input type="text" className="form-control rounded" />
          <div className="comment-attagement d-flex">
            <a href="javascript:void();">
              <i class="lab la-telegram"></i>
              {/* <i className="ri-link mr-3" /> */}
            </a>
            {/* <a href="javascript:void();">
              <i className="ri-user-smile-line mr-3" />
            </a>
            <a href="javascript:void();">
              <i className="ri-camera-line mr-3" />
            </a> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Comment;
