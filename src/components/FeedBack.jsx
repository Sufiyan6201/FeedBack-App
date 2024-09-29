import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function FeedBack() {
  let [star, setStar] = useState(0);
  let [Feedback, setFeedBack] = useState({});
  let [FeedData, setFeedData] = useState([]);

  let handleStar = (star) => {
    setStar(star);
    let feed = { ...Feedback, ["star"]: star };
    setFeedBack(feed);
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted");
    let recordFeed = [...FeedData, Feedback];
    setFeedData(recordFeed);
    localStorage.setItem("FeedRecord", JSON.stringify(recordFeed));
  };
  useEffect(() => {
    let storedFeed = JSON.parse(localStorage.getItem("FeedRecord")) || [];
    setFeedData(storedFeed);
  }, []);
  console.log(FeedData);
  let handleInput = (e) => {
    let { name, value } = e.target;
    setFeedBack({ ...Feedback, [name]: value });
  };
  console.log(Feedback);
  return (
    <>
      <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
        <div className="row bg-white rounded-4 shadow-lg overflow-hidden">
          <div className="col-lg-6 p-5 bg-primary text-white d-flex flex-column justify-content-between">
            <div>
              <img
                src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="Feedback"
                className="img-fluid rounded-3 mb-4"
              />
              <h1 className="display-4 fw-bold mb-3">Your Opinion Matters</h1>
              <p className="lead mb-4">
                Help us improve our services by sharing your valuable feedback.
                Your insights drive our continuous improvement.
              </p>
              <button className="btn btn-light btn-lg px-5 py-3 fw-bold  text-primary">
                Get Started
              </button>
            </div>
          </div>
          <div className="col-lg-6 p-5">
            <h2 className="mb-4 display-4">Share Your Feedback</h2>
            <form id="feedbackForm" method="post" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control boredr boredr-success"
                  onChange={handleInput}
                  id="name"
                  name="userName"
                  required
                  aria-describedby="nameError"
                />
                <div id="nameError" className="invalid-feedback">
                  Please enter your name.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleInput}
                  required
                  aria-describedby="emailError"
                />
                <div id="emailError" className="invalid-feedback">
                  Please enter a valid email address.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="feedback" className="form-label">
                  Detailed Feedback
                </label>
                <textarea
                  className="form-control"
                  id="feedback"
                  name="reviw"
                  rows="4"
                  required
                  aria-describedby="feedbackError"
                  onChange={handleInput}
                />
                <div id="feedbackError" className="invalid-feedback">
                  Please provide your feedback.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Rate Your Experience</label>
                <div
                  className="display-5 star-rating"
                  aria-label="Rate your experience"
                >
                  {[...Array(5)].map((v, i) => (
                    <FaStar
                      key={i}
                      color={star >= i + 1 ? "gold" : "gray"}
                      onMouseOver={() => handleStar(i + 1)}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Feedback Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  onChange={handleInput}
                  required
                  aria-describedby="categoryError"
                >
                  <option value="">Choose a category</option>
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                  <option value="website">Website</option>
                  <option value="other">Other</option>
                </select>
                <div id="categoryError" className="invalid-feedback">
                  Please select a category.
                </div>
              </div>
              <div className="d-grid gap-3">
                <button
                  type="submit"
                  value="submit"
                  className="btn btn-primary btn-lg"
                >
                  Submit Feedback
                </button>
                <button type="reset" className="btn btn-outline-danger">
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <h2 className="display-3 text-underline text-center bg-secondery">
        Feed Record
      </h2>
      <div className="container">
        <div className="row">
          {FeedData.map((v, i) => (
            <div
              className="col-sm-5 text-center rounded mx-auto border border-success mb-2 mt-2 mb-sm-0"
              key={i}
            >
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Name : {v.userName}</h4>
                  <h5 className="card-text"> Email : {v.email}</h5>
                  <h6 className="card-text">
                    Rating :{" "}
                    {[...Array(5)].map((val, i) => (
                      <FaStar
                        key={i}
                        color={v.star >= i + 1 ? "gold" : "gray"}
                      />
                    ))}
                  </h6>
                  <h6 className="card-text">Category : {v.category}</h6>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FeedBack;
