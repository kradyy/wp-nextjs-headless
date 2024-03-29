
import React from 'react'
import classNames from 'classnames';
import { getTextAlign, parseFontSize } from '@/utils/blocks/elements';
import { parseBlockHTML } from '@/utils/blocks/helpers';

export const Paragraph = ({block}) => {
  const { content, align, textColor, style, fontSize } = block?.attributes;
  
  const classes = classNames('paragraph', {
    [`${getTextAlign(align)}`]: align,
    [`${parseFontSize(fontSize)}`]: fontSize,
    [`text-${textColor}`]: textColor,
  })

  const styles = !style ? {} : {
      color: style?.color?.text || false,
  }

  return (
    <p className={classes} style={styles}>{parseBlockHTML(content)}</p>
  )
}
