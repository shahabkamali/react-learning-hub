import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const menuItems = [
    {
      title: 'Class Components',
      description: 'Learn about React class components and lifecycle methods',
      items: [
        { name: 'Life Cycle', path: '/life-cycle', color: '#e74c3c' },
        { name: 'Lists', path: '/lists', color: '#3498db' },
        { name: 'PureComponent', path: '/purecomponent', color: '#2ecc71' },
        { name: 'Error Handling', path: '/error-handling', color: '#f39c12' },
        { name: 'Unmounting', path: '/unmounting', color: '#9b59b6' }
      ]
    },
    {
      title: 'Functional Components',
      description: 'Explore modern React with functional components and hooks',
      items: [
        { name: 'Stateless', path: '/stateless', color: '#1abc9c' },
        { name: 'useState', path: '/usestate', color: '#e67e22' },
        { name: 'useEffect', path: '/useeffect', color: '#34495e' },
        { name: 'Custom Hooks', path: '/custom-hooks', color: '#16a085' }
      ]
    },
    {
      title: 'React Concepts',
      description: 'Core React concepts and advanced patterns',
      items: [
        { name: 'Fragments', path: '/fragment', color: '#8e44ad' },
        { name: 'Refs', path: '/refs', color: '#d35400' },
        { name: 'Advanced setState', path: '/advanced-setstate', color: '#27ae60' },
        { name: 'Hook Rules', path: '/hook-rules', color: '#c0392b' }
      ]
    },
    {
      title: 'Forms & UI',
      description: 'Interactive forms and user interface components',
      items: [
        { name: 'Form Demo', path: '/form', color: '#2980b9' },
        { name: 'About', path: '/about', color: '#7f8c8d' }
      ]
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold', 
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          React Learning Hub
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Master React concepts with interactive examples and hands-on demonstrations. 
          From class components to modern hooks, explore everything React has to offer.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              color: '#2c3e50'
            }}>
              {section.title}
            </h2>
            <p style={{ 
              color: '#7f8c8d', 
              marginBottom: '20px',
              lineHeight: '1.5'
            }}>
              {section.description}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.path}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: '500',
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1rem' }}>{item.name}</span>
                    <span style={{ fontSize: '1.2rem' }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        color: 'white',
        opacity: 0.8
      }}>
        <p style={{ fontSize: '1rem' }}>
          Built with React, TypeScript, and ❤️
        </p>
        <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>
          Explore each section to learn React concepts through interactive examples
        </p>
      </div>

      {/* Floating Action Button */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        zIndex: 1000
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>↑</span>
      </div>
    </div>
  );
};

export default Home;


