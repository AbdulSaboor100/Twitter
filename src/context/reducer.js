export let data = {
    currentUser: {},
    authUser :{},
    allTweets : [],
    myTweets : [],
    reactions : []

}

export function reducer(state, action) {
    switch (action.type) {
        case "CURRENT_USER": {
            return {
                ...state,
                currentUser: action.payload
            }
        }

        case "AUTH_USER_DETAILS": {
            return {
                ...state,
                authUser : action.payload
            }
        }
        case "ALL_TWEETS": {
            let userClone = state.allTweets.slice(0)
            userClone.push(action.payload)
            return {
                ...state,
                allTweets : userClone
            }
        }
        case "MY_TWEETS": {
            let userClone = state.myTweets.slice(0)
            userClone.push(action.payload)
            return {
                ...state,
                myTweets : userClone
            }
        }
        case "REACTIONS": {
            let userClone = state.reactions.slice(0)
            userClone.push(action.payload)
            return {
                ...state,
                reactions : userClone
            }
        }
     
        
        default:
            return state;

    }
}