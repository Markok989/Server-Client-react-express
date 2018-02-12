import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';



class Signup extends Component {

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser({ formProps });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oooops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email: </label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>

        <fieldset className="form-group">
          <label>Password: </label>
          <input className="form-control" {...password} type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>

        <fieldset className="form-group">
          <label>Confirm Password: </label>
          <input className="form-control" {...passwordConfirm} type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>

        {this.renderAlert()}

        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Molim vas unesite vas email';
  }
  if (!formProps.password) {
    errors.password = 'Molim vas unesite vasu loziknu';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Molim vas unesite vasu potvrdu za lozonku';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  //console.log(formProps);
  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}


export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate //validate: validate
}, mapStateToProps, actions)(Signup);


/*
{password.touched && password.error && <div className="error">{password.error}</div>}
ako je korisnik selektovao polje i uneo podatke, prikazi gresku, ako postoji greska
*/
