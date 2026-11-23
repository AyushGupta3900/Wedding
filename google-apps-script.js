/**
 * Google Apps Script for Sarvesh & Sanjana Wedding Invitation
 * -----------------------------------------------------------
 * INSTRUCTIONS:
 * 1. Open your Google Sheet (e.g., https://sheets.google.com)
 * 2. Click "Extensions" > "Apps Script"
 * 3. Delete any default code in Code.gs and PASTE THIS ENTIRE SCRIPT
 * 4. Click the blue "Deploy" button at top right > "New deployment"
 * 5. Click the gear icon next to "Select type" > choose "Web app"
 * 6. Set Description: "Wedding Attendance Webhook"
 * 7. Set "Execute as": "Me" (your email)
 * 8. Set "Who has access": "Anyone" (VERY IMPORTANT: must be "Anyone")
 * 9. Click "Deploy" and authorize permissions if prompted
 * 10. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
 * 11. Paste that URL into src/config.js in your project!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create header row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp (IST)",
        "Guest Name",
        "Attending?",
        "Total Guests",
        "Language"
      ]);
      
      // Style headers
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setBackground("#7B1834");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontFamily("Georgia");
    }
    
    // Parse incoming data
    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }
    
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");
    var name = data.name || "Anonymous";
    var attending = data.attending || "Yes";
    var guestCount = data.guestCount !== undefined ? data.guestCount : 1;
    var language = data.language || "English";
    
    // Append the row
    sheet.appendRow([
      timestamp,
      name,
      attending,
      guestCount,
      language
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Recorded successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Sarvesh & Sanjana Wedding Attendance Webhook is active and running!");
}
