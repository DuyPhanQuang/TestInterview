const pushElementToArray = ({arr, item}) => {
    arr[arr.length++] = item;
    return arr;
};

export {
    pushElementToArray
};
