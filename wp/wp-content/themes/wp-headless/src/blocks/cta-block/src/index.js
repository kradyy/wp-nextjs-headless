import { registerBlockType } from "@wordpress/blocks";
import {
  InspectorControls,
  PanelColorSettings,
  BlockControls,
  RichText,
  URLInput,
  AlignmentToolbar,
} from "@wordpress/block-editor";
import classNames from "classnames";
import {
  ToolbarGroup,
  ToolbarButton,
  ColorPicker,
  Popover,
  PanelBody,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import metadata from "./block.json";

import { useColor } from "../../../gutenberg-hooks";

registerBlockType(metadata.name, {
  title: "CTA Button",
  edit: function (props) {
    const {
      attributes,
      //attributes: { buttonText, buttonLink, buttonBgColor, buttonAlign },
      setAttributes,
      isSelected,
    } = props;

    const { getColorFromHex } = useColor();

    const btnClass = classNames({
      [`has-${attributes?.buttonBgColor}-background-color has-background-color`]:
        attributes?.buttonBgColor,
      [`has-${attributes?.buttonTextColor}-color has-text-color`]:
        attributes?.buttonTextColor,
      "cta-button px-4 py-3 !text-white !no-underline !rounded-sm": true,
    });

    const containerClass = classNames({
      flex: true,
      "justify-start": attributes.buttonAlign === "left",
      "justify-center": attributes.buttonAlign === "center",
      "justify-end": attributes.buttonAlign === "right",
    });

    const [isURLInputVisible, setURLInputVisibility] = useState(false);

    useEffect(() => {
      if (!isSelected) {
        setURLInputVisibility(false);
      }
    }, [isSelected]);

    return (
      <>
        <InspectorControls>
          <PanelBody title="Färger">
            <PanelColorSettings
              title="Textfärg"
              colorValue={attributes.buttonTextColor}
              initialOpen={true}
              colorSettings={[
                {
                  value: attributes.buttonTextColor,
                  onChange: (hex) => {
                    const color = getColorFromHex(hex);
                    setAttributes({ buttonTextColor: color?.slug });
                  },
                  label: attributes.buttonTextColor,
                },
              ]}
            />
            <PanelColorSettings
              title="Backgroundsfärg"
              colorValue={attributes.buttonBgColor}
              initialOpen={true}
              colorSettings={[
                {
                  value: attributes.buttonBgColor,
                  onChange: (hex) => {
                    const color = getColorFromHex(hex);
                    setAttributes({ buttonBgColor: color?.slug });
                  },
                  label: attributes.buttonBgColor,
                },
              ]}
            />
          </PanelBody>
        </InspectorControls>

        <BlockControls>
          <AlignmentToolbar
            value={attributes.buttonAlign}
            onChange={(newAlign) => setAttributes({ buttonAlign: newAlign })}
          />

          <ToolbarGroup>
            <ToolbarButton
              icon="admin-links"
              label="Add Link"
              onClick={() => setURLInputVisibility(!isURLInputVisible)}
            />
          </ToolbarGroup>
        </BlockControls>

        <div className={containerClass}>
          <RichText
            tagName="a"
            value={attributes.buttonText}
            allowedFormats={["core/bold", "core/italic"]}
            onChange={(newText) => setAttributes({ buttonText: newText })}
            placeholder="Enter button text..."
            className={btnClass}
          />

          {isSelected && isURLInputVisible && (
            <Popover position="bottom center">
              <URLInput
                value={attributes.buttonLink}
                onChange={(newLink) => setAttributes({ buttonLink: newLink })}
                onKeyDown={(event) => {
                  console.log(event);
                  if (event.keyCode === 13) {
                    setURLInputVisibility(false);
                  }
                }}
              />
            </Popover>
          )}
        </div>
      </>
    );
  },
  save: () => {},
});
