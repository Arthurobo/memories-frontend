import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { Button, Paper, Typography, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from '../../styles'
import { useSelector } from 'react-redux';


const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        creator: '', title: '',
        message: '', tags: '',
        selectedFile: '',
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        // console.log("Submited")
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }

    return (
        <Paper className={classes.paper}>
            {/* <form autoComplete='off' noValidate classNam={classes.form} onSubmit={handleSubmit}> */}
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a Memory</Typography>
                {/* <TextField name="creator" variant="outlined" label="creator" fullWidth value={postData.creator}oncChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </div>
            </form>
        </Paper>
    );
};

export default Form;