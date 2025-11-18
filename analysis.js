// Grocery Receipt Analysis Module
// Processes receipt data to provide insights

class GroceryAnalysis {
  constructor(receipts) {
    this.receipts = receipts || [];
    this.processed = null;
  }

  // Process all receipts for analysis
  processReceipts() {
    if (!this.receipts || this.receipts.length === 0) {
      return null;
    }

    const processed = {
      products: {}, // Product name -> array of purchases
      months: {},   // Month -> array of purchases
      categories: {}, // Category -> array of purchases
      dateRange: { start: null, end: null }
    };

    // Process each receipt
    this.receipts.forEach(receipt => {
      if (!receipt.items || !receipt.date) return;

      const month = receipt.date.substring(0, 7); // YYYY-MM

      // Update date range
      if (!processed.dateRange.start || receipt.date < processed.dateRange.start) {
        processed.dateRange.start = receipt.date;
      }
      if (!processed.dateRange.end || receipt.date > processed.dateRange.end) {
        processed.dateRange.end = receipt.date;
      }

      // Process each item
      receipt.items.forEach(item => {
        // Standardize product name
        const standardName = window.ProductCategories.standardizeProduct(item.name);
        const category = window.ProductCategories.getCategory(standardName);

        const purchase = {
          date: receipt.date,
          time: receipt.time,
          month: month,
          store: receipt.store,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          discount: item.discount,
          standardName: standardName,
          originalName: item.name,
          category: category
        };

        // Add to products index
        if (!processed.products[standardName]) {
          processed.products[standardName] = [];
        }
        processed.products[standardName].push(purchase);

        // Add to months index
        if (!processed.months[month]) {
          processed.months[month] = [];
        }
        processed.months[month].push(purchase);

        // Add to categories index
        if (!processed.categories[category]) {
          processed.categories[category] = [];
        }
        processed.categories[category].push(purchase);
      });
    });

    this.processed = processed;
    return processed;
  }

  // Get staple products (purchased regularly)
  getStapleProducts(minFrequency = 0.7) {
    if (!this.processed) this.processReceipts();
    if (!this.processed) return [];

    const monthCount = Object.keys(this.processed.months).length;
    const minMonths = Math.ceil(monthCount * minFrequency);

    const staples = [];

    for (const [productName, purchases] of Object.entries(this.processed.products)) {
      // Count unique months
      const monthsWithPurchases = new Set(purchases.map(p => p.month));
      const frequency = monthsWithPurchases.size;

      if (frequency >= minMonths) {
        const totalQuantity = purchases.reduce((sum, p) => sum + p.quantity, 0);
        const avgQuantity = totalQuantity / purchases.length;
        const avgPrice = purchases.reduce((sum, p) => sum + p.unitPrice, 0) / purchases.length;
        const totalDiscount = purchases.reduce((sum, p) => sum + p.discount, 0);
        const avgDiscount = totalDiscount / purchases.length;

        staples.push({
          name: productName,
          category: purchases[0].category,
          frequency: frequency,
          totalMonths: monthCount,
          purchaseCount: purchases.length,
          avgQuantity: avgQuantity,
          avgPrice: avgPrice,
          avgDiscount: avgDiscount,
          totalSavings: totalDiscount,
          purchases: purchases
        });
      }
    }

    // Sort by frequency, then by purchase count
    staples.sort((a, b) => {
      if (b.frequency !== a.frequency) {
        return b.frequency - a.frequency;
      }
      return b.purchaseCount - a.purchaseCount;
    });

    return staples;
  }

  // Get price history for a specific product
  getPriceHistory(productName) {
    if (!this.processed) this.processReceipts();
    if (!this.processed || !this.processed.products[productName]) return null;

    const purchases = this.processed.products[productName];

    // Sort by date
    const sorted = [...purchases].sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateA - dateB;
    });

    const prices = sorted.map(p => p.unitPrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;

    // Calculate price change
    const firstPrice = sorted[0].unitPrice;
    const lastPrice = sorted[sorted.length - 1].unitPrice;
    const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;

    // Calculate volatility (standard deviation)
    const variance = prices.reduce((sum, p) => sum + Math.pow(p - avg, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    const volatility = (stdDev / avg) * 100;

    return {
      productName: productName,
      category: sorted[0].category,
      purchases: sorted,
      statistics: {
        min: { price: min, date: sorted.find(p => p.unitPrice === min).date },
        max: { price: max, date: sorted.find(p => p.unitPrice === max).date },
        avg: avg,
        first: firstPrice,
        last: lastPrice,
        priceChange: priceChange,
        volatility: volatility,
        totalDiscount: sorted.reduce((sum, p) => sum + p.discount, 0)
      }
    };
  }

  // Get category spending breakdown
  getCategorySpending(month = null) {
    if (!this.processed) this.processReceipts();
    if (!this.processed) return [];

    let purchases;
    if (month) {
      purchases = this.processed.months[month] || [];
    } else {
      // All purchases
      purchases = Object.values(this.processed.products).flat();
    }

    const categoryTotals = {};

    purchases.forEach(p => {
      if (!categoryTotals[p.category]) {
        categoryTotals[p.category] = {
          category: p.category,
          totalSpent: 0,
          itemCount: 0,
          uniqueProducts: new Set()
        };
      }

      categoryTotals[p.category].totalSpent += p.totalPrice;
      categoryTotals[p.category].itemCount += p.quantity;
      categoryTotals[p.category].uniqueProducts.add(p.standardName);
    });

    // Convert to array and calculate percentages
    const totalSpent = Object.values(categoryTotals).reduce((sum, c) => sum + c.totalSpent, 0);

    const result = Object.values(categoryTotals).map(c => ({
      category: c.category,
      totalSpent: c.totalSpent,
      percentage: (c.totalSpent / totalSpent) * 100,
      itemCount: c.itemCount,
      uniqueProducts: c.uniqueProducts.size
    }));

    // Sort by spending
    result.sort((a, b) => b.totalSpent - a.totalSpent);

    return result;
  }

  // Get monthly category trends
  getCategoryTrends() {
    if (!this.processed) this.processReceipts();
    if (!this.processed) return null;

    const trends = {};
    const months = Object.keys(this.processed.months).sort();

    months.forEach(month => {
      const categorySpending = this.getCategorySpending(month);
      trends[month] = categorySpending;
    });

    return { months, trends };
  }

  // Get discount analysis
  getDiscountAnalysis() {
    if (!this.processed) this.processReceipts();
    if (!this.processed) return null;

    const allPurchases = Object.values(this.processed.products).flat();

    // Total savings
    const totalSavings = allPurchases.reduce((sum, p) => sum + p.discount, 0);

    // Group by month
    const monthlyTransactions = {};
    this.receipts.forEach(r => {
      const month = r.date.substring(0, 7);
      if (!monthlyTransactions[month]) {
        monthlyTransactions[month] = { discount: 0, count: 0 };
      }
      monthlyTransactions[month].discount += r.totalDiscount || 0;
      monthlyTransactions[month].count++;
    });

    const avgPerReceipt = totalSavings / this.receipts.length;

    // Total spending
    const totalSpending = this.receipts.reduce((sum, r) => sum + r.totalAmount, 0);
    const savingsRate = (totalSavings / (totalSpending + totalSavings)) * 100;

    // Top discounted products
    const productDiscounts = Object.entries(this.processed.products)
      .map(([name, purchases]) => {
        const totalDiscount = purchases.reduce((sum, p) => sum + p.discount, 0);
        const timesOnSale = purchases.filter(p => p.discount > 0).length;
        const avgDiscount = timesOnSale > 0 ? totalDiscount / timesOnSale : 0;
        const discountRate = purchases.length > 0 ? (timesOnSale / purchases.length) * 100 : 0;

        return {
          name,
          category: purchases[0].category,
          totalSaved: totalDiscount,
          timesOnSale,
          totalPurchases: purchases.length,
          discountRate,
          avgDiscount
        };
      })
      .filter(p => p.totalSaved > 0)
      .sort((a, b) => b.totalSaved - a.totalSaved);

    return {
      totalSavings,
      avgPerReceipt,
      savingsRate,
      monthlyBreakdown: monthlyTransactions,
      topDiscounted: productDiscounts.slice(0, 20)
    };
  }

  // Get purchase patterns
  getPurchasePatterns() {
    if (!this.processed) this.processReceipts();
    if (!this.processed) return null;

    const patterns = {};

    for (const [productName, purchases] of Object.entries(this.processed.products)) {
      if (purchases.length < 3) continue; // Need at least 3 purchases to detect pattern

      // Sort by date
      const sorted = [...purchases].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      // Calculate average days between purchases
      const intervals = [];
      for (let i = 1; i < sorted.length; i++) {
        const days = (new Date(sorted[i].date) - new Date(sorted[i - 1].date)) / (1000 * 60 * 60 * 24);
        intervals.push(days);
      }

      const avgInterval = intervals.reduce((sum, d) => sum + d, 0) / intervals.length;

      // Determine pattern
      let pattern = 'Irregular';
      if (avgInterval < 10) {
        pattern = 'Weekly';
      } else if (avgInterval < 20) {
        pattern = 'Bi-weekly';
      } else if (avgInterval < 40) {
        pattern = 'Monthly';
      }

      patterns[productName] = {
        name: productName,
        category: sorted[0].category,
        avgDaysBetween: Math.round(avgInterval),
        pattern,
        purchaseCount: purchases.length,
        lastPurchase: sorted[sorted.length - 1].date,
        nextExpected: this.addDays(sorted[sorted.length - 1].date, Math.round(avgInterval))
      };
    }

    return Object.values(patterns).sort((a, b) => a.avgDaysBetween - b.avgDaysBetween);
  }

  // Helper to add days to date
  addDays(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  // Get summary statistics
  getSummaryStats() {
    if (!this.processed) this.processReceipts();
    if (!this.processed) return null;

    const monthCount = Object.keys(this.processed.months).length;
    const productCount = Object.keys(this.processed.products).length;
    const receiptCount = this.receipts.length;
    const totalSpent = this.receipts.reduce((sum, r) => sum + r.totalAmount, 0);
    const totalSaved = this.receipts.reduce((sum, r) => sum + (r.totalDiscount || 0), 0);

    return {
      dateRange: this.processed.dateRange,
      monthCount,
      productCount,
      receiptCount,
      totalSpent,
      totalSaved,
      avgPerReceipt: totalSpent / receiptCount,
      avgPerMonth: totalSpent / monthCount
    };
  }
}

// Export for use in HTML
if (typeof window !== 'undefined') {
  window.GroceryAnalysis = GroceryAnalysis;
}
