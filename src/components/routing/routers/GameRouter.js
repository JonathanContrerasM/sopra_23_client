import {Redirect, Route} from "react-router-dom";
import Game from "components/views/Game";
import User from "components/views/User";
import UserEdit from "components/views/UserEdit"
import {UserEditGuard} from "../routeProtectors/UserEditGuard";

import PropTypes from 'prop-types';

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}/dashboard`}>
        <Game/>
      </Route>
      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/dashboard`}/>
      </Route>
      <Route path={`${props.base}/users/:id`} exact>
        <User/>
      </Route>
      <Route path={`${props.base}/users/:id/edit`} exact>
      <UserEditGuard>
        <UserEdit/>
      </UserEditGuard>
      </Route>

    </div>
  );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string
}

export default GameRouter;
