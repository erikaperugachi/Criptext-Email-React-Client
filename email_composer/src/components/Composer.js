import React from 'react';
import PropTypes from 'prop-types';
import FromWrapper from './FromWrapper';
import RecipientWrapper from './RecipientWrapper';
import SubjectWrapper from './SubjectWrapper';
import BodyWrapper from './BodyWrapper';
import NonCriptextPopupWrapper from './NonCriptextPopupWrapper';
import { Status } from './Control';
import { mySettings } from '../utils/electronInterface';
import PopupHOC from './PopupHOC';
import NotVerifiedRecoveryEmailPopup from '../components/NotVerifiedRecoveryEmailPopup';
import RecoveryEmailSentPopup from '../components/RecoveryEmailSentPopup';
import './composer.scss';

const NotverifiedrecoveryemailPopup = PopupHOC(NotVerifiedRecoveryEmailPopup);
const Recoveryemailsentpopup = PopupHOC(RecoveryEmailSentPopup);

const Composer = props => (
  <div className="wrapper" data-theme={mySettings.theme || 'light'}>
    <FromWrapper
      accounts={props.accounts}
      accountSelected={props.accountSelected}
      allowChangeFrom={props.allowChangeFrom}
      getAccount={props.getAccount}
    />
    <RecipientWrapper
      disableSendButton={props.disableSendButtonOnInvalidEmail}
      toEmails={props.toEmails}
      ccEmails={props.ccEmails}
      bccEmails={props.bccEmails}
      getToEmails={props.getToEmails}
      getCcEmails={props.getCcEmails}
      getBccEmails={props.getBccEmails}
      isCollapsedMoreRecipient={props.isCollapsedMoreRecipient}
      isFocusRecipientInput={props.isFocusRecipientInput}
      onToggleRecipient={props.onToggleRecipient}
      tagBlured={props.tagBlured}
      tagChanged={props.tagChanged}
      tagUpdated={props.tagUpdated}
    />
    <SubjectWrapper
      getText={props.getTextSubject}
      isFocusSubjectInput={props.isFocusSubjectInput}
      onFocusInput={props.onToggleRecipient}
      text={props.textSubject}
    />
    <BodyWrapper
      files={props.files}
      getHtmlBody={props.getHtmlBody}
      htmlBody={props.htmlBody}
      isDragActive={props.isDragActive}
      isFocusEditorInput={props.isFocusEditorInput}
      onClearFile={props.onClearFile}
      onClickDiscardDraft={props.onClickDiscardDraft}
      onClickSendMessage={props.onClickSendMessage}
      onDragLeave={props.onDragLeave}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
      onFocusTextEditor={props.onToggleRecipient}
      onPauseUploadFile={props.handlePauseUploadFile}
      onResumeUploadFile={props.handleResumeUploadFile}
      status={props.status}
    />
    {props.displayNonCriptextPopup && (
      <NonCriptextPopupWrapper
        onClickSendMessage={props.onClickSendMessage}
        onClickCancelSendMessage={props.onClickCancelSendMessage}
        onSetNonCriptextRecipientsPassword={
          props.onSetNonCriptextRecipientsPassword
        }
      />
    )}
    {props.displayNotVerifiedRecoveryEmailPopup && (
      <NotverifiedrecoveryemailPopup
        popupPosition={{ left: '50%', top: '50%' }}
        onConfirmVerifyRecoveryEmail={props.handleConfirmVerifyRecoveryEmail}
        onTogglePopup={props.onTogglePopupNotVerifiedRecoveryEmail}
        theme={'dark'}
      />
    )}
    {props.displayRecoveryEmailSentPopup && (
      <Recoveryemailsentpopup
        popupPosition={{ left: '50%', top: '50%' }}
        onTogglePopup={props.onToggleRecoveryEmailSentPopup}
        theme={'dark'}
      />
    )}
    {(props.status === Status.WAITING ||
      props.status === Status.INITIALIZING ||
      props.isLinkingDevices) && <div className="composer-disable" />}
  </div>
);

Composer.propTypes = {
  accounts: PropTypes.array,
  accountSelected: PropTypes.object,
  allowChangeFrom: PropTypes.bool,
  addFiletoken: PropTypes.func,
  bccEmails: PropTypes.array,
  ccEmails: PropTypes.array,
  disableSendButtonOnInvalidEmail: PropTypes.func,
  displayNonCriptextPopup: PropTypes.bool,
  displayNotVerifiedRecoveryEmailPopup: PropTypes.bool,
  displayRecoveryEmailSentPopup: PropTypes.bool,
  files: PropTypes.array,
  getAccount: PropTypes.func,
  getBccEmails: PropTypes.func,
  getCcEmails: PropTypes.func,
  getHtmlBody: PropTypes.func,
  getTextSubject: PropTypes.func,
  getToEmails: PropTypes.func,
  handleConfirmVerifyRecoveryEmail: PropTypes.func,
  handlePauseUploadFile: PropTypes.func,
  handleResumeUploadFile: PropTypes.func,
  htmlBody: PropTypes.string,
  isCollapsedMoreRecipient: PropTypes.bool,
  isDragActive: PropTypes.bool,
  isFocusEditorInput: PropTypes.bool,
  isFocusRecipientInput: PropTypes.bool,
  isFocusSubjectInput: PropTypes.bool,
  isLinkingDevices: PropTypes.bool,
  onClickCancelSendMessage: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
  onClearFile: PropTypes.func,
  onClickDiscardDraft: PropTypes.func,
  onClickSendMessage: PropTypes.func,
  onDragOver: PropTypes.func,
  onSetNonCriptextRecipientsPassword: PropTypes.func,
  onTogglePopupNotVerifiedRecoveryEmail: PropTypes.func,
  onToggleRecipient: PropTypes.func,
  onToggleRecoveryEmailSentPopup: PropTypes.func,
  status: PropTypes.number,
  tagBlured: PropTypes.func,
  tagChanged: PropTypes.func,
  textSubject: PropTypes.string,
  tagUpdated: PropTypes.func,
  toEmails: PropTypes.array
};

export default Composer;
