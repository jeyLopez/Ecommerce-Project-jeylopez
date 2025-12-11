import React from "react";

export const Carousel = () => {
  return (
    <div id="fashionCarousel" className="carousel slide" data-bs-ride="carousel">
      
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#fashionCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#fashionCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#fashionCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://picsum.photos/id/56/800/400" className="d-block w-100" alt="Moda 1" />
        </div>
        <div className="carousel-item">
          <img src="https://picsum.photos/id/59/800/400" className="d-block w-100" alt="Moda 2" />
        </div>
        <div className="carousel-item">
          <img src="https://picsum.photos/id/94/800/400" className="d-block w-100" alt="Moda 3" />
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#fashionCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#fashionCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
      
    </div>
  );
};
