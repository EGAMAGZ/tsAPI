import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: { type: String, required : true},
    createdAt: {type: Date, default: Date.now},
    // posts indicara la lista de publicaciones que pertenecen a un usuario, por lo que guardara el Id de las publicaciones
    // en un arreglo, haciendo referencia al modelo Post
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

export default model('User', UserSchema);