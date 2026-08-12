import mongoose from "mongoose";
import dotenv from "dotenv";
import WomenEvent from "../models/WomenEvent.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing");
  process.exit(1);
}

async function fixWomenEventDates() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB connected");

    const events = await WomenEvent.find();

    console.log(`Found ${events.length} Women's Events`);

    let updated = 0;
    let skipped = 0;
    let failed = 0;

    for (const event of events) {
      if (!event.date) {
        console.log(`⚠️ No date: ${event.title}`);

        failed++;
        continue;
      }

      const rawDate = event.date;

      // ------------------------------------------
      // Already YYYY-MM-DD
      // ------------------------------------------

      if (typeof rawDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
        console.log(`✓ Already correct: ${event.title} → ${rawDate}`);

        skipped++;
        continue;
      }

      // ------------------------------------------
      // Convert existing MongoDB Date
      // ------------------------------------------

      const date = new Date(rawDate);

      if (Number.isNaN(date.getTime())) {
        console.log(`❌ Invalid date: ${event.title} → ${rawDate}`);

        failed++;
        continue;
      }

      // IMPORTANT:
      // Use the date components rather than
      // toISOString(), which can cause the
      // one-day-back problem.
      //
      // Existing MongoDB dates were created
      // at midnight, so getUTC* preserves the
      // original calendar date.
      const year = date.getUTCFullYear();

      const month = String(date.getUTCMonth() + 1).padStart(2, "0");

      const day = String(date.getUTCDate()).padStart(2, "0");

      const newDate = `${year}-${month}-${day}`;

      // ------------------------------------------
      // Save as String
      // ------------------------------------------

      await WomenEvent.collection.updateOne(
        { _id: event._id },
        {
          $set: {
            date: newDate,
          },
        },
      );

      console.log(`🔄 ${event.title}`);

      console.log(`   ${date.toISOString()} → ${newDate}`);

      updated++;
    }

    console.log("\n==============================");

    console.log(`✅ Updated: ${updated}`);

    console.log(`✓ Already correct: ${skipped}`);

    console.log(`⚠️ Failed: ${failed}`);

    console.log("==============================\n");

    await mongoose.disconnect();

    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("❌ Migration failed:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
}

fixWomenEventDates();
