const userList = [];
const gameNameList = [];

function userAuthentication(req, res, next) {
    let found = false;
    for(user in userList)
    {
        if (userList[user].name === req.body || userList[user].id === req.session.id)
        {
            found=true;
            break;
        }
    }
    if (found){
        next();
    } else {
        res.sendStatus(401);
    }
}

function addUserToAuthList(req, res, next) {
    let found = false;
    for(user in userList)
    {
        if (userList[user].name === req.body)
        {
            found=1;
            break;
        }
    }
    if (found)
        res.status(403).send('user already exist');
    else {
        if (req.body == undefined || req.body == "" || req.body == " ")
        {
        res.status(402).send('must enter user name');
        }
        else
        {
        userList.push({name:req.body,id:req.session.id});
        next();
        }
    }
}

function addGameToAuthList(req, res, next) {
    for (name in gameNameList) {
        const GameName = gameNameList[name];
        if (GameName === JSON.parse(req.body).GameNames) {
            res.status(403).send('game name already exist');
            return;
        }
    }
    gameNameList.push({ GameName: JSON.parse(req.body).GameNames, id: req.session.id });
    next();
}

function removeUserFromAuthList(req, res, next) {
    let index = 0;
    let found = false;
    for(user in userList)
    {
        if (userList[user].name === req.body)
        {
            index = name;
            found=1;
            break;
        }
    }
    if (found)
        res.status(403).send('user does not exist');
     else {
        delete userList[index];
        next();
    }
}

function getUserInfo(id) {
    for(user in userList) {
        if (userList[user].id === id) {
            return {name: userList[user].name};
        }
    }
}

function getUserList() {
    return userList;
}
function removeGame(req, res, next) {
    let gameName=req.body;
    let found = false;
    let index = 0;
    for (name in gameNameList) {
        if (gameName === gameNameList[name].GameName && req.session.id === gameNameList[name].id) {
            found = true;
            index = name;
            break;
        }
    }
    if (!found)
        res.status(403).send('You cant delete game you didnt create');
    else {
        delete gameNameList[index];
        next();
    }
}

module.exports = { removeGame, userAuthentication, addUserToAuthList, removeUserFromAuthList, getUserInfo, addGameToAuthList, getUserList }
