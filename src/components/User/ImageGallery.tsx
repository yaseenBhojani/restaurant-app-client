import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ImageGallery = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ImageList
      // Styling for the image list
      sx={{
        width: 500,
        height: 335,
        '&::-webkit-scrollbar': {
          width: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: 10,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        '@media screen and (max-width: 520px)': {
          width: 400,
        },
        '@media screen and (max-width: 415px)': {
          width: 300,
        },
      }}
      // Number of columns based on the width
      cols={width > 415 ? 3 : 2}
      rowHeight={164}
    >
      {/* Map over itemData array to render ImageListItem components */}
      {itemData.map(item => (
        <ImageListItem key={item.img} sx={{}}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGallery;

// Array of image data
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1529042410759-befb1204b468',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55',
    title: 'Bike',
  },
];
