export const sortUsers = (state, users) => {
  const mapData = users.results.map((user) => {
    return user;
  });

  //check any duplicated accounts
  let filterData = mapData.filter(
    (ele, ind) => ind === mapData.findIndex((elem) => elem.email === ele.email)
  );

  const serializedStore = JSON.stringify(filterData);
  window.localStorage.setItem("store", serializedStore);

  return filterData || null;
};

export const sortIdx = (state, idx) => {
  const serializedStore = JSON.stringify(idx);
  window.localStorage.setItem("idx", serializedStore);

  return idx;
};
