import "./page404.css";
import logoGif from "../../../assets/notFoundGif.gif";

function Page404(): JSX.Element {
    return (
        <div className="page404">
			<img src={logoGif} alt="not found" width={"100%"}/>
        </div>
    );
}

export default Page404;
