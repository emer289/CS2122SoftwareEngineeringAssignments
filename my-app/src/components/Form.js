import React from 'react';
import './Form.css'
const Form = (props) => {
    return (
        <div className="form">
        <form onSubmit={(event) => props.handleUserFormSubmit(event)}>
            <label>
                <input name="username"
                       type="text"
                       placeholder="GitHub username"
                       required
                       value={props.formData.username}
                       onChange={props.handleFormChange}
                />
            </label>
            <div>
                <input
                    type="submit"
                    value="Submit"
                />
            </div>
        </form>
        </div>
    )};
export default Form;