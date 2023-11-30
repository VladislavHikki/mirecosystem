import dbTogether from "../db/db.js";

const matchTypes = {
  ">=": (a, b) => a >= b,
  "<": (a, b) => a < b,
};

/**
 * 0 - юзер, 1 - стартер, 2 - профи, 3 - эксперт, 4 - гуру
 * @param {array} users массив пользователей
 * @param {int} status статус текущей итерации
 * @param {int} length число для проверки длины массива
 * @returns тот же массив со статусами
 */
export async function usersStatuses(users /*status = 0, length = 5, match = ">="*/) {
  for await (const user of users) {
    let status = 0;
    if (!user.id) continue;
    const [userCount] = await dbTogether.query("SELECT id FROM users WHERE referrerId = :userId AND verified = 1 AND hidden = 0", {
      replacements: {
        userId: user.id,
      },
    });

    if (userCount.length >= 5) status = 1;
    else {
      if (user.dataValues) user.dataValues.status = status ? status : 0;
      else user.status = status ? status : 0;
      continue;
    }

    let startCount = 0;
    for await (const prof of userCount) {
      const [profCount] = await dbTogether.query("SELECT id FROM users WHERE referrerId = :userId AND verified = 1 AND hidden = 0", {
        replacements: {
          userId: prof.id,
        },
      });

      if (profCount.length >= 5) startCount += 1;
      else continue;

      let profC = 0;
      for await (const exp of profCount) {
        const [expCount] = await dbTogether.query("SELECT id FROM users WHERE referrerId = :userId AND verified = 1 AND hidden = 0", {
          replacements: {
            userId: exp.id,
          },
        });

        if (expCount.length >= 5) profC += 1;
        else continue;

        let expC = 0;
        for await (const guru of expCount) {
          const [guruCount] = await dbTogether.query("SELECT id FROM users WHERE referrerId = :userId AND verified = 1 AND hidden = 0", {
            replacements: {
              userId: guru.id,
            },
          });
          if (guruCount.length >= 5) expC += 1;
        }

        if (expC >= 5) status = 4;
      }

      if (profC >= 5) status = 3;
    }

    // if (status !== 0) console.log(status);
    if (startCount >= 5) status = 2;
    if (user.dataValues) user.dataValues.status = status ? status : 0;
    else user.status = status ? status : 0;
  }
  return users;
}
/**
 * 0 - юзер, 1 - стартер, 2 - профи, 3 - эксперт, 4 - гуру
 * @param {array} users массив пользователей
 * @returns {array} users но со статусами
 */
export async function usersStatuses2(users) {
  for await (const user of users) {
    if (!user.id) continue;
    let status = 0;
  }
}
