import { useState } from "react";
import SweetAlert from "sweetalert2-react";
import "./App.css";

function App() {
  const [show, setShow] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [scheduledDateTime, setScheduledDateTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduledArray = scheduledDateTime.split("T");
    const scheduledDate = scheduledArray[0];
    const scheduledTime = scheduledArray[1];
    const currentDate = new Date()
    const currentTimezone = currentDate.getTimezoneOffset()

    let payload = {
      emailAddress: `${emailAddress}`,
      emailContent: `${emailContent}`,
      scheduledDate: `${scheduledDate}`,
      scheduledTime: `${scheduledTime}`,
      timezoneOffset: `${currentTimezone}`
    };

    fetch(
      "https://q5xfpi7cfc.execute-api.eu-west-2.amazonaws.com/Prod/emails",
      {
        method: "POST",

        mode: "no-cors",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(payload),
      }
    ).then((response) => console.log(response));

    setShow(true)
    setEmailAddress('')
    setEmailContent('')
    setScheduledDateTime('')
  };

  return (
    <div>
      {/* Navigation*/}
      <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
          <a className="navbar-brand" href="#!">
            Schedule My Email
          </a>
          {/* <a className="btn btn-primary" href="#signup">Sign Up</a> */}
        </div>
      </nav>
      {/* Masthead*/}
      <header className="masthead">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center text-white">
                {/* Page heading*/}
                <h1 className="mb-5">
                  Schedule sending yourself an Email in the future!
                </h1>
                <div>
                  <SweetAlert
                    show={show}
                    title="Success"
                    text="Your email schedule was successful"
                    onConfirm={() => setShow(false)}
                  />
                </div>
                <form
                  className="form-subscribe"
                  id="contactForm"
                  onSubmit={handleSubmit}
                >
                  {/* Email address input*/}
                  <div className="row">
                    <div className="col">
                      <input
                        className="form-control form-control-lg"
                        id="emailAddress"
                        type="email"
                        placeholder="Email Address"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                      />
                      <br />
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea3"
                        rows="7"
                        required
                        placeholder="Email Content"
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                      ></textarea>
                      <br />
                      <input
                        className="form-control form-control-lg"
                        id="datetime"
                        required
                        type="datetime-local"
                        value={scheduledDateTime}
                        onChange={(e) => setScheduledDateTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <button
                    className="btn btn-primary btn-block btn-lg"
                    type="submit"
                  >
                    Submit
                  </button>
                  <div className="d-none" id="submitSuccessMessage">
                    <div className="text-center mb-3">
                      <div className="fw-bolder">
                        Form submission successful!
                      </div>
                      <p>To activate this form, sign up at</p>
                      <a
                        className="text-white"
                        href="https://startbootstrap.com/solution/contact-forms"
                      >
                        https://startbootstrap.com/solution/contact-forms
                      </a>
                    </div>
                  </div>
                  <div className="d-none" id="submitErrorMessage">
                    <div className="text-center text-danger mb-3">
                      Error sending message!
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Icons Grid*/}
      <section className="features-icons bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="bi-window m-auto text-primary" />
                </div>
                <h3>Fully Automated</h3>
                <p className="lead mb-0">
                  This tool is automated to send you your personalized emails at
                  just the right time.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="bi-layers m-auto text-primary" />
                </div>
                <h3>Highly Performant</h3>
                <p className="lead mb-0">
                  You can send as many emails ad you like and receive them on
                  time.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="bi-terminal m-auto text-primary" />
                </div>
                <h3>Easy to Use</h3>
                <p className="lead mb-0">
                  Simply add your details and send the emails. Easy peasy!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials*/}
      <section className="testimonials text-center text-white">
        <div className="container">
          <h2 className="mb-5">What people are saying...</h2>
          <div className="row">
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/img/testimonials-1.jpg"
                  alt="..."
                />
                <h5>Margaret E.</h5>
                <p className="font-weight-light mb-0">
                  "This is fantastic! Thanks so much guys!"
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/img/testimonials-2.jpg"
                  alt="..."
                />
                <h5>Fred S.</h5>
                <p className="font-weight-light mb-0">
                  "Bootstrap is amazing. I've been using it to create lots of
                  super nice landing pages."
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/img/testimonials-3.jpg"
                  alt="..."
                />
                <h5>Sarah W.</h5>
                <p className="font-weight-light mb-0">
                  "Thanks so much for making these free resources available to
                  us!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer*/}
      <footer className="footer bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
              <ul className="list-inline mb-2">
                <li className="list-inline-item">
                  <a href="#!">About</a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a href="#!">Contact</a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a href="#!">Terms of Use</a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a href="#!">Privacy Policy</a>
                </li>
              </ul>
              <p className="text-muted small mb-4 mb-lg-0">
                © Your Website 2023. All Rights Reserved.
              </p>
            </div>
            <div className="col-lg-6 h-100 text-center text-lg-end my-auto">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-4">
                  <a href="#!">
                    <i className="bi-facebook fs-3" />
                  </a>
                </li>
                <li className="list-inline-item me-4">
                  <a href="#!">
                    <i className="bi-twitter fs-3" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">
                    <i className="bi-instagram fs-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
