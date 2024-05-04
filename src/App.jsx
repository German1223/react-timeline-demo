// import { ConnectWidget } from "reactjs-storage-timeline";
import "./App.css";
import ConnectWidget from "./components/ConnectWidget/ConnectWidget";

function App() {
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
            {/* <ConnectWidget/> */}
            <ConnectWidget className={'main-widget'}/>
        </div>
    );
}

export default App;
