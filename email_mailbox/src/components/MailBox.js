import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MailboxHeader from '../containers/MailboxHeader';
import Threads from '../containers/Threads';
import './mailbox.css';

const ALL_MAIL = -1;

class MailBox extends Component {
  constructor() {
    super();
    this.state = {
      searchParams: {
        text: '',
        mailbox: ALL_MAIL,
        from: '',
        to: '',
        subject: '',
        hasAttachments: false
      }
    };
  }

  render() {
    console.log(this.state.searchParams);
    return (<div className="mailbox-container">
      <MailboxHeader setSearchParams={this.setSearchParams}/>
      <Threads mailbox={this.props.match.params.mailbox} searchParams={this.state.searchParams} />
    </div>)
  }

  setSearchParams = (params) => {
    this.setState({
      searchParams: {
        ...params
      }
    });
  };
}

MailBox.propTypes = {
  match: PropTypes.object
};

export default MailBox;
