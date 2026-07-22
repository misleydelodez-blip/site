gsap
  .timeline()
  .from('.hero-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' })
  .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
  .from('.box', {
    y: 30,
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'back.out(1.7)',
    stagger: 0.15,
  })

gsap.to('.box', {
  rotation: 360,
  duration: 6,
  repeat: -1,
  ease: 'none',
  stagger: {
    each: 0.5,
    repeat: -1,
  },
})
