export const upDateObjectInArray = (items, itemId, objPropname,newObjProps) => {
    return  items.map(u => {
        if (u[objPropname] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}