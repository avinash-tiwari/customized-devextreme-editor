import React, { Component } from "react";
import Form, { Item } from "devextreme-react/form";
import Api from "Api/Api";
import Utils from "Utils";

export default class ImageEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageForm: {
        width: null,
        height: null,
        image: null,
      },
    };
    this.attachImage = (e) => {
      let image = document.querySelector("#postContentImage").files[0];
      let images = Utils.objToFormData({ image });
      let cursorPosition = this.props.editorInstance.getLength() - 1;
      Api.uploadPostInlineImage(images).then((response) => {
        if (response.status === 200) {
          this.props.editorInstance.insertEmbed(
            cursorPosition,
            "extendedImage",
            {
              src: response.data[0],
              height: `${this.state.imageForm.width}px`,
              width: `${this.state.imageForm.height}px`,
            }
          );
          this.setState({
            imageForm: { width: null, height: null, image: null },
          });
          this.props.editorInstance.focus();
          this.props.hidePopup();
        }
      });
    };
  }
  render() {
    return (
      <div>
        <div>
          <Form formData={this.state.imageForm}>
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
              dataField="image"
              render={() => {
                return (
                  <input type="file" id="postContentImage" accept="image/*" />
                );
              }}
            />
            <Item
              editorType="dxButton"
              editorOptions={{
                text: "Save",
                onClick: this.attachImage,
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
