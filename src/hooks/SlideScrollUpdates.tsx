import React, {useRef} from 'react'
import Slider from 'react-slick';

const useSliderScrollUpdates = () => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const settings = {
    dots: true,
    dotsClass: 'slick-dots',
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 15,
    slidesToScroll: 15,
    vertical: true,
    swipe: false, // Disable swipe for the settings
    afterChange: (index: number) => setCurrentSlide(index),
    appendDots: (dots:any) => (
      <div>
        <ul style={{ 
          display: "flex",
          justifyContent: "center",
          alignItems: "center", 
          gap: "30px"
          }}> 
          {dots} 
        </ul>
      </div>
    ),
    customPaging: (i: any) => {
      const isActive = currentSlide === i * settings.slidesToScroll;
      return (
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: isActive ? '#fc4103' : '',
            color: isActive ? 'white' : 'black',
            opacity: isActive ? '0.6' : '',
            borderRadius: '5px',
            fontWeight: 'bold',
            padding: '5px',
            marginTop: '17px',
            cursor: 'pointer',
          }}
          className="hover:bg-slate-300 whitespace-nowrap"
          onClick={() => handleCustomPagingClick(i)}
        >
          {i + 1}
        </div>
      );
    },
    responsive: [
      {
        breakpoint: 1075,
        settings: {
          slidesToShow: 19,
          slidesToScroll: 19,
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

  const handleCustomPagingClick = (index:number) => {
    if (sliderRef.current) {
      setCurrentSlide(index);
      sliderRef.current?.slickGoTo(index * settings.slidesToScroll);
    }
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


  

  return {settings, renderDots, sliderRef};
}

export default useSliderScrollUpdates;