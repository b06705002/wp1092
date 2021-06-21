const makeName = (name, to) => {
    return [name, to].sort().join('-');
}

export { makeName };