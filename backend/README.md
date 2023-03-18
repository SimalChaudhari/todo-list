# Create or Generate Sequelize Models and Migrations
Example : sequelize model:create --name User --attributes role_id:integer,email:string,password:string,fullname:string,phone:string

# Migrate
  npx sequelize-cli db:migrate

# Seeders
  npx sequelize-cli db:seed:all