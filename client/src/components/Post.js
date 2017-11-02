import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import EditForm from './EditForm'

const PostContainer = styled.div`
`

class Post extends Component {
    state = {
        post: {
            title: '',
            description: ''
        },
        editPostDetails: false,
        redirectToPost: false
    }

    async componentWillMount() {
        try {
            const { id, city_id } = this.props.match.params
            const response = await axios.get(`/api/cities/${city_id}/posts/${id}`)
            await this.setState({
                post: response.data
            })
        } catch (error) {
            console.log(error)
            await this.setState({ error: error.message })
        }
    }

    showPost = async () => {
        try {
            const { id, city_id } = this.props.match.params
            const response = await axios.get(`/api/cities/${city_id}/posts/${id}`)
            await this.setState({
                post: response.data
            })
        } catch (error) {
            console.log(error)
            await this.setState({ error: error.message })
        }
    }

    toggleEditPost = () => {
        this.setState({ editPostDetails: !this.state.editPostDetails })
    }

    render() {

        
        if (!this.state.editPostDetails) {
            return (
                <PostContainer>
                    <strong>{this.state.post.title}</strong>
                    <p>{this.state.post.description}</p>
                    <p>{this.state.post.created_at}</p>
                    <button onClick={this.toggleEditPost}>Edit</button>
                    <Link to={`/cities/${this.state.post.city_id}`}><button>Back</button></Link>
                </PostContainer>
            )
        }
        else {
            return (
                <EditForm toggleEditPost={this.toggleEditPost} showPost={this.showPost} post={this.state.post} />
            )
        }
    }
}


export default Post;