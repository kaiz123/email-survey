// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => { //meta is automatically passed from Field as a prop when if validate function was used
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};

// <input {...input} style={{ marginBottom: '5px' }} /> - here this is the html input and it receives all event funtions such as onClick, onBlur, etc cause redux form passes this down from field. these are stored via {...input}
//{touched && error} - check if field has been touched, if yes then show error