import { TextField } from '@material-ui/core';
import React, {useState} from 'react';
import { Button } from '../Button/Button';


import './submit-form.css';

export interface SubmitFormProps {
    nameNotValid?: boolean;
    urlNotValid?: boolean;
    submit?: boolean;
}

export const SubmitForm: React.FC<SubmitFormProps> = ({submit, nameNotValid, urlNotValid}) => {

    const urlRegex = /^(http[s]{0,1}:\/\/){0,1}(github.com\/)([a-zA-Z0-9\-~!@#$%^&*+?:_\/=<>\.]*)?$/i;

    const [ProjectName, setProjectName] = useState<string>("");
    const handleProjectNameChange = (s: string) => {
        setProjectName(s);
    };

    const [GithubUrl, setGithubUrl] = useState<string>("");
    const handleGithubUrlChange = (s: string) => {
        setGithubUrl(s);
    };

    const [HasFocus, setHasFocus] = useState<boolean>(false);

    const handleSubmit = () => {
        console.log(ProjectName + GithubUrl);

        if (ProjectName?.length !== 0 && ProjectName !== null && ProjectName !== "") {

        } else {
            setHasFocus(true);
            nameNotValid = true;
        }

        if (GithubUrl?.length !== 0 && GithubUrl !== null && GithubUrl !== "" && urlRegex.test(GithubUrl)) {

        } else {
            setHasFocus(true);
            urlNotValid = true;
        }
    }
    
    return (
        <div className="form_container">
                <h1 className="form__title">Submit your project here!</h1>
                    {
                        submit ?
                        <div className="form__success">
                            Congratulations! Your project has been submitted successfully.
                        </div> : null
                    }
                <TextField id="standard-basic" label="Project Name" fullWidth
                error={HasFocus && ProjectName === ""}
                value={ProjectName}
                onChange={e => handleProjectNameChange(e.target.value)}/>
                    {
                        nameNotValid ?

                        <div className="form__fail">
                            Invalid name.
                        </div> : null
                    }
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
                <div className="form__button">
                    <Button backgroundColor="limegreen" label="Submit" onClick={handleSubmit} primary size="medium"/>
                </div>
        </div>
    );
};