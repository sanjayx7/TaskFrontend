import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">About Sanjay Ajay V T</div>

      {/* Intro Section */}
      <section className="section-background">
        <div className="about-section">
          <h2 className="about-title">Who Am I</h2>
          <p className="about-paragraph">
            I'm Sanjay Ajay V T, a passionate Python Full Stack Developer with
            extensive experience in building robust web applications and working
            on cutting-edge technologies. With a Bachelor of Technology in
            Computer Science Engineering from Jyothi Engineering College, I have
            developed a deep understanding of programming, database management,
            and web development. I believe in problem-solving through innovation
            and creativity, and I am always eager to explore new technologies.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="about-section">
        <h2 className="about-title">My Skills</h2>
        <p className="about-paragraph">
          Over the years, I have honed a diverse set of skills, including but not limited to:
        </p>
        <ul className="skills-list">
          <li className="skill-item">Python, C++, SQL, JavaScript</li>
          <li className="skill-item">Django, React, HTML, CSS</li>
          <li className="skill-item">PostgreSQL, MySQL, SQLite</li>
          <li className="skill-item">TensorFlow, OpenCV, Pandas, NumPy</li>
          <li className="skill-item">RESTful APIs, Postman</li>
          <li className="skill-item">Git, GitHub</li>
        </ul>
      </section>

      {/* Professional Journey Section */}
      <section className="section-background">
        <div className="about-section">
          <h2 className="about-title">Professional Journey</h2>
          <p className="about-paragraph">
            <strong>Python Developer Trainee, Febno Technologies</strong> (Aug 2024 – Present)
            <br />
            Working on innovative Python-based projects, developing robust web
            applications, and collaborating with cross-functional teams to deliver
            high-quality software solutions.
          </p>
          <p className="about-paragraph">
            <strong>Python Full Stack Development Intern, Luminar Technolab</strong> (Sept
            2023 – May 2024)
            <br />
            Built full-stack applications using Django and React, focusing on both
            front-end and back-end development to deliver a seamless user experience.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="about-section">
        <h2 className="about-title">Projects That Define My Work</h2>
        <p className="about-paragraph">
          <strong>Convocation Management System</strong>: Developed a platform
          to streamline the convocation process for Jyothi Engineering College,
          resulting in a 40% increase in participation and 25% reduction in
          administrative workload.
        </p>
        <p className="about-paragraph">
          <strong>Happy Paws</strong>: Created a machine learning application to
          classify video feeds of dogs using advanced techniques like transfer
          learning. Achieved a 97% accuracy rate, aiding government efforts in
          rabies control.
        </p>
        <p className="about-paragraph">
          <strong>E-Commerce Platform</strong>: Managed full-stack development,
          integrating payment gateways like PayPal and Stripe for secure
          transactions, ensuring a smooth shopping experience for users.
        </p>
      </section>

      {/* Achievements Section */}
      <section className="section-background">
        <div className="about-section">
          <h2 className="about-title">Certifications & Achievements</h2>
          <p className="about-paragraph">
            - Certified Full Stack Developer, Luminar Technolab (A+ Rating)
            <br />
            - IoT Home Automation Internship, Torc Infotech
            <br />
            - JavaScript and ReactJS Bootcamp, Shape AI
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-contact">
        <h2 className="about-title">Get in Touch</h2>
        <p className="about-paragraph">You can reach me via:</p>
        <div className="social-icons">
          <a href="https://github.com/sanjayx7" target="_blank" rel="noopener noreferrer">
            <FaGithub className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/in/sanjay-ajay-v-t" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon" />
          </a>
          <a href="mailto:sanjayvt7@gmail.com">
            <FaEnvelope className="social-icon" />
          </a>
          <a href="tel:+919895850197">
            <FaPhone className="social-icon" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
