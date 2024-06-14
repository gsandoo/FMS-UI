import React from 'react';
import { useTaskForm } from '../hooks/useTaskForm';
import styles from '../styles/AddModal.module.css';

function AddTaskModal({ handleClose }) {
  const {
    formData, errorMessage, handleChange, handleNodeValueChange, handleSubmit, handleReset
  } = useTaskForm(handleClose);

  const renderNodeInputs = () => {
    return formData.nodeValues.map((value, index) => (
      <input key={index} type="text" placeholder={`Node ${index + 1}`} value={value}
        onChange={e => handleNodeValueChange(index, e.target.value)} className={styles.input}
      />
    ));
  };

  return (
    <div className={`${styles.addModalContainer} ${styles.task}`}>
      <form onSubmit={handleSubmit}>
        <div className={styles.head}>Add Task
          <span className={styles.close} onClick={handleClose}>&times;</span>
        </div>
        <div className={styles.content}>
          <label htmlFor="taskID">Task ID</label>
          <input
            id="taskID"
            name="mainID"
            placeholder="Task ID"
            value={formData.mainID}
            onChange={handleChange}
            disabled={formData.autoIDChecked}
            className={styles.mainID}
          />
          <input
            type="checkbox"
            id={styles.autoIDCheckbox}
            name="autoIDChecked"
            checked={formData.autoIDChecked}
            onChange={handleChange}
          />
          <label htmlFor="autoIDCheckbox">Auto ID</label>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="default" hidden>Type</option>
            <option value="1">DELIVERY</option>
            <option value="2">Type 2</option>
            <option value="3">Type 3</option>
          </select>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="default" hidden>Priority</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <div className={styles.nodeContainer}>
            <label>Node</label>
            <select
              name="nodeCount"
              value={formData.nodeCount}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            {renderNodeInputs()}
          </div>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.send}>Send</button>
          <button type="button" onClick={handleReset} className={styles.reset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskModal;
