const Contact = () => {
  return (
    <section className="contact" id="contact">
      <h2 className="heading">
        Contact<span>Us!</span>
      </h2>
      <form action="#">
        <div className="input-box">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
        </div>
        <div className="input-box">
          <input type="number" placeholder="Mobile Number" />
          <input type="text" placeholder="Email Subject" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Your Message"
          ></textarea>
          <input className="btn" type="submit" value="Send Message" />
        </div>
      </form>
    </section>
  );
};

export default Contact;
