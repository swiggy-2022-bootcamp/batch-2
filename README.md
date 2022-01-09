# Batch 2 : Swiggy i++
### StackOverflow APIs

### Tech Stack :
1. NodeJs
2. Express
3. MongoDB
4. Robo3T (GUI for mongodb)
5. Postman (REST API client)
6. Winston (logging package)
7. MongoDB Atlas (for production DB)
8. Heroku (Deployment)
9. Swagger (API Documentation)

### Features :
1. Allows users to signup by providing needed information.
2. Allows users to sign in by providing valid credentials.
3. Authorization and Authentication using [Json Web Tokens](https://jwt.io).
4. Users can view their details as well as update it.
5. Allows users to perform CRUD operation on __Question__ model.  
     - Users can ask question.
     - Users can update the question.
     - Users can delete the question.
     - Users can get all the answers they have asked.
6. Allows users to perform CRUD operation on __Answer__ model.
     - Users can answer a particular question.
     - Users can edit the answer for a particular question.
     - Users can delete the answer.
     - Users can get all the answers they have contributed.
7. Protection of routes using json web token.
8. Logging using [winston](https://www.npmjs.com/package/winston) package.

    ![](https://imgur.com/3HzhQdj.png)

9.  API documentation using [Swagger](https://swagger.io/).
10. Support for deployment using [mongodb atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_apac_india_search_core_brand_atlas_desktop&utm_term=mongo%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624347&adgroup=115749713263&gclid=CjwKCAiArOqOBhBmEiwAsgeLmRXwKDIvJkBFoeJVfubwj1ZQPba2OXBtX5pYFGiTlwr8vw8tfRq5bhoCfZkQAvD_BwE) and [heroku](https://dashboard.heroku.com/).

