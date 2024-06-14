import React from 'react';
import { useRobotForm } from '../hooks/useRobotForm';
import styles from '../styles/AddModal.module.css';

function AddRobotModal({ handleClose }) {
  const {
    formData, errorMessage, 
    handleChange, handleSubmit, handleReset
  } = useRobotForm(handleClose);

  return (
    <div className={`${styles.addModalContainer} ${styles.robot}`}>
      <form onSubmit={handleSubmit}>
        <div className={styles.head}>Add Robot
          <span className={styles.close} onClick={handleClose}>&times;</span>
        </div>
        <div className={styles.content}> 
          <label htmlFor="robotID">Robot ID</label>
          <input 
            id="robotID"
            name="mainID" 
            className={styles.mainId} 
            placeholder="Robot ID" 
            value={formData.mainID} 
            onChange={handleChange} 
          /> <br/>
          <label htmlFor="actionSelect">Action</label>
          <select 
            id="actionSelect"
            name="action" 
            className={styles.select} 
            value={formData.action} 
            onChange={handleChange}
          >
            <option value="" hidden>Action</option>
            <option value="IDLE">IDLE</option>
            <option value="MOVE">MOVE</option>
            <option value="CHARGE">CHARGE</option>
            <option value="WAIT">WAIT</option>
            <option value="PAUSE">PAUSE</option>
            <option value="RESUME">RESUME</option>
          </select>
          <label htmlFor="goalNode">Goal Node</label>
          <input 
            id="goalNode"
            name="goalNodeID"
            className={styles.goalNodeId} 
            placeholder="Goal Node" 
            value={formData.goalNodeID} 
            onChange={handleChange} 
            disabled={formData.action !== "MOVE"} 
          />
          {errorMessage && <div className={`${styles.error} ${styles.robotError}`}>{errorMessage}</div>}
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.send}>Send</button>
          <button type="button" className={styles.reset} onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default AddRobotModal;
