const mongoose = require("mongoose");
const { parse, format } = require("date-fns");
const Availability = require("../models/Availability");
require("dotenv").config();

const migrateDates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const availabilities = await Availability.find({});

    let updated = 0;
    let errors = 0;

    for (const availability of availabilities) {
      try {
        if (availability.date.includes("/")) {
          const parsedDate = parse(availability.date, "dd/MM/yyyy", new Date());
          const newDateFormat = format(parsedDate, "yyyy-MM-dd");

          await Availability.updateOne(
            { _id: availability._id },
            { $set: { date: newDateFormat } }
          );
          updated++;
        }
      } catch (err) {
        errors++;
        console.error(`Error migrating ID: ${availability._id}:`, err.message);
      }
    }
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await mongoose.disconnect();
  }
};

migrateDates();
