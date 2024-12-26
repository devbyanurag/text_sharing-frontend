import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './Home.module.css';
import reloadImg from '../../assets/images/reload.png';
import clearImg from '../../assets/images/clear.png';
import saveImg from '../../assets/images/save.png';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  // Handle text input change
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  useEffect(() => {
    fetchText();
    
    // Set up keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Prevent the default save dialog
        saveText();
      } else if (e.ctrlKey && e.key === 'r') {
        e.preventDefault(); // Prevent the default reload
        fetchText();
      } else if (e.ctrlKey && e.key === 'c') {
        e.preventDefault(); // Prevent the default copy
        clearText();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Run once on mount

  const fetchText = async () => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await api.get('/text', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.text) {
          setText(response.data.text);
        } else {
          toast.error("Token is invalid");
        }
      } catch (error) {
        console.error('Token validation failed:', error);
      }
    }
    setLoading(false);
  };

  const saveText = async () => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await api.put('/text', { text }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.message) {
          toast.success(response.data.message);
        } else {
          toast.error("Failed to update text");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  // Clear text field
  const clearText = () => {
    setText('');
  };

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <Header />
      <div className={styles.leftContainer}>
        <textarea
          value={text}
          onChange={handleTextChange}
          rows={10}
          cols={30}
          placeholder="Type a message"
          className={styles.textarea}
        />
        <div className={styles.rightContainer}>
          <button onClick={fetchText}>
            <img src={reloadImg} alt="reload" />
          </button>
          <button onClick={saveText}>
            <img src={saveImg} alt="save" />
          </button>
          <button onClick={clearText}>
            <img src={clearImg} alt="clear" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
