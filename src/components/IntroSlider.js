import React from "react";
import Slider from './Slider'
export default function IntroSlider() {
  return (
    // <div
    //   className="owl-carousel"
    //   data-autoplay="true"
    //   data-loop="true"
    //   data-nav="false"
    //   data-dots="true"
    //   data-items={1}
    //   data-items-laptop={1}
    //   data-items-tab={1}
    //   data-items-mobile={1}
    //   data-items-mobile-sm={1}
    //   data-margin={0}
    // >
    //   <div>
    <Slider>
        <div className="mt-5">
        <img

          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqj0U6NQcEne2qo-lDgXoSC3duqfJSEfsdUE6dZU4uvsceTKnV&usqp=CAU"
          className="img-fluid mb-4"
          alt="logo"
          style={{height:200,width:300}}
        />
        <h4 className="mb-1 text-white">Find Available Lawns</h4>
        <p>
          You can easily find available lawn according to your range.
        </p>
      </div>
      <div className="mt-5">
        <img
          src="https://images.unsplash.com/photo-1488684430052-f2d92fb178c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80"
          className="img-fluid mb-4"
          alt="logo"
          style={{height:200,width:300}}
        />
        <h4 className="mb-1 text-white">Hire Photographer</h4>
        <p>
          Discover new photographers which are best suited for your occassion
        </p>
      </div>
     
        </Slider>
    
  );
}
