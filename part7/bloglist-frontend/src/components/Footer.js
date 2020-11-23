import React  from 'react'

const Footer = () => {

  return (

    <footer className="footer-copyright page-footer align-items-center d-flex">
      <div className="container text-center justify-content-center">
            © 2020 Pavel Šťastný   <a id="info"  className="footerText" href="https://paulicz44.github.io/stastnypavel.github.io/index.html">If you find a bug, please contact me.</a>
        <a href="https://www.linkedin.com/in/pavel-stastny-155539150" target="blank" className="footerText right">LinkedIn</a>
        <a href="https://www.freecodecamp.org/paulicz44" target="blank" className="footerText right">FCC profile </a>
        <a href="https://paulicz44.github.io/stastnypavel.github.io/index.html" target="blank" className="footerText right">My Github</a>
        <br/>
      </div>
    </footer>

  )
}
export default Footer