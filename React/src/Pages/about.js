import React from 'react'

function About() {
  return (
    <div>
           <div style={{ position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    opacity: 0.1, 
    zIndex: 0}}>
      <img src={require('../assets/background.png')} style={{ width: '250px', height: '460px', objectFit: 'cover' }} />
        </div>
   <h5>
Sure, here's a sample "About Us" paragraph for a clothing brand:

Welcome to Cloth World, where fashion meets comfort! We're passionate about crafting high-quality clothing that not only looks great but feels amazing to wear. Our journey began with a simple idea: to create stylish pieces that reflect individuality and inspire confidence.
 From cozy knit sweaters to elegant dresses, every garment in our collection is designed with attention to detail and a commitment to sustainability. We believe in the power of fashion to express personality and make a statement, and we're dedicated to providing our customers with wardrobe essentials that effortlessly blend style and versatility.
  Join us on our mission to redefine contemporary fashion and discover your signature look with Cloth World.</h5>   
    </div>
  )
}

export default About
