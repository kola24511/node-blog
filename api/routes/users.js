const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                {
                   $set: req.body,
                }, 
                {new:true}
            );
            res.status(200).json(updatedUser);
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("Вы можете обновить только свой аккаунт!")
    }
});

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        try {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("Пользователь успешно удален");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("Пользователь не найден!");
      }
    } else {
      res.status(401).json("Вы удаляете не свой аккаунт!");
    }
  });
  

module.exports = router;