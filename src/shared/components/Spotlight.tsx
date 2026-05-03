import dashPassVideo from '@assets/ads/DashPass-type.mp4'

export function Spotlight() {
  return (
    <div className="spotlight">
      <video
        className="spotlight-media"
        src={dashPassVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="spotlight-copy">
        <h3>Running low on milk?</h3>
        <p>Try groceries with low delivery fees</p>
      </div>
      <button className="btn-tertiary-full">Order now</button>
    </div>
  )
}
