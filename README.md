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