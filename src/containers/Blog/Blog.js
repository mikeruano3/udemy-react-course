import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import './Blog.css';
//import axios from 'axios'
//import axios from '../../axios'
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent'
//import NewPost from './NewPost/NewPost'
//import FullPost from './FullPost/FullPost'

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost')
})

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
       
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {
                            /*<li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>*/
                            }
                            <li><NavLink 
                                to="/posts/" 
                                activeClassName="active"
                                exact
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>
                                    Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/** 
                 * <Route path="/" exact  render={() => <h1>Home</h1>} /> 
               <Route path="/" exact  render={() => <h1>Home2</h1>} />
                */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    {<Redirect from="/" to="/posts" />}
                    {/*<Route render={() => <h1>Not found</h1>} />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;