import React from 'react'

export const Thumb = (props) => {
  const { selected, imgSrc, index, onClick } = props

  return (
    <div
      className={'embla-thumbs__slide '.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button"
        type="button"
      >
        <div className="embla-thumbs__slide__number invisible md:visible">
          <span>{index + 1}</span>
        </div>
        <img
          className="embla-thumbs__slide__img rounded-2xl border-[1px] border-solid border-gray-200"
          src={imgSrc}
          alt="Your alt text"
        />
      </button>
    </div>
  )
}
