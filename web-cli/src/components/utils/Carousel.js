import React from 'react'

import './carousel.css'

// Infinite carousel with dots
function Carousel({paused}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [items, setItems] = React.useState([
    {
      id: 0,
      image: 'https://picsum.photos/id/1/200/200',
      title: 'Item 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 1,
      image: 'https://picsum.photos/id/2/200/200',
      title: 'Item 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      image: 'https://picsum.photos/id/3/200/200',
      title: 'Item 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 3,
      image: 'https://picsum.photos/id/4/200/200',
      title: 'Item 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 4,
      image: 'https://picsum.photos/id/5/200/200',
      title: 'Item 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 5,
      image: 'https://picsum.photos/id/6/200/200',
      title: 'Item 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    }
  ]);



  // Translate inner carousel to the left or right
  const translate = ( index, direction) => {
    const carousel = document.querySelector('.carousel-inner');
    carousel.style.transform = `translateX(-${(index) * 100}%)`;

  }

  // Move to the next 
  const next = () => {
    if(currentIndex === items.length - 1){ 
      setCurrentIndex(0);
      translate(currentIndex);
    }
    else{
      setCurrentIndex(currentIndex + 1);
      translate(currentIndex + 1);
    }
  }

  // Move to the previous
  const previous = () => {
    if(currentIndex === 0){
      setCurrentIndex(items.length);
      translate(currentIndex);
    }
    else{
      setCurrentIndex(currentIndex - 1);
      translate(currentIndex  + 1);
    }
  }
  
  // Move to the current index
  const goToIndex = (index) => {
    if(index === currentIndex){
      return;
    }

    setCurrentIndex(index);
    translate(index);

  }


  // Auto rotate carousel
  React.useEffect(() => {
    if(!paused) {
      const interval = setInterval(() => {
        next();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, paused]);
  

  return (
    <div className="carousel">
      <div className="carousel-container">
        <div className="carousel-inner">
          {items.map(item => (
            <div className="carousel-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div >{item.title}</div>
              <div >{item.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-dots">
        {items.map(item => (
          <button
            key={item.id}
            className={currentIndex === item.id ? 'carousel-dot carousel-dot-active' : 'carousel-dot'}
            onClick={() => goToIndex(item.id)}
          ></button>
        ))}
      </div>
    </div>
  );

}

export default Carousel