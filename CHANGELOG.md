# Receipt Parser - Changelog

## v2.02 - 2025-01-23

### Smart Shopping List Features

#### 1. Smart Add Item Modal
Replaced the basic prompt dialog with an intelligent autocomplete modal:

**Features:**
- **Searchable autocomplete** from your purchase history
- **Live filtering** - type to find products you've bought before
- **Product context** - shows category, average price, and purchase count
- **Auto-fill** - selecting a product auto-fills category and estimated price
- **New items** - option to add products not in your history
- **Duplicate prevention** - won't let you add the same item twice

**Location:** Lines 6006-6186 in receipt-parser-v2.html
**Functions:** `addManualItem()`, `showProductSuggestions()`, `filterProductSuggestions()`, `selectProduct()`, `confirmAddManualItem()`

---

#### 2. Smarter Suggestion Algorithm
Completely overhauled the suggestion system with AI-powered intelligence:

**Multi-Level Urgency Scoring:**
- 🔴 **CRITICAL** - Item is 50%+ overdue (red badge, red border)
- ⚠️ **HIGH** - Item is 20%+ overdue (yellow badge, yellow border)
- 🔵 **DUE SOON** - Item approaching purchase date (blue badge, blue border)
- Low urgency items are no longer suggested (reduces noise)

**Complementary Items Detection:**
- Tracks which items you buy together in the same receipt
- **Urgency boost** when related items are already in your shopping list
- Shows "🔗 Often bought with: ..." for context
- Example: Adding milk might boost butter's urgency if you usually buy them together

**Price Awareness:**
- Calculates **min/max/median** prices from your purchase history
- **💰 GOOD DEAL** badge when recent prices are 5%+ below your median
- Shows **price range** to give context
- Helps you decide when to stock up vs when to wait

**Smart Sorting:**
- Primary sort: urgency score (critical > high > medium)
- Complementary boost adds to urgency score
- Secondary sort: days overdue
- Most important items always appear first

**Location:** Lines 5206-5485 in receipt-parser-v2.html
**Functions:** `generateSuggestions()`, `renderSuggestions()`

---

### Technical Details

**Algorithm Changes:**
1. **Co-purchase tracking** - Builds graph of items bought together
2. **Price statistics** - Tracks min/max/median/recent prices
3. **Urgency calculation** - `overdueRatio = daysSince / avgDaysBetween`
4. **Complementary boost** - Adds 1 point per related item in current list
5. **Filtering** - Only suggests items with urgency ≥ medium OR complementary items

**Data Structures:**
```javascript
itemCoBuys = {
  "milk": { "butter": 15, "bread": 12 },
  "butter": { "milk": 15, "eggs": 8 }
}

suggestion = {
  name, brand, productType, storeSection,
  avgPrice, minPrice, maxPrice,
  isGoodDeal,
  daysSince, avgDaysBetween,
  urgency, urgencyScore,
  purchaseCount, complementaryItems
}
```

---

### Files Modified
- `receipt-parser-v2.html` - Development version
- `receipt-parser.html` - Production version
- Version updated: v2.01 → v2.02

---

## v2.01 - 2025-01-23

### Tag Filter Accuracy Fix

**Problem:** Filtering by tag "pizza(livia)" showed all 86 pizza(df) purchases, including items tagged "pizza(barn)" and "pizza(timon)"

**Root Cause:** Tags assigned to raw receipt names but filter showed ALL purchases of standardized product name

**Solution:**
- Changed to only count purchases where `item.name` matches a tagged raw name
- Now processes `allReceipts` directly, filtering by `taggedRawNames` set
- Each tag now shows accurate purchase counts

**Location:** Lines 982-1061 in receipt-parser-v2.html
**Function:** `showProductsByTag(tag)`

**Commit:** d8b1381

---

## v2.0 - 2025-01-23

### Official Release - Removed Experimental Badge

**Changes:**
- Removed "V2 EXPERIMENTAL" from title and header
- Added footer with version number: v2.0
- Organized file structure with backups/ folder
- Created stable backup: `backups/receipt-parser-v2-stable-2025-01-23.html`
- Copied to production: `receipt-parser.html`

**Version Strategy:**
- v2.0 → v2.01, v2.02, etc. (incremental)
- Footer displays current version

**Commits:** 3511c37 (organization), 058ec50 (experimental removal)

---

### Discount Analysis Improvements

**1. Sort by Discount Rate** (Commit: 8d5f122)
- Changed from sorting by total kr saved to discount rate %
- Shows items most frequently on sale first
- Modified in `analysis.js` line 288

**2. Pagination for All Discounts** (Commit: 70689b3)
- Added pagination showing 25 products per page
- Previous/Next controls
- Shows all discounted products, not just top 10

**3. Sortable Columns** (Commit: 7ba16d3)
- Added column sorting to all 4 columns:
  - Product name
  - Total Saved (kr)
  - Times On Sale
  - Discount Rate (%)
- Toggle ascending/descending with visual indicators (▲/▼)

**Location:** Lines 1357-1730 in receipt-parser-v2.html
**Functions:** `renderDiscounts()`, `sortDiscounts(column)`, `changeDiscountsPage(delta)`

---

### Quality Checks - Product Type Capitalization

**Feature:** Detect and fix Product Type capitalization issues

**Detects:**
1. "Other" → suggests "övrigt" (Swedish consistency)
2. Any uppercase in productType → suggests lowercase version
   - Examples: "Snacks" → "snacks", "Pasta" → "pasta"

**Confidence:** High (auto-applies when user clicks "Apply")

**Location:** Lines 3887-3917 in receipt-parser-v2.html
**Function:** `detectOtherProductType(product)`

**Commit:** a5de336

---

### Scroll Position Preservation

**Problem:** Scroll position reset when editing items in Product Library

**Root Cause:** Was targeting `product-library-content` div which doesn't scroll - actual scrolling is on inner div with `max-height: 70vh; overflow-y: auto`

**Solution:**
- Added `id="product-library-scroll-container"` to actual scrolling div
- Updated scroll preservation code to target correct element
- Changed from `setTimeout` to `requestAnimationFrame` for better timing

**Location:** Lines 1645-1697, 2160-2171, 2938-2949
**Commit:** 5c17f86

---

## v2.0-beta - 2025-01-21

### Major Fixes (7 total)

See `FIXES-APPLIED.md` for detailed documentation:

1. Removed Dead Dropdown Functions
2. Created Working Tag Filter Dropdown
3. Standardized Name Calculation
4. Removed Automatic Store Section Changes
5. Cleaned Up Debug Logging
6. Merged Duplicate DOMContentLoaded Handlers

**Files Modified:** `receipt-parser-v2.html`

---

## Version History Summary

| Version | Date | Major Changes |
|---------|------|---------------|
| v2.02 | 2025-01-23 | Smart shopping list: autocomplete add item, intelligent suggestions with urgency scoring, complementary items, price awareness |
| v2.01 | 2025-01-23 | Tag filter accuracy fix |
| v2.0 | 2025-01-23 | Official release, discount analysis improvements, quality checks, scroll fix |
| v2.0-beta | 2025-01-21 | 7 major bug fixes |

---

## Technical Architecture

### Key Files
- **receipt-parser.html** - Production version
- **receipt-parser-v2.html** - Development version
- **analysis.js** - Analysis engine for purchase patterns
- **backups/** - Archived stable versions

### Data Storage (localStorage)
- `allReceipts` - All uploaded receipts
- `customProductMappings_v2` - Product customizations
- `shoppingList_v2` - Shopping list items
- `dismissedSuggestions` - Dismissed shopping suggestions

### Core Systems
1. **Receipt Parser** - PDF parsing and manual entry
2. **Product Library** - Product management and quality checks
3. **Analysis** - Purchase patterns, staples, discounts
4. **Shopping List** - Smart suggestions and manual items
5. **Quality Checks** - Data validation and suggestions

---

End of changelog.
