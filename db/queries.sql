USE recipe_db;

-- list of users with their recipes including users without recipes 

SELECT 
    u.id as "User ID", 
    u.name as "User Name",
    u.email as "User Email",
    r.recipe_name
FROM user u 
LEFT JOIN recipe r on u.id = r.user_id 
;

-- list of users and their recipes including category, description, instructions, and ingredient info
SELECT 
    u.name as "user name",
    r.id, 
    r.recipe_name, 
    r.category,
    r.description,
    r.instructions,
    i.ingredient_amount,
    i.ingredient_name
FROM recipe r 
LEFT JOIN ingredient i on r.id = i.recipe_id 
INNER JOIN user u on r.user_id = u.id
ORDER BY r.recipe_name ASC
;


