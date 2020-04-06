import React, { useState, useEffect } from 'react';
//Components
import Form from './components/form/Form'
import ImageList from './components/imageList/ImageList';

function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [actualpage, setActualPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  useEffect(() => {
    const getPhotos = async () => {
      if(search === '') return;
      const imagesPerPage = 30;
      const key = '11934878-0f6d3ff62633d0b4ff62293a5';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${actualpage}`;
      const request = await fetch(url);
      const photos = await request.json();
      setImages(photos.hits)
      const pagesQuantity = Math.ceil(photos.totalHits / imagesPerPage);
      setTotalPages(pagesQuantity);
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }
    getPhotos();
  }, [search,actualpage]);
  const prevPage = () => {
    const newActualPage = actualpage - 1;
    if(newActualPage === 1) return;
    setActualPage(newActualPage);
  }
  const nextPage = () => {
    const newActualPage = actualpage + 1;
    if(newActualPage > totalpages) return;
    setActualPage(newActualPage);
  }
  return ( 
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Form 
          setSearch={setSearch}
        />
      </div>
      <div className="row justify-content-center">
        <ImageList images={images} />
        {(actualpage === 1) ? null :
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={prevPage}
          >
            &laquo; Anterior
          </button>
        }
        {(actualpage === totalpages) ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={nextPage}
          >
            Siguiente &raquo;
          </button>
        )}
      </div> 
    </div>
   );
}

export default App;
