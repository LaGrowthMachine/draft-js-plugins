import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  entityKey: PropTypes.string,
  getEditorState: PropTypes.func.isRequired,
};

const triggerUpdate = function(entityKey) {
  const clickIt = document.getElementById('clickIt');
  if (clickIt) {
    clickIt.setAttribute('entityKey', entityKey);
    document.getElementById('clickIt').click();
  }
};

const Link = ({ children, className, entityKey, getEditorState, target }) => {
  const entity = getEditorState()
    .getCurrentContent()
    .getEntity(entityKey);
  const entityData = entity ? entity.get('data') : undefined;
  const href = (entityData && entityData.url) || undefined;
  const track = (entityData && entityData.track) || false; //AJOUTé
  return (
    <a
      className={`${String(className)} tracked_${String(track)}`}
      title={href}
      href={href}
      target={target}
      rel="noopener noreferrer"
      onClick={() => triggerUpdate(entityKey)}
    >
      {children}
    </a>
  );
};

Link.propTypes = propTypes;
export default Link;
