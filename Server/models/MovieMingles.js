const {Schema, Types, mongoose} = require('mongoose');

const inviteSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  });
  
  const movieSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, 
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
  });
  
  const mingleSchema = new Schema({
    _id: { 
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    movie: movieSchema,
    time: {
      type: Date,
      required: true,
    },
    invites: [inviteSchema],
  }, {
    timestamps: true,
  });
  
   const Mingle = mongoose.model('Mingle', mingleSchema);
  
  module.exports = {mingleSchema, Mingle};