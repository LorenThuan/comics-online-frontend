import React, {useRef} from 'react'
import Slider from 'react-slick';

const useSliderScroll = () => {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots',
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1075,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1075,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // initialSlide: 2
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  const maxDots = 5; // Maximum number of dots to display

  const renderDots = (dotsClass: any, slides: any, currentSlide: any) => {
    const totalSlides = slides.length;
    const numDots = Math.min(totalSlides, maxDots);
    const activeIndex = currentSlide % totalSlides;

    const dots = [];

    for (let i = 0; i < numDots; i++) {
      dots.push(
        <li key={i} className={i === activeIndex ? 'slick-active' : ''}>
          <button>{i + 1}</button>
        </li>
      );
    }

    return (
      <ul className={`${dotsClass}`}>
        {dots}
      </ul>
    );
  };

  const sliderRef = useRef<Slider>(null);

  const handleWheel =  (e: React.WheelEvent) => {
    const { deltaY } = e;

    // console.log(deltaY);
    
    if(deltaY >= 0) {
      /* Scrolling right */
      sliderRef.current?.slickNext();
      
    } else if (deltaY < 0) {
      /* Scrolling left */
       sliderRef.current?.slickPrev();
    }
  }

  return {settings, renderDots, sliderRef, handleWheel};
}

export default useSliderScroll;