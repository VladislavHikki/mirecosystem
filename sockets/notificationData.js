let notificationCount = 0,
  chatsId = [];
let notificationData = {
  count: notificationCount,
  chatsId: chatsId,
};
export function setData(count, chats) {
  notificationData.count = count;
  if (chats == 'delete') {
    notificationData.chatsId = [];
  } else {
    notificationData.chatsId.push(chats);
  }
}

export function getData() {
  return notificationData;
}

let transactionCount = 0,
  userId = [];
let transactionData = {
  count: transactionCount,
  userId: userId,
};
export function setTransactionData(count, id) {
  transactionData.count = count;
  if (id == 'delete') {
    transactionData.userId = [];
  } else {
    transactionData.userId.push({ id: id });
  }
}

export function getTransactionData() {
  return transactionData;
}

let sponsorCount = 0,
    sponsorId = [];
let sponsorsData = {
  count: sponsorCount,
  sponsorId: sponsorId,
};
export function setSponsorData(count, id, name) {
  sponsorsData.count = count;
  if (id == 'delete') {
    sponsorsData.sponsorId = [];
  } else {
    sponsorsData.sponsorId.push({ id: id, name: name});
  }
}

export function getSponsorData() {
  return sponsorsData;
}

let changeCount = 0,
  changeRole = [];
let changeData = {
  count: changeCount,
  changeRole: changeRole,
};
export function setChangeData(count, id) {
  changeData.count = count;
  if (id == 'delete') {
    changeData.changeRole = [];
  } else {
    changeData.changeRole.push({ id: id });
  }
}

export function getChangeData() {
  return changeData;
}

let studentCount = 0,
  studentId = [];
let studentData = {
  count: studentCount,
  studentId: studentId,
};
export function setStudentData(count, id, name) {
  studentData.count = count;
  if (id == 'delete') {
    studentData.studentId = [];
  } else {
    studentData.studentId.push({ id: id, name: name });
  }
}

export function getStudentData() {
  return studentData;
}
