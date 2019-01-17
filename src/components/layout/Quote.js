import React, { Component } from 'react';
class Quote extends Component {
    renderQuote = () => {
        if (!this.props.quote) {
            return <span className="">Selectionnez votre passage à commenter</span>;

        } else {
            return <span className=""><span className="">Sélection: </span><span className="">&ldquo;</span><span className="quote-text">{this.props.quote}</span><span className="quote-icons">&ldquo;</span></span>

        }
    }
    render() {
        return (
            <div className="row nav-quote blue-grey darken-3 z-depth-2">
                <div className="">
                    <div className="col s12 ">
                        <span className="valign-wrapper white-text ">
                            {this.renderQuote()}
                            {this.props.quote ? <i onClick={this.reiceiveCallback.bind(this)} className="material-icons quote-close-icons right">cancel</i> : null}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    reiceiveCallback(e) {
        this.props.callback(e)
    }
};

export default Quote;