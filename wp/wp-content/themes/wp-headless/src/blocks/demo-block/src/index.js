const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

registerBlockType("custom/demo-block", {
  title: "Demo Block",
  icon: "shield",
  category: "text",
  attributes: {
    content: {
      type: "string",
      default: "Hello World",
    },
  },
  edit: function (props) {
    const {
      attributes: { content },
      setAttributes,
      className,
    } = props;

    function onChangeContent(newContent) {
      setAttributes({ content: newContent });
    }

    return (
      <RichText
        tagName="div"
        className={className}
        onChange={onChangeContent}
        value={content}
      />
    );
  },
  save: function (props) {
    return <RichText.Content tagName="div" value={props.attributes.content} />;
  },
});
