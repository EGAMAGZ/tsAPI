"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    // posts indicara la lista de publicaciones que pertenecen a un usuario, por lo que guardara el Id de las publicaciones
    // en un arreglo, haciendo referencia al modelo Post
    posts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Post'
        }]
});
exports.default = mongoose_1.model('User', UserSchema);
