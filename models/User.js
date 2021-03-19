const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: "You need to provide a username!",
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: "You need to provide a valid email!",
      unique: true,
      match: [/.+@.+..+/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// get total count of thoughts on retrieval
UserSchema.virtual("thoughtCount").get(function () {
  return this.thoughts.length;
});
// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
