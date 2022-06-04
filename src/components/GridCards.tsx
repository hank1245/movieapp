import React from 'react'

interface Props {
    image: string,
    movieName: string
}

const GridCards = ({image, movieName}:Props) => {
  return(
        <div className="card card-compact bg-base-100 shadow-xl flex justify-center align-middle w-full">
            <figure><img src={image} alt={movieName} /></figure>
            <div className="card-body">
                <h2 className="card-title">{movieName}</h2>
            </div>
        </div>
  )
}

export default GridCards