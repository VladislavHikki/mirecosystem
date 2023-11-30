export default (status_id) => {
    let status = {
        0: "user",
        1: "starter",
        2: "profi",
        3: "expert",
        4: "guru",
    };
    return status[status_id]; 
}