/*
There is an array, each item has such format:
{firstName: 'xxx', lastName: 'xxx', customerID: 'xxx', note: 'xxx',
profession: ‘xxx’}
lastName, note can be empty, customerID can only be a set of digital
numbers.
profession can only have ‘student’, ‘freelancer’, ‘productOwner’,
‘engineer’ or ‘systemAnalytics’.

Q1. Please follow the principle (‘firstName’ + ‘lastName’ + ‘customerID’)
to sort this array and print it out.
*/

const user = [
  { firstName: 'Alice', lastName: 'Chen', customerID: '123', note: '', profession: 'engineer' },
  { firstName: 'Bob', lastName: 'Wang', customerID: '456', note: 'VIP', profession: 'freelancer' },
  { firstName: 'Charlie', lastName: 'Kuo', customerID: '789', note: '', profession: 'student' },
  { firstName: 'Dave', lastName: 'Luo', customerID: '101', note: 'New', profession: 'productOwner' },
  { firstName: 'Eve', lastName: 'Liu', customerID: '202', note: 'Returning', profession: 'systemAnalytics' },
];

function sortUserName(user) {
  return user.sort((a, b) => {
    const nameA = a.firstName + a.lastName + a.customerID;
    const nameB = b.firstName + b.lastName + b.customerID;

    return nameA.localeCompare(nameB);
  });
}
console.log(sortUserName(user));

/**
Q2. Please sort by ‘profession’ to follow the principle.
(‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ >
‘student’’)
**/

function sortByType(user) {
  const professionOrder = {
    systemAnalytics: 1,
    engineer: 2,
    productOwner: 3,
    freelancer: 4,
    student: 5,
  };

  return user.sort((a, b) => {
    return professionOrder[a.profession] - professionOrder[b.profession];
  });
}

console.log(sortByType(user));
