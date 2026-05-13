import React, { useState } from "react";
import SectionHeader from "../common/sectionHeader";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xeendavv", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  return (
    <div id="Contact" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <SectionHeader imageUrl="images/contact-header.png"></SectionHeader>
      <div className="container pt-4 px-5">
        {submitted && (
          <div className="alert alert-success alert-dismissible" role="alert">
            Your message has been sent successfully!
            <button
              type="button"
              className="btn-close"
              onClick={() => setSubmitted(false)}
            />
          </div>
        )}
        {error && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            Something went wrong. Please try again.
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(false)}
            />
          </div>
        )}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder=""
              required={true}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder=""
              required={true}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="you@example.com"
              required={true}
            />
          </div>

          <div className="col-12">
            <label htmlFor="subject" className="form-label">
              Subject <span className="text-body-secondary">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              placeholder="Subject"
            />
          </div>

          <div className="col-12">
            <label htmlFor="message" className="form-label">
              Message (Optional)
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              placeholder="Message"
              style={{ height: "150px" }}
            />
          </div>
          <center className="mt-5">
            <input
              className="w-100 btn btn-secondary btn-lg"
              type="submit"
              value="Send your message"
            />
          </center>
        </form>
      </div>
    </div>
  );
}
