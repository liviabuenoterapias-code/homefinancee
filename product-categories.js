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

// Product name standardization - maps variations to standard Swedish names
const PRODUCT_MAPPING = {
  // Mjölkprodukter (Dairy)
  'STANDARDMJÖLK 3%': 'Standardmjölk 3%',
  'STANDARDMJÖLK 3? 2st*22,50 45,00': 'Standardmjölk 3%',
  'MJÖLK 3? 1L': 'Mjölk 3%',
  'MJÖLKCHOKLAD': 'Chokladmjölk',

  // Ost (Cheese)
  'PRÄST MELLAN': 'Prästost Mellan',
  'PRÄST MILD': 'Prästost Mild',
  'QUATTROCENTO': 'Quattrocento',
  'GOUDA 28%': 'Gouda',
  'EDAMER 23%': 'Edamer',
  'COULOMMIERS': 'Coulommiers',
  'PHILADELPHIA VITL/ÖR': 'Philadelphia',
  'FETAOST': 'Fetaost',
  'FETA 23%': 'Fetaost',
  'SKINKOST': 'Skinkost',
  'BACONOST': 'Baconost',
  'KRÄFTOST': 'Kräftost',
  'ELD GOUDA 500G RIV': 'Riven Gouda',
  'ELD EDAMER 1KG SK': 'Skivad Edamer',

  // Smör & Pålägg (Butter & Spreads)
  'GÅRDSGODA SMÖR': 'Smör Gårdsgoda',
  'BRE EXTRASALTAT 600G': 'Smör Extrasaltat',
  'PEANUT BUTTER': 'Jordnötssmör',
  'PEANUT BUTTER CREAMY': 'Jordnötssmör Creamy',

  // Bröd (Bread)
  'BOSSES RÅGBRÖD 380G': 'Rågbröd Bosses',
  'SPORTBRÖD SK 800G': 'Sportbröd',
  'SURDEGSLIMPA FRÖ': 'Surdegslimpa Frö',
  'LEVAIN MEDELHAVS': 'Levain Medelhavs',
  'LEVAINBRÖD 600G': 'Levainbröd',
  'CIABATTA STENUGN300G': 'Ciabatta',
  'KNÄCKEBRÖD 550G': 'Knäckebröd',
  'LANTBRÖD BISTRO': 'Lantbröd Bistro',
  'GREKISKTLANTBRÖD560G': 'Grekiskt Lantbröd',
  'FRANSKT LANTBRÖD': 'Franskt Lantbröd',
  'SURDEGSBRÖD ITALIEN': 'Surdegsbröd Italien',
  'FRÖ LEVAIN 600G': 'Frö Levain',
  'ROSTBRÖD 450G': 'Rostbröd',
  'PAVE NAPOLI 420G': 'Pave Napoli',
  'SESAM/HAVSSALT 130G': 'Sesam/Havssalt',

  // Kött & Proteiner (Meat & Proteins)
  'RÖKT KALKON 200G': 'Rökt Kalkon',
  'KOKT SKINKA 200G': 'Kokt Skinka',
  'LEVERPASTEJ 200G': 'Leverpastej',
  'DELIKATESSKÖTTBULLAR': 'Delikatessköttbullar',
  'KYCKBRÖFILE STRIM': 'Kycklingbröst Strimlad',
  'KYCKLINGBURGARE': 'Kycklingburgare',

  // Ägg (Eggs)
  'ÄGG 6P UTE M/L': 'Ägg 6-pack',

  // Yoghurt
  'MILD NATURELL YOG': 'Mild Yoghurt Naturell',
  'MILD YOGH NAT 1000G': 'Mild Yoghurt Naturell 1kg',
  'YOGHURT NAT EKO1.5KG': 'Yoghurt Naturell Eko',
  'CHOKOMOUSSE 100G': 'Chokladmousse',

  // Juice & Dryck (Juice & Beverages)
  'APELSINJUICE': 'Apelsinjuice',
  'JUICE TROPISK 1.75L': 'Tropisk Juice',
  'JUIC ÄPP ANA KIW LI': 'Juice Äpple Ananas',
  'JUIC ÄP KÄR JRG SVB': 'Juice Äpple Körsbär',
  'ÄP/GR/PA/IN 850ML': 'Multifruktjuice',

  // Frukt & Grönt (Produce)
  'COCKTAILTOMATER': 'Cocktailtomater',
  'TOMAT BABYPLOMMON': 'Babyplommontomater',
  'SPETSPAPRIKA 200G': 'Spetspaprika',
  'GURKA IMPORT': 'Gurka',
  'ROMANSALLAD IMPORT': 'Romansallad',
  'SALLADSMIX EKO': 'Salladsmix Eko',
  'SPENAT': 'Spenat',
  'BLADSPENAT 450G': 'Bladspenat',
  'ÄPPLE GRANNY SMITH': 'Äpplen Granny Smith',
  'ÄPPLE ROYAL GALA': 'Äpplen Royal Gala',
  'DRUVOR GRÖNA': 'Gröna Druvor',
  'INGEFÄRA': 'Ingefära',
  'GRÄSLÖK 15G': 'Gräslök',

  // Fryst (Frozen)
  'PIZZA PEPPERONI': 'Pizza Pepperoni',
  'PIZZA MOZZARELL 355G': 'Pizza Mozzarella',
  'PIZZA SALAMI': 'Pizza Salami',
  'PIZZA PROSCIUTTO': 'Pizza Prosciutto',
  '4 CHEESE': 'Pizza 4 Cheese',
  'PIZZA PE CALAB 540G': 'Pizza Calabrese',
  'FISH & CRISP': 'Fish & Crisp',
  'SWEET POTATO FRIES': 'Sweet Potato Fries',
  'BROCCOLI 1KG': 'Broccoli Fryst',
  'PANNKAKOR 14ST': 'Pannkakor',

  // Pasta & Gryn (Pasta & Grains)
  'TORTELLONI RIC/SPE': 'Tortelloni Ricotta/Spenat',
  'PENNE RIGATE': 'Penne Rigate',
  'BASMATIRIS 2KG': 'Basmatiris',
  'LÅNGKORNIGT RIS 1KG': 'Långkornigt Ris',
  'RASKER 1,1KG': 'Rasker',

  // Såser & Tillbehör (Sauces & Condiments)
  'KROSSADE TOMATER': 'Krossade Tomater',
  'REAL MAYONNAIS250ML': 'Real Majonnäs',
  'GARLIC SAUCE 400G': 'Vitlökssås',
  'PASTASÅS 400G': 'Pastasås',
  'CLASSICO': 'pastasås',
  'MARMELAD 4 FRUKT284G': 'marmelad',
  'LIME PRESSAD 200ML': 'limejuice',
  'DIJONSENAP LJUS 215G': 'senap',

  // Färdigmat (Prepared Foods)
  'POTATIS SALLAD 200G': 'Potatissallad',
  'POTATISGRATÄNG 800G': 'Potatisgratäng',

  // Frukost & Flingor (Breakfast & Cereals)
  'GRANOLA NATURAL': 'Granola Natural',
  'GRANOLA HAZELNUT': 'Granola Hasselnöt',
  'MAJSKAKA 130G CH/HS': 'Majskakor',
  'KAKAO': 'Kakao',

  // Snacks & Godis (Snacks & Sweets)
  'CHEEZ DOODLES 120G': 'Cheez Doodles',
  'CHOKLADKAKA MJÖLK': 'Chokladkaka Mjölk',
  'SCHWEIZERNÖT 150G': 'Schweizernötter',
  'M&M PEANUT': 'M&M Peanut',
  'MENTOS FRUKT 38G': 'Mentos Frukt',
  'TORT CHIPS SALT 500G': 'Tortilla Chips',
  'PUMPA KÄRNOR': 'Pumpakärnor',
  'EASYPICK M/L': 'Easy Pick',

  // Skafferi (Pantry)
  'LÖK PULVER 570G': 'Lökpulver',
  'SKOGSHONUNG 450G': 'Skogshonung',
  'BAKPAPPER 33X42CM': 'Bakpapper',
  'SAFELOC 1 L': 'safeloc',
  'GRAN CREMA HB 1KG': 'kaffe',
  'ESPRESSO KAFFEBÖNOR': 'kaffe',
  'CREAM LEMON': 'cream lemon',

  // Hushåll (Household)
  'SERVETT 100P VIT': 'Servetter Vita',
  'SERVETTER ROSA 100P': 'Servetter Rosa',
  'STÄDSERVETT BADRUM': 'Städservett Badrum',
  'STÄDSERVETT GLAS': 'Städservett Glas',
  'DISKBORSTE 1P': 'Diskborste',
  'NORMAL TROSSKYDD': 'Trosskydd',
  'VITT TOALETTPAPPER': 'toalettpapper',
  'COLOR FLYTANDE TVÄTT': 'tvättmedel',
  'SKÖLJM WHITE PURE': 'sköljmedel',
  'HANDDISKMEDEL': 'diskmedel',
  'AVFALLSPÅSE': 'Avfallspåsar',
  'MATLÅDA GRÅ': 'Matlåda',
  'KOLSYREPATRON GRÖN': 'Kolsyrepatron',
  'GAS BIOGENIC': 'Gas Biogenic',

  // Personlig Vård (Personal Care)
  'BIG KIDS SMI +6 ÅR': 'Tandborste Barn',
  'TANDKR50ML J 6-12ÅR': 'Tandkräm Barn',
  'VITAMIN': 'Vitamin',

  // Husdjursmat (Pet Food)
  'KATTMAT1,4KG KAST UT': 'Kattmat 1.4kg',
  'KATTMAT1,4KG KAST IN': 'Kattmat 1.4kg Indoor',

  // Vin & Alkohol (Wine & Beverages)
  'HENKELL ROSÉVIN': 'Henkell Rosévin',

  // Bakverk (Baked Goods)
  'SKOTTE 50G': 'Skotte',
  'KANELSN?CKA': 'Kanelsnäcka'
};

// Category mapping (categories in English for grouping)
const CATEGORY_MAPPING = {
  // Mjölkprodukter (Dairy)
  'Standardmjölk 3%': 'Dairy',
  'Mjölk 3%': 'Dairy',
  'Chokladmjölk': 'Dairy',

  // Ost (Cheese)
  'Prästost Mellan': 'Dairy - Cheese',
  'Prästost Mild': 'Dairy - Cheese',
  'Quattrocento': 'Dairy - Cheese',
  'Gouda': 'Dairy - Cheese',
  'Edamer': 'Dairy - Cheese',
  'Coulommiers': 'Dairy - Cheese',
  'Philadelphia': 'Dairy - Cheese',
  'Fetaost': 'Dairy - Cheese',
  'Skinkost': 'Dairy - Cheese',
  'Baconost': 'Dairy - Cheese',
  'Kräftost': 'Dairy - Cheese',
  'Riven Gouda': 'Dairy - Cheese',
  'Skivad Edamer': 'Dairy - Cheese',

  // Smör & Pålägg (Butter & Spreads)
  'Smör Gårdsgoda': 'Dairy - Butter',
  'Smör Extrasaltat': 'Dairy - Butter',
  'Jordnötssmör': 'Condiments & Spreads',
  'Jordnötssmör Creamy': 'Condiments & Spreads',

  // Bröd (Bread)
  'Rågbröd Bosses': 'Bread & Bakery',
  'Sportbröd': 'Bread & Bakery',
  'Surdegslimpa Frö': 'Bread & Bakery',
  'Levain Medelhavs': 'Bread & Bakery',
  'Levainbröd': 'Bread & Bakery',
  'Ciabatta': 'Bread & Bakery',
  'Knäckebröd': 'Bread & Bakery',
  'Lantbröd Bistro': 'Bread & Bakery',
  'Grekiskt Lantbröd': 'Bread & Bakery',
  'Franskt Lantbröd': 'Bread & Bakery',
  'Surdegsbröd Italien': 'Bread & Bakery',
  'Frö Levain': 'Bread & Bakery',
  'Rostbröd': 'Bread & Bakery',
  'Pave Napoli': 'Bread & Bakery',
  'Sesam/Havssalt': 'Bread & Bakery',
  'Kanelsnäcka': 'Bread & Bakery',
  'Skotte': 'Bread & Bakery',

  // Kött & Proteiner (Meat)
  'Rökt Kalkon': 'Meat & Proteins',
  'Kokt Skinka': 'Meat & Proteins',
  'Leverpastej': 'Meat & Proteins',
  'Delikatessköttbullar': 'Meat & Proteins',
  'Kycklingbröst Strimlad': 'Meat & Proteins',
  'Kycklingburgare': 'Meat & Proteins',

  // Ägg (Eggs)
  'Ägg 6-pack': 'Dairy - Eggs',

  // Yoghurt
  'Mild Yoghurt Naturell': 'Dairy - Yogurt',
  'Mild Yoghurt Naturell 1kg': 'Dairy - Yogurt',
  'Yoghurt Naturell Eko': 'Dairy - Yogurt',
  'Chokladmousse': 'Dairy - Yogurt',

  // Juice & Dryck (Juice)
  'Apelsinjuice': 'Beverages',
  'Tropisk Juice': 'Beverages',
  'Juice Äpple Ananas': 'Beverages',
  'Juice Äpple Körsbär': 'Beverages',
  'Multifruktjuice': 'Beverages',

  // Frukt & Grönt (Produce)
  'Cocktailtomater': 'Produce',
  'Babyplommontomater': 'Produce',
  'Spetspaprika': 'Produce',
  'Gurka': 'Produce',
  'Romansallad': 'Produce',
  'Salladsmix Eko': 'Produce',
  'Spenat': 'Produce',
  'Bladspenat': 'Produce',
  'Äpplen Granny Smith': 'Produce',
  'Äpplen Royal Gala': 'Produce',
  'Gröna Druvor': 'Produce',
  'Ingefära': 'Produce',
  'Gräslök': 'Produce',

  // Fryst (Frozen)
  'Pizza Pepperoni': 'Frozen Foods',
  'Pizza Mozzarella': 'Frozen Foods',
  'Pizza Salami': 'Frozen Foods',
  'Pizza Prosciutto': 'Frozen Foods',
  'Pizza 4 Cheese': 'Frozen Foods',
  'Pizza Calabrese': 'Frozen Foods',
  'Fish & Crisp': 'Frozen Foods',
  'Sweet Potato Fries': 'Frozen Foods',
  'Broccoli Fryst': 'Frozen Foods',
  'Pannkakor': 'Frozen Foods',

  // Pasta & Gryn (Pasta)
  'Tortelloni Ricotta/Spenat': 'Pantry - Pasta',
  'Penne Rigate': 'Pantry - Pasta',
  'Basmatiris': 'Pantry - Grains',
  'Långkornigt Ris': 'Pantry - Grains',
  'Rasker': 'Pantry - Grains',

  // Såser & Tillbehör (Sauces)
  'Krossade Tomater': 'Pantry - Sauces',
  'Real Majonnäs': 'Condiments & Spreads',
  'Vitlökssås': 'Pantry - Sauces',
  'Pastasås': 'Pantry - Sauces',
  'Classico': 'Pantry - Sauces',
  'Marmelad 4 Frukter': 'Condiments & Spreads',
  'Limejuice Pressad': 'Condiments & Spreads',

  // Färdigmat (Prepared)
  'Potatissallad': 'Prepared Foods',
  'Potatisgratäng': 'Prepared Foods',

  // Frukost (Breakfast)
  'Granola Natural': 'Breakfast & Cereals',
  'Granola Hasselnöt': 'Breakfast & Cereals',
  'Majskakor': 'Breakfast & Cereals',
  'Kakao': 'Breakfast & Cereals',

  // Snacks & Godis (Snacks)
  'Cheez Doodles': 'Snacks',
  'Chokladkaka Mjölk': 'Snacks',
  'Schweizernötter': 'Snacks',
  'M&M Peanut': 'Snacks',
  'Mentos Frukt': 'Snacks',
  'Tortilla Chips': 'Snacks',
  'Pumpakärnor': 'Snacks',
  'Easy Pick': 'Snacks',

  // Skafferi (Pantry)
  'Lökpulver': 'Pantry - Spices',
  'Skogshonung': 'Condiments & Spreads',
  'Bakpapper': 'Household',
  'Safeloc': 'Household',
  'Gran Crema Kaffe': 'Beverages',
  'Cream Lemon': 'Beverages',

  // Hushåll (Household)
  'Servetter Vita': 'Household',
  'Servetter Rosa': 'Household',
  'Städservett Badrum': 'Household',
  'Städservett Glas': 'Household',
  'Diskborste': 'Household',
  'Trosskydd': 'Personal Care',
  'Toalettpapper Vitt': 'Household',
  'Tvättmedel Color': 'Household',
  'Handdiskmedel': 'Household',
  'Avfallspåsar': 'Household',
  'Matlåda': 'Household',
  'Kolsyrepatron': 'Household',
  'Gas Biogenic': 'Household',

  // Personlig Vård (Personal Care)
  'Tandborste Barn': 'Personal Care',
  'Tandkräm Barn': 'Personal Care',
  'Vitamin': 'Personal Care',

  // Husdjursmat (Pet)
  'Kattmat 1.4kg': 'Pet Food',
  'Kattmat 1.4kg Indoor': 'Pet Food',

  // Vin & Alkohol (Alcohol)
  'Henkell Rosévin': 'Alcoholic Beverages'
};

// Function to fix encoding
function fixEncoding(text) {
  let fixed = text;
  for (const [wrong, correct] of Object.entries(ENCODING_FIXES)) {
    // Escape special regex characters like ? * + . [ ] ( ) etc.
    const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    fixed = fixed.replace(new RegExp(escaped, 'g'), correct);
  }
  return fixed;
}

// Function to standardize product name
function standardizeProduct(rawName) {
  // Check for custom mapping first (from localStorage)
  if (typeof localStorage !== 'undefined') {
    // Use v2 key (new data structure)
    const customMappings = JSON.parse(localStorage.getItem('customProductMappings_v2') || '{}');
    if (customMappings[rawName]) {
      // Check productName first (new structure), then fallback to standardName/shoppingListName (old structure)
      const productName = customMappings[rawName].productName ||
                         customMappings[rawName].shoppingListName ||
                         customMappings[rawName].standardName;
      if (productName) {
        return productName;
      }
    }
  }

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

// Function to get category with keyword-based fallback
function getCategory(standardizedName, rawName = null) {
  // Check for custom mapping first (from localStorage) using raw name if provided
  if (rawName && typeof localStorage !== 'undefined') {
    // Use v2 key (new data structure)
    const customMappings = JSON.parse(localStorage.getItem('customProductMappings_v2') || '{}');
    if (customMappings[rawName]) {
      // Check productType first (new structure), then fallback to category (old structure)
      const productType = customMappings[rawName].productType || customMappings[rawName].category;
      if (productType) {
        return productType;
      }
    }
  }

  // First try exact match
  if (CATEGORY_MAPPING[standardizedName]) {
    return CATEGORY_MAPPING[standardizedName];
  }

  // Fallback: keyword-based detection
  const name = standardizedName.toUpperCase();

  // Dairy products
  if (name.match(/MJÖLK|MILK|YOGH|YOGHURT|FILMJÖLK|GRÄDDE|CREAM/)) {
    return 'Dairy';
  }

  // Cheese
  if (name.match(/OST|CHEESE|BRIE|CHEDDAR|MOZZARELL|FETA|GOUDA|EDAMER|PRÄST/)) {
    return 'Dairy - Cheese';
  }

  // Butter
  if (name.match(/SMÖR|BUTTER|MARGARIN/)) {
    return 'Dairy - Butter';
  }

  // Eggs
  if (name.match(/ÄGG|EGG/)) {
    return 'Dairy - Eggs';
  }

  // Bread & Bakery
  if (name.match(/BRÖD|BREAD|LIMPA|LEVAIN|CIABATTA|BAGEL|BULLE|SNÄCKA|KAKA|COOKIE|CROISSANT|SKOTTE|KNÄCKE|CRISPBREAD/)) {
    return 'Bread & Bakery';
  }

  // Meat & Proteins
  if (name.match(/KÖTT|MEAT|KORV|SAUSAGE|SKINKA|HAM|BACON|SALAMI|FLÄSK|PORK|KALKON|TURKEY|KYCKLING|CHICKEN|KÖTTBULL|MEATBALL|LEVERPASTEJ/)) {
    return 'Meat & Proteins';
  }

  // Fish
  if (name.match(/FISK|FISH|LAX|SALMON|TONFISK|TUNA|SILL|RÄKA|SHRIMP/)) {
    return 'Meat & Proteins';
  }

  // Beverages
  if (name.match(/JUICE|LÄSK|SODA|COLA|FANTA|KAFFE|COFFEE|TE\b|TEA|VATTEN|WATER/)) {
    return 'Beverages';
  }

  // Wine & Alcohol
  if (name.match(/VIN|WINE|ÖL|BEER|CIDER|SPRIT|VODKA|WHISKY/)) {
    return 'Alcoholic Beverages';
  }

  // Produce (Fruits & Vegetables)
  if (name.match(/TOMAT|TOMATO|GURKA|CUCUMBER|SALLAD|LETTUCE|SALAD|PAPRIKA|PEPPER|MOROT|CARROT|LÖK|ONION|POTATIS|POTATO|ÄPPLE|APPLE|BANAN|BANANA|APELSIN|ORANGE|DRUV|GRAPE|AVOKADO|AVOCADO|SPENAT|SPINACH|BROCCOLI|BLOMKÅL|CAULIFLOWER|INGEFÄRA|GINGER|VITLÖK|GARLIC|PERSILJA|PARSLEY|DILL|BASILIKA|BASIL|GRÄSLÖK|CHIVE/)) {
    return 'Produce';
  }

  // Frozen Foods
  if (name.match(/PIZZA|FRYST|FROZEN|POMMES|FRIES|NUGGET|GLASS|ICE.?CREAM/)) {
    return 'Frozen Foods';
  }

  // Pasta & Grains
  if (name.match(/PASTA|PENNE|SPAGHETTI|MAKARONER|TORTELLONI|RAVIOLI|RIS|RICE|QUINOA|COUSCOUS|BULGUR/)) {
    return 'Pantry - Pasta';
  }

  // Sauces & Condiments
  if (name.match(/SÅS|SAUCE|KETCHUP|SENAP|MUSTARD|MAJONNÄS|MAYO|DRESSING|VINÄGER|VINEGAR|OLJA|OIL/)) {
    return 'Pantry - Sauces';
  }

  // Spreads
  if (name.match(/MARMELAD|JAM|HONUNG|HONEY|NUTELLA|JORDNÖT/)) {
    return 'Condiments & Spreads';
  }

  // Breakfast & Cereals
  if (name.match(/FLINGOR|CEREAL|MÜSLI|MUESLI|GRANOLA|HAVREGRYN|OATS|CORNFLAKES/)) {
    return 'Breakfast & Cereals';
  }

  // Snacks
  if (name.match(/CHIPS|DOODLES|CHOKLAD|CHOCOLATE|GODIS|CANDY|SNACKS|NÖTTER|NUTS|POPCORN/)) {
    return 'Snacks';
  }

  // Spices
  if (name.match(/KRYDDA|SPICE|SALT|PEPPAR|PEPPER|PULVER.*LÖK|PULVER.*VITLÖK|CURRY|PAPRIKA.*PULVER/)) {
    return 'Pantry - Spices';
  }

  // Household
  if (name.match(/SERVETT|NAPKIN|PAPPER|PAPER|DISK|DISH|TVÄTT|LAUNDRY|RENGÖR|CLEAN|STÄD|AVFALLS|GARBAGE|TRASH|PÅSE|BAG|FOLIE|WRAP|BAKPAPPER/)) {
    return 'Household';
  }

  // Personal Care
  if (name.match(/TAND|TOOTH|SCHAMPO|SHAMPOO|TVÅL|SOAP|KRÄM|CREAM|LOTION|BINDOR|RAKBLAD|RAZOR|DEODORANT|PARFYM|VITAMIN/)) {
    return 'Personal Care';
  }

  // Pet Food
  if (name.match(/KATT|CAT|HUND|DOG|HUSDJUR|PET/)) {
    return 'Pet Food';
  }

  // Prepared Foods
  if (name.match(/SALLAD.*FÄRDIG|GRATÄNG|GRATIN|LASAGNE|SOPPA|SOUP/)) {
    return 'Prepared Foods';
  }

  // If still no match, return Other
  return 'Other';
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
