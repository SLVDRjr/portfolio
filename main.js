const bars = document.getElementById('bars')
const headerNav = document.getElementById('header-nav')
const closeButton = document.getElementById('close')
const containerOverlay = document.getElementById('container-overlay')

bars.addEventListener('click', () => {
  const visibility = headerNav.getAttribute('data-visible')

  if(visibility === 'false'){
    headerNav.setAttribute('data-visible', true)
    containerOverlay.style.display = 'block'
  }else{
    headerNav.setAttribute('data-visible', false)
    containerOverlay.style.display = 'none'
  }
})

closeButton.addEventListener('click', () => {
  const visibility = headerNav.getAttribute('data-visible')

  if(visibility === 'true'){
    headerNav.setAttribute('data-visible', false)
    containerOverlay.style.display = 'none'
  }else{
    headerNav.setAttribute('data-visible', true)
    containerOverlay.style.display = 'block'
  }
})

window.addEventListener('click', e => {
  if(e.target === containerOverlay){
    containerOverlay.style.display = 'none'
    headerNav.setAttribute('data-visible', false)
  }
})

window.addEventListener('resize', () => {
  if(window.innerWidth > 992){
    containerOverlay.style.display = 'none'
    headerNav.setAttribute('data-visible', false)
  }
})

// Get Testimonials Using Local JSON
const loadClients = () => {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "clients.json", true)

  xhr.onload = function(){
    if(this.status == 200){
      const clients = JSON.parse(this.responseText)
      
      // Create initial slide
      const initialSlide = () => {
        let output = ''
        output = `
        <img src="${clients[0].src}"/>
        <p class="name">${clients[0].name}</p>
        <p class="title">${clients[0].title}</p>
        <blockquote>
          ${clients[0].testimonial}
        </blockquote>
        `
        document.getElementById('slide').innerHTML = output
        animate()
      }
      initialSlide()

      // last slide
      const lastSlide = () => {
        let output = ''
        output = `
        <img src="${clients[clients.length - 1].src}"/>
        <p class="name">${clients[clients.length - 1].name}</p>
        <p class="title">${clients[clients.length - 1].title}</p>
        <blockquote>
          ${clients[clients.length - 1].testimonial}
        </blockquote>
        `
        document.getElementById('slide').innerHTML = output
        animate()
      }

      const dotsDiv = document.getElementById('dots')

      // create dots
      const createDots = () => {
        for(let i = 0; i < clients.length; i++){
          const dot = document.createElement('span')

          if(i == 0){
            dot.classList.add('dot')
            dot.classList.add('current')
            dot.dataset.id = i
            dot.innerHTML = '<i class="fa-regular fa-circle-dot"></i>'
          }else{
            dot.classList.add('dot')
            dot.dataset.id = i
            dot.innerHTML = '<i class="fa-solid fa-circle"></i>'
          }

          dotsDiv.appendChild(dot)
        }
      }
      // render dots
      createDots()

      // render current dot
      const dots = document.querySelectorAll('.dot')

      // prev | next buttons
      const prev = document.getElementById('prev')
      const next = document.getElementById('next')
      let slideIndex = 0
      let dotIndex = 0

      // next event listener
      next.addEventListener('click', () => {
        slideIndex++
        if(slideIndex > clients.length - 1){
          slideIndex = 0
          initialSlide()
        }else{
          renderOutput()
          animate()
        }

        dots[dotIndex].innerHTML = '<i class="fa-solid fa-circle"></i>'
        dots[dotIndex].classList.remove('current')
        dotIndex++
        if(dotIndex > dots.length - 1){
          dotIndex = 0
          dots[dotIndex].classList.add('current')
          dots[dotIndex].innerHTML = '<i class="fa-regular fa-circle-dot"></i>'
        }else{
          dots[dotIndex].classList.add('current')
          dots[dotIndex].innerHTML = '<i class="fa-regular fa-circle-dot"></i>'
        }
      })

      // prev event listener
      prev.addEventListener('click', () => {
        slideIndex--
        if(slideIndex < 0){
          slideIndex = clients.length - 1
          lastSlide()
        }else{
          renderOutput()
          animate()
        }

        dots[dotIndex].innerHTML = '<i class="fa-solid fa-circle"></i>'
        dots[dotIndex].classList.remove('current')
        dotIndex--
        if(dotIndex < 0){
          dotIndex = dots.length - 1
          dots[dotIndex].classList.add('current')
          dots[dotIndex].innerHTML = '<i class="fa-regular fa-circle-dot"></i>'
        }else{
          dots[dotIndex].classList.add('current')
          dots[dotIndex].innerHTML = '<i class="fa-regular fa-circle-dot"></i>'
        }
      })

      // render output
      const renderOutput = () => {
        output = `
                  <img src="${clients[slideIndex].src}"/>
                  <p class="name">${clients[slideIndex].name}</p>
                  <p class="title">${clients[slideIndex].title}</p>
                  <blockquote>
                    ${clients[slideIndex].testimonial}
                  </blockquote>
                `
        document.getElementById('slide').innerHTML = output
      }

    }else if(this.status == 404){
      document.getElementById('clients').innerHTML = 'Client Not Found'
    }
  }

  xhr.onerror = () => {
    console.log('Request Error...')
  }

  xhr.send()
}

loadClients()

// fadeIn animation
const animate = () => {
  const fadeIn = [
    {opacity: '0'},
    {opacity: '1'}
  ]

  document.getElementById('slide').animate(fadeIn, 500)
  document.getElementById('dots').animate(fadeIn, 500)
}
