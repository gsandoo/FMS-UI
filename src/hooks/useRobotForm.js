import { useState } from 'react';
import axios from 'axios';

export function useRobotForm(handleClose) {
  const initialFormState = {
    mainID: '',
    action: '',
    goalNodeID: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.mainID || !formData.action) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (formData.action === '2' && !formData.goalNodeID) {
      setErrorMessage('Please specify a goal node for MOVE action.');
      return;
    }

    try {
      const response = await axios.post("https://fms.com/api/robots", formData);
      console.log('Success:', response.data);
      handleClose();
    } catch (error) {
      console.error("Failed to send data:", error);
      setErrorMessage('Failed to send data. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrorMessage('');
  };

  return {
    formData, errorMessage, 
    handleChange, handleSubmit, handleReset
  };
}
