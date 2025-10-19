const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');
const Post = require('./post');

const Comment = sequelize.define('Comment',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    comment:{
        type:DataTypes.STRING,
        allowNull:true
    }
});

Comment.belongsTo(Post,{foreignKey:"postId"});
Post.hasMany(Comment,{foreignKey:"postId"})

module.exports = Comment;