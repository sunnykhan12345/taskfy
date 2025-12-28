import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Userdata",
      required: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Userdata",
      },
    ],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
