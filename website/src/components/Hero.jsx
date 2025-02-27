import EmblaCarousel from '@/components/carousel/EmblaCarousel'

export function Hero() {
  const OPTIONS = {}
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  return (
    <div className="mx-auto flex w-full lg:w-3/4 flex-wrap">
      <div className="relative w-full lg:w-3/4">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="w-full p-[25.6px] lg:w-1/4">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="flex py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Download all files
              </p>
            </div>
          </li>

          <li className="flex py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Copy Link</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
