const initState = {};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      console.log('add post', action.post);
      return state;
    case 'ADD_POST_ERROR':
      console.log('add post error', action.err);
      return state;
    case 'DELETE_POST':
      console.log('Delete post', action.post, state);
      return state
    case 'DELETE_POST_ERROR':
      console.log('Delete post error', action.err, state);
      return state;
  
    default:
      return state;
  }
};

export default postReducer;
