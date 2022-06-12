import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
  return (
    <footer className="footer">
      <a href="https://junocollege.com/" target="_blank" rel="noreferrer" className="footer-links">
        <p className="juno-credit">Created at ©Juno College by:</p>
      </a>

      <a href="https://www.linkedin.com/in/bart-batalinski/" target="_blank" rel="noreferrer" className="footer-links name-container">
        <p>Bart Batalinski</p>
        <FontAwesomeIcon className='modal-icon'  icon={ faLinkedin } />
      </a>
    </footer>
  );
}
