// data model
/*
{
  "name": "Matti Seppänen",
  "email": "matti@example.com",
  "password": "M@45mtg$",
  "phone_number": "+358401234567",
  "gender": "Male",
  "date_of_birth": "2000-01-15",
  "membership_status": "Active",
  "account_verified": true,
  "country": "Finland"
}
*/

let userArray = [];
let nextId = 1;

const getAll = () => {
  return userArray;
};

const addOne = (
  name,
  email,
  password,
  phone_number,
  gender,
  date_of_birth,
  membership_status,
  account_verified,
  country
) => {
  if (
    !name ||
    !email ||
    !password ||
    !phone_number ||
    !gender ||
    !date_of_birth ||
    !membership_status ||
    account_verified === undefined || // allow false
    !country
  ) {
    return false;
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    password,
    phone_number,
    gender,
    date_of_birth,
    membership_status,
    account_verified,
    country,
  };

  userArray.push(newUser);
  return newUser;
};

const findById = (id) => {
  const user = userArray.find((user) => user.id === Number(id));
  if (user) {
    return user;
  } else return false;
};

const updateOneById = (id, updatedData) => {
  const user = findById(id);
  if (user) {
    if (updatedData.name) user.name = updatedData.name;
    if (updatedData.email) user.email = updatedData.email;
    if (updatedData.password) user.password = updatedData.password;
    if (updatedData.phone_number) user.phone_number = updatedData.phone_number;
    if (updatedData.gender) user.gender = updatedData.gender;
    if (updatedData.date_of_birth)
      user.date_of_birth = updatedData.date_of_birth;
    if (updatedData.membership_status)
      user.membership_status = updatedData.membership_status;
    if (typeof updatedData.account_verified === "boolean")
      user.account_verified = updatedData.account_verified;
    if (updatedData.country) user.country = updatedData.country;

    return user;
  }
  return false;
};

const deleteOneById = (id) => {
  const user = findById(id);
  if (user) {
    const initialLength = userArray.length;
    userArray = userArray.filter((user) => user.id !== Number(id));
    return userArray.length < initialLength;
  } else return false;
};

// quick manual test like in tourModel.js
if (require.main === module) {
  let result = addOne(
    "Matti Seppänen",
    "matti@example.com",
    "M@45mtg$",
    "+358401234567",
    "Male",
    "2000-01-15",
    "Active",
    true,
    "Finland"
  );
  console.log(result);

  result = addOne(
    "Anna Virtanen",
    "anna@example.com",
    "An@123$%",
    "+358409876543",
    "Female",
    "1998-05-20",
    "Inactive",
    false,
    "Finland"
  );
  console.log(result);

  console.log("getAll called:", getAll());
  console.log("findById called:", findById(2));

  console.log(
    "updateById called:",
    updateOneById(2, {
      membership_status: "Active",
      account_verified: true,
    })
  );
  console.log("findById called after item updated:", findById(2));
  console.log("deleteById called:", deleteOneById(2));
  console.log("findById called after item deleted:", findById(2));
}

module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};
