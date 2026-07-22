import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from './components/SplitText/SplitText'
import ShinyText from './components/ShinyText/ShinyText'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  { title: 'Timelines', body: 'Sequence animations with precise control over order and overlap.' },
  { title: 'ScrollTrigger', body: 'Tie animation progress to scroll position for scroll-based effects.' },
  { title: 'Easing', body: 'Fine-tune motion with a large library of easing functions.' },
]

function App() {
  const heroRef = useRef(null)
  const cardsRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 })

      cardsRef.current.forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef}>
      <section className="hero">
        <ShinyText text="react-bits" className="hero-badge" speed={3} />
        <SplitText text="GSAP + react-bits" tag="h1" className="hero-title" splitType="chars" />
        <p className="hero-subtitle">A minimal demo combining GSAP timelines, ScrollTrigger, and react-bits components.</p>
      </section>

      <section className="cards">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="card"
            ref={(el) => {
              cardsRef.current[i] = el
            }}
          >
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default App
