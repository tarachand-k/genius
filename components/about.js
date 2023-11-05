const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-img">
        <img src="/img/ai.png" />
      </div>
      <div className="about-content">
        <h2 className="heading">
          About <span>Me</span>
        </h2>
        <h3>AI CHAT BOT</h3>
        <p>
          We&rsquo;ve trained a model called Talkgeniuswhich interacts <br />
          in a conversational way. The dialogue format makes it possible for
          <br />
          TalkGenius to answer followup questions, admit its mistakes,
          <br />
          challenge incorrect premises, and reject inappropriate requests.
        </p>
      </div>
    </section>
  );
};

export default About;
