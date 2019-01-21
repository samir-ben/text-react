export const addPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .add({ collection: 'posts' },
      {
        ...post,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: 'ADD_POST', post });
      })
      .catch(err => {
        dispatch({ type: 'ADD_POST_ERROR', err });
      });
  };
};

export const deleteNote = (post) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore.delete({ collection: 'posts', doc: post })
    .then(() => {
      dispatch({ type: 'DELETE_POST', post });
    }).catch((err) => {
      dispatch({ type: 'DELETE_POST_ERROR', err });
    });
  }
};


