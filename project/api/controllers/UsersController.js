/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find: async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users)
    } catch (error) {
        return res.serverError(error)
    }
  },

  create: async (req, res) => {
    try {
      const {email, name} = req.body;
        const user = await User.create({email: email, name: name });
        return res.status(200).json({success: true})
    } catch (error) {
        console.log(error)
        return res.serverError(error)
    }
  }
}

