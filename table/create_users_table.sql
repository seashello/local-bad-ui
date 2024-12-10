CREATE TABLE IF NOT EXISTS data (
  user VARCHAR PRIMARY KEY,
  birthday DATE,
  favoriteColor VARCHAR,
  duration TIMESTAMP,
  colorScore INT
);

/*we will have some content in a dictionary? after we get them, we just do this  */


INSERT INTO data (user, birthday, favoriteColor, duration, colorScore)
VALUES (user.name, user.birthday, user.favoriteColor, user.endTime - user.startTime, user.colorScore);

/* OR access it using like user.birth, user.birthday, etc.*/

/* if we wanted to update something we would do the same thing except only insert into the data we want */
UPDATE data
SET duration = 999
WHERE user = 999;


/* only display top 5 */

SELECT *
FROM data
ORDER BY duration DESC
LIMIT 8;

user features: name, birthday, favoriteColor, startTime, endTime, colorScore