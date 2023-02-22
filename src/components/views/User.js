import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import {Logout} from "../../helpers/common";


const Player = ({user}) => (
    <div className="player container1">
        <div className="player username">Username: {user.username}</div>
        <div className="player id">ID: {user.id}</div>
        <div className="player registration Date">Member since: {user.registrationDate}</div>
        <div className="player birthdate">Birthdate: {user.birthdate}</div>
        <div className={"player status"}>Status: {user.status}</div>
    </div>
);

const User = () => {
    const history = useHistory();
    const [user, setUser] = useState(null);

    //Gets the user with the path id
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                console.log('/users/' + id)
                const response = await api.get('/users/' + id);
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned user and update the state.
                setUser(response.data);

                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
        //suggested to delete this array
    }, []);

    let content = <Spinner/>;

    const {id} = useParams();

    if (user) {
        content = (

            <div className="game">
                <ul className="game user-info">

                    <Player user={user} key={user.id}/>

                </ul>
                <div className="game button-container">
                    <Button
                        width="50%"
                        onClick={() => history.push("/game")}
                    >
                        Back
                    </Button>
                </div>
                <div className="game button-container">
                    <Button
                        disabled={localStorage.getItem("currentUserId") !== id}
                        width="50%"
                        onClick={() => history.push("/game/users/" + user.id + "/edit")}
                    >
                        Edit
                    </Button>
                </div>
                <div className="game button-container">
                    <Button
                        width="50%"
                        onClick={() => Logout(history)}
                    >
                        Logout
                    </Button>
                </div>

            </div>
        );
    }


    return (
        <BaseContainer className="game container1">
            <h2>User Overview</h2>
            <p className="game paragraph">

            </p>
            {content}
        </BaseContainer>
    );
}

export default User;
