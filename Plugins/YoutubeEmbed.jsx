import React, { Component } from "react";
import Form, { Item } from "devextreme-react/form";

export default class YoutubeEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        width: null,
        height: null,
        link: null,
      },
    };
    this.embedYoutubeLink = () => {
      let { width, height, link } = this.state.formData;
      let editorData = this.props.editorInstance
        .element()
        .getElementsByClassName("dx-htmleditor-content")[0];
      var iframe = document.createElement("iframe");
      link = link.split("=").slice(-1)[0];
      iframe.src = `https://www.youtube.com/embed/${link}`;
      iframe.height = height;
      iframe.width = width;
      editorData.appendChild(iframe);
      this.setState({
        imageForm: { width: null, height: null, link: null },
      });
      this.props.editorInstance.focus();
    };
  }
  render() {
    return (
      <div>
        <Form formData={this.state.formData}>
          <Item
            dataField="width"
            editorType="dxNumberBox"
            editorOptions={{
              stylingMode: "underlined",
              placeholder: "in px",
            }}
          />
          <Item
            dataField="height"
            editorType="dxNumberBox"
            editorOptions={{
              stylingMode: "underlined",
              placeholder: "in px",
            }}
          />
          <Item
            dataField="link"
            editorType="dxTextBox"
            editorOptions={{
              stylingMode: "underlined",
              placeholder: "Youtube video URL",
            }}
          />
          <Item
            editorType="dxButton"
            editorOptions={{
              text: "Save",
              onClick: this.embedYoutubeLink,
            }}
          />
        </Form>
      </div>
    );
  }
}
