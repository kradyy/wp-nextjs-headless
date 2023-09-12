const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { PanelBody, ColorPicker } = wp.components;

import settings from "./block.json";

registerBlockType("custom/cta-button121", {
  edit: function (props) {
    const {
      attributes: { buttonText, buttonLink, buttonColor, align },
      setAttributes,
      isSelected,
    } = props;

    return (
      <>
        <BlockControls>
          <AlignmentToolbar
            value={align}
            onChange={(newAlign) => setAttributes({ align: newAlign })}
          />
        </BlockControls>

        <div className="cta-button-block">
          <RichText
            tagName="a"
            value={buttonText}
            formattingControls
            allowedFormats={["core/bold", "core/italic", "core/link"]}
            onChange={(newText) => setAttributes({ buttonText: newText })}
            placeholder="Enter button text..."
            className="cta-button"
          />
          {/* {isSelected && (
              <URLInputButton
                url={buttonLink}
                onChange={(newURL) => setAttributes({ buttonLink: newURL })}
              />
            )} */}
        </div>
      </>
    );
  },
  save: function (props) {
    const {
      attributes: { buttonText, buttonLink, buttonColor },
    } = props;

    return (
      <div className="cta-button-block">
        <RichText.Content
          tagName="a"
          value={buttonText}
          href={buttonLink}
          className="cta-button"
          style={{ backgroundColor: buttonColor }}
        />
      </div>
    );
  },
});
