import React, { Component } from "react";
import { createPortal } from "react-dom";
import "./index.css";

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    //直接插入dom节点到body下
    if (!this.node) {
      this.node = document.createElement("div");
      document.body.appendChild(this.node);
    }
  }

  componentWillUnmount() {
    this.node && this.node.remove();
  }

  render() {
    const { visible, onCancel, content, title, onOK } = this.props;
    if (!visible) {
      return null;
    }
    return createPortal(
      <div className="dialog-wrapper">
        <div className="dialog-mask" />
        <div className="dialog">
          <div className="dialog-header">
            <h3>{title}</h3>
            <div onClick={() => onCancel(false)}>X</div>
          </div>
          <div className="dialog-content">{content}</div>
          <div className="dialog-footer">
            <button onClick={() => onCancel(false)}>取消</button>
            <button onClick={() => onOK(false)}>确认</button>
          </div>
        </div>
      </div>,
      this.node
    );
  }
}
