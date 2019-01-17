const initState = {};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      console.log('add post', action.post);
      return state;
    case 'ADD_POST_ERROR':
      console.log('add post error', action.err);
      return state;
    default:
      return state;
  }
};

export default postReducer;
