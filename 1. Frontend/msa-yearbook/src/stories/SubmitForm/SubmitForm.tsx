import React, { useState } from 'react';
import { TextField, Typography, Grid, Container } from '@material-ui/core';
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from '../Button/Button';
import { ADD_PROJECT} from '../../api/mutations';
import { AddProject } from '../../api/__generated__/AddProject';
import { useMutation } from '@apollo/client';

import './submit-form.css';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      "& .MuiFormHelperText-root": {
        color: "white",
      }
    }
  }));
export interface SubmitFormProps {

}

export const SubmitForm: React.FC<SubmitFormProps> = () => {
    const classes = useStyles();
    const year = "YEAR_2021";
    const [projectName, setProjectName] = useState<string>("");
    const [githubUrl, setGithubUrl] = useState<string>("");
    const [description, setDescription] = useState("");
    const [submit, setSubmit] = useState(false);

    const [hasFocus, setHasFocus] = useState(false);

    const isGithubUrl = (value: string) => {
        const urlRegex = /^(http[s]{0,1}:\/\/){0,1}(github.com\/)([a-zA-Z0-9\-~!@#$%^&*+?:_\/=<>\.]*)?$/i;
        return urlRegex.test(value);
    }

    const [addProject] = useMutation<AddProject>(ADD_PROJECT)

    const handleSubmit = async() => {
        if (projectName !== "" && isGithubUrl(githubUrl)) {
            console.log(projectName + githubUrl);

            try {
                await addProject({variables: {
                    name: projectName,
                    description: description,
                    link: githubUrl,
                    year: year,
                }})
                setSubmit(true)
            } catch(e) {
                console.log(e)
            }
        }else{
            setHasFocus(true);
        }

    };

    return (
        <Container className="form_container">
            <Typography variant="h4" >Submit your project here!</Typography>
            {
                submit ?
                    <Grid>
                        Congratulations! Your project has been submitted successfully.
                    </Grid> : null
            }
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <TextField id="standard-basic" label="Project Name" fullWidth
                        error={hasFocus && projectName === ""}
                        value={projectName}
                        className={hasFocus && projectName === ""?"":classes.root}
                        helperText="Invalid Project Name"
                        onChange={e => setProjectName(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="standard-basic" label="Github URL" fullWidth
                        error={hasFocus && (githubUrl === "" || !isGithubUrl(githubUrl))}
                        value={githubUrl}
                        onChange={e => setGithubUrl(e.target.value)}
                        className={hasFocus && (githubUrl === "" || !isGithubUrl(githubUrl))?"":classes.root}
                        helperText="Invalid URL" />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={5}
                        placeholder="Introduce your project..."
                        variant="outlined"
                        fullWidth
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Grid>
                
            </Grid>
            <Button className="form_button" backgroundColor="limegreen" label="Submit" onClick={handleSubmit} primary size="medium" />
        </Container>
    );
};