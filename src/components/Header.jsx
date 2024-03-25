import logo from '../assets/logo.png';
import './Header.css';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      {/*Note that the 'text-align' in the style prop can be set as textAlign, which is recommanded */}
      {/* Note: FlexBox aligns all its child to the middle of the paragraph. */}
      {/* If you disable it, then you could see that the 'text-align: left' is applied. */}
      <p style={{
        color: 'magenta',
        'text-align': 'left',
      }}>A community of artists and art-lovers.</p>
    </header>
  );
}
