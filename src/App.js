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
    },
    {
      image: "images/students-showcase/Image_05.jpg_29-05-2025-04-21-47_s.jpg",
      title: "Student Excellence",
      description: "Showcasing our students' dedication to academic and personal growth"
    },
    {
      image: "images/Ghum.jfif",
      title: "Students in Action",
      description: "Our students actively engaged in learning and school activities"
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

  // Modal state for image gallery
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Gallery filter with real images
  const galleryItems = [
    { category: 'events', title: 'Cultural Events', description: 'Traditional Bengali New Year celebration', image: 'images/events/cultural-events/Image_14-04-2025-1744610119.jpg_20-05-2025-04-29-26_s.jpg' },
    { category: 'events', title: 'Cultural Performance', description: 'Students showcasing traditional arts', image: 'images/events/cultural-events/Image_14-04-2025-1744610128.jpg_20-05-2025-04-29-28_s.jpg' },
    { category: 'events', title: 'Independence Day 2025', description: 'Patriotic celebration and remembrance', image: 'images/events/independence-day/Image_26-03-2025-1742962177.jpg_20-05-2025-04-37-16_s.jpg' },
    { category: 'events', title: 'Independence Day Ceremony', description: 'Flag hoisting ceremony', image: 'images/events/independence-day/Image_26-03-2025-1742962192.jpg_20-05-2025-04-37-18_s.jpg' },
    { category: 'academics', title: 'Journalism Summit', description: 'News & Journalism Summit 2025', image: 'images/events/journalism/Image_02-03-2025-1740892955.jpg_20-05-2025-05-27-56_s.jpg' },
    { category: 'academics', title: 'Student Journalism', description: 'Developing communication skills', image: 'images/events/journalism/Image_02-03-2025-1740892964.jpg_20-05-2025-05-27-58_s.jpg' },
    { category: 'events', title: 'Language Day Celebration', description: 'International Mother Language Day', image: 'images/events/language-day/Image_21-02-2025-1740119833.jpg_20-05-2025-05-32-13_s.jpg' },
    { category: 'events', title: 'Language Day Activities', description: 'Cultural programs and competitions', image: 'images/events/language-day/Image_21-02-2025-1740119843.jpg_20-05-2025-05-32-15_s.jpg' },
    { category: 'facilities', title: 'Why Study at ACPS', description: 'Excellence in Education', image: 'images/facilities/Content_Big_Why Study at ACPS_29-05-2025-10-38-52_s1.jpg' },
    { category: 'facilities', title: 'School Facilities', description: 'Modern learning environment', image: 'images/facilities/Image_05.jpg_29-05-2025-04-21-47_s.jpg' }
  ];

  // Functions for modal
  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredGalleryItems.findIndex(item => item === selectedImage);
    const nextIndex = (currentIndex + 1) % filteredGalleryItems.length;
    setSelectedImage(filteredGalleryItems[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredGalleryItems.findIndex(item => item === selectedImage);
    const prevIndex = currentIndex === 0 ? filteredGalleryItems.length - 1 : currentIndex - 1;
    setSelectedImage(filteredGalleryItems[prevIndex]);
  };

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
            
            
            <div className="home-content">
              <div className="school-highlights">
                {[
                  { icon: 'fas fa-trophy', title: 'Academic Excellence', description: 'Consistently achieving outstanding results in SSC examinations' },
                  { icon: 'fas fa-users', title: '1500+ Students', description: 'A diverse community of learners from grades I to X' },
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
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="slide-placeholder" style={{
                          width: '100%',
                          height: '300px',
                          background: `linear-gradient(135deg, var(--accent-color), var(--hover-color))`,
                          display: 'none',
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
                    <li>Class I to V (Primary)</li>
                    <li>Class VI to X (SSC)</li>
                    <li>Science Group (Class IX-X)</li>
                    <li>Business Studies Group (Class IX-X)</li>
                    <li>Humanities Group (Class IX-X)</li>
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
                  <div key={index} className="gallery-item" data-category={item.category} onClick={() => openModal(item)}>
                    <div className="gallery-image-container">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="gallery-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="gallery-placeholder" style={{
                        display: 'none',
                        width: '100%',
                        height: '200px',
                        background: 'linear-gradient(135deg, var(--accent-color), var(--hover-color))',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        color: '#F8F8FF'
                      }}>
                        <i className="fas fa-image"></i>
                      </div>
                    </div>
                    <div className="gallery-overlay">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <div className="gallery-hover-icon">
                        <i className="fas fa-search-plus"></i>
                      </div>
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
                'Hizbur', 'Zubair', 'Alif', 'Marshad', 'Pranjol', 'Ahnaf', 'Aaryan', 'Rakibul', 
                'Sami', 'Masum', 'Raiyan', 'Jabir', 'Saad', 'Niladri', 'Aditya', 'Zayed', 
                'Farabi', 'Ruwayd', 'Mahir', 'Tousif', 'Sanvi', 'Rownak', 'Kaysan', 'Wasi', 
                'Maimun', 'Fahim', 'Shadman', 'Iyaad', 'Limon', 'Jalis', 'Mahdi', 'Aseer', 
                'Ilhum', 'Jafran', 'Sayed', 'Amlam', 'Farhan', 'Seam', 'Ahnaf', 'Labib', 
                'Kaif', 'Shopnil'
              ].map((studentName, index) => (
                <div key={index} className="student-card">
                  <div className="student-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="student-info">
                    <h3>{studentName}</h3>
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
                { name: 'Bishno Sir', subject: 'Chemistry', designation: 'Class Teacher' },
                { name: 'Yahya Sir', subject: 'Biology', designation: 'Teacher' },
                { name: 'Naheed Miss', subject: 'English 2', designation: 'Teacher' },
                { name: 'Aminul Sir', subject: 'Bangla', designation: 'Teacher' },
                { name: 'Zakir Sir', subject: 'Math', designation: 'Teacher' },
                { name: 'Zamman Sir', subject: 'Higher Math', designation: 'Teacher' },
                { name: 'Masum Sir', subject: 'Religion', designation: 'Teacher' },
                { name: 'Zahirul Sir', subject: 'Physics', designation: 'Teacher' },
                { name: 'Maskuba Miss', subject: 'BGS', designation: 'Teacher' },
                { name: 'Hassan Sir', subject: 'English 1st', designation: 'Teacher' }
              ].map((teacher, index) => (
                <div key={index} className="teacher-card">
                  <div className="teacher-avatar">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <div className="teacher-info">
                    <h3>{teacher.name}</h3>
                    <p className="designation">{teacher.designation}</p>
                    <p className="subject">{teacher.subject}</p>
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
                    <h4>Primary Level (Class I-V)</h4>
                    <ul>
                      <li>National Curriculum & Textbook Board (NCTB) syllabus</li>
                      <li>Strong foundation in core subjects</li>
                      <li>Creative learning and skill development</li>
                      <li>Character building and moral education</li>
                    </ul>
                  </div>
                  <div className="curriculum-card">
                    <h4>Secondary Level (Class VI-X)</h4>
                    <ul>
                      <li>National Curriculum & Textbook Board (NCTB) syllabus</li>
                      <li>SSC Examination preparation</li>
                      <li>Co-curricular activities integration</li>
                      <li>Digital learning resources</li>
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
                        <tr><td>Class I-V</td><td>৳2,000</td></tr>
                        <tr><td>Class VI-VIII</td><td>৳2,500</td></tr>
                        <tr><td>Class IX-X</td><td>৳2,800</td></tr>
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

      {/* Modal for Gallery Images */}
      {modalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            <button className="modal-prev" onClick={prevImage}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="modal-next" onClick={nextImage}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="modal-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="modal-placeholder" style={{
              display: 'none',
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, var(--accent-color), var(--hover-color))',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#F8F8FF'
            }}>
              <i className="fas fa-image"></i>
            </div>
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <span className="modal-category">{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}

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
