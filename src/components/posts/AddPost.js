import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';
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
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addPost(this.state);
    this.setState({
      title: '',
      content: '' });

  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />;
    return <div className='container'>
        <form className='white' onSubmit={this.handleSubmit}>
          <h5 className='grey-text text-darken-3'>
            Ajouter un commentaire
          </h5>
          <Input type='text' id='title' onChange={this.handleChange} label='Titre' value={this.state.title} />
        <Input type='textarea' id='content' className='materialize-textarea' onChange={this.handleChange} label='content' value={this.state.content} />
          <Button className='btn pink lighten-1' modal='close' onClick={this.reiceiveCallback.bind(this)}>
            Ajouter
          </Button>
        </form>
      </div>;
  }
  reiceiveCallback(e) {
    this.props.callback(e)
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
