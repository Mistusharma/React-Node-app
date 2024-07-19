import React from 'react'

function Contact() {
  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: "lightblue" }}>
      <h2>Contact Us</h2>
      <div>
        <h3>Get in Touch</h3>
        <p>If you have any questions or inquiries, feel free to reach out to us via email or phone.</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:contact@example.com">contact@example.com</a></li>
          <li><strong>Phone:</strong> +1 (123) 456-7890</li>
        </ul>
      </div>
      <div>
        <h3>Visit Us</h3>
        <p>Want to see our products in person or talk to our team? Come visit our store at:</p>
        <p>123 Main Street,<br />City, State, ZIP</p>
      </div>
      <div>
        <h3>Connect With Us</h3>
        <p>Stay connected with us on social media for updates, promotions, and more:</p>
        <ul>
          <li><a href="https://www.facebook.com/yourbrand" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://www.instagram.com/yourbrand" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://twitter.com/yourbrand" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        </ul>
      </div>

    </div>
  )
}

export default Contact
