const db = require("./promise").DbAgent;
const { body } = require('express-validator/check');

const Agent = {

    validate(method) {
        switch (method) {
            case 'create_agent': {
             return [
                body('email', 'Invalid email').isEmail()
                .normalizeEmail(),
                body('first_name').not().isEmpty()
                .trim()
                .escape(),
                body('last_name').not().isEmpty()
                .trim()
                .escape(),
                body('job_role').not().isEmpty()
                .trim()
                .escape()
               ]   
            }
          }
    },
    async create_agent(req, res){
        const queryText = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            job_role: req.body.job_role
        }
        try {
            let createdAgent = await db.create(queryText);
            return res.status(200).send("This is to post the Agent Details to the database");
        } catch(error){
            return res.status(400).send(error);
        }
    },
    async get_all_agents(req, res){
        const queryText = {};
        try {
            let foundAgents = await db.find(queryText);
            return res.status(200).send("View all the data for the agents");;
        } catch(error){
            return res.status(400).send(error);
        }

    }
}

module.exports = Agent;