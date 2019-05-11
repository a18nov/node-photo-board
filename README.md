# node-photo-board
Photo sharing platform

Models:
1. User:

name:
displayName:
about:
profileImageURL:

2. UserFollow:

userId:
userFollowing:
	  List of user ids
userFollows:
	  List of user ids

3. Comments:

userId:
text:

4. Post:

userId:
postURL:
postDesc:
comments:
	List of comment ids
	
5. Like:

userId:
likeType: Post/Comment
typeId: PostId/CommentId

6. userAuth:

userId:
username:
password:

7. sessionService:

userId:
lastTranxnTime:




