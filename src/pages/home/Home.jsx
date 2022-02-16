import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import {app} from "../../tools/Firebase";
import { useEffect, useState } from "react";
import moment from "moment";
import Loading from "../../components/loading/Loading";
import "./home.css";
import { FaDirections } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillPeopleFill, BsFillChatTextFill} from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import AddToMobile from "../../components/addToMobile/AddToMobile";
const Home = () => {
    const auth = getAuth(app);
    const [user] = useAuthState(auth);

    const [today, setToday] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));

    const [loading, setLoading] = useState(false);
    const [linkStyle, setLinkStyle] = useState();

    const [hasAdded, setHasAdded] = useState(false);

    useEffect(() => {
        setLoading(true);

        setToday(moment().format("dddd") + " " + moment().format("MMM Do"));
        setHasAdded(localStorage.getItem("hasAdded") === "true");

        if (window.innerWidth > 786) {
            setLinkStyle("wrap");
        } else {
            setLinkStyle("");
        }

        setLoading(false);
    }, []);

    return (
        <>
            {!loading ? (
                    <div className='flexbox row wrap full-size'>
                        <div className='welcome-container'>
                            <h1>Welcome, {user.displayName.split(" ")[0]}.</h1>
                            <h3>Have a great {today.split(" ")[0]}</h3>
                        </div>
                        <div className='right-triangle'></div>
                        <div className='action-container'>
                            <h3>Actions</h3>
                            <div className={"links flexbox column center " + linkStyle}>
                                <Link className='flexbox homeLinks' to={{ pathname: "/map" }}>
                                    <FaDirections style={{ color: "dodgerblue" }} size={30} />
                                    <h3>Find Your Classes</h3>
                                </Link>
                                <Link className='flexbox homeLinks' to={{ pathname: "/resources" }}>
                                    <BsFillPeopleFill style={{ color: "#D7BE69" }} size={30} />
                                    <h3>Resources to Help</h3>
                                </Link>
                                <Link className='flexbox homeLinks' to={{ pathname: "/settings" }}>
                                    <FiSettings style={{ color: "grey" }} size={30} />
                                    <h3>Update Settings</h3>
                                </Link>
                                {localStorage.getItem("freshmen") === "true" && (
                                    <a className = 'flexbox homeLinks' href = 'https://mvhs-orientation-test.netlify.app/' target = '_blank' rel="noreferrer">
                                        <BsFillChatTextFill style={{ color: "green" }} size={30} />
                                        <h3>Chat With Your Pod</h3>
                                    </a>
                                )}
                            </div>
                        </div>
                        {!hasAdded && window.innerWidth < 786 &&
                            <div style = {{width: '100%'}} className="flexbox column center">
                                <AddToMobile setFunction = {setHasAdded} />
                            </div>
                        }
                    </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Home;
