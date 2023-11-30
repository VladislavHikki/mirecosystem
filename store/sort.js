export function getSortWhereLabel(arr) {
  return arr?.sort?.((a, b) => {
    if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
    else if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
    else return 0;
  });
}

export function getSortFranchise(arr) {
  return arr?.sort?.((a, b) => {
    if (a.resource.franchise?.label?.toLowerCase() < b.resource.franchise?.label?.toLowerCase()) return -1;
    else if (a.resource.franchise?.label?.toLowerCase() > b.resource.franchise?.label?.toLowerCase()) return 1;
    else return 0;
  });
}

export function getSortTeamFromProfile(arr) {
  return arr?.sort?.((a, b) => {
    if (a?.team?.label.toLowerCase() < b?.team?.label.toLowerCase()) return -1;
    else if (a?.team?.label.toLowerCase() > b?.team?.label.toLowerCase()) return 1;
    else return 0;
  });
}

export function getSortWhereName(arr) {
  return arr?.sort?.((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    else return 0;
  });
}

export function getSortWhereUserName(arr) {
  return arr?.sort?.((a, b) => {
    if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
    else if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
    else return 0;
  });
}

export function getSortWhereSenderName(arr) {
  return arr?.sort?.((a, b) => {
    if (a.senderName.toLowerCase() < b.senderName.toLowerCase()) return -1;
    else if (a.senderName.toLowerCase() > b.senderName.toLowerCase()) return 1;
    else return 0;
  });
}

export function getSortWhereLogin(arr) {
  return arr?.sort?.((a, b) => {
    if (a.login.toLowerCase() < b.login.toLowerCase()) return -1;
    else if (a.login.toLowerCase() > b.login.toLowerCase()) return 1;
    else return 0;
  });
}
