import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);

    // Need to do something to log user in
    this.props.signinUser({email, password}); //signinUser ocekuje email i password
  }
renderAlert() {
  if(this.props.errorMessage) {
    return(
      <div className='alert alert-danger'>
          <strong>Logovanje nije uspelo</strong> 
          {this.props.errorMessage}
      </div>
    );
  }
}


  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }; // izbacuje gresku za lose logovanje, (molim vas probajte opet)
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
},mapStateToProps, actions)(Signin);
