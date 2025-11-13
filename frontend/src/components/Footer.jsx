const Footer = () => {
  return (
    <footer>
      <div>
        <p>© {new Date().getFullYear()} SkillHub</p>

        <nav>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
          <a href="#">Privacidade</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;