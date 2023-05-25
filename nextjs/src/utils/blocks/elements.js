export const getTextAlign = (align = "left") => {
    const directions = {
        'left': "text-left",
        'right': "text-right",
        'center': "text-center"
    }

    return directions[align] || 'text-left';
}

export const getFontSize = (level = 1) => {
    const sizes = {
        1: "text-5xl",
        2: "text-5xl",
        3: "text-4xl",
        4: "text-3l",
        5: "text-2g",
        6: "text-xl",
    }

    return sizes[level] || sizes[1];
}