# Grocery Receipt Parser

A web-based PDF receipt parser specifically designed for Willys grocery store receipts (Swedish format).

**Current Version:** v3.01 (2025-01-29)

## 📚 Documentation

- **[CHANGELOG.md](CHANGELOG.md)** - Complete version history and technical details
- **[SHOPPING-LIST-GUIDE.md](SHOPPING-LIST-GUIDE.md)** - Comprehensive guide to the smart shopping list feature
- **[FIXES-APPLIED.md](FIXES-APPLIED.md)** - v2.0-beta bug fixes documentation

## 🆕 What's New in v3.0

### Major Shopping List Redesign

**Automatic & Intelligent:**
- **Auto-Generate Suggestions** - Suggestions appear automatically on page load
- **Weekly Pattern Detection** - Identifies items purchased in 90%+ of weeks (top priority)
- **Latest Price Strategy** - Uses most recent purchase price with conservative rounding

**Enhanced Control:**
- **Three Actions** - Add, Snooze (7 days), or Dismiss (permanent) for each suggestion
- **Management Sections** - View and restore dismissed/snoozed items
- **Auto-Hide Checked** - Items disappear when checked, keeping list clean while shopping

**Smarter Pricing:**
- **Price Rounding** - Always rounds UP to .00 or .50 for conservative budgeting
- **Latest Purchase Data** - Uses most recent price, not average

**Removed Features:**
- Manual "Generate Suggestions" button (now automatic)
- "Clear Suggestions" button (not needed)
- "Often bought with" complementary items
- "Good Deal" detection (was misleading)

See [CHANGELOG.md](CHANGELOG.md) for complete technical details.

## What's Fixed

The parser had issues missing many items from receipts. Here's what was improved:

### Previous Problems
1. **Regex too restrictive** - Only matched uppercase letters (A-Z), missing:
   - Lowercase letters
   - Swedish characters (å, ä, ö)
   - Items starting with numbers
   - Lines with leading whitespace

2. **Section detection failures** - Rigid text matching for "självscanning" sections

3. **Single pattern approach** - One rigid regex pattern couldn't handle format variations

### Solutions Implemented

#### 1. Multiple Pattern Support
Now supports **3 different item formats**:

- **Pattern 1**: Items with quantity
  `ITEM NAME 2st*12,50 25,00`

- **Pattern 2**: Simple items (most common)
  `ITEM NAME 15,90`

- **Pattern 3**: Weight-based items
  `ITEM NAME 0,5kg*89,00 44,50`

#### 2. Improved Character Matching
- Uses `[\wåäöÅÄÖ]` to support Swedish characters
- Case-insensitive matching with `/i` flag
- Handles spaces, slashes, percentages, and hyphens in item names

#### 3. Better Section Detection
- More flexible start/end markers
- Fallback to intelligent middle-section parsing if markers not found
- Trims whitespace from all lines before processing

#### 4. Smart Filtering
- Skips payment lines (Betalt, Kort, Swish)
- Skips header/separator lines
- Validates price ranges (0.01 to 9999 kr)
- Detects and skips total/sum lines automatically

#### 5. Debug Mode
- Toggle to see exactly which lines are matched/skipped
- Shows which pattern matched each item
- Displays parsing section boundaries
- Green highlights for matches, red for misses

## How to Use

1. **Open the file**
   Open `receipt-parser.html` in any modern web browser (Chrome, Firefox, Edge, Safari)

2. **Enable Debug Mode (Optional)**
   Check the "🐛 Debug Mode" checkbox to see parsing details

3. **Upload PDFs**
   - Click the upload box
   - Select one or multiple Willys receipt PDFs
   - The parser processes them automatically

4. **Review Results**
   - View all extracted items in tables
   - Edit item names inline if needed
   - Check debug info (if enabled) to see what was captured

5. **Export Data**
   Click "📊 Export All to CSV" to download all receipts as a spreadsheet

## Features

### Receipt Parser
- ✅ **Batch processing** - Upload multiple PDFs at once
- ✅ **Duplicate detection** - Prevents adding the same receipt twice
- ✅ **Local storage** - Receipts saved in browser (survives page refresh)
- ✅ **Inline editing** - Edit item names directly in the UI
- ✅ **CSV export** - Export all data for analysis
- ✅ **Discount tracking** - Captures Willys Plus and other discounts
- ✅ **Statistics** - Total spent, saved, items count

### Product Library
- ✅ **Custom product naming** - Rename products for consistency
- ✅ **Tagging system** - Tag products by household member, meal type, etc.
- ✅ **Category management** - Organize by product type and store section
- ✅ **Quality checks** - Automated suggestions for data improvements
- ✅ **Bulk operations** - Edit multiple products at once

### Analysis
- ✅ **Staple products** - Identify regularly purchased items
- ✅ **Price history** - Track price changes over time
- ✅ **Discount analysis** - See which products go on sale most often
- ✅ **Category spending** - Breakdown spending by food category
- ✅ **Purchase patterns** - Understand weekly, bi-weekly, or monthly habits
- ✅ **Sortable tables** - Sort by any column with pagination

### Shopping List (v3.0)
- ✅ **Auto-generate suggestions** - Appears automatically on page load
- ✅ **Weekly pattern detection** - Identifies items purchased in 90%+ of weeks
- ✅ **Three-action system** - Add, Snooze (7 days), or Dismiss each suggestion
- ✅ **Management sections** - View and restore dismissed/snoozed items
- ✅ **Auto-hide checked items** - Items disappear when checked while shopping
- ✅ **Latest price strategy** - Uses most recent purchase price, not average
- ✅ **Conservative price rounding** - Always rounds UP to .00 or .50
- ✅ **Autocomplete add** - Search from purchase history (shows on typing only)
- ✅ **Priority-based sorting** - WEEKLY items first, then overdue staples
- ✅ **Category grouping** - Items organized by store section
- ✅ **Quantity control** - Adjust quantities with +/- buttons
- ✅ **Price estimation** - Total cost estimation before shopping

## Technical Details

### Parser Architecture

```javascript
parseReceiptText(text, filename)
  → Extract metadata (store, date, time, total)
  → Detect item section boundaries
  → Apply 3 patterns sequentially per line:
      1. Quantity format (QTYst*PRICE)
      2. Simple format (NAME PRICE)
      3. Weight format (WEIGHT*PRICE/UNIT)
  → Link discounts to previous items
  → Return structured receipt object
```

### Regex Patterns

**Pattern 1** (with quantity):
```regex
/^([\wåäöÅÄÖ][\wåäöÅÄÖ\s\/%-]+?)\s+(\d+)\s*st\s*\*\s*([\d,]+)\s+([\d,]+)\s*$/i
```

**Pattern 2** (simple):
```regex
/^([\wåäöÅÄÖ][\wåäöÅÄÖ\s\/%-]+?)\s+([\d,]+)\s*$/i
```

**Pattern 3** (weight-based):
```regex
/^([\wåäöÅÄÖ][\wåäöÅÄÖ\s\/%-]+?)\s+([\d,]+)\s*(?:kg|g)?\s*\*\s*([\d,]+)\s+([\d,]+)\s*$/i
```

## Testing

To verify the parser is working correctly:

1. Enable debug mode
2. Upload a test receipt
3. Check the debug section:
   - Green = Successfully matched
   - Red = Not matched (might be false positive or need new pattern)
4. Verify item count matches your receipt
5. Check that total amount matches

## Analysis Tab

The Analysis tab provides insights into your grocery shopping patterns:
- **Staple Products**: Items purchased regularly (70%+ of months)
- **Category Spending**: Pie chart breakdown by food category
- **Discount Analysis**: Track savings and products frequently on sale
- **Price Trends**: Monitor price changes for specific products over time

## Common Issues

**Q: Analysis tab showing "No Data Yet"?**
A: This was caused by a JavaScript error in product-categories.js. Fixed! The encoding fix function now properly escapes regex metacharacters like "?" before creating regular expressions.

**Q: Some items still missing?**
A: Enable debug mode to see which lines aren't matching. Common causes:
- **Multiple items merged on one line** - Fixed! The parser now detects page breaks and line wraps using both Y coordinate changes and X coordinate jumps. If you still see merged items, please report it.
- **Unusual formatting** - The pattern might need adjustment for specific item formats.

**Q: Swedish characters showing as "?"**
A: This is a PDF encoding issue. The parser now includes "?" in the character class as a fallback, so items like "?PPLE" (ÄPPLE), "MJ?LK" (MJÖLK), and "R?KT" (RÖKT) will still be captured. The name will show with "?" but you can edit it in the table.

**Q: How are PANT (bottle deposits) handled?**
A: PANT fees are added to the previous beverage item's price, not counted as separate items.
Example:
```
APELSINJUICE 2st*34,90 69,80
+PANT ENG PET <=1L 2st*1,00 2,00
```
Result: 2 items (juice) with total price 71,80 (69,80 + 2,00)

This matches how Willys counts items on receipts.

**Q: Wrong section being parsed?**
A: Check debug info to see the detected section boundaries. The receipt might have unusual markers.

**Q: Prices incorrect?**
A: Verify the CSV export. If consistently wrong, check decimal separator handling (comma vs period).

**Q: Cheese/deli items with weight missing?**
A: The parser now handles 3-line formats:
```
GOUDA 28%
Willys Plus:
1,217kg*85,90kr/kg 104,54
```
All three lines are combined into one item.

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

Requires: ES6+ JavaScript, PDF.js library (loaded via CDN)

## Data Privacy

- ⚠️ All processing happens **locally in your browser**
- ⚠️ No data is sent to any server
- ⚠️ Data is stored in browser's localStorage only
- ⚠️ Clear browser data to remove stored receipts

## Development Workflow

### Making Changes/Fixes

**MANDATORY STEPS for every fix:**

1. **Update version number** in the footer (`<footer>` tag near end of file)
   - Increment the version (e.g., v3.58 → v3.59)
   - Version format: `v{major}.{minor}`

2. **Commit changes** with descriptive message
   - Format: `v{version}: Brief description of fix`
   - Example: `v3.59: Fix parser boundary detection for item section`
   - Include details about what was fixed and why

**Why this matters:**
- Version tracking helps identify which fixes are deployed
- Commit history provides audit trail of changes
- Users can report issues with specific version numbers
- Easier to rollback if a fix introduces new issues

**Example workflow:**
```bash
# 1. Make your code changes
# 2. Update version number in footer
# 3. Commit
git add receipt-parser-v2.html
git commit -m "v3.59: Fix parser boundary detection for item section

- Fix startIndex: Find first separator line instead of hardcoded line 5
- Fix endIndex: Detect 'Totalt X varor' without requiring inScanSection flag
- Prevents skipping items and including payment lines as items"
```

## Future Improvements

Possible enhancements:
- Support for other store formats (ICA, Coop, etc.)
- OCR integration for scanned images
- ✅ ~~Category auto-detection~~ (Implemented in v2.0)
- ✅ ~~Price trend analysis~~ (Implemented in v2.0)
- ✅ ~~Monthly spending reports~~ (Implemented in v2.0)
- ✅ ~~Smart shopping list~~ (Implemented in v2.02)
- Seasonal pattern detection
- Store-specific price tracking
- Meal planning integration
- Recipe-based suggestions
- Shared shopping lists (with privacy considerations)
