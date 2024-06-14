import { useState } from 'react';
import axios from 'axios';

export function useTaskForm(handleClose) {
  const initialFormState = {
    mainID: '',
    autoIDChecked: false,
    type: '',
    priority: '1',
    nodeCount: 1,
    nodeValues: ['']
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    }
    else if (name === 'nodeCount') {
      const count = Math.max(0, parseInt(value)); 
      setFormData(prev => ({
        ...prev,
        nodeCount: count,
        nodeValues: count < prev.nodeValues.length 
        ? prev.nodeValues.slice(0, count) 
        : [...prev.nodeValues, ...Array(count - prev.nodeValues.length).fill('')] 
      }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNodeValueChange = (index, value) => {
    const newNodes = [...formData.nodeValues];
    newNodes[index] = value;
    setFormData(prev => ({ ...prev, nodeValues: newNodes }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.mainID && !formData.autoIDChecked) {
      setErrorMessage('Please enter a Task ID or select Auto ID.');
      return;
    }
    if (!formData.type || !formData.priority || formData.nodeValues.some(v => !v)) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post("https://fms.com/api/tasks", formData);
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
    handleChange, handleNodeValueChange, handleSubmit, handleReset
  };
}
