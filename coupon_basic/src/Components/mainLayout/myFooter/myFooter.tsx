import "./myFooter.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button, IconButton } from "@mui/material";
import { LinkedIn } from "@mui/icons-material";

function MyFooter(): JSX.Element {
    return (
        <div className="myFooter">
			This project was created by Sahar Rubinovich © <br/>
            <IconButton href="https://www.linkedin.com/in/sahar-rubinovich-558264209/" target="_blank" children={<LinkedInIcon/>}/>
            <IconButton href="https://github.com/SaharRubinovich" target="_blank" children={<GitHubIcon/>}/>
        </div>
    );
}

export default MyFooter;
