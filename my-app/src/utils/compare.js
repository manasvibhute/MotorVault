export const getCompare = () =>
    JSON.parse(localStorage.getItem("compare")) || [];
  
  export const setCompare = (data) =>
    localStorage.setItem("compare", JSON.stringify(data));