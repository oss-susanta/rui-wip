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

export function RenameModal({ title, value, onOk, onCancel }) {
  const ref = useRef(value);
  const handleChange = (event) => (ref.current = event.target.value);
  const handleOk = () => onOk(ref.current);
  return (
    <Modal visible title={title} onOk={handleOk} onCancel={onCancel}>
      <FocusableInput
        value={value}
        onChange={handleChange}
        onCommit={handleOk}
      />
    </Modal>
  );
}

export function RenameText({ title, value, onChange, ...props }) {
  const [visible, toggle] = useSwitch(false);

  return (
    <>
      <div onDoubleClick={toggle.on} {...props}>
        {value}
      </div>
      {visible && (
        <RenameModal
          title={title}
          value={value}
          onOk={(next) => {
            onChange(next);
            toggle.off();
          }}
          onCancel={toggle.off}
        />
      )}
    </>
  );
}
