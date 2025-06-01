import "../../src/Css/Landingpagecss/Newcontact.css";
import contactLogo from "../../src/assets/contact.svg";
import facebookLogo from "../../src/assets/facebook 1.svg";
import emailLogo from "../../src/assets/email.svg";

function Newcontact() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("contact-message").value;

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost/CCIS_CONNECT-MASTER/src/php/contacts.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      });

      const result = await response.json();
      if (result.success) {
        alert("Your message has been sent successfully!");
      } else {
        alert("Failed to send message: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("There was an error submitting your message. Please try again later.");
    }
  };

  return (
    <>
      <div className="Newcontact-content">
        <div className="contact-left">
          <h1>
            <span className="design-1">L</span>et's Talk
          </h1>
          <div className="contact-paragraph-container">
            <p>
              If you have any questions, concerns, or suggestions regarding our programs, services, or activities,
              please don’t hesitate to reach out. The College of Computer and Information Sciences is committed to
              providing support and fostering connections within and beyond the university.
            </p>
          </div>

          <div className="contact-link">
            <img src={contactLogo} alt="Contact" />
            <a href="mailto:ccis@mmsu.edu.ph">ccis@mmsu.edu.ph</a>
          </div>

          <br />

          <div className="contact-link">
            <img src={emailLogo} alt="Phone" />
            <a href="tel:077-600-0460">077-600-0460</a>
          </div>
          <hr />

          <p className="follow-text">Follow us:</p>
          <a href="https://www.facebook.com/mmsuccis" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="Facebook" />
          </a>
        </div>

        <div className="contact-right">
          <div className="contact-right-formbox">
            <form onSubmit={handleSubmit}>
              <label htmlFor="contact-name">Name</label>
              <br />
              <input type="text" name="contact-name" id="contact-name" />
              <br />
              <label htmlFor="contact-email">Email</label>
              <br />
              <input type="text" name="contact-email" id="contact-email" />
              <br />
              <label htmlFor="contact-message">Message:</label>
              <br />
              <textarea name="contact-message" id="contact-message"></textarea>
              <br />
              <div className="contact-submit-button">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newcontact;
