import React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to Contact Book Application</h1>
        <p style={styles.subtitle}>Manage your connections seamlessly and efficiently.</p>
      </header>

      <div style={styles.buttonContainer}>
        <Link to={"/contactpage"}
          style={{ ...styles.button, ...styles.addButton }}
        >
          Add New Contact
        </Link>

        <Link to={"/showcontact"}
          style={{ ...styles.button, ...styles.viewButton }}
        >
          View Contacts
        </Link>

        <Link to={"/search"}
          style={{ ...styles.button, ...styles.settingsButton }}
        >
          Search Contact
        </Link>
      </div>
    </div>
  );
};

// Inline styles for quick setup and clean look
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#f4f7f6',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  viewButton: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    color: '#fff',
  },
  settingsButton: {
    backgroundColor: '#95a5a6',
    color: '#fff',
  },
};

export default Home;