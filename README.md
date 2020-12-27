# murmur-twitter-like-app

## Theme
Implemented web application which is able to show murmur(=tweet) by user. (this application is similar to Twitter)

## Specifications
* The user can follow other users.
* By following, a list of murmurs posted by other users is displayed in the timeline.
* The user can post murmur as many times as he wants.
* Only the user who posted can delete his murmur.
* The user can add LIKE to another person's murmur.
* Basic User authentication.

## Tech Stacks
### Programming Language
* Typescript (primary)
* Javascript

### Directory structure
- /murmur-ui -> Angular(Client)
- /server -> Express(Server)
- /db -> MySQL(DB)

### How To Run
- Make sure MySQL server is running
- Create a MySQL Db connection name and database named 'murmur_schema'
- Execute the sql in db/SQL_Scripts folder to create the tables
- Go to server and murmur-ui folder, then run 'npm i' from cmd
- Go to server and murmur-ui folder respectively, then run 'npm run start' from cmd
- Go to 'http://localhost:4200' to start the application

### Angular side features
 * Timeline
   * List of Murmur information (e.g. text, LIKE count)
   * LIKE button each murmur.
   * Show 10 murmur per page. (need to implement pagination)
 * Murmur Detail
   * Murmur Information (e.g. text, LIKE count)
 * Own User Detail 
   * User information (e.g. name, followCount, followedCount)
   * List of own murmurs
   * Button for delete a murmur
 * Other User Detail
   * User information (e.g. name, followCount, followedCount)
   * List of the user's murmurs