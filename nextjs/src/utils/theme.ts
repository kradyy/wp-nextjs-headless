// Assign menu parents with sub-levels properly
export const assignMenuParents = (menuItems) => {
    menuItems?.sort((a: any, b: any) => a.order - b.order)

    let menu: Array<any> = [...menuItems]

    const AssignParents = (items: any) => {
        items.forEach((item: any, index: number) => {
            if(!item?.children) {
                item.children = []
            }

            if (item?.parentId) {
                const findParent = menu.find((parent: any) => parent?.id === item?.parentId)

                if (findParent) {
                   findParent.children?.push(item)
                   menu = menu.filter((menuItem: any) => menuItem?.id !== item?.id)
                }
            }
        })
     }

    AssignParents(menu)

    return menu
}

