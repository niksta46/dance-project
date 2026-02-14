import React from 'react';
import { Carousel } from 'flowbite-react';

const HeroSlider = () => {
  return (
    <div className="h-96 sm:h-[500px] lg:h-[600px]">
      <Carousel slideInterval={5000} theme={{
        root: {
          base: "relative h-full w-full",
          leftControl: "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
          rightControl: "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
        },
        indicators: {
          active: {
            off: "bg-gray-400/50 hover:bg-gray-400 dark:bg-gray-600/50 dark:hover:bg-gray-600",
            on: "bg-gray-500 dark:bg-gray-600"
          },
        },
        control: {
          base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-400/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-700/50 dark:group-focus:ring-gray-800 sm:h-10 sm:w-10",
          icon: "h-4 w-4 text-white dark:text-gray-800 sm:h-6 sm:w-6"
        }
      }}>
        <div className="relative h-full w-full">
          <img 
            src="/src/assets/images/pic1.jpg" 
            alt="Dance group photo 1"
            className="h-full w-full object-contain"
          />
        </div>
        
        <div className="relative h-full w-full">
          <img 
            src="/src/assets/images/pic2.jpg" 
            alt="Dance group photo 2"
            className="h-full w-full object-contain"
          />
        </div>
        
        <div className="relative h-full w-full">
          <img 
            src="/src/assets/images/pic3.jpg" 
            alt="Dance group photo 3"
            className="h-full w-full object-contain"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default HeroSlider;