import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import clsx from 'clsx';
import EditorUtils from 'draft-js-plugins-utils';

import URLUtils from '../../utils/URLUtils';

export default class AddLinkForm extends Component {
  static propTypes = {
    getEditorState: PropTypes.func.isRequired,
    setEditorState: PropTypes.func.isRequired,
    onOverrideContent: PropTypes.func.isRequired,
    /* theme: PropTypes.object.isRequired,*/
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: 'Add link and press enter',
  };

  state = {
    value: '',
    isInvalid: false,
    track: false,
  };

  componentDidMount() {
    this.input.focus();
  }

  onRef = node => {
    this.input = node;
  };

  onChange = ({ target: { value } }) => {
    const nextState = { value };
    if (this.state.isInvalid && URLUtils.isUrl(URLUtils.normalizeUrl(value))) {
      nextState.isInvalid = false;
    }
    this.setState(nextState);
  };

  onClose = () => this.props.onOverrideContent(undefined);

  onKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.submit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.onClose();
    }
  };

  onToogle = e => {
    e.preventDefault();
    this.setState({ track: !this.state.track });
  };

  submit() {
    const { getEditorState, setEditorState } = this.props;
    let { value: url } = this.state;
    if (!URLUtils.isMail(URLUtils.normaliseMail(url))) {
      url = URLUtils.normalizeUrl(url);
      if (!URLUtils.isUrl(url)) {
        this.setState({ isInvalid: true });
        return;
      }
    } else {
      url = URLUtils.normaliseMail(url);
    }
    setEditorState(
      EditorUtils.createLinkAtSelection(getEditorState(), url, this.state.track)
    );
    this.input.blur();
    this.onClose();
  }

  render() {
    const { /*theme,*/ placeholder } = this.props;
    const { value /*, isInvalid*/ } = this.state;
    /*
    const className = isInvalid
      ? clsx(theme.input, theme.inputInvalid)
      : theme.input;
    */
    return (
      <div className="jstoolbar_formwrapper">
        <input
          key="input"
          className="draftJsMentionPlugin__input__1Wxng"
          //onBlur={this.onClose}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder={placeholder}
          ref={this.onRef}
          type="text"
          value={value}
        />
        <div
          key="toogle"
          className={`toogle state_${String(this.state.track)}`}
          onClick={() => this.onToogle}
        >
          <div className="toogle_ball">&nbsp;</div>
        </div>
        <span className="track_link" key="span">
          track link clicks
        </span>
      </div>
    );
  }
}
