# Receipt Parser - Changelog

## v3.01 - 2025-01-29

### Product Name Mapping Improvements

**Feature:** Enhanced product name standardization and visibility

#### Bug Fix: Product Library Changes Now Update All Tabs

**Issue:** Changes made in the Product Library tab were not reflected in other tabs (Analysis, Discounted Products, etc.) until the page was refreshed.

**Fix:**
- Added `refreshAnalysis()` call in `updateProductMapping()` - triggers reanalysis when Product Library is edited
- Added `refreshAnalysis()` call in `updateProductCategory()` - updates all tabs when category changes from modal

**Impact:** All product mapping changes (productName, productType, brand, storeSection) now immediately propagate to:
- Analysis tab (categories, product names, price history)
- Discounted Products view
- Shopping List suggestions
- All charts and statistics

**Location:** `receipt-parser-v2.html:2219, 3157`

---

#### Changes Made:

1. **Updated Product Mappings** (`product-categories.js`)
   - Fixed `CLASSICO` → now correctly maps to "Pastasås"
   - Added `DIJONSENAP LJUS 215G` → "Dijonsenap"
   - Added `ESPRESSO KAFFEBÖNOR` → "Espresso kaffebönor"
   - Added `SKÖLJM WHITE PURE` → "Sköljmedel White Pure"

2. **Product Name Auto-Suggestion Patterns** (`receipt-parser-v2.html`)
   - Added pattern for mustard: `SENAP|MUSTARD|DIJON` → "senap"
   - Added pattern for fabric softener: `SKÖLJM|SKÖLJMEDEL|SOFTENER` → "sköljmedel"
   - Changed all auto-generated product names to lowercase (was capitalized)
   - Updated fallback logic to use lowercase instead of capitalized names

3. **Receipt Parser Display Enhancement** (`receipt-parser-v2.html:780-822`)
   - Added product name mapping display below each receipt item
   - Shows 📝 icon with auto-generated product name
   - Shows 🔗 icon with standardized name (if different from product name)
   - Helps identify mapping issues and verify product normalization

**Benefits:**
- Easier to spot incorrect product mappings when parsing receipts
- All product names now consistently lowercase
- Better visibility into the product normalization process
- Reduced confusion from inconsistent capitalization

**Location:**
- `product-categories.js:145-152, 174-192`
- `receipt-parser-v2.html:2617-2685, 789-820`

---

## v3.0 - 2025-01-24

### Major Rebuild - Smart Shopping List Redesign

Complete redesign of the shopping list feature with new workflow and enhanced intelligence.

---

#### 1. Weekly Pattern Detection

**Feature:** Identifies items purchased weekly (90%+ of weeks)
- Calculates percentage of weeks item was purchased
- Top priority in suggestions (WEEKLY badge)
- Shows "Purchased in X% of weeks" for context

**Algorithm:**
- Groups purchases by week from first to last purchase
- Counts unique weeks with purchases
- Calculates (weeks with purchases / total weeks) * 100
- Items ≥ 90% threshold get WEEKLY priority

**Location:** Lines 5238-5258 (calculateWeeklyFrequency function)

---

#### 2. Auto-Generate Suggestions on Page Load

**Feature:** Suggestions appear automatically when receipts are loaded
- No manual "Generate Suggestions" button needed
- Updates automatically when items are added/dismissed/snoozed
- Seamless user experience

**Removed:**
- "💡 Generate Suggestions" button
- "🗑️ Clear Suggestions" button

**Location:** Lines 3150-3157 (DOMContentLoaded handler)

---

#### 3. Three-Action Suggestion System

**Feature:** Three distinct actions for each suggestion
- ➕ **Add** - Add item to shopping list
- 💤 **Snooze** - Hide for 7 days (can extend)
- ❌ **Dismiss** - Hide permanently (can restore)

**Implementation:**
- Snooze stores snoozedUntil date (ISO string)
- Dismiss stores dismissedAt timestamp
- Separate localStorage keys: `dismissedSuggestions_v2`, `snoozedSuggestions_v2`

**Functions:** dismissSuggestion(), snoozeSuggestion(), restoreDismissedSuggestion(), unSnoozeSuggestion(), extendSnoozeSuggestion()

**Location:** Lines 5544-5614

---

#### 4. Price Rounding Algorithm

**Feature:** Always rounds prices UP conservatively
- If > X.50 → round to (X+1).00
- If ≤ X.50 → round to X.50
- If already .00 → keep as-is

**Examples:**
- 44.90 → 45.00
- 12.30 → 12.50
- 15.00 → 15.00
- 23.75 → 24.00

**Location:** Lines 5206-5213 (roundPriceUp function)

---

#### 5. Latest Purchase Data Strategy

**Feature:** Uses most recent purchase price (not average)
- More accurate for products with price variations
- Better for items mapped to multiple receipt variants
- Example: "milk" could be "ARLA MJÖLK" (15.90) or "WILLYS MJÖLK" (12.90) - uses latest

**Add Item Modal:**
- Builds product list from latest purchases
- Applies price rounding
- Dropdown appears only when typing (not on focus)

**Location:** Lines 6302-6343 (addManualItem function)

---

#### 6. Auto-Hide Checked Items

**Feature:** Items disappear immediately when checked
- No need to manually clear checked items
- Keeps list clean while shopping
- "Clear Checked Items" permanently deletes them

**Implementation:**
- Filters out `checked: true` items before rendering
- Shopping list only shows unchecked items
- Stats calculated from unchecked items only

**Location:** Lines 5676-5766 (renderShoppingList function)

---

#### 7. Management Sections

**Feature:** Expandable sections for dismissed and snoozed items

**Dismissed Suggestions:**
- Shows all permanently dismissed items
- Restore button brings item back to suggestions
- Tracks dismissedAt timestamp

**Snoozed Suggestions:**
- Shows items temporarily hidden
- Displays "Returns in X days"
- Un-snooze or extend by 7 days
- Auto-returns after snooze period expires

**Location:** Lines 5805-5875 (renderDismissedList, renderSnoozedList functions)
**UI:** Lines 287-308 (collapsible <details> elements)

---

#### 8. New Suggestion Priority System

**Priority 1: 📅 WEEKLY Items**
- Purchased in 90%+ of weeks
- Green background with WEEKLY badge
- Shows weekly frequency percentage

**Priority 2: ⏰ Overdue Staples**
- From top 50 most-purchased items only
- Overdue based on historical frequency
- Three urgency levels:
  - 🔴 CRITICAL (50%+ overdue)
  - ⚠️ HIGH (20%+ overdue)
  - 🔵 OVERDUE (past due date)

**Removed:**
- "Often bought with" complementary items feature
- Good deal detection

**Location:** Lines 5260-5447 (generateSuggestions function)

---

### Technical Details

**localStorage Structure:**
```javascript
{
  shoppingList_v2: [items],
  dismissedSuggestions_v2: {
    "milk": { dismissedAt: timestamp, name: "Milk" }
  },
  snoozedSuggestions_v2: {
    "butter": {
      snoozedUntil: "2025-01-31T10:00:00.000Z",
      snoozedAt: timestamp,
      name: "Butter"
    }
  }
}
```

**Suggestion Object:**
```javascript
{
  name, storeSection, latestPrice, minPrice, maxPrice,
  daysSince, avgDaysBetween, urgency, priority,
  purchaseCount, weeklyFrequency, isWeekly, overdueRatio
}
```

---

### Files Modified
- `receipt-parser-v2.html` - Development version
- `receipt-parser.html` - Production version
- Version updated: v2.04 → v3.0

---

### Breaking Changes
- Old `dismissedSuggestions` format migrated to `dismissedSuggestions_v2`
- Complementary items feature removed
- Auto-generate means suggestions always present (no manual control)

---

## v2.04 - 2025-01-23

### Fixed "Clear Suggestions" Button Feedback

**Problem:** Clicking "Clear All Suggestions" button gave no visual feedback until page refresh.
- Button executed code correctly but UI didn't update
- User had to refresh page to see suggestions regenerated
- No immediate confirmation that action completed

**Solution:** Added delayed UI update with proper feedback
- Added 100ms setTimeout to ensure shopping list renders before regenerating suggestions
- Shows success message: "X suggested items cleared and suggestions regenerated"
- Immediate visual feedback when button is clicked
- Suggestions section updates automatically

**Location:** Lines 5704-5740 in both files
**Impact:** Better user experience with immediate visual confirmation

---

## v2.03 - 2025-01-23

### Removed Misleading "Good Deal" Feature

**Problem:** The "Good Deal" badge was based on past purchase prices, not current prices.
- Badge showed 💰 GOOD DEAL when recent purchases were below historical median
- Misleading: Suggested buying now based on old prices, not current store prices
- Willys website prices cannot be scraped (JavaScript-rendered, anti-scraping measures)
- No way to validate if prices are actually good deals today

**Solution:** Removed the feature entirely
- Removed `isGoodDeal` calculation comparing recent vs median prices
- Removed 💰 GOOD DEAL badge from suggestion display
- Kept price range information: "~15.90 kr (range: 14.50 - 17.90 kr)"
- Users can make their own informed decisions based on historical context

**Impact:** More honest and accurate suggestions without false claims about current pricing.

---

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
| v3.0 | 2025-01-24 | Major rebuild: weekly pattern detection, auto-generate suggestions, three-action system (Add/Snooze/Dismiss), price rounding, latest purchase data, auto-hide checked items, management sections |
| v2.04 | 2025-01-23 | Fixed "Clear Suggestions" button - immediate visual feedback |
| v2.03 | 2025-01-23 | Removed misleading "good deal" badge (based on past prices, not current) |
| v2.02 | 2025-01-23 | Smart shopping list: autocomplete add item, intelligent suggestions with urgency scoring, complementary items |
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
