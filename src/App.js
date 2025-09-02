import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentMainSlide, setCurrentMainSlide] = useState(0);
  const [currentStudentSlide, setCurrentStudentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  // Slideshow data
  const mainSlides = [
    {
      image: "images/slideshow/cultural-1.jpg",
      title: "Bangla Noboborsho Celebration",
      description: "Celebrating Bengali New Year with traditional cultural programs"
    },
    {
      image: "images/slideshow/independence-1.jpg",
      title: "Independence Day Celebration",
      description: "Honoring our nation's independence with patriotic programs"
    },
    {
      image: "images/slideshow/journalism-1.jpg",
      title: "Intra News & Journalism Summit",
      description: "Developing communication and journalism skills"
    },
    {
      image: "images/slideshow/facilities-1.jpg",
      title: "Modern Learning Facilities",
      description: "State-of-the-art infrastructure for quality education"
    }
  ];

  const studentSlides = [
    {
      image: "images/students-showcase/Content_Big_Motivational Speech for Students and Teachers_18-08-2025-08-01-51_s4.jpg",
      title: "Motivational Speech Session",
      description: "Students and teachers participating in an inspiring motivational session"
    },
    {
      image: "images/students-showcase/Image_6.JPG_06-08-2025-04-57-46_s.JPG",
      title: "Student Activities",
      description: "Engaging in various educational and extracurricular activities"
    },
    {
      image: "images/students-showcase/Image_7.JPG_06-08-2025-04-57-47_s.JPG",
      title: "Interactive Classroom Learning",
      description: "Students actively participating in classroom discussions and learning"
    }
  ];

  // Auto-advance slideshows
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMainSlide(prev => (prev + 1) % mainSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mainSlides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStudentSlide(prev => (prev + 1) % studentSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [studentSlides.length]);

  // Tab switching
  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };

  // Slideshow controls
  const changeMainSlide = (direction) => {
    setCurrentMainSlide(prev => {
      const newIndex = prev + direction;
      if (newIndex < 0) return mainSlides.length - 1;
      if (newIndex >= mainSlides.length) return 0;
      return newIndex;
    });
  };

  const changeStudentSlide = (direction) => {
    setCurrentStudentSlide(prev => {
      const newIndex = prev + direction;
      if (newIndex < 0) return studentSlides.length - 1;
      if (newIndex >= studentSlides.length) return 0;
      return newIndex;
    });
  };

  // Gallery filter
  const galleryItems = [
    { category: 'events', title: 'Bangla Noboborsho 2025', description: 'Traditional Bengali New Year celebration' },
    { category: 'events', title: 'Cultural Performance', description: 'Students showcasing traditional arts' },
    { category: 'events', title: 'Independence Day 2025', description: 'Patriotic celebration and remembrance' },
    { category: 'academics', title: 'In-House Teacher Training', description: 'Professional development programs' },
    { category: 'academics', title: 'News & Journalism Summit 2025', description: 'Developing communication skills' },
    { category: 'facilities', title: 'Excellence in Education', description: 'Showcasing our academic strengths' },
    { category: 'sports', title: 'Annual Sports Day', description: 'Inter-class competitions and athletic events' }
  ];

  const filteredGalleryItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="logo-section">
          <div className="logo">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="school-info">
            <h1>Adamjee Cantonment Public School</h1>
            <p>Dhaka Cantonment, Dhaka, Bangladesh</p>
          </div>
        </div>
        <div className="header-decoration">
          <div className="floating-icons">
            <i className="fas fa-book"></i>
            <i className="fas fa-user-graduate"></i>
            <i className="fas fa-chalkboard-teacher"></i>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <ul className="nav-tabs">
          {[
            { id: 'home', icon: 'fas fa-home', label: 'Home' },
            { id: 'about', icon: 'fas fa-info-circle', label: 'About' },
            { id: 'news', icon: 'fas fa-newspaper', label: 'News' },
            { id: 'events', icon: 'fas fa-calendar-check', label: 'Events' },
            { id: 'gallery', icon: 'fas fa-images', label: 'Gallery' },
            { id: 'academics', icon: 'fas fa-graduation-cap', label: 'Academics' },
            { id: 'students', icon: 'fas fa-users', label: 'Students' },
            { id: 'teachers', icon: 'fas fa-chalkboard-teacher', label: 'Teachers' }
          ].map(tab => (
            <li 
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => switchTab(tab.id)}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </li>
          ))}
        </ul>
        <div className="nav-indicator"></div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Home Section */}
        {activeTab === 'home' && (
          <section className="content-section active" id="home">
            <div className="section-header">
              <h2>Welcome to Adamjee Cantonment Public School</h2>
              <p>Excellence in Education Since 1983 - EIIN: 107843</p>
            </div>
            
            {/* Featured Slideshow */}
            <div className="featured-slideshow">
              <div className="slideshow-container">
                {mainSlides.map((slide, index) => (
                  <div key={index} className={`slide ${index === currentMainSlide ? 'active' : ''}`}>
                    <div className="slide-placeholder" style={{
                      width: '100%',
                      height: '400px',
                      background: `linear-gradient(135deg, var(--accent-color), var(--hover-color))`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      color: '#F8F8FF'
                    }}>
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className="slide-content">
                      <h3>{slide.title}</h3>
                      <p>{slide.description}</p>
                    </div>
                  </div>
                ))}
                
                {/* Slideshow Navigation */}
                <button className="slide-btn prev-btn" onClick={() => changeMainSlide(-1)}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="slide-btn next-btn" onClick={() => changeMainSlide(1)}>
                  <i className="fas fa-chevron-right"></i>
                </button>
                
                {/* Slide Indicators */}
                <div className="slide-indicators">
                  {mainSlides.map((_, index) => (
                    <span 
                      key={index}
                      className={`indicator ${index === currentMainSlide ? 'active' : ''}`}
                      onClick={() => setCurrentMainSlide(index)}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="home-content">
              <div className="school-highlights">
                {[
                  { icon: 'fas fa-trophy', title: 'Academic Excellence', description: 'Consistently achieving outstanding results in SSC and HSC examinations' },
                  { icon: 'fas fa-users', title: '1500+ Students', description: 'A diverse community of learners from grades VI to XII' },
                  { icon: 'fas fa-chalkboard-teacher', title: '80+ Faculty', description: 'Dedicated and qualified teachers committed to student success' },
                  { icon: 'fas fa-building', title: 'Modern Campus', description: 'State-of-the-art facilities including labs, library, and sports complex' }
                ].map((highlight, index) => (
                  <div key={index} className="highlight-card">
                    <i className={highlight.icon}></i>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Student Showcase */}
              <div className="student-showcase">
                <h3>Our Students in Action</h3>
                <div className="student-slideshow-container">
                  <div className="student-slides">
                    {studentSlides.map((slide, index) => (
                      <div key={index} className={`student-slide ${index === currentStudentSlide ? 'active' : ''}`}>
                        <div className="slide-placeholder" style={{
                          width: '100%',
                          height: '300px',
                          background: `linear-gradient(135deg, var(--accent-color), var(--hover-color))`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2.5rem',
                          color: '#F8F8FF'
                        }}>
                          <i className="fas fa-users"></i>
                        </div>
                        <div className="student-slide-content">
                          <h4>{slide.title}</h4>
                          <p>{slide.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Student Slideshow Controls */}
                  <div className="student-slideshow-controls">
                    <button className="student-slide-btn prev" onClick={() => changeStudentSlide(-1)}>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="student-slide-btn next" onClick={() => changeStudentSlide(1)}>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  
                  {/* Student Slide Indicators */}
                  <div className="student-slide-indicators">
                    {studentSlides.map((_, index) => (
                      <span 
                        key={index}
                        className={`student-indicator ${index === currentStudentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentStudentSlide(index)}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="recent-updates">
                <h3>Recent Updates</h3>
                <div className="updates-list">
                  {[
                    { date: 'Sep 15, 2024', title: 'Annual Sports Day 2024 Registration Open' },
                    { date: 'Sep 10, 2024', title: 'Science Fair Project Submission Deadline Extended' },
                    { date: 'Sep 05, 2024', title: 'New Library Books Collection Available' }
                  ].map((update, index) => (
                    <div key={index} className="update-item">
                      <div className="update-date">{update.date}</div>
                      <div className="update-title">{update.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        {activeTab === 'about' && (
          <section className="content-section active" id="about">
            <div className="section-header">
              <h2>About Our School</h2>
              <p>Established in 1983, serving the Cantonment community with quality education</p>
            </div>
            <div className="about-content">
              <div className="school-history">
                <h3>Our History</h3>
                <p>Adamjee Cantonment Public School was established in 1983 with the vision of providing quality education to the children of military personnel and civilians in the Dhaka Cantonment area. Over the years, we have grown into one of the most prestigious educational institutions in the region.</p>
                
                <h3>Mission Statement</h3>
                <p>To provide comprehensive education that develops intellectual, physical, and moral capabilities of students, preparing them to become responsible citizens and future leaders of Bangladesh.</p>
                
                <h3>Vision</h3>
                <p>To be recognized as a center of excellence in education, fostering creativity, critical thinking, and character development in a nurturing environment.</p>
              </div>
              <div className="school-info-grid">
                <div className="info-card">
                  <h4>School Details</h4>
                  <ul>
                    <li><strong>EIIN:</strong> 107843</li>
                    <li><strong>Established:</strong> 1983</li>
                    <li><strong>Type:</strong> Co-educational</li>
                    <li><strong>Medium:</strong> English & Bangla</li>
                    <li><strong>Campus:</strong> Dhaka Cantonment</li>
                  </ul>
                </div>
                <div className="info-card">
                  <h4>Academic Programs</h4>
                  <ul>
                    <li>Class VI to X (SSC)</li>
                    <li>Class XI to XII (HSC)</li>
                    <li>Science Group</li>
                    <li>Business Studies Group</li>
                    <li>Humanities Group</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* News Section */}
        {activeTab === 'news' && (
          <section className="content-section active" id="news">
            <div className="section-header">
              <h2>Latest News & Announcements</h2>
              <p>Stay updated with the latest happenings at ACPS</p>
            </div>
            <div className="news-grid">
              {[
                {
                  category: 'Achievement',
                  title: 'ACPS Wins Inter-School Science Olympiad 2024',
                  description: 'Our students secured first place in the Regional Science Olympiad, competing against 25 schools from Dhaka division.',
                  date: 'September 20, 2024',
                  author: 'Admin',
                  icon: 'fas fa-trophy',
                  featured: true
                },
                {
                  category: 'Event',
                  title: 'Annual Sports Day 2024 Schedule Released',
                  description: 'The much-awaited Annual Sports Day will be held on October 15, 2024. Registration forms are now available.',
                  date: 'September 15, 2024',
                  author: 'Sports Department',
                  icon: 'fas fa-calendar-alt'
                },
                {
                  category: 'Academic',
                  title: 'New Digital Library Resources Added',
                  description: 'Over 500 new digital books and research materials have been added to our online library portal.',
                  date: 'September 12, 2024',
                  author: 'Library',
                  icon: 'fas fa-book'
                },
                {
                  category: 'Admission',
                  title: 'Class VI Admission Test Date Announced',
                  description: 'The admission test for Class VI (2025 session) will be held on November 30, 2024. Application deadline: November 15.',
                  date: 'September 10, 2024',
                  author: 'Admission Office',
                  icon: 'fas fa-graduation-cap'
                },
                {
                  category: 'Recognition',
                  title: 'Principal Receives Excellence in Education Award',
                  description: 'Dr. Karim Ahmed honored with the National Education Excellence Award 2024 by the Ministry of Education.',
                  date: 'September 8, 2024',
                  author: 'Admin',
                  icon: 'fas fa-award'
                },
                {
                  category: 'Infrastructure',
                  title: 'New Science Laboratory Inaugurated',
                  description: 'State-of-the-art chemistry and physics laboratory opened to provide hands-on learning experience for students.',
                  date: 'September 5, 2024',
                  author: 'Science Department',
                  icon: 'fas fa-flask'
                }
              ].map((news, index) => (
                <article key={index} className={`news-card ${news.featured ? 'featured' : ''}`}>
                  <div className="news-image">
                    <i className={news.icon}></i>
                  </div>
                  <div className="news-content">
                    <div className="news-category">{news.category}</div>
                    <h3>{news.title}</h3>
                    <p>{news.description}</p>
                    <div className="news-meta">
                      <span className="news-date">{news.date}</span>
                      <span className="news-author">{news.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Events Section */}
        {activeTab === 'events' && (
          <section className="content-section active" id="events">
            <div className="section-header">
              <h2>Upcoming Events</h2>
              <p>Mark your calendar for these important school events</p>
            </div>
            <div className="events-container">
              <div className="calendar-view">
                <h3>October 2024</h3>
                <div className="calendar-grid">
                  {[
                    { day: '5', event: 'Parent Meeting' },
                    { day: '12', event: 'Science Fair' },
                    { day: '15', event: 'Sports Day' },
                    { day: '22', event: 'Cultural Program' },
                    { day: '28', event: 'Half Yearly Exam' }
                  ].map((item, index) => (
                    <div key={index} className="calendar-day">
                      <span className="day-number">{item.day}</span>
                      <span className="day-event">{item.event}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="events-details">
                {[
                  {
                    day: '15',
                    month: 'Oct',
                    year: '2024',
                    title: 'Annual Sports Day',
                    time: '8:00 AM - 4:00 PM',
                    description: 'Inter-class and inter-house competitions including athletics, football, cricket, and various indoor games. Prize distribution ceremony will be held at 3:30 PM.',
                    location: 'School Sports Ground',
                    audience: 'All Classes'
                  },
                  {
                    day: '22',
                    month: 'Oct',
                    year: '2024',
                    title: 'Cultural Program & Prize Distribution',
                    time: '2:00 PM - 6:00 PM',
                    description: 'Annual cultural program featuring student performances in music, dance, drama, and recitation. Academic excellence awards will also be distributed.',
                    location: 'School Auditorium',
                    audience: 'Students & Parents'
                  }
                ].map((event, index) => (
                  <div key={index} className="event-detail-card">
                    <div className="event-header">
                      <div className="event-date">
                        <span className="day">{event.day}</span>
                        <span className="month">{event.month}</span>
                        <span className="year">{event.year}</span>
                      </div>
                      <div className="event-info">
                        <h3>{event.title}</h3>
                        <p className="event-time">{event.time}</p>
                      </div>
                    </div>
                    <div className="event-description">
                      <p>{event.description}</p>
                      <div className="event-details">
                        <span><i className="fas fa-map-marker-alt"></i> {event.location}</span>
                        <span><i className="fas fa-users"></i> {event.audience}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {activeTab === 'gallery' && (
          <section className="content-section active" id="gallery">
            <div className="section-header">
              <h2>Photo Gallery</h2>
              <p>Capturing memories of our vibrant school life</p>
            </div>
            <div className="gallery-container">
              <div className="gallery-filters">
                {['all', 'events', 'sports', 'academics', 'facilities'].map(filter => (
                  <button 
                    key={filter}
                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
              <div className="gallery-grid">
                {filteredGalleryItems.map((item, index) => (
                  <div key={index} className="gallery-item" data-category={item.category}>
                    <div className="gallery-image">
                      <i className="fas fa-camera"></i>
                    </div>
                    <div className="gallery-overlay">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Students Section */}
        {activeTab === 'students' && (
          <section className="content-section active" id="students">
            <div className="section-header">
              <h2>Our Students</h2>
              <p>Meet our bright and talented students</p>
            </div>
            <div className="students-grid">
              {[
                { name: 'Ahmed Rahman', class: 'Class X - Roll: 001', badges: ['Science', 'Honor Student'] },
                { name: 'Fatima Khan', class: 'Class IX - Roll: 015', badges: ['Arts', 'Debate Team'] },
                { name: 'Mohammad Ali', class: 'Class VIII - Roll: 023', badges: ['Sports', 'Cricket Captain'] },
                { name: 'Ayesha Begum', class: 'Class X - Roll: 007', badges: ['Commerce', 'Class Monitor'] },
                { name: 'Rafiq Islam', class: 'Class IX - Roll: 012', badges: ['Science', 'Math Club'] },
                { name: 'Nadia Hassan', class: 'Class VIII - Roll: 018', badges: ['Arts', 'Art Club'] }
              ].map((student, index) => (
                <div key={index} className="student-card">
                  <div className="student-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="student-info">
                    <h3>{student.name}</h3>
                    <p>{student.class}</p>
                    <div className="student-badges">
                      {student.badges.map((badge, badgeIndex) => (
                        <span key={badgeIndex} className="badge">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Teachers Section */}
        {activeTab === 'teachers' && (
          <section className="content-section active" id="teachers">
            <div className="section-header">
              <h2>Our Faculty</h2>
              <p>Dedicated educators shaping the future</p>
            </div>
            <div className="teachers-grid">
              {[
                { name: 'Dr. Karim Ahmed', designation: 'Principal', subject: 'Educational Leadership', email: 'principal@acps.edu.bd' },
                { name: 'Mrs. Salma Rahman', designation: 'Senior Teacher', subject: 'Mathematics', email: 'salma.rahman@acps.edu.bd' },
                { name: 'Mr. Jahangir Hossain', designation: 'Assistant Teacher', subject: 'English Literature', email: 'jahangir.hossain@acps.edu.bd' },
                { name: 'Ms. Ruma Khatun', designation: 'Science Teacher', subject: 'Physics & Chemistry', email: 'ruma.khatun@acps.edu.bd' }
              ].map((teacher, index) => (
                <div key={index} className="teacher-card">
                  <div className="teacher-avatar">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <div className="teacher-info">
                    <h3>{teacher.name}</h3>
                    <p className="designation">{teacher.designation}</p>
                    <p className="subject">{teacher.subject}</p>
                    <div className="teacher-contact">
                      <i className="fas fa-envelope"></i>
                      <span>{teacher.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Academics Section */}
        {activeTab === 'academics' && (
          <section className="content-section active" id="academics">
            <div className="section-header">
              <h2>Academic Information</h2>
              <p>Comprehensive academic programs and curriculum details</p>
            </div>
            <div className="academics-container">
              <div className="curriculum-overview">
                <h3>Curriculum Overview</h3>
                <div className="curriculum-grid">
                  <div className="curriculum-card">
                    <h4>Secondary Level (Class VI-X)</h4>
                    <ul>
                      <li>National Curriculum & Textbook Board (NCTB) syllabus</li>
                      <li>SSC Examination preparation</li>
                      <li>Co-curricular activities integration</li>
                      <li>Digital learning resources</li>
                    </ul>
                  </div>
                  <div className="curriculum-card">
                    <h4>Higher Secondary Level (Class XI-XII)</h4>
                    <ul>
                      <li>Science, Business Studies, and Humanities</li>
                      <li>HSC Examination preparation</li>
                      <li>University admission guidance</li>
                      <li>Career counseling services</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="admission-info">
                <h3>Admission Information</h3>
                <div className="admission-details">
                  <div className="admission-card">
                    <h4>Class VI Admission (2025)</h4>
                    <div className="admission-timeline">
                      {[
                        { date: 'Oct 15 - Nov 15', event: 'Application Period' },
                        { date: 'Nov 30', event: 'Admission Test' },
                        { date: 'Dec 15', event: 'Result Publication' }
                      ].map((item, index) => (
                        <div key={index} className="timeline-item">
                          <span className="timeline-date">{item.date}</span>
                          <span className="timeline-event">{item.event}</span>
                        </div>
                      ))}
                    </div>
                    <div className="admission-requirements">
                      <h5>Requirements:</h5>
                      <ul>
                        <li>PSC/Ebtedayee passed with minimum GPA 4.00</li>
                        <li>Age limit: 11-13 years as of January 1, 2025</li>
                        <li>Medical fitness certificate</li>
                        <li>Character certificate from previous school</li>
                      </ul>
                    </div>
                  </div>
                  <div className="fee-structure">
                    <h4>Fee Structure (Monthly)</h4>
                    <table className="fee-table">
                      <tbody>
                        <tr><td>Class VI-VIII</td><td>৳2,500</td></tr>
                        <tr><td>Class IX-X</td><td>৳2,800</td></tr>
                        <tr><td>Class XI-XII</td><td>৳3,200</td></tr>
                      </tbody>
                    </table>
                    <p className="fee-note">*Additional fees may apply for special programs and activities</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Floating Background Elements */}
      <div className="background-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>
    </div>
  );
}

export default App;
