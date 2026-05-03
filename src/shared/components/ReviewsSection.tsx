import { useDragToScroll } from '@shared/hooks/useDragToScroll'
import {
  StarFillIcon16,
  StarLineIcon16,
  CameraAddLineIcon16,
  EditAddLineIcon16,
  ArrowRightIcon24,
} from '@shared/icons/icons'

export interface Review {
  name: string
  date: string
  stars: number
  text: string
  reviewCount?: number
  badge?: string
}

export interface ReviewsSectionProps {
  rating?: number
  totalRatings?: string
  totalReviews?: number
  reviews?: Review[]
}

const DEFAULT_REVIEWS: Review[] = [
  { name: 'Maci M',   date: '9/18/22', stars: 5, text: 'Slightly bitter, a little harsh, has a gingery undertone. Good, but not great.', reviewCount: 5 },
  { name: 'Sang R',   date: '3 days ago', stars: 5, text: 'We found the Encha Matcha green tea to have a very satisfyingly sweet, almost creamy flavor without even a hint of b...', reviewCount: 32, badge: 'Local Expert' },
  { name: 'Maci M',   date: '9/18/22', stars: 4, text: 'Slightly bitter, a little harsh, has a gingery undertone. Good, but not great.', reviewCount: 5 },
  { name: 'Walter W', date: '9/3/22',  stars: 3, text: 'It has a very earthy, grassy taste, so the taste, albeit smooth and light, may not be for everyone, especially when tryin...', reviewCount: 3 },
  { name: 'Sarah S',  date: '8/23/22', stars: 3, text: 'Creamy matcha green tea taste, with earthy undertones.', reviewCount: 8 },
  { name: 'Maci M',   date: '8/23/22', stars: 4, text: 'Slightly bitter, a little harsh, has a gingery undertone. Good, but not great.', reviewCount: 5 },
]

function RatingRing({ rating }: { rating: number }) {
  const radius = 32
  const strokeWidth = 8
  const cx = 40
  const cy = 40
  const viewBox = 80
  const circumference = 2 * Math.PI * radius
  const gapDeg = 60
  const arcDeg = 360 - gapDeg
  const trackArc = (arcDeg / 360) * circumference
  const trackGap = circumference - trackArc
  const filledArc = (rating / 5) * trackArc
  const unfilledArc = trackArc - filledArc
  const rotation = 90 + gapDeg / 2

  return (
    <div className="reviews-rating-ring">
      <svg viewBox={`0 0 ${viewBox} ${viewBox}`} className="reviews-ring-svg">
        <defs>
          <filter id="ring-shadow" x="-25%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.12" />
          </filter>
        </defs>
        {/* Yellow full-track arc (300°) with drop shadow */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke="#E8C500"
          strokeWidth={strokeWidth}
          strokeDasharray={`${trackArc} ${trackGap}`}
          strokeLinecap="round"
          transform={`rotate(${rotation} ${cx} ${cy})`}
          filter="url(#ring-shadow)"
        />
        {/* White arc overlays the unfilled portion */}
        {unfilledArc > 0.5 && (
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
            strokeDasharray={`${unfilledArc} ${circumference - unfilledArc}`}
            strokeDashoffset={-filledArc}
            strokeLinecap="round"
            transform={`rotate(${rotation} ${cx} ${cy})`}
          />
        )}
      </svg>
      <div className="reviews-rating-value">
        <span className="reviews-rating-number">{rating}</span>
      </div>
      <div className="reviews-rating-star">
        <StarFillIcon16 />
      </div>
    </div>
  )
}

function ReviewStars({ count }: { count: number }) {
  return (
    <div className="review-stars">
      {Array.from({ length: 5 }).map((_, j) =>
        j < count
          ? <StarFillIcon16 key={j} />
          : <StarLineIcon16 key={j} />
      )}
    </div>
  )
}

export function ReviewsSection({
  rating = 4.7,
  totalRatings = '4,500+',
  totalReviews = 14,
  reviews = DEFAULT_REVIEWS,
}: ReviewsSectionProps) {
  const scrollRef = useDragToScroll()

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <div className="reviews-header-text">
          <h2 className="reviews-title">Reviews</h2>
          <span className="reviews-subtitle">{totalRatings} ratings  ·  {totalReviews} reviews</span>
        </div>
        <div className="reviews-header-actions">
          <button className="reviews-icon-btn" aria-label="Add photo">
            <CameraAddLineIcon16 />
          </button>
          <button className="reviews-icon-btn" aria-label="Write review">
            <EditAddLineIcon16 />
          </button>
        </div>
      </div>
      <div className="reviews-scroll" ref={scrollRef}>
        <div className="reviews-rating-badge">
          <RatingRing rating={rating} />
          <span className="reviews-rating-label">of 5 stars</span>
        </div>
        {reviews.map((review, i) => (
          <div key={i} className="review-card">
            <div className="review-card-header">
              <div className="review-avatar">
                {review.name.charAt(0)}
              </div>
              <div className="review-meta">
                <div className="review-name-line">
                  <span className="review-name">{review.name}</span>
                  {review.badge && (
                    <span className="review-badge">{review.badge}</span>
                  )}
                </div>
                {review.reviewCount != null && (
                  <span className="review-count">{review.reviewCount} Reviews</span>
                )}
              </div>
            </div>
            <div className="review-body">
              <div className="review-stars-line">
                <ReviewStars count={review.stars} />
                <span className="review-date">{review.date} · DoorDash Order</span>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          </div>
        ))}
        <div className="review-card review-card--see-all">
          <ArrowRightIcon24 />
          <span className="review-see-all-label">See All</span>
        </div>
      </div>
    </div>
  )
}
