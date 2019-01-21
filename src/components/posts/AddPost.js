import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { addPost } from '../../store/actions/postActions';
import { Redirect } from 'react-router-dom';

class AddPost extends Component {
  state = {
    title: '',
    quote: '',
    content: ''
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      quote: this.props.quote
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addPost(this.state);
    this.setState({
      title: '',
      quote: '',
      content: '' });

  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />;
    return <div>
        <form className='white' onSubmit={this.handleSubmit}>
          <p className='grey-text text-darken-3'>
            Ajouter un commentaire
          </p>
          <Input type='text' id='title' onChange={this.handleChange} label='Titre' value={this.state.title} />
        <Input type='text' className="hide" onChange={this.handleChange} label='Citation' value={this.state.quote} />
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
