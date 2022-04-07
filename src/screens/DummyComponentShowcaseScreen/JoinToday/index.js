import React from "react";
import "./index.css";

const JoinToday = () => {
  return (
    <>
      <section class="call-to-action text-white">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2 class="mb-4 fw-bold">Join Today</h2>
            </div>
            <div class="col-6">
              <p class="mb-4 fw-bold">
                Get access to unlimited movies, and know what to watch next on
                LPQK. We help you create a personalized collection using our AI
                powered search and filter. Also, watch premium content from
                Netflex, Amazon, and much more.
              </p>
            </div>
            <div class="col-6">
              <ul>
                <li> Enjoy ad free content </li>
                <li> One month on the house </li>
                <li> One filter for all streaming platforms </li>
                <li> Create your own personalized list </li>
                <li>
                  {" "}
                  Share your expert opinion on a recent movie with the community{" "}
                </li>
              </ul>
            </div>
            <div class="col-12">
              <button type="button" class="btn btn-primary pcjt-color-overide">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinToday;
