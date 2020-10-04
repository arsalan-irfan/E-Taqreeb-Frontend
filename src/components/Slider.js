import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider=(props)=>{
  return(
    <Carousel
        additionalTransfrom={0}
        autoPlaySpeed={3000}
        autoPlay={true}
        arrows={false}
        centerMode={false}
        containerClass="container"
        draggable={true}
        focusOnSelect={false}
        infinite={true}
        itemClass=""
        keyBoardControl={false}
        minimumTouchDrag={80}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 1,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 1,
            partialVisibilityGutter: 30
          }
        }}
        
        slidesToSlide={1}
        swipeable>
          {props.children}
        </Carousel>
  )
}
export default Slider