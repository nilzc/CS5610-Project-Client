import React from "react";

import "./index.css";

const Footer = () => {
  return (
    <>
      <footer class="footer-section">
        <div class="container">
          <div class="footer-cta pt-5 pb-5">
            <div class="row">
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="cta-text">
                    <h4>Find us</h4>
                    <span>Boston MA</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mt-xs-3 mt-sm-2 mt-md-0">
                <div class="single-cta">
                  <i class="fas fa-phone"></i>
                  <div class="cta-text">
                    <h4>Call us</h4>
                    <span>+1 857-111-1111</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mt-xs-3 mt-sm-2 mt-md-0">
                <div class="single-cta">
                  <i class="far fa-envelope-open"></i>
                  <div class="cta-text">
                    <h4>Mail us</h4>
                    <span>lpqk@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-content pt-5 pb-5">
            <div class="row">
              <div class="col-xl-4 col-lg-4 mb-50">
                <div class="footer-widget">
                  <div class="footer-text">
                    <p>
                      Never get confused on selecting the next movie to watch,
                      because you have our service by your side.{" "}
                    </p>
                  </div>
                  <div class="footer-social-icon">
                    <span>Open Source Code</span>
                    <a href="https://github.com/ZhuochengLin/CS5610-Project-Client">
                      <i class="fab fa-github github-bg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="/#">Home</a>
                    </li>
                    <li>
                      <a href="/#">Random</a>
                    </li>
                    <li>
                      <a href="/#">Services</a>
                    </li>
                    <li>
                      <a href="/#">Movies</a>
                    </li>
                    <li>
                      <a href="/#">TV Shows</a>
                    </li>
                    <li>
                      <a href="/#">About us</a>
                    </li>
                    <li>
                      <a href="/#">Random</a>
                    </li>
                    <li>
                      <a href="/#">Expert Team</a>
                    </li>
                    <li>
                      <a href="/#">Contact us</a>
                    </li>
                    <li>
                      <a href="/#">Latest Popular</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Subscribe</h3>
                  </div>
                  <div class="footer-text mb-25">
                    <p>
                      We roll out an exclusive news letter each month. Feel free
                      to subscribe.
                    </p>
                  </div>
                  <div class="subscribe-form">
                    <form action="/#">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <i class="fab fa-telegram-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright-area">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                <div class="copyright-text">
                  <p>
                    Copyright &copy; 2022, All Right Reserved{" "}
                    <a href="/#">Terms & Conditions</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
