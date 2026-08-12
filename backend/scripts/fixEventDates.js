import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "../models/Event.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing from .env");
  process.exit(1);
}

// --------------------------------------------------
// CONVERT ANY EVENT DATE TO YYYY-MM-DD
// --------------------------------------------------

function normalizeEventDate(value) {
  if (!value) return null;

  const str = String(value).trim();

  // Already correct
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }

  // ------------------------------------------------
  // JavaScript date string
  //
  // Example:
  // Thu Nov 05 2026 00:00:00 GMT+0000 (UTC)
  // ------------------------------------------------

  const parsed = new Date(str);

  if (!Number.isNaN(parsed.getTime())) {
    // IMPORTANT:
    // Use local date components from the parsed value
    // rather than toISOString(), which can shift the date.
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // ------------------------------------------------
  // Try strings containing recognizable month names
  // ------------------------------------------------

  const monthMatch = str.match(
    /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)?\s*([A-Za-z]+)\s+(\d{1,2})(?:\s+(\d{4}))?/,
  );

  if (monthMatch) {
    const monthName = monthMatch[1];
    const day = Number(monthMatch[2]);

    let year = monthMatch[3];

    if (!year) {
      year = new Date().getFullYear();
    }

    const monthIndex = new Date(`${monthName} 1, 2000`).getMonth();

    if (!Number.isNaN(monthIndex)) {
      return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
        day,
      ).padStart(2, "0")}`;
    }
  }

  return null;
}

// --------------------------------------------------
// RUN MIGRATION
// --------------------------------------------------

async function fixEventDates() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB connected\n");

    const events = await Event.find();

    console.log(`Found ${events.length} event(s).\n`);

    let updated = 0;
    let skipped = 0;
    let failed = 0;

    for (const event of events) {
      const oldDate = event.date;

      const newDate = normalizeEventDate(oldDate);

      if (!newDate) {
        console.log(`⚠️ Could not convert: ${oldDate}`);

        failed++;
        continue;
      }

      // Already correct
      if (oldDate === newDate) {
        console.log(`✓ ${event.title}: ${oldDate}`);

        skipped++;
        continue;
      }

      event.date = newDate;

      await event.save();

      console.log(`🔄 ${event.title}`);

      console.log(`   ${oldDate} → ${newDate}\n`);

      updated++;
    }

    console.log("----------------------------------------");

    console.log(`✅ Updated: ${updated}`);

    console.log(`✓ Already correct: ${skipped}`);

    console.log(`⚠️ Failed: ${failed}`);

    console.log("----------------------------------------");

    await mongoose.disconnect();

    console.log("\nMongoDB connection closed.");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:");

    console.error(error);

    await mongoose.disconnect();

    process.exit(1);
  }
}

fixEventDates();
