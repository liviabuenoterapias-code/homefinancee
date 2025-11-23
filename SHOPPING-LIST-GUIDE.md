# Shopping List Feature Guide

## Overview

The Smart Shopping List uses your purchase history to suggest items you need to buy and helps you add items quickly with autocomplete.

---

## How to Use

### 1. Viewing Your Shopping List

Navigate to the **Shopping List** tab to see:
- **Organized by category** - Items grouped by store section (Dairy, Produce, etc.)
- **Item count per category** - Quick count of unchecked items
- **Total estimate** - Estimated total cost based on average prices

### 2. Adding Items

#### Option A: Use Smart Suggestions
The system automatically suggests items based on your purchase patterns.

**Click "Generate Suggestions"** to see:
- Items you buy regularly that are due or overdue
- Complementary items when you add related products
- Price information and purchase frequency

**Suggestion Badges:**
- 🔴 **CRITICAL** - Item is 50%+ overdue (you really need this!)
- ⚠️ **HIGH** - Item is 20%+ overdue (probably need soon)
- 🔵 **DUE SOON** - Approaching your typical purchase interval
- 💰 **GOOD DEAL** - Recent prices are 5%+ below your historical median

**Actions:**
- **+ Add** - Adds item to your list with estimated price
- **Dismiss** - Hides suggestion (won't show again until next session)

---

#### Option B: Add Items Manually

**Click "+ Add Item"** to open the smart add dialog:

1. **Search from your purchase history:**
   - Type in the search box
   - Results show products you've bought before
   - Displays: product name, category, average price, purchase count
   - Click any product to auto-fill the form

2. **Or add a new item:**
   - Type name in "Or enter new item" field
   - Select category from dropdown
   - Enter estimated price (optional)

3. **Click "Add to List"**

**Features:**
- Duplicate prevention - won't add the same item twice
- Auto-fill category and price for known products
- Search filters in real-time (shows up to 20 matches)

---

### 3. Managing Your List

#### Checking Off Items
- Click checkbox next to item when you put it in your cart
- Checked items appear faded but stay in the list
- Estimated total only includes unchecked items

#### Adjusting Quantities
- Use **−** and **+** buttons to change quantity
- Price estimate updates automatically (quantity × unit price)

#### Removing Items
- Click **Delete** button to remove an item
- Confirmation dialog prevents accidents

#### Clearing Items
- **Clear Checked** - Removes all checked items from list
- **Clear All Suggestions** - Removes only AI-suggested items, keeps manual items

---

## Understanding Suggestions

### How the Algorithm Works

The suggestion system analyzes your purchase history to determine what you likely need:

#### 1. Frequency Analysis
- Calculates average days between purchases for each product
- Tracks when you last bought each item
- Computes "overdue ratio" = days since last purchase ÷ average interval

**Example:**
- You buy milk every 7 days
- Last purchase was 10 days ago
- Overdue ratio: 10 ÷ 7 = 1.43 (43% overdue)
- Urgency: **HIGH** ⚠️

#### 2. Urgency Scoring

| Overdue Ratio | Urgency | Score | Visual |
|---------------|---------|-------|--------|
| ≥ 1.5 (50%+) | Critical | 3 | 🔴 Red background |
| ≥ 1.2 (20%+) | High | 2 | ⚠️ Yellow background |
| ≥ 0.8 (due soon) | Medium | 1 | 🔵 Blue background |
| < 0.8 | Low | 0 | Not suggested |

#### 3. Complementary Items

The system tracks which items you buy together:

**Example Co-Purchase Tracking:**
```
Receipts show you often buy together:
- Milk + Butter (bought together 15 times)
- Milk + Bread (bought together 12 times)
- Butter + Eggs (bought together 8 times)
```

**Smart Boost:**
- If you add Milk to your list manually
- Butter gets +1 urgency boost (you bought them together 15 times)
- Butter now shows: "🔗 Often bought with: Milk"
- This helps you remember companion items

#### 4. Price Awareness

The system analyzes your price history:

**Price Statistics:**
- **Minimum** - Lowest price you've ever paid
- **Maximum** - Highest price you've ever paid
- **Median** - Middle price from all purchases
- **Recent average** - Average of last 3 purchases

**Good Deal Detection:**
- If recent average < median × 0.95 (5% below median)
- Shows **💰 GOOD DEAL** badge
- Suggests stocking up when prices are low

**Example:**
```
Pasta (df) 500g
Historical prices: 12.90, 13.50, 13.50, 13.90, 14.50, 15.00 kr
Median: 13.70 kr
Recent purchases: 12.90, 13.50, 13.50 kr
Recent average: 13.30 kr
13.30 < 13.70 × 0.95 (13.02) ✓ GOOD DEAL!
```

#### 5. Filtering Logic

**Items are suggested if:**
- (Urgency ≥ Medium) **OR** (Complementary items exist)
- **AND** Not dismissed
- **AND** Not already in shopping list
- **AND** In top 50 most frequently purchased products (staples)

**Items are NOT suggested if:**
- Urgency is low AND no complementary items
- You dismissed them in current session
- Already in your shopping list
- Rarely purchased (not in top 50 staples)

---

## Tips & Best Practices

### 1. Regular Check-Ins
- Generate suggestions before each shopping trip
- The system learns from every receipt you upload
- More data = better suggestions

### 2. Dismiss Wisely
- Dismiss items you already have at home
- Dismiss items you don't need this trip
- Dismissed items reset when you click "Clear All Suggestions"

### 3. Manual Additions
- Use manual add for one-time purchases
- Use manual add for items you don't buy regularly
- Manual items are marked as `isRecurrent: false`

### 4. Price Estimates
- Prices are averages from your purchase history
- Use them as rough guides, not exact amounts
- Good for budgeting before you shop

### 5. Complementary Items
- Pay attention to "Often bought with" messages
- These are learned from YOUR shopping patterns
- Helps prevent forgetting companion items

### 6. Good Deal Alerts
- Stock up when you see 💰 GOOD DEAL badge
- Means current prices are below your typical price
- Great for non-perishables you use regularly

---

## Understanding the Display

### Suggestion Card Anatomy

```
┌─────────────────────────────────────────────────┐
│ 🔴 Milk                [CRITICAL] [💰 GOOD DEAL]│
│                                                 │
│ Buy every 7 days • Last bought 12 days ago      │
│ ~15.90 kr (range: 14.50 - 17.90 kr)            │
│ 🔗 Often bought with: Butter, Bread             │
│                                                 │
│                          [+ Add]  [Dismiss]     │
└─────────────────────────────────────────────────┘
```

**Components:**
1. **Icon** - 🔴 Critical, ⚠️ High, 🔵 Due Soon
2. **Product name**
3. **Urgency badge** - CRITICAL, HIGH, or DUE SOON
4. **Deal badge** - 💰 GOOD DEAL (if applicable)
5. **Frequency** - How often you typically buy it
6. **Days since** - Last purchase date
7. **Price info** - Average and range
8. **Complementary** - Items you buy together (if applicable)
9. **Actions** - Add or Dismiss

### Shopping List Item Anatomy

```
┌─────────────────────────────────────────────────┐
│ 🥛 Dairy                                    [3] │
├─────────────────────────────────────────────────┤
│ ☐ Milk                              [−] 1 [+]  │
│    ~15.90 kr                        [Delete]    │
│                                                 │
│ ☐ Butter                            [−] 2 [+]  │
│    ~34.50 kr × 2 = 68.90 kr        [Delete]    │
└─────────────────────────────────────────────────┘
```

**Components:**
1. **Category header** - Store section with unchecked count
2. **Checkbox** - Mark as purchased
3. **Product name** - Faded when checked
4. **Price** - Estimated unit price
5. **Quantity controls** - Minus/Plus buttons
6. **Total** - Shows when quantity > 1
7. **Delete** - Remove from list

---

## Data Privacy

All data is stored locally in your browser:
- **localStorage** - Shopping list, suggestions, dismissals
- **No server** - Nothing is uploaded or shared
- **No tracking** - Your shopping data stays on your device

**To clear all data:**
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Delete `shoppingList_v2` and `dismissedSuggestions`

**To backup your list:**
1. Shopping lists are automatically included in data exports
2. Use Product Library → Export JSON
3. Re-import to restore

---

## Troubleshooting

### "No suggestions available"
**Causes:**
- No receipts uploaded yet
- Insufficient purchase history (need at least 2 purchases per product)
- All items already in your list or dismissed

**Solutions:**
- Upload more receipts
- Click "Clear All Suggestions" to reset dismissals
- Wait until items become due

### Suggestions seem wrong
**Causes:**
- Irregular purchase patterns
- One-time bulk purchases skewing averages
- Recent lifestyle changes

**Solutions:**
- Manually add items you need
- Dismiss incorrect suggestions
- System will adjust as you upload more recent receipts

### Autocomplete doesn't show my product
**Causes:**
- Product not in purchase history
- Product name spelled differently on receipts
- Product not yet standardized in system

**Solutions:**
- Use "Or enter new item" field
- Check Product Library for actual product name
- Use custom product name mapping in Product Library

### Price estimates are off
**Causes:**
- Prices have changed significantly
- Old receipts with outdated prices
- Mix of different sizes/varieties

**Solutions:**
- Estimates are rough guides only
- Use them for relative comparison
- Update will happen as you upload new receipts

---

## Advanced Features

### Session-Based Dismissals
- Dismissed suggestions are saved in localStorage
- Persist until you click "Clear All Suggestions"
- Allows multi-session shopping list building

### Recurrent vs Manual Items
- **Recurrent** - Added from suggestions (`isRecurrent: true`)
- **Manual** - Added manually by you (`isRecurrent: false`)
- "Clear All Suggestions" only removes recurrent items
- Manual items always stay in your list

### Quantity Tracking
- Added in v2.02
- Default quantity: 1
- Minimum quantity: 1 (can't go below)
- Updates estimated total in real-time

---

## Technical Details

### Algorithm Pseudocode

```javascript
function generateSuggestions() {
  // 1. Get top 50 staple products
  staples = getStapleProducts(minFrequency: 0.5)

  // 2. Track co-purchases
  for each receipt:
    products = items in receipt
    for each product pair:
      itemCoBuys[product1][product2]++

  // 3. Calculate urgency
  for each staple product:
    daysSince = today - lastPurchaseDate
    avgInterval = average(daysBetweenPurchases)
    overdueRatio = daysSince / avgInterval

    if overdueRatio >= 1.5: urgency = CRITICAL
    else if overdueRatio >= 1.2: urgency = HIGH
    else if overdueRatio >= 0.8: urgency = MEDIUM
    else: urgency = LOW

  // 4. Check complementary items
  for each product:
    if currentListContains(coBuyProduct):
      urgencyScore += 1
      complementaryItems.add(coBuyProduct)

  // 5. Check prices
  median = calculateMedian(allPrices)
    recentAvg = average(last3Prices)
    if recentAvg < median * 0.95:
      isGoodDeal = true

  // 6. Filter and sort
  suggestions = filter(urgency >= MEDIUM OR hasComplementary)
  sort(urgencyScore DESC, daysSince DESC)
}
```

### Data Structures

```javascript
// Shopping list item
{
  id: "1234567890",
  name: "Milk",
  category: "kylskap",  // store section
  checked: false,
  quantity: 2,
  estimatedPrice: 15.90,
  isRecurrent: true,  // AI-suggested vs manual
  addedDate: "2025-01-23T10:30:00.000Z"
}

// Suggestion object
{
  name: "Milk",
  brand: "Arla",
  productType: "dairy",
  storeSection: "kylskap",
  avgPrice: 15.90,
  minPrice: 14.50,
  maxPrice: 17.90,
  isGoodDeal: true,
  daysSince: 12,
  avgDaysBetween: 7,
  urgency: "critical",  // critical|high|medium|low
  urgencyScore: 3,  // 3=critical, 2=high, 1=medium, 0=low
  purchaseCount: 24,
  complementaryItems: ["Butter", "Bread"]
}

// Co-purchase tracking
{
  "Milk": {
    "Butter": 15,  // bought together 15 times
    "Bread": 12,
    "Eggs": 8
  },
  "Butter": {
    "Milk": 15,
    "Eggs": 8
  }
}

// Dismissed suggestions
{
  "milk": 1737632400000,  // timestamp when dismissed
  "bread": 1737632450000
}
```

---

## Future Enhancements

Potential features for future versions:
- Seasonal pattern detection
- Weekly vs monthly frequency tracking
- Price trend analysis (rising/falling prices)
- Store-specific price tracking
- Shared shopping lists (with privacy considerations)
- Meal planning integration
- Recipe-based suggestions

---

End of Shopping List Guide.
