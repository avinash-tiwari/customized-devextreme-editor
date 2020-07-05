import React, { Component } from "react";
import editorConfig from "components/editorConfig";
import { Popup } from "devextreme-react";
import HtmlEditor from "devextreme-react/html-editor";
import YoutubeEmbed from "components/HtmlEditor/Plugins/YoutubeEmbed";
import ImageEmbed from "components/HtmlEditor/Plugins/ImageEmbed";

export default class HtmlEditor1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.type = null;
    this.togglePopup = (type = null) => {
      this.type = type;
      this.setState({ visible: !this.state.visible });
    };
    this.inlineImageOptions = {
      icon: "image",
      onClick: () => this.togglePopup("image"),
      stylingMode: "text",
      hint: "Upload & add images",
    };
    this.youtubeLinkOptions = {
      icon: "fa fa-youtube",
      onClick: () => this.togglePopup("youtube"),
      stylingMode: "text",
      hint: "Add youtube videos",
    };

    this.formatText = () => {
      let editorData = this.editorInstance
        .element()
        .getElementsByClassName("dx-htmleditor-content")[0].innerHTML;
      this.props.getContent(editorData);
    };

    this.saveEditorInstance = (e) => {
      this.editorInstance = e.component;
    };

    this.renderPopupContent = () => {
      switch (this.type) {
        case "image":
          return (
            <ImageEmbed
              editorInstance={this.editorInstance}
              hidePopup={this.togglePopup}
            />
          );
        case "youtube":
          return <YoutubeEmbed editorInstance={this.editorInstance} />;
        default:
          return null;
      }
    };
  }

  render() {
    return (
      <>
        <HtmlEditor
          onInitialized={this.saveEditorInstance}
          onFocusOut={this.formatText}
          className="testing-editor"
          defaultValue={this.props.value}
          height={this.props.height || "200px"}
          mediaResizing={{
            allowedTargets: ["images"],
            enabled: true,
          }}
          toolbar={{
            items: [
              ...editorConfig,
              "separator",
              {
                widget: "dxButton",
                options: this.inlineImageOptions,
              },
              {
                widget: "dxButton",
                options: this.youtubeLinkOptions,
              },
            ],
          }}
        />
        <Popup
          visible={this.state.visible}
          closeOnOutsideClick={true}
          onHiding={this.togglePopup}
          width={"auto"}
          height={"auto"}
          contentComponent={this.renderPopupContent}
        />
      </>
    );
  }
}
