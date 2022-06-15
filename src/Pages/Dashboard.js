import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRandomUser } from "../store/utils/thunkCreators";
import { gotIdx } from "../store/userIndex";

const Dashboard = (props) => {
  const { users, getRandomUser, gotIdx, userIndex } = props;
  const navigate = useNavigate();

  const serializedNum = window.localStorage.getItem("num");
  const serializedPg = window.localStorage.getItem("pg.page");

  let [num, setNum] = useState(JSON.parse(serializedNum) || 1);
  let [cur, setCur] = useState(JSON.parse(serializedPg) || 1);

  const [filter, setFilter] = useState("");

  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];

  const Next = () => {
    num < users.length / 10 - 3 && setNum(++num);
    window.localStorage.setItem("num", num);
  };

  const Back = () => {
    num > 1 && setNum(--num);
    window.localStorage.setItem("num", num);
  };

  const pageStatement = () => {
    let begin;
    let end;
    if (Math.floor(filter.trim().length) == 0) {
      begin = (cur - 1) * 10;
      end = (cur - 1) * 10 + 10;
    } else if (Math.floor(filter.trim().length) > 0) {
      begin = 0;
      end = users.length;
    }

    return { begin: begin, end: end };
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-1/2">
          <div className="input-group relative flex flex-wrap items-stretch w-full mb-1 mt-2">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none rounded-lg"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon3"
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      {users
        ? users
            .filter((user) => {
              if (!filter) return true;
              const fullName =
                `${user.name.first}${user.name.last}`.toLowerCase();
              const reversedFullName =
                `${user.name.last}${user.name.first}`.toLowerCase();
              const trimmedSearchValue = filter
                .replace(/\s+/g, "")
                .toLowerCase();
              return (
                fullName.includes(trimmedSearchValue) ||
                reversedFullName.includes(trimmedSearchValue)
              );
            })
            .slice(pageStatement().begin, pageStatement().end)
            .map((user, index) => (
              <div
                key={index}
                className="menu-card bg-slate-100 shadow-2xl shadow-inner"
              >
                <figure className="md:flex rounded-xl p-8 md:p-0 dark:bg-slate-800">
                  <img
                    className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto md:mx-0 md:pt-3 cursor-pointer"
                    src={user.picture.large}
                    alt=""
                    width="384"
                    height="512"
                    onClick={() => {
                      navigate(`/Profile/${user.login.username}`);
                      gotIdx(user.login.username);
                    }}
                  />
                  <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <div className="md:justify-start sm:justify-center xs:justify-center">
                      <p className="text-lg font-medium pr-2">
                        {user.name.title} {user.name.first} {user.name.last}
                      </p>
                    </div>
                    <figcaption className="font-medium">
                      <div className="text-sky-500 dark:text-sky-400">
                        {user.email}
                      </div>
                      <div className="text-slate-700 dark:text-slate-500">
                        {user.location.street.number}{" "}
                        {user.location.street.name} {user.location.city}{" "}
                        {user.location.state} , {user.location.postcode}{" "}
                        {user.location.country}
                      </div>
                    </figcaption>
                  </div>
                  <button
                    className="md:absolute md:right-12 md:block hidden hover:bg-blue-100 bg-blue-200 text-blue-800 font-bold rounded-md my-20 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    onClick={() => {
                      navigate(`/Profile/${user.login.username}`);
                      gotIdx(user.login.username);
                    }}
                  >
                    Learn More
                  </button>
                </figure>
              </div>
            ))
        : "loading"}

      <div className="flex justify-center">
        <button
          onClick={Back}
          className="h-12 border-2 border-r-0 border-indigo-600
               px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
        {pages.map((pg, i) => (
          <button
            key={i}
            onClick={() => {
              setCur(pg.page);
              window.localStorage.setItem("pg.page", pg.page);
              window.scroll(0, 150);
            }}
            className={`h-12 border-2 border-r-0 border-indigo-600
               w-12 ${cur === pg.page && "bg-indigo-600 text-white"}`}
          >
            {pg.page}
          </button>
        ))}
        <button
          onClick={Next}
          className="h-12 border-2  border-indigo-600
               px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <button
        onClick={() => navigate(`/Profile/${userIndex}`)}
        className="sticky z-50 bottom-5 left-full px-5 mx-0 md:mx-5 hover:bg-yellow-300 bg-yellow-500 text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        Last Viewed
      </button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    userIndex: state.userIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRandomUser: () => {
      dispatch(getRandomUser());
    },
    gotIdx: (idx) => {
      dispatch(gotIdx(idx));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
