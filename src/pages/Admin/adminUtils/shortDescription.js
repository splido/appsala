function shortDescription(description){
    description = description.split(' ').slice(0, 20).join(' ') + '...';
    return description
}


export default shortDescription