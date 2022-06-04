import React from 'react'
import {BiSearch} from 'react-icons/bi'

interface Props {
    image:string
    text: string
    title: string
}

const MainImage = ({image, text, title}:Props) => {
  return (
      <>
        <section className="hero h-3/5 bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={image} className="rounded-lg shadow-2xl" />
                <div className="mr-3">
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="py-6 ">{text}</p>
                    <button className="btn btn-primary text-xl">
                        <BiSearch size={24}/>
                        자세히 보기
                    </button>
                </div>
            </div>
        </section>
      </>
  )
}

export default MainImage