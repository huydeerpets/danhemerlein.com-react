import React, { Component } from "react";

import './SignUpForm.scss'

import ENV from '../../config/Enviornment';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const { MAILCHIMP_URL } = ENV;

export default class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      emailAddress: '',
      zipcode : '',
      text: ''
    }
  }

  handleNameChange = event => {
    this.setState({
      firstName: event.target.value,

    });
  };

  handleEmailChange = event => {
    this.setState({
      emailAddress: event.target.value,
    });
  };

  handleZipChange = event => {
    this.setState({
      zipcode: event.target.value
    });
  };

  render() {
    return (
      <div className="SignUpForm">
        <MailchimpSubscribe
          url={MAILCHIMP_URL}
          render={({ subscribe, status, message }) => (
            <div>
              <form onSubmit={(event) => {
                event.preventDefault();
                subscribe({
                  FNAME: this.state.firstName,
                  EMAIL: this.state.emailAddress,
                  MMERGE5: this.state.zipcode
                })
              }
              }>
                <div className="">
                  <label className="">
                    <input
                      className=""
                      placeholder="First Name"
                      value={this.state.firstName}
                      onChange={this.handleNameChange}
                    />
                  </label>
                  <label className="">
                    <input
                      className=""
                      type="email"
                      placeholder="hello@example.com"
                      value={this.state.emailAddress}
                      onChange={this.handleEmailChange}
                    />
                  </label>
                  <label className="">
                    <input
                      className=""
                      placeholder="Zipcode"
                      value={this.state.zipcode}
                      onChange={this.handleZipChange}
                    />
                  </label>
                  <button className="" type="submit">
                    Submit
                  </button>
                </div>
                <p className="">{this.state.text}</p>
              </form>
              {status === 'sending' ? (
                this.setState({
                  text: 'Loading...'
                })
              ) : null}
              {status === 'success' ? (
                this.setState({
                  text: 'Thank you!'
                })
              ) : null}
              {status === 'error' ? (
                this.setState({
                  text: 'Please try again.'
                })
              ) : null}
            </div>
          )}
        />
      </div>
    )
  }
}
