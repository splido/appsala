import logo from '../assets/img/logo.png'
import {  useLocation  } from 'react-router-dom';
import { BiLogoFacebook } from 'react-icons/bi';
import { BiLogoTwitter } from 'react-icons/bi';
import { BiLogoInstagram } from 'react-icons/bi';
import { BiLogoGithub } from 'react-icons/bi';


function Footer() {
  const location = useLocation();
  const isDisplayNone = location.pathname === '/profile' || location.pathname.startsWith('/profile/') || location.pathname === '/admin' || location.pathname.startsWith('/admin/');

if (isDisplayNone) {
  return null;
}
  return (
    <footer>
      <div className='footer-first'>
        <div>
        <img src={logo} alt=""/>
      <p style={{fontWeight:'bold'}}>About Appsala</p>
        </div>
     
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis.
        Netus sodales in volutpat ullamcorper amet adipiscing fermentum.</p>
        <div className='footer-social'>            
            <BiLogoFacebook className='footer-icon'/>
            <BiLogoTwitter className='footer-icon'/>
            <BiLogoInstagram className='footer-icon'/>
            <BiLogoGithub className='footer-icon'/>
        </div>
      </div>

      <div className='footer-div'>
        <h2>Company</h2>
        <a href="/">About</a>
        <a href="/">Features</a>
        <a href="/">Works</a>
        <a href="/">Career</a>
      </div>

      <div className='footer-div'>
        <h2>Company</h2>
        <a href="/">About</a>
        <a href="/">Features</a>
        <a href="/">Works</a>
        <a href="/">Career</a>
      </div>

      <div className='footer-div'>
        <h2>Company</h2>
        <a href="/">About</a>
        <a href="/">Features</a>
        <a href="/">Works</a>
        <a href="/">Career</a>
      </div>

</footer>
  )
}

export default Footer