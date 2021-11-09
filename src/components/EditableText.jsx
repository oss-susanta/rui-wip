import React, { useEffect, useRef } from "react";
import useSwitch from "@react-hook/switch";
import { Input, Modal } from "antd";

function FocusableInput({ value, onChange, onCommit }) {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyEvent = (event) => {
    event.stopPropagation();
  };
  return (
    <Input
      ref={inputRef}
      defaultValue={value}
      onKeyPress={handleKeyEvent}
      onKeyDown={handleKeyEvent}
      onKeyUp={handleKeyEvent}
      onPressEnter={onCommit}
      onChange={onChange}
    />
  );
}

export default function EditableText({ title, value, onChange, ...props }) {
  const ref = useRef(value);
  const [visible, toggle] = useSwitch(false);

  const handleChange = (event) => (ref.current = event.target.value);
  const handleCommit = () => {
    toggle.off();
    onChange(ref.current);
  };

  return (
    <>
      <div onDoubleClick={toggle.on} {...props}>
        {value}
      </div>
      {visible && (
        <Modal visible title={title} onOk={handleCommit} onCancel={toggle.off}>
          <FocusableInput
            value={value}
            onChange={handleChange}
            onCommit={handleCommit}
          />
        </Modal>
      )}
    </>
  );
}
