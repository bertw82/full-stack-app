import React from 'react';

const Form = props => {
  const {
    cancel,
    // errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      {/* <ErrorsDisplay error={errors} /> */}
      <form onSubmit={handleSubmit}>
        {elements()}
        <button className="button" type="submit">{submitButtonText}</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );

} 

// function ErrorsDisplay({ errors }) {
//   let errorsDisplay = null;

//   if (errors.length) {
//     errorsDisplay = (
//       <>
//         <div class="validation--errors">
//           <h3>Validation Errors</h3>
//           <ul>
//               {/* <li>Please provide a value for "Title"</li>
//               <li>Please provide a value for "Description"</li> */}
//               { errors.map((error, i) => <li key={i}>{error}</li>)}
//           </ul>
//         </div>
//       </>
//     );
//   }

//   return errorsDisplay;
// }

export default Form;