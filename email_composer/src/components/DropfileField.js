import React from 'react';
import PropTypes from 'prop-types';
import Editor from './EditorWrapper';
import AttachmentWrapper from './AttachmentWrapper';
import './dropfilefield.css';

const DropfileField = props => (
  <div
    className={
      'dropfilefiled-container ' + (props.isDragActive ? 'dragActive' : '')
    }
    onDragLeave={props.onDragLeave}
    onDragOver={props.onDragOver}
    onDrop={props.onDrop}
  >
    <Editor
      htmlBody={props.htmlBody}
      toolbarHidden={props.isToolbarHidden}
      getHtmlBody={props.getHtmlBody}
      blockRenderMap={props.blockRenderMap}
    />
    <div className="files-container">
      {renderPreview(props.files, props.onClearFile)}
    </div>
    <input
      type="file"
      accept={props.accept}
      multiple={props.multiple}
      onChange={props.onDrop}
    />
    {props.isDragActive ? (
      <div className="dropfilefiled-content">
        <div />
        <span>Drop files here</span>
      </div>
    ) : null}
  </div>
);

const renderPreview = (files, onClearFile) =>
  files.map((file, index) => {
    return (
      <AttachmentWrapper key={index} file={file} onClearFile={onClearFile} />
    );
  });

DropfileField.defaultProps = {
  accept: '',
  multiple: true
};

DropfileField.propTypes = {
  accept: PropTypes.string,
  blockRenderMap: PropTypes.object,
  files: PropTypes.array,
  getHtmlBody: PropTypes.func,
  htmlBody: PropTypes.object,
  isDragActive: PropTypes.bool,
  isToolbarHidden: PropTypes.bool,
  multiple: PropTypes.bool,
  onClearFile: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func
};

export default DropfileField;
