// Assign menu parents with sub-levels properly
export const assignMenuParents = (menuItems: Array<any>) => {
    menuItems?.sort((a: any, b: any) => a.order - b.order)

    let menu: Array<any> = [...menuItems]

    const AssignParents = (items: any) => {
        items.forEach((item: any, index: number) => {
            if(!item?.children) {
                item.children = []
            }

            if(!item.depth) {
                item.depth = 0;
            }
                        
            // Assign children
            if (item?.parentId) {
                const findParent = menu.find((parent: any) => parent?.id === item?.parentId)

                if (findParent) {
                   findParent.children?.push(item)
                   item.isAssigned = true;

                    // Traverse up and cound how many parents are there
                    const deph = (item: any, previousItemId?: any) => {
                        if (previousItemId) {
                            const nextParent = menu.find((findParent: any) => findParent?.id === previousItemId)
                            
                            if(!nextParent)
                                return;

                            item.depth++;
                            deph(item, nextParent?.parentId)
                        }
                    }

                    deph(item, item?.parentId)
                }
            }
        })

        // Remove parents from menu
        menu = menu.filter((menuItem: any) => !menuItem.hasOwnProperty('isAssigned'))
     }

    AssignParents(menu)

    menu = menu.filter((menuItem: any) => {
        console.log(menuItem.isAssigned);
        return menuItem?.isAssigned !== false
    })

    return menu
}

