import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {MaxLengthCreator, required} from "../../../utils/validator/Validarors";
import {Textarea} from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo(props => {
    let pro  =[...props.posts]
    let postsElements =
        pro.reverse().map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    let onAddPost = (formaData) => {
        props.addPost(formaData.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>

            <AddPostFormRedux onSubmit={onAddPost}/>

            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const maxLength = MaxLengthCreator(10)
const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name='newPostText' placeholder={'Post message'}
                       validate={[ required, maxLength ]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const AddPostFormRedux = reduxForm({form: 'AddPostFromState'})(AddPostForm);

export default MyPosts;