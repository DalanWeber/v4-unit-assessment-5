const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req,res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const {profile_pic} = `https://robohash.org/${username}.png`

        const existingUser = await db.user.find_user_by_username(username)
        if(existingUser[0]){return res.status(409).send('That Username is taken bruh')}
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const createUser = await db.user.create_user(username,hash,`https://robohash.org/${username}.png`)

        req.session.user = createUser[0]
        res.status(201).send(req.session.user)
    },
    login: async (req,res) => {
        const db = req.app.get('db')
        const {username,password} = req.body

        const user = await db.user.find_user_by_username(username)
        if(!user[0]){return res.status(401).send('bruh you gotta register first')}

        const authenticated = bcrypt.compareSync(password, user[0].password)
        if (authenticated){
            req.session.user = user[0]
            return res.status(200).send(req.session.user)
        }
        return res.status(403).send('Make sure you are who you say you are?')
    },
    logout: async (req,res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: async (req,res) => {
        if(req.session.user){
            return res.status(200).send(req.session.user)
        }
        return res.status(404).send('Pls login?')
    }, 
}