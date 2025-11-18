// Product Standardization & Category Mapping
// This file maps receipt variations to standardized product names and categories

// Character encoding fixes for Swedish characters
const ENCODING_FIXES = {
  '?PPLE': 'ÄPPLE',
  'MJ?LK': 'MJÖLK',
  'R?KT': 'RÖKT',
  'BR?D': 'BRÖD',
  'KN?CKEBR?D': 'KNÄCKEBRÖD',
  'GR?NA': 'GRÖNA',
  'G?RDSGODA': 'GÅRDSGODA',
  'SM?R': 'SMÖR',
  'STANDARDMJ?LK': 'STANDARDMJÖLK',
  'P?L?GG': 'PÅLÄGG',
  'POTATISGRAT?NG': 'POTATISGRATÄNG',
  'L?K': 'LÖK',
  'L?NGKORNIGT': 'LÅNGKORNIGT',
  'AVFALLSP?': 'AVFALLSPÅSE',
  'MATL?DA': 'MATLÅDA',
  'SCHWEIZERN?T': 'SCHWEIZERNÖT',
  'KOLSYREPATRON GR?N': 'KOLSYREPATRON GRÖN',
  'INGEF?RA': 'INGEFÄRA',
  'LANTBR?D': 'LANTBRÖD',
  'SPORTBR?D': 'SPORTBRÖD',
  'GREKISKTLANTBR?D': 'GREKISKTLANTBRÖD',
  'SURDEGSBR?D': 'SURDEGSBRÖD',
  'FRANSKT LANTBR?D': 'FRANSKT LANTBRÖD',
  'FR? LEVAIN': 'FRÖ LEVAIN',
  'ROSTBR?D': 'ROSTBRÖD',
  'BOSSES R?GBR?D': 'BOSSES RÅGBRÖD',
  'KR?FTOST': 'KRÄFTOST',
  'GR?D? BR?': 'GRÄDDE BRIE',
  'PUMPAK?RNOR': 'PUMPA KÄRNOR',
  'GR?SL?K': 'GRÄSLÖK',
  'FETA 23?': 'FETA 23%'
};

// Product name standardization - maps variations to standard names
const PRODUCT_MAPPING = {
  // Dairy
  'STANDARDMJÖLK 3%': 'Milk Standard 3%',
  'STANDARDMJÖLK 3? 2st*22,50 45,00': 'Milk Standard 3%',
  'MJÖLK 3? 1L': 'Milk 3%',
  'MJÖLKCHOKLAD': 'Chocolate Milk',

  // Cheese
  'PRÄST MELLAN': 'Präst Cheese Medium',
  'PRÄST MILD': 'Präst Cheese Mild',
  'QUATTROCENTO': 'Quattrocento Cheese',
  'GOUDA 28%': 'Gouda Cheese',
  'EDAMER 23%': 'Edamer Cheese',
  'COULOMMIERS': 'Coulommiers Cheese',
  'PHILADELPHIA VITL/ÖR': 'Philadelphia Cheese',
  'FETAOST': 'Feta Cheese',
  'FETA 23%': 'Feta Cheese',
  'SKINKOST': 'Ham Cheese',
  'BACONOST': 'Bacon Cheese',
  'KRÄFTOST': 'Crayfish Cheese',
  'ELD GOUDA 500G RIV': 'Gouda Shredded',
  'ELD EDAMER 1KG SK': 'Edamer Sliced',

  // Butter & Spreads
  'GÅRDSGODA SMÖR': 'Butter Gårdsgoda',
  'BRE EXTRASALTAT 600G': 'Butter Extra Salted',
  'PEANUT BUTTER': 'Peanut Butter',
  'PEANUT BUTTER CREAMY': 'Peanut Butter Creamy',

  // Bread
  'BOSSES RÅGBRÖD 380G': 'Rye Bread Bosses',
  'SPORTBRÖD SK 800G': 'Sport Bread',
  'SURDEGSLIMPA FRÖ': 'Sourdough Seed',
  'LEVAIN MEDELHAVS': 'Levain Mediterranean',
  'LEVAINBRÖD 600G': 'Levain Bread',
  'CIABATTA STENUGN300G': 'Ciabatta',
  'KNÄCKEBRÖD 550G': 'Crispbread',
  'LANTBRÖD BISTRO': 'Country Bread Bistro',
  'GREKISKTLANTBRÖD560G': 'Greek Country Bread',
  'FRANSKT LANTBRÖD': 'French Country Bread',
  'SURDEGSBRÖD ITALIEN': 'Sourdough Italian',
  'FRÖ LEVAIN 600G': 'Seed Levain',
  'ROSTBRÖD 450G': 'Toast Bread',
  'PAVE NAPOLI 420G': 'Pave Napoli',
  'SESAM/HAVSSALT 130G': 'Sesame Sea Salt Crackers',

  // Meat & Proteins
  'RÖKT KALKON 200G': 'Smoked Turkey',
  'KOKT SKINKA 200G': 'Cooked Ham',
  'LEVERPASTEJ 200G': 'Liver Pate',
  'DELIKATESSKÖTTBULLAR': 'Meatballs Delicatessen',
  'KYCKBRÖFILE STRIM': 'Chicken Breast Strips',
  'KYCKLINGBURGARE': 'Chicken Burgers',

  // Eggs
  'ÄGG 6P UTE M/L': 'Eggs 6-pack',

  // Yogurt
  'MILD NATURELL YOG': 'Yogurt Natural Mild',
  'MILD YOGH NAT 1000G': 'Yogurt Natural Mild 1kg',
  'YOGHURT NAT EKO1.5KG': 'Yogurt Natural Eco',
  'CHOKOMOUSSE 100G': 'Chocolate Mousse',

  // Juice & Beverages
  'APELSINJUICE': 'Orange Juice',
  'JUICE TROPISK 1.75L': 'Tropical Juice',
  'JUIC ÄPP ANA KIW LI': 'Juice Apple Pineapple',
  'JUIC ÄP KÄR JRG SVB': 'Juice Apple Cherry',
  'ÄP/GR/PA/IN 850ML': 'Multi Fruit Juice',

  // Produce
  'COCKTAILTOMATER': 'Cherry Tomatoes',
  'TOMAT BABYPLOMMON': 'Baby Plum Tomatoes',
  'SPETSPAPRIKA 200G': 'Bell Pepper',
  'GURKA IMPORT': 'Cucumber',
  'ROMANSALLAD IMPORT': 'Romaine Lettuce',
  'SALLADSMIX EKO': 'Salad Mix Eco',
  'SPENAT': 'Spinach',
  'BLADSPENAT 450G': 'Spinach Leaves',
  'ÄPPLE GRANNY SMITH': 'Apples Granny Smith',
  'ÄPPLE ROYAL GALA': 'Apples Royal Gala',
  'DRUVOR GRÖNA': 'Green Grapes',
  'INGEFÄRA': 'Ginger',
  'GRÄSLÖK 15G': 'Chives',

  // Frozen
  'PIZZA PEPPERONI': 'Pizza Pepperoni',
  'PIZZA MOZZARELL 355G': 'Pizza Mozzarella',
  'PIZZA SALAMI': 'Pizza Salami',
  'PIZZA PROSCIUTTO': 'Pizza Prosciutto',
  '4 CHEESE': 'Pizza 4 Cheese',
  'PIZZA PE CALAB 540G': 'Pizza Calabrese',
  'FISH & CRISP': 'Fish & Chips',
  'SWEET POTATO FRIES': 'Sweet Potato Fries',
  'BROCCOLI 1KG': 'Broccoli Frozen',
  'PANNKAKOR 14ST': 'Pancakes',

  // Pasta & Grains
  'TORTELLONI RIC/SPE': 'Tortelloni Ricotta',
  'PENNE RIGATE': 'Penne Pasta',
  'BASMATIRIS 2KG': 'Basmati Rice',
  'LÅNGKORNIGT RIS 1KG': 'Long Grain Rice',
  'RASKER 1,1KG': 'Rasker',

  // Sauces & Condiments
  'KROSSADE TOMATER': 'Crushed Tomatoes',
  'REAL MAYONNAIS250ML': 'Real Mayonnaise',
  'GARLIC SAUCE 400G': 'Garlic Sauce',
  'PASTASÅS 400G': 'Pasta Sauce',
  'CLASSICO': 'Classico Sauce',
  'MARMELAD 4 FRUKT284G': 'Marmalade 4 Fruits',
  'LIME PRESSAD 200ML': 'Lime Juice Pressed',

  // Prepared Foods
  'POTATIS SALLAD 200G': 'Potato Salad',
  'POTATISGRATÄNG 800G': 'Potato Gratin',

  // Breakfast & Cereals
  'GRANOLA NATURAL': 'Granola Natural',
  'GRANOLA HAZELNUT': 'Granola Hazelnut',
  'MAJSKAKA 130G CH/HS': 'Corn Cakes',
  'KAKAO': 'Cocoa Powder',

  // Snacks & Sweets
  'CHEEZ DOODLES 120G': 'Cheez Doodles',
  'CHOKLADKAKA MJÖLK': 'Chocolate Bar Milk',
  'SCHWEIZERNÖT 150G': 'Swiss Nuts',
  'M&M PEANUT': 'M&M Peanuts',
  'MENTOS FRUKT 38G': 'Mentos Fruit',
  'TORT CHIPS SALT 500G': 'Tortilla Chips',
  'PUMPA KÄRNOR': 'Pumpkin Seeds',
  'EASYPICK M/L': 'Easy Pick',

  // Pantry
  'LÖK PULVER 570G': 'Onion Powder',
  'SKOGSHONUNG 450G': 'Forest Honey',
  'BAKPAPPER 33X42CM': 'Baking Paper',
  'SAFELOC 1 L': 'Storage Bags',
  'GRAN CREMA HB 1KG': 'Gran Crema Coffee',
  'CREAM LEMON': 'Cream Lemon',

  // Household
  'SERVETT 100P VIT': 'Napkins White',
  'SERVETTER ROSA 100P': 'Napkins Pink',
  'STÄDSERVETT BADRUM': 'Cleaning Cloth Bathroom',
  'STÄDSERVETT GLAS': 'Glass Cleaning Cloth',
  'DISKBORSTE 1P': 'Dish Brush',
  'NORMAL TROSSKYDD': 'Panty Liners',
  'VITT TOALETTPAPPER': 'Toilet Paper White',
  'COLOR FLYTANDE TVÄTT': 'Liquid Detergent Color',
  'HANDDISKMEDEL': 'Dish Soap',
  'AVFALLSPÅSE': 'Garbage Bags',
  'MATLÅDA GRÅ': 'Food Container',
  'KOLSYREPATRON GRÖN': 'CO2 Cartridge',
  'GAS BIOGENIC': 'Gas Biogenic',

  // Personal Care
  'BIG KIDS SMI +6 ÅR': 'Toothbrush Kids',
  'TANDKR50ML J 6-12ÅR': 'Toothpaste Kids',
  'VITAMIN': 'Vitamins',

  // Pet Food
  'KATTMAT1,4KG KAST UT': 'Cat Food 1.4kg',
  'KATTMAT1,4KG KAST IN': 'Cat Food 1.4kg Indoor',

  // Wine & Beverages
  'HENKELL ROSÉVIN': 'Henkell Rosé Wine',

  // Baked Goods
  'SKOTTE 50G': 'Skotte',
  'KANELSN?CKA': 'Cinnamon Bun'
};

// Category mapping
const CATEGORY_MAPPING = {
  // Dairy
  'Milk Standard 3%': 'Dairy',
  'Milk 3%': 'Dairy',
  'Chocolate Milk': 'Dairy',

  // Cheese
  'Präst Cheese Medium': 'Dairy - Cheese',
  'Präst Cheese Mild': 'Dairy - Cheese',
  'Quattrocento Cheese': 'Dairy - Cheese',
  'Gouda Cheese': 'Dairy - Cheese',
  'Edamer Cheese': 'Dairy - Cheese',
  'Coulommiers Cheese': 'Dairy - Cheese',
  'Philadelphia Cheese': 'Dairy - Cheese',
  'Feta Cheese': 'Dairy - Cheese',
  'Ham Cheese': 'Dairy - Cheese',
  'Bacon Cheese': 'Dairy - Cheese',
  'Crayfish Cheese': 'Dairy - Cheese',
  'Gouda Shredded': 'Dairy - Cheese',
  'Edamer Sliced': 'Dairy - Cheese',

  // Butter & Spreads
  'Butter Gårdsgoda': 'Dairy - Butter',
  'Butter Extra Salted': 'Dairy - Butter',
  'Peanut Butter': 'Condiments & Spreads',
  'Peanut Butter Creamy': 'Condiments & Spreads',

  // Bread
  'Rye Bread Bosses': 'Bread & Bakery',
  'Sport Bread': 'Bread & Bakery',
  'Sourdough Seed': 'Bread & Bakery',
  'Levain Mediterranean': 'Bread & Bakery',
  'Levain Bread': 'Bread & Bakery',
  'Ciabatta': 'Bread & Bakery',
  'Crispbread': 'Bread & Bakery',
  'Country Bread Bistro': 'Bread & Bakery',
  'Greek Country Bread': 'Bread & Bakery',
  'French Country Bread': 'Bread & Bakery',
  'Sourdough Italian': 'Bread & Bakery',
  'Seed Levain': 'Bread & Bakery',
  'Toast Bread': 'Bread & Bakery',
  'Pave Napoli': 'Bread & Bakery',
  'Sesame Sea Salt Crackers': 'Bread & Bakery',
  'Cinnamon Bun': 'Bread & Bakery',
  'Skotte': 'Bread & Bakery',

  // Meat
  'Smoked Turkey': 'Meat & Proteins',
  'Cooked Ham': 'Meat & Proteins',
  'Liver Pate': 'Meat & Proteins',
  'Meatballs Delicatessen': 'Meat & Proteins',
  'Chicken Breast Strips': 'Meat & Proteins',
  'Chicken Burgers': 'Meat & Proteins',

  // Eggs
  'Eggs 6-pack': 'Dairy - Eggs',

  // Yogurt
  'Yogurt Natural Mild': 'Dairy - Yogurt',
  'Yogurt Natural Mild 1kg': 'Dairy - Yogurt',
  'Yogurt Natural Eco': 'Dairy - Yogurt',
  'Chocolate Mousse': 'Dairy - Yogurt',

  // Juice
  'Orange Juice': 'Beverages',
  'Tropical Juice': 'Beverages',
  'Juice Apple Pineapple': 'Beverages',
  'Juice Apple Cherry': 'Beverages',
  'Multi Fruit Juice': 'Beverages',

  // Produce
  'Cherry Tomatoes': 'Produce',
  'Baby Plum Tomatoes': 'Produce',
  'Bell Pepper': 'Produce',
  'Cucumber': 'Produce',
  'Romaine Lettuce': 'Produce',
  'Salad Mix Eco': 'Produce',
  'Spinach': 'Produce',
  'Spinach Leaves': 'Produce',
  'Apples Granny Smith': 'Produce',
  'Apples Royal Gala': 'Produce',
  'Green Grapes': 'Produce',
  'Ginger': 'Produce',
  'Chives': 'Produce',

  // Frozen
  'Pizza Pepperoni': 'Frozen Foods',
  'Pizza Mozzarella': 'Frozen Foods',
  'Pizza Salami': 'Frozen Foods',
  'Pizza Prosciutto': 'Frozen Foods',
  'Pizza 4 Cheese': 'Frozen Foods',
  'Pizza Calabrese': 'Frozen Foods',
  'Fish & Chips': 'Frozen Foods',
  'Sweet Potato Fries': 'Frozen Foods',
  'Broccoli Frozen': 'Frozen Foods',
  'Pancakes': 'Frozen Foods',

  // Pasta
  'Tortelloni Ricotta': 'Pantry - Pasta',
  'Penne Pasta': 'Pantry - Pasta',
  'Basmati Rice': 'Pantry - Grains',
  'Long Grain Rice': 'Pantry - Grains',
  'Rasker': 'Pantry - Grains',

  // Sauces
  'Crushed Tomatoes': 'Pantry - Sauces',
  'Real Mayonnaise': 'Condiments & Spreads',
  'Garlic Sauce': 'Pantry - Sauces',
  'Pasta Sauce': 'Pantry - Sauces',
  'Classico Sauce': 'Pantry - Sauces',
  'Marmalade 4 Fruits': 'Condiments & Spreads',
  'Lime Juice Pressed': 'Condiments & Spreads',

  // Prepared
  'Potato Salad': 'Prepared Foods',
  'Potato Gratin': 'Prepared Foods',

  // Breakfast
  'Granola Natural': 'Breakfast & Cereals',
  'Granola Hazelnut': 'Breakfast & Cereals',
  'Corn Cakes': 'Breakfast & Cereals',
  'Cocoa Powder': 'Breakfast & Cereals',

  // Snacks
  'Cheez Doodles': 'Snacks',
  'Chocolate Bar Milk': 'Snacks',
  'Swiss Nuts': 'Snacks',
  'M&M Peanuts': 'Snacks',
  'Mentos Fruit': 'Snacks',
  'Tortilla Chips': 'Snacks',
  'Pumpkin Seeds': 'Snacks',
  'Easy Pick': 'Snacks',

  // Pantry
  'Onion Powder': 'Pantry - Spices',
  'Forest Honey': 'Condiments & Spreads',
  'Baking Paper': 'Household',
  'Storage Bags': 'Household',
  'Gran Crema Coffee': 'Beverages',
  'Cream Lemon': 'Beverages',

  // Household
  'Napkins White': 'Household',
  'Napkins Pink': 'Household',
  'Cleaning Cloth Bathroom': 'Household',
  'Glass Cleaning Cloth': 'Household',
  'Dish Brush': 'Household',
  'Panty Liners': 'Personal Care',
  'Toilet Paper White': 'Household',
  'Liquid Detergent Color': 'Household',
  'Dish Soap': 'Household',
  'Garbage Bags': 'Household',
  'Food Container': 'Household',
  'CO2 Cartridge': 'Household',
  'Gas Biogenic': 'Household',

  // Personal Care
  'Toothbrush Kids': 'Personal Care',
  'Toothpaste Kids': 'Personal Care',
  'Vitamins': 'Personal Care',

  // Pet
  'Cat Food 1.4kg': 'Pet Food',
  'Cat Food 1.4kg Indoor': 'Pet Food',

  // Alcohol
  'Henkell Rosé Wine': 'Alcoholic Beverages'
};

// Function to fix encoding
function fixEncoding(text) {
  let fixed = text;
  for (const [wrong, correct] of Object.entries(ENCODING_FIXES)) {
    fixed = fixed.replace(new RegExp(wrong, 'g'), correct);
  }
  return fixed;
}

// Function to standardize product name
function standardizeProduct(rawName) {
  const fixed = fixEncoding(rawName.toUpperCase().trim());

  // Try exact match first
  if (PRODUCT_MAPPING[fixed]) {
    return PRODUCT_MAPPING[fixed];
  }

  // Try partial matching for products with sizes/variants
  for (const [key, value] of Object.entries(PRODUCT_MAPPING)) {
    if (fixed.includes(key) || key.includes(fixed)) {
      return value;
    }
  }

  // Return original if no match found
  return fixed;
}

// Function to get category
function getCategory(standardizedName) {
  return CATEGORY_MAPPING[standardizedName] || 'Other';
}

// Export for use in HTML
if (typeof window !== 'undefined') {
  window.ProductCategories = {
    fixEncoding,
    standardizeProduct,
    getCategory,
    PRODUCT_MAPPING,
    CATEGORY_MAPPING
  };
}
