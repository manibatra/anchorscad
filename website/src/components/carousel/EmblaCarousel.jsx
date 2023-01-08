import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  DotButton,
  PrevButton,
  NextButton,
} from './EmblaCarouselArrowsDotsButtons'
import { Thumb } from '@/components/carousel/EmblaCarouselThumbsButton'
import { StlViewer } from 'react-stl-viewer'

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const stlViewerStyle = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaApi || !emblaThumbsApi) return
      if (emblaThumbsApi.clickAllowed()) emblaApi.scrollTo(index)
    },
    [emblaApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap())
  }, [emblaApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <>
      <div className="embla">
        <div
          className="embla__viewport rounded-2xl border-2 border-solid border-gray-200"
          ref={emblaRef}
        >
          <div className="embla__container">
            {slides.map((displayObjectPath, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <span>{index + 1}</span>
                </div>
                {displayObjectPath.endsWith('.stl') && (
                  <StlViewer
                    style={stlViewerStyle}
                    orbitControls
                    shadows
                    url={displayObjectPath}
                    showAxes={true}
                    modelProps={{
                      color: '#0ea5e9',
                    }}
                  />
                )}
                {displayObjectPath.endsWith('.png') && (
                  <img
                    className="embla__slide__img"
                    src={displayObjectPath}
                    alt="Your alt text"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((displayObjectPath, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={displayObjectPath}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
