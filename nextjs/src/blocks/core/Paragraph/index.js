
import React from 'react'
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';
import { parseFontSize } from '@/utils/blocks/elements';

export const Paragraph = ({block}) => {
  const { content, align, textColor, style, fontSize } = block?.attributes;
  
  const classes = classNames('paragraph', {
    [`text-${align}`]: align,
    [`text-${textColor}`]: textColor,
    [`${parseFontSize(fontSize)}`]: fontSize,
  })

  const styles = !style ? {} : {
      color: style?.color?.text || false,
  }

  console.log(styles)
  console.log(block) 

  return (
    <p className={classes} style={styles}>{ReactHtmlParser(content)}</p>
  )
}
