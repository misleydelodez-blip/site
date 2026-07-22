import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const lenis = new Lenis({
  autoRaf: true,
})

lenis.on('scroll', (e) => {
  // console.log(e)
})
