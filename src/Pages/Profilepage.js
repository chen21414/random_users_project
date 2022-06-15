import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profilepage = (props) => {
  const navigate = useNavigate();
  const { users, idx } = props;

  const daysToBirth = (birthday) => {
    let bdDay = new Date(birthday);

    let today = new Date();

    bdDay.setFullYear(today.getFullYear());
    if (today > bdDay) {
      bdDay.setFullYear(today.getFullYear() + 1);
    }

    let days = Math.floor((bdDay - today) / (1000 * 60 * 60 * 24));

    return days;
  };

  const genderDetect = (user) => {
    if (user.gender === "male") {
      return "His";
    } else if (user.gender === "female") {
      return "Her";
    }
  };

  return (
    <>
      {users
        .filter((user) => {
          return user.login.username === idx;
        })
        .map((user, index) => (
          <div key={index} className="flex justify-center item-center py-24">
            <div className="md:w-1/2 w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <img
                className="flex rounded-full"
                src={user.picture.large}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {user.name.title} {user.name.first} {user.name.last}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Cell Phone: {user.cell}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Home Phone: {user.phone}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Data of Birth: {user.dob.date.substring(0, 10)}/ Age:{" "}
                  {user.dob.age}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Email: {user.email}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Gender: {user.gender}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Id: {user.id.value}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Address: {user.location.street.number}{" "}
                  {user.location.street.name} {user.location.city}{" "}
                  {user.location.state} , {user.location.postcode}{" "}
                  {user.location.country}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Registered Data: {user.registered.date.substring(0, 10)}
                </p>
                <p className="font-bold mb-3 font-normal text-indigo-700 dark:text-gray-400">
                  How Many Days to {genderDetect(user)} Birthday:{" "}
                  {daysToBirth(user.dob.date.substring(0, 10))}
                </p>
                <button
                  onClick={() => navigate("/Users")}
                  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Back
                  <svg
                    className="w-6 h-6 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    idx: state.userIndex,
  };
};

export default connect(mapStateToProps, null)(Profilepage);
