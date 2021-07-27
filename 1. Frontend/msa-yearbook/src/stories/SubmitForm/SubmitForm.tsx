import React, {useState} from 'react';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Button } from '../../components/Button/Button';

import './submit-form.css';

export interface formInput{
    ProjectName: string;
    GithubUrl: string;
    Description: string;
    Year: number;
}

export interface SubmitFormProps {
    nameNotValid?: boolean;
    urlNotValid?: boolean;
    submit?: boolean;
}

export const SubmitForm: React.FC<SubmitFormProps> = ({submit, nameNotValid, urlNotValid}) => {
    const year = (new Date()).getFullYear();
    const [ProjectName, setProjectName] = useState<string>("");
    const handleProjectNameChange = (s: string) => {
        setProjectName(s);
    };
    const [GithubUrl, setGithubUrl] = useState<string>("");
    const handleGithubUrlChange = (s: string) => {
        setGithubUrl(s);
    };
    const [ Description, setDescription] = useState<string>("");
    const handleDescriptionChange = (s: string) => {
        setDescription(s);
    };

    const [HasFocus, setHasFocus] = useState<boolean>(false);

    const isGithubUrl=(value: string)=>{
        const urlRegex = /^(http[s]{0,1}:\/\/){0,1}(github.com\/)([a-zA-Z0-9\-~!@#$%^&*+?:_\/=<>\.]*)?$/i;
        return urlRegex.test(value);
    }

    const handleSubmit = () => {

        if (ProjectName === "") {
            setHasFocus(true);
            nameNotValid = true;
        } else if (!isGithubUrl(GithubUrl)){
            setHasFocus(true);
            urlNotValid = true;
        } else {
            console.log(ProjectName + GithubUrl);
            let formInput: formInput = {
                ProjectName: ProjectName,
                GithubUrl: GithubUrl,
                Description: Description,
                Year: year
            }
            console.log(formInput);
        }

    };
    
    return (
        <div className="form_container">
            <h1 className="form__title">Submit your project here!</h1>
                {
                    submit ?
                    <div className="form__success">
                        Congratulations! Your project has been submitted successfully.
                    </div> : null
                }
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField id="standard-basic" label="Project Name" fullWidth
            error={HasFocus && ProjectName === ""}
            value={ProjectName}
            onChange={e => handleProjectNameChange(e.target.value)}/>
                {
                    nameNotValid ?
                    <div className="form__fail">
                        Invalid name
                    </div> : null
                }
            </Grid>
            <Grid item xs={12} sm={12}>            
            <TextField id="standard-basic" label="Github URL" fullWidth
            error={HasFocus && GithubUrl === ""}
            value={GithubUrl}
            onChange={e => handleGithubUrlChange(e.target.value)}/>
                {
                    urlNotValid ?
                    <div className="form__fail">
                        Invalid URL
                    </div> : null
                }
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
                error={HasFocus && GithubUrl === ""}
                value={Description}
                onChange={e => handleDescriptionChange(e.target.value)}
            />
            </Grid>
            </Grid>
            <div className="form__button">
                <Button backgroundColor="limegreen" label="Submit" onClick={handleSubmit} primary size="medium"/>
            </div>
        </div>
    );
};