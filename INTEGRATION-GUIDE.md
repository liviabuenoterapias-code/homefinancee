# Integration Guide - Grocery Receipt Parser

## Overview

This is a fully functional single-file HTML application (receipt-parser.html) that currently uses browser localStorage. This guide explains how to integrate it into a multi-user web application with proper database backend and authentication.

**Current State:** Single-user, localStorage-based, no authentication
**Target State:** Multi-user hub with database, user authentication, accessible from phone

---

## What This App Does

A comprehensive grocery receipt parser and shopping list manager for Swedish grocery stores (primarily Willys):

1. **Receipt Parser** - Uploads PDF receipts, extracts items, prices, dates
2. **Product Library** - Manages product names, categories, tags, quality checks
3. **Analysis** - Purchase patterns, staples, discounts, price trends
4. **Shopping List** - AI-powered suggestions based on purchase history, manual additions, drag-and-drop reordering

---

## Current Architecture

### Single File Structure
- **receipt-parser.html** - Entire app in one HTML file (~6000+ lines)
- **All JavaScript inline** - No external dependencies except PDF.js (CDN)
- **All CSS inline** - Styled with inline styles and `<style>` blocks
- **localStorage only** - No server communication

### Data Storage Keys

All data currently stored in browser localStorage:

| Key | Description | Structure |
|-----|-------------|-----------|
| `groceryReceipts_v2` | All uploaded receipts | Array of receipt objects |
| `allReceipts` | Legacy key (may still exist) | Array of receipt objects |
| `customProductMappings_v2` | Product Library customizations | Object mapping receipt names to custom data |
| `shoppingList_v2` | Shopping list items | Array of shopping list items |
| `dismissedSuggestions_v2` | Permanently dismissed suggestions | Object mapping product names to dismissal data |
| `snoozedSuggestions_v2` | Temporarily snoozed suggestions | Object mapping product names to snooze data |

---

## Database Schema Requirements

### 1. Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Receipts Table

```sql
CREATE TABLE receipts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  store VARCHAR(100),
  date DATE NOT NULL,
  time TIME,
  total DECIMAL(10,2),
  filename VARCHAR(255),
  raw_text TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, store, date, total) -- Prevent duplicates
);

CREATE INDEX idx_receipts_user_date ON receipts(user_id, date DESC);
```

**JavaScript Object:**
```javascript
{
  id: "uuid-here",
  store: "Willys Farsta",
  date: "2025-01-24",
  time: "14:23:45",
  total: 234.50,
  filename: "willys-receipt-2025-01-24.pdf",
  items: [...] // See items below
}
```

### 3. Receipt Items Table

```sql
CREATE TABLE receipt_items (
  id UUID PRIMARY KEY,
  receipt_id UUID REFERENCES receipts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2),
  discount DECIMAL(10,2) DEFAULT 0,
  discount_type VARCHAR(50), -- e.g., "Willys Plus"
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_items_receipt ON receipt_items(receipt_id);
CREATE INDEX idx_items_name ON receipt_items(name);
```

**JavaScript Object:**
```javascript
{
  id: "uuid-here",
  name: "ARLA MELLANMJÖLK",
  price: 15.90,
  quantity: 2,
  unitPrice: 15.90,
  discount: 3.00,
  discountType: "Willys Plus"
}
```

### 4. Product Mappings Table (Product Library)

```sql
CREATE TABLE product_mappings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receipt_name VARCHAR(255) NOT NULL, -- Raw name from receipt
  product_name VARCHAR(255), -- Custom standardized name
  brand VARCHAR(100),
  product_type VARCHAR(100), -- e.g., "dairy", "produce"
  store_section VARCHAR(100), -- e.g., "kylskap", "frukt"
  tags TEXT[], -- Array of tags
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, receipt_name)
);

CREATE INDEX idx_mappings_user ON product_mappings(user_id);
```

**JavaScript Object:**
```javascript
{
  "ARLA MELLANMJÖLK": {
    productName: "mjölk",
    brand: "arla",
    productType: "dairy",
    storeSection: "kylskap",
    tags: ["livia", "weekly"],
    notes: "Our regular milk"
  }
}
```

### 5. Shopping List Table

```sql
CREATE TABLE shopping_list_items (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100), -- store section
  checked BOOLEAN DEFAULT FALSE,
  quantity INTEGER DEFAULT 1,
  estimated_price DECIMAL(10,2),
  is_recurrent BOOLEAN DEFAULT FALSE, -- AI-suggested vs manual
  sort_order INTEGER DEFAULT 0,
  added_date TIMESTAMP DEFAULT NOW(),
  checked_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_shopping_user ON shopping_list_items(user_id, checked);
```

**JavaScript Object:**
```javascript
{
  id: "1706012345678",
  name: "mjölk",
  category: "kylskap",
  checked: false,
  quantity: 2,
  estimatedPrice: 15.90,
  isRecurrent: true, // Added from AI suggestions
  sortOrder: 3,
  addedDate: "2025-01-24T10:30:00.000Z"
}
```

### 6. Dismissed Suggestions Table

```sql
CREATE TABLE dismissed_suggestions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  dismissed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_name)
);
```

**JavaScript Object:**
```javascript
{
  "milk": {
    dismissedAt: 1737632400000,
    name: "Milk"
  }
}
```

### 7. Snoozed Suggestions Table

```sql
CREATE TABLE snoozed_suggestions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  snoozed_at TIMESTAMP DEFAULT NOW(),
  snoozed_until TIMESTAMP NOT NULL,
  UNIQUE(user_id, product_name)
);
```

**JavaScript Object:**
```javascript
{
  "butter": {
    snoozedAt: 1737632400000,
    snoozedUntil: "2025-01-31T10:00:00.000Z",
    name: "Butter"
  }
}
```

---

## API Endpoints Needed

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Receipts
- `GET /api/receipts` - Get all receipts for current user
- `POST /api/receipts` - Upload new receipt (with PDF processing)
- `PUT /api/receipts/:id` - Update receipt
- `DELETE /api/receipts/:id` - Delete receipt
- `PUT /api/receipts/:id/items/:itemId` - Edit item name inline

### Product Library
- `GET /api/products/mappings` - Get all custom mappings
- `PUT /api/products/mappings` - Save/update mappings
- `GET /api/products/quality-checks` - Get quality check suggestions
- `POST /api/products/export` - Export as JSON/CSV
- `POST /api/products/import` - Import from JSON

### Shopping List
- `GET /api/shopping-list` - Get current shopping list
- `POST /api/shopping-list/items` - Add item
- `PUT /api/shopping-list/items/:id` - Update item (check, quantity, order)
- `DELETE /api/shopping-list/items/:id` - Delete item
- `GET /api/shopping-list/suggestions` - Generate AI suggestions
- `POST /api/shopping-list/dismiss/:productName` - Dismiss suggestion
- `POST /api/shopping-list/snooze/:productName` - Snooze suggestion
- `DELETE /api/shopping-list/dismiss/:productName` - Restore dismissed
- `DELETE /api/shopping-list/snooze/:productName` - Un-snooze

### Analysis
- `GET /api/analysis/staples` - Get staple products
- `GET /api/analysis/discounts` - Get discount analysis
- `GET /api/analysis/categories` - Get category spending
- `GET /api/analysis/price-history/:productName` - Get price trends

---

## Key Functions to Convert

### localStorage Functions → API Calls

**Current (localStorage):**
```javascript
function loadCustomMappings() {
  const saved = localStorage.getItem('customProductMappings_v2');
  return saved ? JSON.parse(saved) : {};
}

function saveCustomMappings(mappings) {
  localStorage.setItem('customProductMappings_v2', JSON.stringify(mappings));
}
```

**Target (API):**
```javascript
async function loadCustomMappings() {
  const response = await fetch('/api/products/mappings', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

async function saveCustomMappings(mappings) {
  await fetch('/api/products/mappings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(mappings)
  });
}
```

### Functions Requiring Conversion

Search for these function names in receipt-parser.html:

| Function | localStorage Key | Target API Endpoint |
|----------|------------------|---------------------|
| `loadShoppingList()` | `shoppingList_v2` | `GET /api/shopping-list` |
| `saveShoppingList()` | `shoppingList_v2` | `PUT /api/shopping-list` |
| `loadCustomMappings()` | `customProductMappings_v2` | `GET /api/products/mappings` |
| `saveCustomMappings()` | `customProductMappings_v2` | `PUT /api/products/mappings` |
| `loadDismissedSuggestionsV3()` | `dismissedSuggestions_v2` | `GET /api/shopping-list/dismissed` |
| `saveDismissedSuggestionsV3()` | `dismissedSuggestions_v2` | `PUT /api/shopping-list/dismissed` |
| `loadSnoozedSuggestionsV3()` | `snoozedSuggestions_v2` | `GET /api/shopping-list/snoozed` |
| `saveSnoozedSuggestionsV3()` | `snoozedSuggestions_v2` | `PUT /api/shopping-list/snoozed` |

**Receipt loading:**
- Around line 325-338: `window.addEventListener('load')` loads from `localStorage.getItem('groceryReceipts_v2')`
- Convert to: `GET /api/receipts` on page load

**Receipt saving:**
- Search for `localStorage.setItem('groceryReceipts_v2'` (multiple places)
- Convert to: `POST /api/receipts` or `PUT /api/receipts/:id`

---

## PDF Processing

**Current:** Client-side using PDF.js CDN
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
```

**Recommendation:** Move to server-side
- User uploads PDF file
- Server processes with PDF.js or similar library
- Server returns extracted text + parsed items
- Client receives structured data

**Benefits:**
- Faster processing
- No large PDF.js library download
- Better error handling
- Can implement queuing for large uploads

**Alternative:** Keep client-side processing if you want to minimize server load

---

## Authentication Integration

### Add to HTML
```html
<script>
// Global auth state
let currentUser = null;
let authToken = null;

// Check authentication on load
async function initAuth() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  authToken = token;
  const response = await fetch('/api/auth/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    return;
  }

  currentUser = await response.json();
  // Continue with app initialization
  loadReceipts();
}

// Call on page load
window.addEventListener('load', initAuth);
</script>
```

### Update All API Calls
Add authentication header to every fetch:
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${authToken}`
}
```

---

## Multi-User Considerations

### 1. Data Isolation
- All queries must filter by `user_id`
- Never expose other users' data
- Use database-level row security if available

### 2. Product Library
- **Option A:** Private per user (current design)
  - Each user has their own product mappings
  - Simple, no sharing concerns

- **Option B:** Shared with override
  - Global product mappings + user overrides
  - More complex, but better for families sharing account

**Recommendation:** Start with Option A (private), add sharing later if needed

### 3. Shopping List Sharing
- **Current:** Single user
- **Future consideration:** Shared list for household
  - Add `household_id` table
  - Allow multiple users in same household
  - Real-time sync with WebSockets

### 4. Receipt Deduplication
- Check for duplicates by: `user_id + store + date + total`
- Show warning if duplicate detected
- Allow user to override if needed

---

## Performance Considerations

### 1. Lazy Loading
Current app loads ALL receipts on page load. For multi-user with hundreds of receipts:
- Implement pagination (e.g., load last 3 months)
- Add "Load More" button
- Use virtual scrolling for large lists

### 2. Analysis Caching
AI suggestions calculation is expensive:
- Cache results for 1 hour
- Invalidate on new receipt upload
- Run suggestion generation in background job

### 3. Search Optimization
Add database indexes on:
- `receipts(user_id, date)`
- `receipt_items(name)`
- `product_mappings(user_id, receipt_name)`

---

## Mobile Responsiveness

Current app is desktop-focused. For phone access:

### CSS Media Queries Needed
```css
@media (max-width: 768px) {
  /* Stack buttons vertically */
  /* Reduce padding */
  /* Make drag handles larger (touch-friendly) */
  /* Simplify tables to cards */
}
```

### Touch Considerations
- Drag and drop works on mobile with touch events
- Make buttons at least 44x44px for touch targets
- Add swipe gestures for common actions (check item, delete)

### Progressive Web App (PWA)
Consider adding:
- Service worker for offline access
- App manifest for "Add to Home Screen"
- Camera integration for receipt capture

---

## Migration Strategy

### Phase 1: Basic Integration
1. Set up database tables
2. Create authentication system
3. Convert localStorage → API calls
4. Test with single user

### Phase 2: Multi-User
1. Add user isolation to all queries
2. Test with multiple users
3. Add receipt deduplication
4. Add user profile/settings

### Phase 3: Mobile Optimization
1. Add responsive CSS
2. Optimize for touch
3. Add PWA features
4. Test on phones

### Phase 4: Advanced Features
1. Real-time sync
2. Shared household lists
3. Receipt photo capture
4. Push notifications for suggestions

---

## Testing Checklist

### Functionality
- [ ] User can log in and see only their receipts
- [ ] PDF upload and parsing works
- [ ] Product Library saves per user
- [ ] Shopping list generates suggestions correctly
- [ ] Drag and drop reordering persists
- [ ] Snooze/dismiss actions work
- [ ] Analysis tab calculates correctly

### Security
- [ ] Users cannot access other users' data
- [ ] Authentication token expires appropriately
- [ ] SQL injection prevention
- [ ] XSS prevention in user input
- [ ] File upload validation (only PDFs)
- [ ] Rate limiting on API endpoints

### Performance
- [ ] Page loads in < 2 seconds
- [ ] Receipt upload processes in < 5 seconds
- [ ] Shopping list renders < 1 second
- [ ] Works with 500+ receipts

### Mobile
- [ ] Responsive on phone screens
- [ ] Touch interactions work smoothly
- [ ] No horizontal scrolling
- [ ] Keyboard doesn't block inputs

---

## File Structure for Hub Integration

```
/app
  /receipt-parser
    index.html          # Main app (current receipt-parser.html)
    /api
      receipts.js       # Receipt API routes
      products.js       # Product Library API routes
      shopping-list.js  # Shopping list API routes
      analysis.js       # Analysis API routes
    /lib
      pdf-processor.js  # Server-side PDF processing
      suggestions.js    # AI suggestion algorithm
    /migrations
      001_create_tables.sql
      002_add_indexes.sql
```

---

## Questions to Decide

1. **Tech Stack:** What backend framework? (Node.js, Python, etc.)
2. **Database:** PostgreSQL, MySQL, or other?
3. **Auth:** Custom, OAuth, or third-party (Auth0, Firebase)?
4. **File Storage:** Where to store uploaded PDFs? (S3, local disk, database)
5. **Hosting:** Where will this run? (Cloud, self-hosted)
6. **Real-time:** Do you need WebSockets for shared lists?

---

## Summary: What He Needs from You

**Send him:**
1. ✅ **receipt-parser.html** - The working PoC
2. ✅ **README.md** - Context and purpose
3. ✅ **CHANGELOG.md** - Feature history and technical details
4. ✅ **SHOPPING-LIST-GUIDE.md** - Detailed feature documentation
5. ✅ **INTEGRATION-GUIDE.md** (this file) - Technical integration specs

**He should read in this order:**
1. README.md - Understand what it does
2. INTEGRATION-GUIDE.md - Understand how to integrate
3. CHANGELOG.md - Understand recent changes
4. Open receipt-parser.html - See it working

---

## Contact / Questions

If he has questions during integration:
- Data structure unclear? Check CHANGELOG.md for implementation details
- Feature behavior unclear? Check SHOPPING-LIST-GUIDE.md
- Algorithm unclear? Search for function name in receipt-parser.html

The entire codebase is searchable since it's a single file!

---

**Version:** 3.0
**Last Updated:** 2025-01-24
**Integration Complexity:** Medium
**Estimated Integration Time:** 2-3 days for basic multi-user, 1-2 weeks for full mobile optimization
