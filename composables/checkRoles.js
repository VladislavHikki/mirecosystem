/**
 * Функия, проверяющая роли у пользователя 
 * @param {*Роли массив из id ролей} roles 
 * @param {*id интересующий id роли} rightRole 
 * @returns 
 */
export default function checkRoles(roles, rightRole) {
    for(let i = 0; i < roles?.length; ++i) {
        if(roles[i]?.id == rightRole) return roles[i]?.id;
    }
    return false;
}