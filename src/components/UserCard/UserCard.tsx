/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";
import classNames from "classnames";
import Button from "../Button/Button";
import API from "../../services/api";
import { ActionTypes, initialState, reducer } from "./reducer";

const UserCard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // it provides to fetch a new random user, when user click the "show" button.
    if (state.visibility) {
      fetchUser();
    }
  }, [state.visibility]);

  const fetchUser = async () => {
    try {
      dispatch({ type: ActionTypes.SET_ERROR, payload: null });
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await API.getUser();
      if (response?.status === 200 && response?.data?.results?.length && response?.data?.info?.results === 1) {
        const {
          name: { first, last },
          location: { country },
          picture: { medium },
        } = response.data.results[0];

        dispatch({
          type: ActionTypes.SET_DATA,
          payload: {
            firstName: first,
            lastName: last,
            country,
            avatarUrl: medium,
          },
        });
      }
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  const handleClick = () => {
    dispatch({ type: ActionTypes.SET_VISIBILITY, payload: !state.visibility });

    // For better UI implementation, it clears data after the closing animation is completed.
    setTimeout(() => {
      if (state.visibility) {
        dispatch({ type: ActionTypes.CLEAR_DATA });
      }
    }, 700);
  };

  return (
    <div className="relative w-[500px] mx-auto flex flex-col justify-center items-center">
      <section
        data-testid="user-card"
        className={classNames(
          "transition-all duration-500 w-full bg-slate-200 rounded-lg p-4 flex justify-start items-center space-x-4 opacity-0 scale-y-0",
          {
            "!scale-y-100 !opacity-100": state.visibility && !state.loading, // It will be appeared after all data was fetched successfully.
          }
        )}
      >
        <img
          data-testid="avatar"
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src={state.data.avatarUrl}
          alt="user avatar"
        />
        <div className="flex flex-col">
          <p
            data-testid="fullname"
            data-fullname={`${state.data.firstName}-${state.data.lastName}`}
            className="text-lg font-bold whitespace-pre-wrap"
          >
            {state.data.firstName} {state.data.lastName}
          </p>
          <p data-testid="country" className="text-lg font-bold opacity-50">
            {state.data.country}
          </p>
        </div>
      </section>
      <footer className="w-full flex flex-col space-y-2 justify-center items-center p-4 px-0">
        <Button
          id="visibility-button"
          text={`${state.visibility ? "Hide" : "Show"}`}
          loading={state.loading}
          onClick={handleClick}
        />
        {state.error && <p className="text-sm text-red-400">Error: {state.error.message}</p>}
      </footer>
    </div>
  );
};

export default UserCard;
