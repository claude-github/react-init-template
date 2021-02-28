import React, { PureComponent } from "react";
import Dialog from "../../components/dialog";

class DialogPage extends PureComponent {
  state = {
    visible: false
  };
  toggleVisible = visible => {
    this.setState({
      visible
    });
  };
  render() {
    const { visible } = this.state;
    return (
      <div>
        <button onClick={() => this.toggleVisible(true)}>打开弹窗</button>
        <Dialog
          title="Title"
          visible={visible}
          onCancel={() => this.toggleVisible(false)}
          onOK={() => this.toggleVisible(false)}
          content={
            <div>
              <p>content..</p>
              <p>content..</p>
              <p>content..</p>
              <p>content..</p>
            </div>
          }
        />
      </div>
    );
  }
}

export default DialogPage;
