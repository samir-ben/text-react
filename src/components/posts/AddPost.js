import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../store/actions/postActions';
import { Redirect } from 'react-router-dom';

class AddPost extends Component {
  state = {
    title: '',
    content: ''
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state);
    this.props.addPost(this.state);
    this.props.history.push('/');
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />;
    return (
      <div className='container'>
        <form className='white' onSubmit={this.handleSubmit}>
          <h5 className='grey-text text-darken-3'>Ajouter un commentaire</h5>
          <div className='input-field'>
            <input type='text' id='title' onChange={this.handleChange} />
            <label htmlFor='title'>Titre</label>
          </div>
          <div className='input-field'>
            <textarea
              id='content'
              className='materialize-textarea'
              onChange={this.handleChange}
            />
            <label htmlFor='content'>Contenu</label>
          </div>
          <div className='input-field'>
            <button className='btn pink lighten-1'>Ajouter</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(addPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);
