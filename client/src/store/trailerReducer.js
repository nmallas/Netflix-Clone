const ADDTRAILER = "trailer/add";
const REMOVETRAILER = "trailer/remove";

export default function trailer(state={path: "", category: ""}, action) {
    switch(action.type) {
        case ADDTRAILER:
            return {path: action.trailer, category: action.category}
        case REMOVETRAILER:
            return "";
        default:
            return state
    }
}

export const addTrailer = (trailer, category) => {
    console.log(2);
    return {
        type: ADDTRAILER,
        trailer,
        category
    }
}

export const removeTrailer = () => ({
    type: REMOVETRAILER
})
