import "./mainPage.css";
import welcomeImg from "../../../assets/welcome.png"

function MainPage(): JSX.Element {

    return (
        <div className="mainPage">
			<h2>דף הבית</h2><hr/>
            <img src={welcomeImg} width="70%"/>
        </div>
    );
}

export default MainPage;
