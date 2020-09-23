--------------- GIT -------------
1. create new branch: git checkout -b "namebranch"
2. change branch: git checkout "namebranch"
3. pull/push: git pull/push origin "namebranch"
4. xem ở branch hiện tại: quên tiếng anh r: git status

--------------- REST API -------------
- CRUD (example)
- Read:   localhost:3000/food/:id (method POST)
- create: localhost:3000/food (method POST)
- update: localhost:3000/food/:id (method UPDATE)
- delete: localhost:3000/food/:id (method DELETE)

* support tools: POSTMAN -> useful tools for BE
### Process Project 
- 12/09/2020: 	
	+ create API food/:slug and create display detail food follow slug 
	+ create API food/create and create new food then save into Database
- 13/09/2020:
	+ Connect to MongoDB Cloud Online
	+ create API me/list, display list food 
	+ create API/PUT, update food then save into DB and upgrade UI
- 14/09/2020:
	+ create API/DELETE, delete food. Completely deletion does not return -> Ok fine damn....
	+ create API/PATCH used to restore data. Create UI trash. 
- 15/09/2020
	+ create cart shopping 
	+ create delete food from cart (simple -> not recommend)
- 16/09/2020
	+ create models Cart, User and update model Food
	+ update Cart Shopping, create price and countFood
	+ create API (read - update - delete - create) model Cart
- 18/09/2020
	+ create Simple Bill
	+ update cart controller :v (not me)
	+ create model Bill
- 20/09/2020
	+ create layout Checkout/Bill
	+ create API Checkout
	+ Upgrade UI 
- 23/09/2020
	+ create SignIn and SignUp
