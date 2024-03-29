import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

type Icons = {
  icon?: string;
  name: string;
};

type CarouselProps = {
  icons: Icons[];
};

export const ImageCarousel = ({ icons }: CarouselProps) => {
  return (
    <div className="">
      <div className="pointer-events-none mx-auto max-w-7xl py-1 px-4 sm:px-6 lg:px-8 ">
        <Carousel
          ssr
          autoPlay
          infinite
          deviceType="tablet"
          swipeable={false}
          draggable={false}
          showDots={false}
          arrows={false}
          keyBoardControl={false}
          responsive={responsive}
        >
          {icons.map((item, index) => (
            <div
              key={index}
              className="pointer-events-none flex flex-col items-center justify-center"
            >
              <div className="flex text-cyan-500">
                <i className={item.icon}></i>
              </div>
              <div className="flex pt-8">
                <p className="-mt-12 text-xl font-sans leading-5 text-black dark:text-white">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageCarousel;
