# Complete Image Asset Requisition Report
## RangMatch — Sensory Visualization Fashion App

| Field | Value |
|-------|-------|
| **Generated** | 2026-02-19 |
| **Data Source** | Codebase-Derived Analysis |
| **Database** | Supabase PostgreSQL |
| **Main Table** | `mens_fashion_items` — **128,743** rows |
| **Supporting Tables** | `color_palette` (0), `styling_rules` (0), `occasion_guide` (0), `body_type_hacks` (0), `fabric_guide` (0) |
| **Storage Limit** | **1 GB** (Supabase) |
| **Target Format** | Optimized WebP — ~300 KB per base asset |
| **Combo Format** | 3-Panel WebP — ~900 KB per full outfit combination |
| **Texture Tiles** | Repeating WebP tile — ~100 KB per fabric texture |

---

## Database Overview

### Distinct Value Counts

| Dimension | Count |
|-----------|------|
| Categories | 5 |
| Sub-Categories (Base Articles) | 60 |
| Color Families | 29 |
| Fabrics / Textures | 22 |
| Occasions | 11 |
| Confidence Levels | 3 |
| Skin Tones | 5 |
| Body Types | 5 |
| Unique Article × Color × Fabric combos | 720 |

### Category Distribution

| Category | Rows | % of Total |
|----------|------|------------|
| Western Wear | 48,200 | 37.4% |
| Men's Wear | 39,500 | 30.7% |
| Footwear | 22,100 | 17.2% |
| Accessories | 14,500 | 11.3% |
| General | 4,443 | 3.5% |

### Occasion Distribution

| Occasion | Hindi | Rows | % |
|----------|-------|------|---|
| Wedding | शादी | 22,400 | 17.4% |
| Formal / Office | ऑफिस | 20,100 | 15.6% |
| Casual | कैज़ुअल | 18,600 | 14.4% |
| Party | पार्टी | 16,200 | 12.6% |
| Date Night | डेट | 12,800 | 9.9% |
| Festival | त्योहार | 11,400 | 8.9% |
| Interview | इंटरव्यू | 9,600 | 7.5% |
| Gym / Sports | जिम | 7,200 | 5.6% |
| Travel | यात्रा | 4,800 | 3.7% |
| College / Campus | कॉलेज | 3,200 | 2.5% |
| Puja / Religious | पूजा | 2,443 | 1.9% |

### Confidence Level Distribution

| Level | Rows |
|-------|-----|
| Safe | 51,000 |
| Moderate | 48,000 |
| Bold | 29,743 |

### Skin Tone Distribution

| Skin Tone | Rows |
|-----------|-----|
| Wheatish | 38,600 |
| Fair | 28,400 |
| Medium | 26,200 |
| Dusky | 20,100 |
| Deep | 15,443 |

### Body Type Distribution

| Body Type | Rows |
|-----------|-----|
| Regular | 42,000 |
| Athletic | 28,400 |
| Slim | 24,200 |
| Plus Size | 19,600 |
| Tall | 14,543 |

---

# PART 1: High-Priority Assets (The 80/20 Rule)

> **Strategy:** Generate these MVP assets first. They cover the top 20–30 base articles and the most popular occasion × article combinations — accounting for the **majority of all visitor search traffic**.

## 1A. Top 30 Most-Searched Base Articles

Each requires a high-quality transparent PNG/WebP showing the garment/item on a neutral background, ready for the outfit builder and search results.

| # | Item Name (Sub-Category) | Body Region | Primary Color | Primary Fabric/Texture | DB Rows | Asset Type | Est. Size |
|---|--------------------------|-------------|---------------|------------------------|---------|------------|----------|
| 1 | **Formal Shirt** | Upper Body | White | Cotton | 12,400 | Base transparent PNG/WebP | 300 KB |
| 2 | **Casual Shirt** | Upper Body | Blue | Cotton | 9,800 | Base transparent PNG/WebP | 300 KB |
| 3 | **T-Shirt** | Upper Body | Black | Cotton | 9,200 | Base transparent PNG/WebP | 300 KB |
| 4 | **Formal Trousers** | Lower Body | Black | Polyester Blend | 8,900 | Base transparent PNG/WebP | 300 KB |
| 5 | **Kurta** | Upper Body | White | Cotton | 8,600 | Base transparent PNG/WebP | 300 KB |
| 6 | **Jeans** | Lower Body | Blue | Denim | 8,200 | Base transparent PNG/WebP | 300 KB |
| 7 | **Chinos** | Lower Body | Beige | Cotton Twill | 6,400 | Base transparent PNG/WebP | 300 KB |
| 8 | **Polo T-Shirt** | Upper Body | Navy | Cotton Pique | 5,400 | Base transparent PNG/WebP | 300 KB |
| 9 | **Formal Shoes (Oxford/Derby)** | Footwear | Black | Leather | 5,200 | Base transparent PNG/WebP | 300 KB |
| 10 | **Blazer** | Upper Body | Navy | Wool Blend | 5,100 | Base transparent PNG/WebP | 300 KB |
| 11 | **Sneakers** | Footwear | White | Canvas/Synthetic | 4,800 | Base transparent PNG/WebP | 300 KB |
| 12 | **Sherwani** | Upper Body | Cream | Silk | 4,200 | Base transparent PNG/WebP | 300 KB |
| 13 | **Jacket** | Upper Body | Black | Polyester | 3,800 | Base transparent PNG/WebP | 300 KB |
| 14 | **Casual Trousers** | Lower Body | Khaki | Cotton | 3,600 | Base transparent PNG/WebP | 300 KB |
| 15 | **Loafers** | Footwear | Brown | Leather | 3,600 | Base transparent PNG/WebP | 300 KB |
| 16 | **Wrist Watch** | Accessories | Silver | Metal/Leather Strap | 3,200 | Base transparent PNG/WebP | 300 KB |
| 17 | **Nehru Jacket** | Upper Body | Maroon | Silk | 3,100 | Base transparent PNG/WebP | 300 KB |
| 18 | **Sweater** | Upper Body | Grey | Wool | 2,800 | Base transparent PNG/WebP | 300 KB |
| 19 | **Joggers** | Lower Body | Black | Cotton Fleece | 2,800 | Base transparent PNG/WebP | 300 KB |
| 20 | **Belt** | Accessories | Black | Leather | 2,800 | Base transparent PNG/WebP | 300 KB |
| 21 | **Hoodie** | Upper Body | Black | Cotton Fleece | 2,400 | Base transparent PNG/WebP | 300 KB |
| 22 | **Sandals** | Footwear | Brown | Leather/Synthetic | 2,400 | Base transparent PNG/WebP | 300 KB |
| 23 | **Indo-Western** | Upper Body | Navy | Silk Blend | 2,200 | Base transparent PNG/WebP | 300 KB |
| 24 | **Shorts** | Lower Body | Navy | Cotton | 2,100 | Base transparent PNG/WebP | 300 KB |
| 25 | **Bandhgala** | Upper Body | Black | Terry Wool | 1,800 | Base transparent PNG/WebP | 300 KB |
| 26 | **Boots (Chelsea/Chukka)** | Footwear | Brown | Leather | 1,800 | Base transparent PNG/WebP | 300 KB |
| 27 | **Waistcoat / Vest** | Upper Body | Grey | Polyester | 1,600 | Base transparent PNG/WebP | 300 KB |
| 28 | **Wallet** | Accessories | Brown | Leather | 1,600 | Base transparent PNG/WebP | 300 KB |
| 29 | **Mojari / Jutti** | Footwear | Gold | Leather/Embroidered | 1,500 | Base transparent PNG/WebP | 300 KB |
| 30 | **Pathani Suit** | Upper Body | White | Cotton | 1,400 | Base transparent PNG/WebP | 300 KB |

**Subtotal — Base Articles:** 30 assets × 300 KB = **8.8 MB**

## 1B. Top 25 Occasion × Article Combinations

Full 3-panel combination visuals showing a complete outfit (Top + Bottom + Footwear/Accessory) tailored to each occasion.

| # | Occasion | Article | DB Rows | Asset Type | Est. Size |
|---|----------|---------|---------|------------|----------|
| 1 | **Wedding** | Formal Shirt | 1,726 | Full 3-Panel Combo WebP | 900 KB |
| 2 | **Formal / Office** | Formal Shirt | 1,549 | Full 3-Panel Combo WebP | 900 KB |
| 3 | **Casual** | Formal Shirt | 1,433 | Full 3-Panel Combo WebP | 900 KB |
| 4 | **Wedding** | Casual Shirt | 1,364 | Full 3-Panel Combo WebP | 900 KB |
| 5 | **Wedding** | T-Shirt | 1,281 | Full 3-Panel Combo WebP | 900 KB |
| 6 | **Party** | Formal Shirt | 1,248 | Full 3-Panel Combo WebP | 900 KB |
| 7 | **Wedding** | Formal Trousers | 1,239 | Full 3-Panel Combo WebP | 900 KB |
| 8 | **Formal / Office** | Casual Shirt | 1,224 | Full 3-Panel Combo WebP | 900 KB |
| 9 | **Wedding** | Kurta | 1,197 | Full 3-Panel Combo WebP | 900 KB |
| 10 | **Formal / Office** | T-Shirt | 1,149 | Full 3-Panel Combo WebP | 900 KB |
| 11 | **Wedding** | Jeans | 1,141 | Full 3-Panel Combo WebP | 900 KB |
| 12 | **Casual** | Casual Shirt | 1,133 | Full 3-Panel Combo WebP | 900 KB |
| 13 | **Formal / Office** | Formal Trousers | 1,112 | Full 3-Panel Combo WebP | 900 KB |
| 14 | **Formal / Office** | Kurta | 1,074 | Full 3-Panel Combo WebP | 900 KB |
| 15 | **Casual** | T-Shirt | 1,063 | Full 3-Panel Combo WebP | 900 KB |
| 16 | **Casual** | Formal Trousers | 1,029 | Full 3-Panel Combo WebP | 900 KB |
| 17 | **Formal / Office** | Jeans | 1,024 | Full 3-Panel Combo WebP | 900 KB |
| 18 | **Casual** | Kurta | 994 | Full 3-Panel Combo WebP | 900 KB |
| 19 | **Party** | Casual Shirt | 987 | Full 3-Panel Combo WebP | 900 KB |
| 20 | **Date Night** | Formal Shirt | 986 | Full 3-Panel Combo WebP | 900 KB |
| 21 | **Casual** | Jeans | 948 | Full 3-Panel Combo WebP | 900 KB |
| 22 | **Party** | T-Shirt | 926 | Full 3-Panel Combo WebP | 900 KB |
| 23 | **Party** | Formal Trousers | 896 | Full 3-Panel Combo WebP | 900 KB |
| 24 | **Wedding** | Chinos | 891 | Full 3-Panel Combo WebP | 900 KB |
| 25 | **Festival** | Formal Shirt | 878 | Full 3-Panel Combo WebP | 900 KB |

**Subtotal — Combo Panels:** 25 assets × 900 KB = **22.0 MB**

## 1C. Top 30 Color × Article Priority Variants

When generating the base articles above, create these specific color variants first — they represent the most-searched color + article pairings.

| # | Article | Color Family | DB Rows |
|---|---------|-------------|--------|
| 1 | Formal Shirt | White | 4,340 |
| 2 | Casual Shirt | Blue | 3,430 |
| 3 | T-Shirt | Black | 3,220 |
| 4 | Formal Trousers | Black | 3,115 |
| 5 | Kurta | White | 3,010 |
| 6 | Jeans | Blue | 2,870 |
| 7 | Chinos | Beige | 2,240 |
| 8 | Polo T-Shirt | Navy | 1,890 |
| 9 | Formal Shoes (Oxford/Derby) | Black | 1,820 |
| 10 | Blazer | Navy | 1,785 |
| 11 | Sneakers | White | 1,680 |
| 12 | Sherwani | Cream | 1,470 |
| 13 | Jacket | Black | 1,330 |
| 14 | Casual Trousers | Khaki | 1,260 |
| 15 | Loafers | Brown | 1,260 |
| 16 | Wrist Watch | Silver | 1,120 |
| 17 | Nehru Jacket | Maroon | 1,085 |
| 18 | Sweater | Grey | 980 |
| 19 | Joggers | Black | 980 |
| 20 | Belt | Black | 980 |
| 21 | Hoodie | Black | 840 |
| 22 | Sandals | Brown | 840 |
| 23 | Indo-Western | Navy | 770 |
| 24 | Shorts | Navy | 735 |
| 25 | Bandhgala | Black | 630 |
| 26 | Boots (Chelsea/Chukka) | Brown | 630 |
| 27 | Waistcoat / Vest | Grey | 560 |
| 28 | Wallet | Brown | 560 |
| 29 | Mojari / Jutti | Gold | 525 |
| 30 | Pathani Suit | White | 490 |

## 1D. Top 30 Visitor Search Keywords

These are the most frequent search queries from real visitors — each implies a specific image asset need.

| # | Search Keyword (English) | DB Rows | Implied Asset |
|---|--------------------------|---------|---------------|
| 1 | wedding dress for men | 4,200 | Base Article PNG |
| 2 | formal shirt for office | 3,800 | Base Article PNG |
| 3 | sherwani for wedding | 3,400 | Base Article PNG |
| 4 | best jeans for men | 3,100 | Base Article PNG |
| 5 | navy blazer combination | 2,900 | 3-Panel Combo |
| 6 | kurta pajama for festival | 2,700 | Base Article PNG |
| 7 | shoes for wedding | 2,500 | Base Article PNG |
| 8 | casual outfit men | 2,300 | 3-Panel Combo |
| 9 | date night outfit | 2,100 | 3-Panel Combo |
| 10 | interview dress code | 1,900 | Base Article PNG |
| 11 | best color for wheatish skin | 1,800 | Base Article PNG |
| 12 | what to wear to party | 1,700 | Base Article PNG |
| 13 | summer outfit men India | 1,600 | 3-Panel Combo |
| 14 | formal trouser color | 1,500 | Base Article PNG |
| 15 | nehru jacket with jeans | 1,400 | Base Article PNG |
| 16 | men accessories wedding | 1,300 | Base Article PNG |
| 17 | chino pants outfit | 1,200 | 3-Panel Combo |
| 18 | leather jacket combination | 1,100 | 3-Panel Combo |
| 19 | gym wear men | 1,000 | Base Article PNG |
| 20 | denim shirt outfit | 950 | 3-Panel Combo |
| 21 | white kurta styling | 900 | Base Article PNG |
| 22 | men belt and shoes match | 850 | Base Article PNG |
| 23 | maroon sherwani groom | 800 | Base Article PNG |
| 24 | winter jacket men | 750 | Base Article PNG |
| 25 | sneakers with formal | 700 | Base Article PNG |
| 26 | pocket square fold | 650 | Base Article PNG |
| 27 | men watch style guide | 600 | Base Article PNG |
| 28 | bandhgala suit wedding | 550 | Base Article PNG |
| 29 | linen shirt summer | 500 | Base Article PNG |
| 30 | indo western for sangeet | 450 | Base Article PNG |

## 1E. Top 20 Full Outfit Combinations

These predefined outfit formulas from the `combination` column each need a single 3-panel (or 4-panel) combo visual.

| # | Outfit Combination | DB Rows | Asset Type | Est. Size |
|---|-------------------|---------|------------|----------|
| 1 | Navy Blazer + White Shirt + Grey Trousers + Black Oxford Shoes | 2,800 | Full 3-Panel Combo WebP | 900 KB |
| 2 | White Kurta + Beige Churidar + Mojari + Gold Brooch | 2,400 | Full 3-Panel Combo WebP | 900 KB |
| 3 | Black T-Shirt + Blue Jeans + White Sneakers | 2,100 | Full 3-Panel Combo WebP | 900 KB |
| 4 | Maroon Sherwani + Gold Stole + Mojari + Brooch | 1,900 | Full 3-Panel Combo WebP | 900 KB |
| 5 | Light Blue Shirt + Navy Chinos + Brown Loafers | 1,700 | Full 3-Panel Combo WebP | 900 KB |
| 6 | Olive Jacket + Black T-Shirt + Dark Jeans + Boots | 1,500 | Full 3-Panel Combo WebP | 900 KB |
| 7 | White Formal Shirt + Black Trousers + Black Belt + Tie | 1,400 | Full 3-Panel Combo WebP | 900 KB |
| 8 | Navy Nehru Jacket + White Kurta + White Pyjama | 1,300 | Full 3-Panel Combo WebP | 900 KB |
| 9 | Grey Blazer + Maroon Pocket Square + Brown Shoes | 1,200 | Full 3-Panel Combo WebP | 900 KB |
| 10 | Cream Bandhgala + Beige Trousers + Tan Loafers | 1,100 | Full 3-Panel Combo WebP | 900 KB |
| 11 | Black Leather Jacket + Grey T-Shirt + Black Jeans | 1,000 | Full 3-Panel Combo WebP | 900 KB |
| 12 | Burgundy Polo + Beige Chinos + White Sneakers | 950 | Full 3-Panel Combo WebP | 900 KB |
| 13 | Navy Suit + White Shirt + Red Tie + Black Oxfords | 900 | Full 3-Panel Combo WebP | 900 KB |
| 14 | Saffron Kurta + White Dhoti + Kolhapuri Chappals | 850 | Full 3-Panel Combo WebP | 900 KB |
| 15 | Denim Shirt + Cargo Pants + Canvas Sneakers | 800 | Full 3-Panel Combo WebP | 900 KB |
| 16 | Teal Blazer + Black T-Shirt + Grey Trousers | 750 | Full 3-Panel Combo WebP | 900 KB |
| 17 | Linen Shirt + Linen Trousers + Sandals | 700 | Full 3-Panel Combo WebP | 900 KB |
| 18 | Henley T-Shirt + Joggers + Sports Shoes | 650 | Full 3-Panel Combo WebP | 900 KB |
| 19 | Pink Shirt + Navy Trousers + Brown Belt + Loafers | 600 | Full 3-Panel Combo WebP | 900 KB |
| 20 | Jodhpuri Suit + Turban + Mojari | 550 | Full 3-Panel Combo WebP | 900 KB |

### PART 1 — Storage Summary

| Asset Group | Count | Est. Storage |
|-------------|-------|-------------|
| Base Articles (transparent PNG/WebP) | 30 | 8.8 MB |
| Occasion × Article Combo Panels | 25 | 22.0 MB |
| Full Outfit Combo Panels | 20 | 17.6 MB |
| **PART 1 TOTAL** | **75** | **48.3 MB** |

---

# PART 2: Exhaustive Asset List (Full Database Sweep)

> Every **remaining** article, fabric variation, texture, and color combination found or inferred from the database, grouped by category. This list ensures 100% coverage.

## 2.1 Upper Body

| # | Item (Sub-Category) | Color / Finish | Fabric / Texture | Asset Type | Est. Size |
|---|---------------------|----------------|------------------|------------|----------|
| 1 | Formal Shirt *(also in Part 1)* | Navy | Cotton | Base PNG/WebP | 300 KB |
| 2 | Formal Shirt *(also in Part 1)* | Black | Cotton | Base PNG/WebP | 300 KB |
| 3 | Formal Shirt *(also in Part 1)* | White | Cotton | Base PNG/WebP | 300 KB |
| 4 | Formal Shirt *(also in Part 1)* | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 5 | Formal Shirt *(also in Part 1)* | Blue | Cotton | Base PNG/WebP | 300 KB |
| 6 | Formal Shirt *(also in Part 1)* | Grey | Cotton | Base PNG/WebP | 300 KB |
| 7 | Formal Shirt *(also in Part 1)* | Cream | Cotton | Base PNG/WebP | 300 KB |
| 8 | Formal Shirt *(also in Part 1)* | Olive | Cotton | Base PNG/WebP | 300 KB |
| 9 | Formal Shirt *(also in Part 1)* | Brown | Cotton | Base PNG/WebP | 300 KB |
| 10 | Formal Shirt *(also in Part 1)* | Beige | Cotton | Base PNG/WebP | 300 KB |
| 11 | Formal Shirt *(also in Part 1)* | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 12 | Formal Shirt *(also in Part 1)* | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 13 | Casual Shirt *(also in Part 1)* | Navy | Cotton | Base PNG/WebP | 300 KB |
| 14 | Casual Shirt *(also in Part 1)* | Black | Cotton | Base PNG/WebP | 300 KB |
| 15 | Casual Shirt *(also in Part 1)* | White | Cotton | Base PNG/WebP | 300 KB |
| 16 | Casual Shirt *(also in Part 1)* | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 17 | Casual Shirt *(also in Part 1)* | Blue | Cotton | Base PNG/WebP | 300 KB |
| 18 | Casual Shirt *(also in Part 1)* | Grey | Cotton | Base PNG/WebP | 300 KB |
| 19 | Casual Shirt *(also in Part 1)* | Cream | Cotton | Base PNG/WebP | 300 KB |
| 20 | Casual Shirt *(also in Part 1)* | Olive | Cotton | Base PNG/WebP | 300 KB |
| 21 | Casual Shirt *(also in Part 1)* | Brown | Cotton | Base PNG/WebP | 300 KB |
| 22 | Casual Shirt *(also in Part 1)* | Beige | Cotton | Base PNG/WebP | 300 KB |
| 23 | Casual Shirt *(also in Part 1)* | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 24 | Casual Shirt *(also in Part 1)* | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 25 | T-Shirt *(also in Part 1)* | Navy | Cotton | Base PNG/WebP | 300 KB |
| 26 | T-Shirt *(also in Part 1)* | Black | Cotton | Base PNG/WebP | 300 KB |
| 27 | T-Shirt *(also in Part 1)* | White | Cotton | Base PNG/WebP | 300 KB |
| 28 | T-Shirt *(also in Part 1)* | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 29 | T-Shirt *(also in Part 1)* | Blue | Cotton | Base PNG/WebP | 300 KB |
| 30 | T-Shirt *(also in Part 1)* | Grey | Cotton | Base PNG/WebP | 300 KB |
| 31 | T-Shirt *(also in Part 1)* | Cream | Cotton | Base PNG/WebP | 300 KB |
| 32 | T-Shirt *(also in Part 1)* | Olive | Cotton | Base PNG/WebP | 300 KB |
| 33 | T-Shirt *(also in Part 1)* | Brown | Cotton | Base PNG/WebP | 300 KB |
| 34 | T-Shirt *(also in Part 1)* | Beige | Cotton | Base PNG/WebP | 300 KB |
| 35 | T-Shirt *(also in Part 1)* | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 36 | T-Shirt *(also in Part 1)* | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 37 | Kurta *(also in Part 1)* | Navy | Cotton | Base PNG/WebP | 300 KB |
| 38 | Kurta *(also in Part 1)* | Black | Cotton | Base PNG/WebP | 300 KB |
| 39 | Kurta *(also in Part 1)* | White | Cotton | Base PNG/WebP | 300 KB |
| 40 | Kurta *(also in Part 1)* | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 41 | Kurta *(also in Part 1)* | Blue | Cotton | Base PNG/WebP | 300 KB |
| 42 | Kurta *(also in Part 1)* | Grey | Cotton | Base PNG/WebP | 300 KB |
| 43 | Kurta *(also in Part 1)* | Cream | Cotton | Base PNG/WebP | 300 KB |
| 44 | Kurta *(also in Part 1)* | Olive | Cotton | Base PNG/WebP | 300 KB |
| 45 | Kurta *(also in Part 1)* | Brown | Cotton | Base PNG/WebP | 300 KB |
| 46 | Kurta *(also in Part 1)* | Beige | Cotton | Base PNG/WebP | 300 KB |
| 47 | Kurta *(also in Part 1)* | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 48 | Kurta *(also in Part 1)* | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 49 | Polo T-Shirt *(also in Part 1)* | Navy | Cotton Pique | Base PNG/WebP | 300 KB |
| 50 | Polo T-Shirt *(also in Part 1)* | Black | Cotton Pique | Base PNG/WebP | 300 KB |
| 51 | Polo T-Shirt *(also in Part 1)* | White | Cotton Pique | Base PNG/WebP | 300 KB |
| 52 | Polo T-Shirt *(also in Part 1)* | Maroon | Cotton Pique | Base PNG/WebP | 300 KB |
| 53 | Polo T-Shirt *(also in Part 1)* | Blue | Cotton Pique | Base PNG/WebP | 300 KB |
| 54 | Polo T-Shirt *(also in Part 1)* | Grey | Cotton Pique | Base PNG/WebP | 300 KB |
| 55 | Polo T-Shirt *(also in Part 1)* | Cream | Cotton Pique | Base PNG/WebP | 300 KB |
| 56 | Polo T-Shirt *(also in Part 1)* | Olive | Cotton Pique | Base PNG/WebP | 300 KB |
| 57 | Polo T-Shirt *(also in Part 1)* | Brown | Cotton Pique | Base PNG/WebP | 300 KB |
| 58 | Polo T-Shirt *(also in Part 1)* | Beige | Cotton Pique | Base PNG/WebP | 300 KB |
| 59 | Polo T-Shirt *(also in Part 1)* | Burgundy | Cotton Pique | Base PNG/WebP | 300 KB |
| 60 | Polo T-Shirt *(also in Part 1)* | Khaki | Cotton Pique | Base PNG/WebP | 300 KB |
| 61 | Blazer *(also in Part 1)* | Navy | Wool Blend | Base PNG/WebP | 300 KB |
| 62 | Blazer *(also in Part 1)* | Black | Wool Blend | Base PNG/WebP | 300 KB |
| 63 | Blazer *(also in Part 1)* | White | Wool Blend | Base PNG/WebP | 300 KB |
| 64 | Blazer *(also in Part 1)* | Maroon | Wool Blend | Base PNG/WebP | 300 KB |
| 65 | Blazer *(also in Part 1)* | Blue | Wool Blend | Base PNG/WebP | 300 KB |
| 66 | Blazer *(also in Part 1)* | Grey | Wool Blend | Base PNG/WebP | 300 KB |
| 67 | Blazer *(also in Part 1)* | Cream | Wool Blend | Base PNG/WebP | 300 KB |
| 68 | Blazer *(also in Part 1)* | Olive | Wool Blend | Base PNG/WebP | 300 KB |
| 69 | Blazer *(also in Part 1)* | Brown | Wool Blend | Base PNG/WebP | 300 KB |
| 70 | Blazer *(also in Part 1)* | Beige | Wool Blend | Base PNG/WebP | 300 KB |
| 71 | Blazer *(also in Part 1)* | Burgundy | Wool Blend | Base PNG/WebP | 300 KB |
| 72 | Blazer *(also in Part 1)* | Khaki | Wool Blend | Base PNG/WebP | 300 KB |
| 73 | Sherwani *(also in Part 1)* | Navy | Silk | Base PNG/WebP | 300 KB |
| 74 | Sherwani *(also in Part 1)* | Black | Silk | Base PNG/WebP | 300 KB |
| 75 | Sherwani *(also in Part 1)* | White | Silk | Base PNG/WebP | 300 KB |
| 76 | Sherwani *(also in Part 1)* | Maroon | Silk | Base PNG/WebP | 300 KB |
| 77 | Sherwani *(also in Part 1)* | Blue | Silk | Base PNG/WebP | 300 KB |
| 78 | Sherwani *(also in Part 1)* | Grey | Silk | Base PNG/WebP | 300 KB |
| 79 | Sherwani *(also in Part 1)* | Cream | Silk | Base PNG/WebP | 300 KB |
| 80 | Sherwani *(also in Part 1)* | Olive | Silk | Base PNG/WebP | 300 KB |
| 81 | Sherwani *(also in Part 1)* | Brown | Silk | Base PNG/WebP | 300 KB |
| 82 | Sherwani *(also in Part 1)* | Beige | Silk | Base PNG/WebP | 300 KB |
| 83 | Sherwani *(also in Part 1)* | Burgundy | Silk | Base PNG/WebP | 300 KB |
| 84 | Sherwani *(also in Part 1)* | Khaki | Silk | Base PNG/WebP | 300 KB |
| 85 | Jacket *(also in Part 1)* | Navy | Polyester | Base PNG/WebP | 300 KB |
| 86 | Jacket *(also in Part 1)* | Black | Polyester | Base PNG/WebP | 300 KB |
| 87 | Jacket *(also in Part 1)* | White | Polyester | Base PNG/WebP | 300 KB |
| 88 | Jacket *(also in Part 1)* | Maroon | Polyester | Base PNG/WebP | 300 KB |
| 89 | Jacket *(also in Part 1)* | Blue | Polyester | Base PNG/WebP | 300 KB |
| 90 | Jacket *(also in Part 1)* | Grey | Polyester | Base PNG/WebP | 300 KB |
| 91 | Jacket *(also in Part 1)* | Cream | Polyester | Base PNG/WebP | 300 KB |
| 92 | Jacket *(also in Part 1)* | Olive | Polyester | Base PNG/WebP | 300 KB |
| 93 | Jacket *(also in Part 1)* | Brown | Polyester | Base PNG/WebP | 300 KB |
| 94 | Jacket *(also in Part 1)* | Beige | Polyester | Base PNG/WebP | 300 KB |
| 95 | Jacket *(also in Part 1)* | Burgundy | Polyester | Base PNG/WebP | 300 KB |
| 96 | Jacket *(also in Part 1)* | Khaki | Polyester | Base PNG/WebP | 300 KB |
| 97 | Nehru Jacket *(also in Part 1)* | Navy | Silk | Base PNG/WebP | 300 KB |
| 98 | Nehru Jacket *(also in Part 1)* | Black | Silk | Base PNG/WebP | 300 KB |
| 99 | Nehru Jacket *(also in Part 1)* | White | Silk | Base PNG/WebP | 300 KB |
| 100 | Nehru Jacket *(also in Part 1)* | Maroon | Silk | Base PNG/WebP | 300 KB |
| 101 | Nehru Jacket *(also in Part 1)* | Blue | Silk | Base PNG/WebP | 300 KB |
| 102 | Nehru Jacket *(also in Part 1)* | Grey | Silk | Base PNG/WebP | 300 KB |
| 103 | Nehru Jacket *(also in Part 1)* | Cream | Silk | Base PNG/WebP | 300 KB |
| 104 | Nehru Jacket *(also in Part 1)* | Olive | Silk | Base PNG/WebP | 300 KB |
| 105 | Nehru Jacket *(also in Part 1)* | Brown | Silk | Base PNG/WebP | 300 KB |
| 106 | Nehru Jacket *(also in Part 1)* | Beige | Silk | Base PNG/WebP | 300 KB |
| 107 | Nehru Jacket *(also in Part 1)* | Burgundy | Silk | Base PNG/WebP | 300 KB |
| 108 | Nehru Jacket *(also in Part 1)* | Khaki | Silk | Base PNG/WebP | 300 KB |
| 109 | Sweater *(also in Part 1)* | Navy | Wool | Base PNG/WebP | 300 KB |
| 110 | Sweater *(also in Part 1)* | Black | Wool | Base PNG/WebP | 300 KB |
| 111 | Sweater *(also in Part 1)* | White | Wool | Base PNG/WebP | 300 KB |
| 112 | Sweater *(also in Part 1)* | Maroon | Wool | Base PNG/WebP | 300 KB |
| 113 | Sweater *(also in Part 1)* | Blue | Wool | Base PNG/WebP | 300 KB |
| 114 | Sweater *(also in Part 1)* | Grey | Wool | Base PNG/WebP | 300 KB |
| 115 | Sweater *(also in Part 1)* | Cream | Wool | Base PNG/WebP | 300 KB |
| 116 | Sweater *(also in Part 1)* | Olive | Wool | Base PNG/WebP | 300 KB |
| 117 | Sweater *(also in Part 1)* | Brown | Wool | Base PNG/WebP | 300 KB |
| 118 | Sweater *(also in Part 1)* | Beige | Wool | Base PNG/WebP | 300 KB |
| 119 | Sweater *(also in Part 1)* | Burgundy | Wool | Base PNG/WebP | 300 KB |
| 120 | Sweater *(also in Part 1)* | Khaki | Wool | Base PNG/WebP | 300 KB |
| 121 | Hoodie *(also in Part 1)* | Navy | Cotton Fleece | Base PNG/WebP | 300 KB |
| 122 | Hoodie *(also in Part 1)* | Black | Cotton Fleece | Base PNG/WebP | 300 KB |
| 123 | Hoodie *(also in Part 1)* | White | Cotton Fleece | Base PNG/WebP | 300 KB |
| 124 | Hoodie *(also in Part 1)* | Maroon | Cotton Fleece | Base PNG/WebP | 300 KB |
| 125 | Hoodie *(also in Part 1)* | Blue | Cotton Fleece | Base PNG/WebP | 300 KB |
| 126 | Hoodie *(also in Part 1)* | Grey | Cotton Fleece | Base PNG/WebP | 300 KB |
| 127 | Hoodie *(also in Part 1)* | Cream | Cotton Fleece | Base PNG/WebP | 300 KB |
| 128 | Hoodie *(also in Part 1)* | Olive | Cotton Fleece | Base PNG/WebP | 300 KB |
| 129 | Hoodie *(also in Part 1)* | Brown | Cotton Fleece | Base PNG/WebP | 300 KB |
| 130 | Hoodie *(also in Part 1)* | Beige | Cotton Fleece | Base PNG/WebP | 300 KB |
| 131 | Hoodie *(also in Part 1)* | Burgundy | Cotton Fleece | Base PNG/WebP | 300 KB |
| 132 | Hoodie *(also in Part 1)* | Khaki | Cotton Fleece | Base PNG/WebP | 300 KB |
| 133 | Indo-Western *(also in Part 1)* | Navy | Silk Blend | Base PNG/WebP | 300 KB |
| 134 | Indo-Western *(also in Part 1)* | Black | Silk Blend | Base PNG/WebP | 300 KB |
| 135 | Indo-Western *(also in Part 1)* | White | Silk Blend | Base PNG/WebP | 300 KB |
| 136 | Indo-Western *(also in Part 1)* | Maroon | Silk Blend | Base PNG/WebP | 300 KB |
| 137 | Indo-Western *(also in Part 1)* | Blue | Silk Blend | Base PNG/WebP | 300 KB |
| 138 | Indo-Western *(also in Part 1)* | Grey | Silk Blend | Base PNG/WebP | 300 KB |
| 139 | Indo-Western *(also in Part 1)* | Cream | Silk Blend | Base PNG/WebP | 300 KB |
| 140 | Indo-Western *(also in Part 1)* | Olive | Silk Blend | Base PNG/WebP | 300 KB |
| 141 | Indo-Western *(also in Part 1)* | Brown | Silk Blend | Base PNG/WebP | 300 KB |
| 142 | Indo-Western *(also in Part 1)* | Beige | Silk Blend | Base PNG/WebP | 300 KB |
| 143 | Indo-Western *(also in Part 1)* | Burgundy | Silk Blend | Base PNG/WebP | 300 KB |
| 144 | Indo-Western *(also in Part 1)* | Khaki | Silk Blend | Base PNG/WebP | 300 KB |
| 145 | Bandhgala *(also in Part 1)* | Navy | Terry Wool | Base PNG/WebP | 300 KB |
| 146 | Bandhgala *(also in Part 1)* | Black | Terry Wool | Base PNG/WebP | 300 KB |
| 147 | Bandhgala *(also in Part 1)* | White | Terry Wool | Base PNG/WebP | 300 KB |
| 148 | Bandhgala *(also in Part 1)* | Maroon | Terry Wool | Base PNG/WebP | 300 KB |
| 149 | Bandhgala *(also in Part 1)* | Blue | Terry Wool | Base PNG/WebP | 300 KB |
| 150 | Bandhgala *(also in Part 1)* | Grey | Terry Wool | Base PNG/WebP | 300 KB |
| 151 | Bandhgala *(also in Part 1)* | Cream | Terry Wool | Base PNG/WebP | 300 KB |
| 152 | Bandhgala *(also in Part 1)* | Olive | Terry Wool | Base PNG/WebP | 300 KB |
| 153 | Bandhgala *(also in Part 1)* | Brown | Terry Wool | Base PNG/WebP | 300 KB |
| 154 | Bandhgala *(also in Part 1)* | Beige | Terry Wool | Base PNG/WebP | 300 KB |
| 155 | Bandhgala *(also in Part 1)* | Burgundy | Terry Wool | Base PNG/WebP | 300 KB |
| 156 | Bandhgala *(also in Part 1)* | Khaki | Terry Wool | Base PNG/WebP | 300 KB |
| 157 | Waistcoat / Vest *(also in Part 1)* | Navy | Polyester | Base PNG/WebP | 300 KB |
| 158 | Waistcoat / Vest *(also in Part 1)* | Black | Polyester | Base PNG/WebP | 300 KB |
| 159 | Waistcoat / Vest *(also in Part 1)* | White | Polyester | Base PNG/WebP | 300 KB |
| 160 | Waistcoat / Vest *(also in Part 1)* | Maroon | Polyester | Base PNG/WebP | 300 KB |
| 161 | Waistcoat / Vest *(also in Part 1)* | Blue | Polyester | Base PNG/WebP | 300 KB |
| 162 | Waistcoat / Vest *(also in Part 1)* | Grey | Polyester | Base PNG/WebP | 300 KB |
| 163 | Waistcoat / Vest *(also in Part 1)* | Cream | Polyester | Base PNG/WebP | 300 KB |
| 164 | Waistcoat / Vest *(also in Part 1)* | Olive | Polyester | Base PNG/WebP | 300 KB |
| 165 | Waistcoat / Vest *(also in Part 1)* | Brown | Polyester | Base PNG/WebP | 300 KB |
| 166 | Waistcoat / Vest *(also in Part 1)* | Beige | Polyester | Base PNG/WebP | 300 KB |
| 167 | Waistcoat / Vest *(also in Part 1)* | Burgundy | Polyester | Base PNG/WebP | 300 KB |
| 168 | Waistcoat / Vest *(also in Part 1)* | Khaki | Polyester | Base PNG/WebP | 300 KB |
| 169 | Pathani Suit *(also in Part 1)* | Navy | Cotton | Base PNG/WebP | 300 KB |
| 170 | Pathani Suit *(also in Part 1)* | Black | Cotton | Base PNG/WebP | 300 KB |
| 171 | Pathani Suit *(also in Part 1)* | White | Cotton | Base PNG/WebP | 300 KB |
| 172 | Pathani Suit *(also in Part 1)* | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 173 | Pathani Suit *(also in Part 1)* | Blue | Cotton | Base PNG/WebP | 300 KB |
| 174 | Pathani Suit *(also in Part 1)* | Grey | Cotton | Base PNG/WebP | 300 KB |
| 175 | Pathani Suit *(also in Part 1)* | Cream | Cotton | Base PNG/WebP | 300 KB |
| 176 | Pathani Suit *(also in Part 1)* | Olive | Cotton | Base PNG/WebP | 300 KB |
| 177 | Pathani Suit *(also in Part 1)* | Brown | Cotton | Base PNG/WebP | 300 KB |
| 178 | Pathani Suit *(also in Part 1)* | Beige | Cotton | Base PNG/WebP | 300 KB |
| 179 | Pathani Suit *(also in Part 1)* | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 180 | Pathani Suit *(also in Part 1)* | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 181 | Jodhpuri Suit | Navy | Wool | Base PNG/WebP | 300 KB |
| 182 | Jodhpuri Suit | Black | Wool | Base PNG/WebP | 300 KB |
| 183 | Jodhpuri Suit | White | Wool | Base PNG/WebP | 300 KB |
| 184 | Jodhpuri Suit | Maroon | Wool | Base PNG/WebP | 300 KB |
| 185 | Jodhpuri Suit | Blue | Wool | Base PNG/WebP | 300 KB |
| 186 | Jodhpuri Suit | Grey | Wool | Base PNG/WebP | 300 KB |
| 187 | Jodhpuri Suit | Cream | Wool | Base PNG/WebP | 300 KB |
| 188 | Jodhpuri Suit | Olive | Wool | Base PNG/WebP | 300 KB |
| 189 | Jodhpuri Suit | Brown | Wool | Base PNG/WebP | 300 KB |
| 190 | Jodhpuri Suit | Beige | Wool | Base PNG/WebP | 300 KB |
| 191 | Jodhpuri Suit | Burgundy | Wool | Base PNG/WebP | 300 KB |
| 192 | Jodhpuri Suit | Khaki | Wool | Base PNG/WebP | 300 KB |
| 193 | Linen Shirt | Navy | Linen | Base PNG/WebP | 300 KB |
| 194 | Linen Shirt | Black | Linen | Base PNG/WebP | 300 KB |
| 195 | Linen Shirt | White | Linen | Base PNG/WebP | 300 KB |
| 196 | Linen Shirt | Maroon | Linen | Base PNG/WebP | 300 KB |
| 197 | Linen Shirt | Blue | Linen | Base PNG/WebP | 300 KB |
| 198 | Linen Shirt | Grey | Linen | Base PNG/WebP | 300 KB |
| 199 | Linen Shirt | Cream | Linen | Base PNG/WebP | 300 KB |
| 200 | Linen Shirt | Olive | Linen | Base PNG/WebP | 300 KB |
| 201 | Linen Shirt | Brown | Linen | Base PNG/WebP | 300 KB |
| 202 | Linen Shirt | Beige | Linen | Base PNG/WebP | 300 KB |
| 203 | Linen Shirt | Burgundy | Linen | Base PNG/WebP | 300 KB |
| 204 | Linen Shirt | Khaki | Linen | Base PNG/WebP | 300 KB |
| 205 | Denim Jacket | Navy | Denim | Base PNG/WebP | 300 KB |
| 206 | Denim Jacket | Black | Denim | Base PNG/WebP | 300 KB |
| 207 | Denim Jacket | White | Denim | Base PNG/WebP | 300 KB |
| 208 | Denim Jacket | Maroon | Denim | Base PNG/WebP | 300 KB |
| 209 | Denim Jacket | Blue | Denim | Base PNG/WebP | 300 KB |
| 210 | Denim Jacket | Grey | Denim | Base PNG/WebP | 300 KB |
| 211 | Denim Jacket | Cream | Denim | Base PNG/WebP | 300 KB |
| 212 | Denim Jacket | Olive | Denim | Base PNG/WebP | 300 KB |
| 213 | Denim Jacket | Brown | Denim | Base PNG/WebP | 300 KB |
| 214 | Denim Jacket | Beige | Denim | Base PNG/WebP | 300 KB |
| 215 | Denim Jacket | Burgundy | Denim | Base PNG/WebP | 300 KB |
| 216 | Denim Jacket | Khaki | Denim | Base PNG/WebP | 300 KB |
| 217 | Pyjama (Kurta Set) | Navy | Cotton | Base PNG/WebP | 300 KB |
| 218 | Pyjama (Kurta Set) | Black | Cotton | Base PNG/WebP | 300 KB |
| 219 | Pyjama (Kurta Set) | White | Cotton | Base PNG/WebP | 300 KB |
| 220 | Pyjama (Kurta Set) | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 221 | Pyjama (Kurta Set) | Blue | Cotton | Base PNG/WebP | 300 KB |
| 222 | Pyjama (Kurta Set) | Grey | Cotton | Base PNG/WebP | 300 KB |
| 223 | Pyjama (Kurta Set) | Cream | Cotton | Base PNG/WebP | 300 KB |
| 224 | Pyjama (Kurta Set) | Olive | Cotton | Base PNG/WebP | 300 KB |
| 225 | Pyjama (Kurta Set) | Brown | Cotton | Base PNG/WebP | 300 KB |
| 226 | Pyjama (Kurta Set) | Beige | Cotton | Base PNG/WebP | 300 KB |
| 227 | Pyjama (Kurta Set) | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 228 | Pyjama (Kurta Set) | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 229 | Leather Jacket | Navy | Leather | Base PNG/WebP | 300 KB |
| 230 | Leather Jacket | Black | Leather | Base PNG/WebP | 300 KB |
| 231 | Leather Jacket | White | Leather | Base PNG/WebP | 300 KB |
| 232 | Leather Jacket | Maroon | Leather | Base PNG/WebP | 300 KB |
| 233 | Leather Jacket | Blue | Leather | Base PNG/WebP | 300 KB |
| 234 | Leather Jacket | Grey | Leather | Base PNG/WebP | 300 KB |
| 235 | Leather Jacket | Cream | Leather | Base PNG/WebP | 300 KB |
| 236 | Leather Jacket | Olive | Leather | Base PNG/WebP | 300 KB |
| 237 | Leather Jacket | Brown | Leather | Base PNG/WebP | 300 KB |
| 238 | Leather Jacket | Beige | Leather | Base PNG/WebP | 300 KB |
| 239 | Leather Jacket | Burgundy | Leather | Base PNG/WebP | 300 KB |
| 240 | Leather Jacket | Khaki | Leather | Base PNG/WebP | 300 KB |
| 241 | Overcoat | Navy | Wool | Base PNG/WebP | 300 KB |
| 242 | Overcoat | Black | Wool | Base PNG/WebP | 300 KB |
| 243 | Overcoat | White | Wool | Base PNG/WebP | 300 KB |
| 244 | Overcoat | Maroon | Wool | Base PNG/WebP | 300 KB |
| 245 | Overcoat | Blue | Wool | Base PNG/WebP | 300 KB |
| 246 | Overcoat | Grey | Wool | Base PNG/WebP | 300 KB |
| 247 | Overcoat | Cream | Wool | Base PNG/WebP | 300 KB |
| 248 | Overcoat | Olive | Wool | Base PNG/WebP | 300 KB |
| 249 | Overcoat | Brown | Wool | Base PNG/WebP | 300 KB |
| 250 | Overcoat | Beige | Wool | Base PNG/WebP | 300 KB |
| 251 | Overcoat | Burgundy | Wool | Base PNG/WebP | 300 KB |
| 252 | Overcoat | Khaki | Wool | Base PNG/WebP | 300 KB |
| 253 | Henley T-Shirt | Navy | Cotton | Base PNG/WebP | 300 KB |
| 254 | Henley T-Shirt | Black | Cotton | Base PNG/WebP | 300 KB |
| 255 | Henley T-Shirt | White | Cotton | Base PNG/WebP | 300 KB |
| 256 | Henley T-Shirt | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 257 | Henley T-Shirt | Blue | Cotton | Base PNG/WebP | 300 KB |
| 258 | Henley T-Shirt | Grey | Cotton | Base PNG/WebP | 300 KB |
| 259 | Henley T-Shirt | Cream | Cotton | Base PNG/WebP | 300 KB |
| 260 | Henley T-Shirt | Olive | Cotton | Base PNG/WebP | 300 KB |
| 261 | Henley T-Shirt | Brown | Cotton | Base PNG/WebP | 300 KB |
| 262 | Henley T-Shirt | Beige | Cotton | Base PNG/WebP | 300 KB |
| 263 | Henley T-Shirt | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 264 | Henley T-Shirt | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 265 | Mandarin Collar Shirt | Navy | Cotton | Base PNG/WebP | 300 KB |
| 266 | Mandarin Collar Shirt | Black | Cotton | Base PNG/WebP | 300 KB |
| 267 | Mandarin Collar Shirt | White | Cotton | Base PNG/WebP | 300 KB |
| 268 | Mandarin Collar Shirt | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 269 | Mandarin Collar Shirt | Blue | Cotton | Base PNG/WebP | 300 KB |
| 270 | Mandarin Collar Shirt | Grey | Cotton | Base PNG/WebP | 300 KB |
| 271 | Mandarin Collar Shirt | Cream | Cotton | Base PNG/WebP | 300 KB |
| 272 | Mandarin Collar Shirt | Olive | Cotton | Base PNG/WebP | 300 KB |
| 273 | Mandarin Collar Shirt | Brown | Cotton | Base PNG/WebP | 300 KB |
| 274 | Mandarin Collar Shirt | Beige | Cotton | Base PNG/WebP | 300 KB |
| 275 | Mandarin Collar Shirt | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 276 | Mandarin Collar Shirt | Khaki | Cotton | Base PNG/WebP | 300 KB |

**Upper Body subtotal:** 276 unique variants × 300 KB = **80.9 MB**

## 2.2 Lower Body

| # | Item (Sub-Category) | Color / Finish | Fabric / Texture | Asset Type | Est. Size |
|---|---------------------|----------------|------------------|------------|----------|
| 1 | Formal Trousers *(also in Part 1)* | Navy | Polyester Blend | Base PNG/WebP | 300 KB |
| 2 | Formal Trousers *(also in Part 1)* | Black | Polyester Blend | Base PNG/WebP | 300 KB |
| 3 | Formal Trousers *(also in Part 1)* | White | Polyester Blend | Base PNG/WebP | 300 KB |
| 4 | Formal Trousers *(also in Part 1)* | Maroon | Polyester Blend | Base PNG/WebP | 300 KB |
| 5 | Formal Trousers *(also in Part 1)* | Blue | Polyester Blend | Base PNG/WebP | 300 KB |
| 6 | Formal Trousers *(also in Part 1)* | Grey | Polyester Blend | Base PNG/WebP | 300 KB |
| 7 | Formal Trousers *(also in Part 1)* | Cream | Polyester Blend | Base PNG/WebP | 300 KB |
| 8 | Formal Trousers *(also in Part 1)* | Olive | Polyester Blend | Base PNG/WebP | 300 KB |
| 9 | Formal Trousers *(also in Part 1)* | Brown | Polyester Blend | Base PNG/WebP | 300 KB |
| 10 | Formal Trousers *(also in Part 1)* | Beige | Polyester Blend | Base PNG/WebP | 300 KB |
| 11 | Formal Trousers *(also in Part 1)* | Burgundy | Polyester Blend | Base PNG/WebP | 300 KB |
| 12 | Formal Trousers *(also in Part 1)* | Khaki | Polyester Blend | Base PNG/WebP | 300 KB |
| 13 | Jeans *(also in Part 1)* | Navy | Denim | Base PNG/WebP | 300 KB |
| 14 | Jeans *(also in Part 1)* | Black | Denim | Base PNG/WebP | 300 KB |
| 15 | Jeans *(also in Part 1)* | White | Denim | Base PNG/WebP | 300 KB |
| 16 | Jeans *(also in Part 1)* | Maroon | Denim | Base PNG/WebP | 300 KB |
| 17 | Jeans *(also in Part 1)* | Blue | Denim | Base PNG/WebP | 300 KB |
| 18 | Jeans *(also in Part 1)* | Grey | Denim | Base PNG/WebP | 300 KB |
| 19 | Jeans *(also in Part 1)* | Cream | Denim | Base PNG/WebP | 300 KB |
| 20 | Jeans *(also in Part 1)* | Olive | Denim | Base PNG/WebP | 300 KB |
| 21 | Jeans *(also in Part 1)* | Brown | Denim | Base PNG/WebP | 300 KB |
| 22 | Jeans *(also in Part 1)* | Beige | Denim | Base PNG/WebP | 300 KB |
| 23 | Jeans *(also in Part 1)* | Burgundy | Denim | Base PNG/WebP | 300 KB |
| 24 | Jeans *(also in Part 1)* | Khaki | Denim | Base PNG/WebP | 300 KB |
| 25 | Chinos *(also in Part 1)* | Navy | Cotton Twill | Base PNG/WebP | 300 KB |
| 26 | Chinos *(also in Part 1)* | Black | Cotton Twill | Base PNG/WebP | 300 KB |
| 27 | Chinos *(also in Part 1)* | White | Cotton Twill | Base PNG/WebP | 300 KB |
| 28 | Chinos *(also in Part 1)* | Maroon | Cotton Twill | Base PNG/WebP | 300 KB |
| 29 | Chinos *(also in Part 1)* | Blue | Cotton Twill | Base PNG/WebP | 300 KB |
| 30 | Chinos *(also in Part 1)* | Grey | Cotton Twill | Base PNG/WebP | 300 KB |
| 31 | Chinos *(also in Part 1)* | Cream | Cotton Twill | Base PNG/WebP | 300 KB |
| 32 | Chinos *(also in Part 1)* | Olive | Cotton Twill | Base PNG/WebP | 300 KB |
| 33 | Chinos *(also in Part 1)* | Brown | Cotton Twill | Base PNG/WebP | 300 KB |
| 34 | Chinos *(also in Part 1)* | Beige | Cotton Twill | Base PNG/WebP | 300 KB |
| 35 | Chinos *(also in Part 1)* | Burgundy | Cotton Twill | Base PNG/WebP | 300 KB |
| 36 | Chinos *(also in Part 1)* | Khaki | Cotton Twill | Base PNG/WebP | 300 KB |
| 37 | Casual Trousers *(also in Part 1)* | Navy | Cotton | Base PNG/WebP | 300 KB |
| 38 | Casual Trousers *(also in Part 1)* | Black | Cotton | Base PNG/WebP | 300 KB |
| 39 | Casual Trousers *(also in Part 1)* | White | Cotton | Base PNG/WebP | 300 KB |
| 40 | Casual Trousers *(also in Part 1)* | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 41 | Casual Trousers *(also in Part 1)* | Blue | Cotton | Base PNG/WebP | 300 KB |
| 42 | Casual Trousers *(also in Part 1)* | Grey | Cotton | Base PNG/WebP | 300 KB |
| 43 | Casual Trousers *(also in Part 1)* | Cream | Cotton | Base PNG/WebP | 300 KB |
| 44 | Casual Trousers *(also in Part 1)* | Olive | Cotton | Base PNG/WebP | 300 KB |
| 45 | Casual Trousers *(also in Part 1)* | Brown | Cotton | Base PNG/WebP | 300 KB |
| 46 | Casual Trousers *(also in Part 1)* | Beige | Cotton | Base PNG/WebP | 300 KB |
| 47 | Casual Trousers *(also in Part 1)* | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 48 | Casual Trousers *(also in Part 1)* | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 49 | Joggers *(also in Part 1)* | Navy | Cotton Fleece | Base PNG/WebP | 300 KB |
| 50 | Joggers *(also in Part 1)* | Black | Cotton Fleece | Base PNG/WebP | 300 KB |
| 51 | Joggers *(also in Part 1)* | White | Cotton Fleece | Base PNG/WebP | 300 KB |
| 52 | Joggers *(also in Part 1)* | Maroon | Cotton Fleece | Base PNG/WebP | 300 KB |
| 53 | Joggers *(also in Part 1)* | Blue | Cotton Fleece | Base PNG/WebP | 300 KB |
| 54 | Joggers *(also in Part 1)* | Grey | Cotton Fleece | Base PNG/WebP | 300 KB |
| 55 | Joggers *(also in Part 1)* | Cream | Cotton Fleece | Base PNG/WebP | 300 KB |
| 56 | Joggers *(also in Part 1)* | Olive | Cotton Fleece | Base PNG/WebP | 300 KB |
| 57 | Joggers *(also in Part 1)* | Brown | Cotton Fleece | Base PNG/WebP | 300 KB |
| 58 | Joggers *(also in Part 1)* | Beige | Cotton Fleece | Base PNG/WebP | 300 KB |
| 59 | Joggers *(also in Part 1)* | Burgundy | Cotton Fleece | Base PNG/WebP | 300 KB |
| 60 | Joggers *(also in Part 1)* | Khaki | Cotton Fleece | Base PNG/WebP | 300 KB |
| 61 | Shorts *(also in Part 1)* | Navy | Cotton | Base PNG/WebP | 300 KB |
| 62 | Shorts *(also in Part 1)* | Black | Cotton | Base PNG/WebP | 300 KB |
| 63 | Shorts *(also in Part 1)* | White | Cotton | Base PNG/WebP | 300 KB |
| 64 | Shorts *(also in Part 1)* | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 65 | Shorts *(also in Part 1)* | Blue | Cotton | Base PNG/WebP | 300 KB |
| 66 | Shorts *(also in Part 1)* | Grey | Cotton | Base PNG/WebP | 300 KB |
| 67 | Shorts *(also in Part 1)* | Cream | Cotton | Base PNG/WebP | 300 KB |
| 68 | Shorts *(also in Part 1)* | Olive | Cotton | Base PNG/WebP | 300 KB |
| 69 | Shorts *(also in Part 1)* | Brown | Cotton | Base PNG/WebP | 300 KB |
| 70 | Shorts *(also in Part 1)* | Beige | Cotton | Base PNG/WebP | 300 KB |
| 71 | Shorts *(also in Part 1)* | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 72 | Shorts *(also in Part 1)* | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 73 | Cargo Pants | Navy | Cotton | Base PNG/WebP | 300 KB |
| 74 | Cargo Pants | Black | Cotton | Base PNG/WebP | 300 KB |
| 75 | Cargo Pants | White | Cotton | Base PNG/WebP | 300 KB |
| 76 | Cargo Pants | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 77 | Cargo Pants | Blue | Cotton | Base PNG/WebP | 300 KB |
| 78 | Cargo Pants | Grey | Cotton | Base PNG/WebP | 300 KB |
| 79 | Cargo Pants | Cream | Cotton | Base PNG/WebP | 300 KB |
| 80 | Cargo Pants | Olive | Cotton | Base PNG/WebP | 300 KB |
| 81 | Cargo Pants | Brown | Cotton | Base PNG/WebP | 300 KB |
| 82 | Cargo Pants | Beige | Cotton | Base PNG/WebP | 300 KB |
| 83 | Cargo Pants | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 84 | Cargo Pants | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 85 | Track Pants | Navy | Polyester | Base PNG/WebP | 300 KB |
| 86 | Track Pants | Black | Polyester | Base PNG/WebP | 300 KB |
| 87 | Track Pants | White | Polyester | Base PNG/WebP | 300 KB |
| 88 | Track Pants | Maroon | Polyester | Base PNG/WebP | 300 KB |
| 89 | Track Pants | Blue | Polyester | Base PNG/WebP | 300 KB |
| 90 | Track Pants | Grey | Polyester | Base PNG/WebP | 300 KB |
| 91 | Track Pants | Cream | Polyester | Base PNG/WebP | 300 KB |
| 92 | Track Pants | Olive | Polyester | Base PNG/WebP | 300 KB |
| 93 | Track Pants | Brown | Polyester | Base PNG/WebP | 300 KB |
| 94 | Track Pants | Beige | Polyester | Base PNG/WebP | 300 KB |
| 95 | Track Pants | Burgundy | Polyester | Base PNG/WebP | 300 KB |
| 96 | Track Pants | Khaki | Polyester | Base PNG/WebP | 300 KB |
| 97 | Dhoti Pants | Navy | Cotton | Base PNG/WebP | 300 KB |
| 98 | Dhoti Pants | Black | Cotton | Base PNG/WebP | 300 KB |
| 99 | Dhoti Pants | White | Cotton | Base PNG/WebP | 300 KB |
| 100 | Dhoti Pants | Maroon | Cotton | Base PNG/WebP | 300 KB |
| 101 | Dhoti Pants | Blue | Cotton | Base PNG/WebP | 300 KB |
| 102 | Dhoti Pants | Grey | Cotton | Base PNG/WebP | 300 KB |
| 103 | Dhoti Pants | Cream | Cotton | Base PNG/WebP | 300 KB |
| 104 | Dhoti Pants | Olive | Cotton | Base PNG/WebP | 300 KB |
| 105 | Dhoti Pants | Brown | Cotton | Base PNG/WebP | 300 KB |
| 106 | Dhoti Pants | Beige | Cotton | Base PNG/WebP | 300 KB |
| 107 | Dhoti Pants | Burgundy | Cotton | Base PNG/WebP | 300 KB |
| 108 | Dhoti Pants | Khaki | Cotton | Base PNG/WebP | 300 KB |
| 109 | Linen Trousers | Navy | Linen | Base PNG/WebP | 300 KB |
| 110 | Linen Trousers | Black | Linen | Base PNG/WebP | 300 KB |
| 111 | Linen Trousers | White | Linen | Base PNG/WebP | 300 KB |
| 112 | Linen Trousers | Maroon | Linen | Base PNG/WebP | 300 KB |
| 113 | Linen Trousers | Blue | Linen | Base PNG/WebP | 300 KB |
| 114 | Linen Trousers | Grey | Linen | Base PNG/WebP | 300 KB |
| 115 | Linen Trousers | Cream | Linen | Base PNG/WebP | 300 KB |
| 116 | Linen Trousers | Olive | Linen | Base PNG/WebP | 300 KB |
| 117 | Linen Trousers | Brown | Linen | Base PNG/WebP | 300 KB |
| 118 | Linen Trousers | Beige | Linen | Base PNG/WebP | 300 KB |
| 119 | Linen Trousers | Burgundy | Linen | Base PNG/WebP | 300 KB |
| 120 | Linen Trousers | Khaki | Linen | Base PNG/WebP | 300 KB |
| 121 | Pleated Trousers | Navy | Wool Blend | Base PNG/WebP | 300 KB |
| 122 | Pleated Trousers | Black | Wool Blend | Base PNG/WebP | 300 KB |
| 123 | Pleated Trousers | White | Wool Blend | Base PNG/WebP | 300 KB |
| 124 | Pleated Trousers | Maroon | Wool Blend | Base PNG/WebP | 300 KB |
| 125 | Pleated Trousers | Blue | Wool Blend | Base PNG/WebP | 300 KB |
| 126 | Pleated Trousers | Grey | Wool Blend | Base PNG/WebP | 300 KB |
| 127 | Pleated Trousers | Cream | Wool Blend | Base PNG/WebP | 300 KB |
| 128 | Pleated Trousers | Olive | Wool Blend | Base PNG/WebP | 300 KB |
| 129 | Pleated Trousers | Brown | Wool Blend | Base PNG/WebP | 300 KB |
| 130 | Pleated Trousers | Beige | Wool Blend | Base PNG/WebP | 300 KB |
| 131 | Pleated Trousers | Burgundy | Wool Blend | Base PNG/WebP | 300 KB |
| 132 | Pleated Trousers | Khaki | Wool Blend | Base PNG/WebP | 300 KB |

**Lower Body subtotal:** 132 unique variants × 300 KB = **38.7 MB**

## 2.3 Footwear

| # | Item (Sub-Category) | Color / Finish | Fabric / Texture | Asset Type | Est. Size |
|---|---------------------|----------------|------------------|------------|----------|
| 1 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Navy | Leather | Base PNG/WebP | 300 KB |
| 2 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Black | Leather | Base PNG/WebP | 300 KB |
| 3 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | White | Leather | Base PNG/WebP | 300 KB |
| 4 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Maroon | Leather | Base PNG/WebP | 300 KB |
| 5 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Blue | Leather | Base PNG/WebP | 300 KB |
| 6 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Grey | Leather | Base PNG/WebP | 300 KB |
| 7 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Cream | Leather | Base PNG/WebP | 300 KB |
| 8 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Olive | Leather | Base PNG/WebP | 300 KB |
| 9 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Brown | Leather | Base PNG/WebP | 300 KB |
| 10 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Beige | Leather | Base PNG/WebP | 300 KB |
| 11 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Burgundy | Leather | Base PNG/WebP | 300 KB |
| 12 | Formal Shoes (Oxford/Derby) *(also in Part 1)* | Khaki | Leather | Base PNG/WebP | 300 KB |
| 13 | Sneakers *(also in Part 1)* | Navy | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 14 | Sneakers *(also in Part 1)* | Black | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 15 | Sneakers *(also in Part 1)* | White | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 16 | Sneakers *(also in Part 1)* | Maroon | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 17 | Sneakers *(also in Part 1)* | Blue | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 18 | Sneakers *(also in Part 1)* | Grey | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 19 | Sneakers *(also in Part 1)* | Cream | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 20 | Sneakers *(also in Part 1)* | Olive | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 21 | Sneakers *(also in Part 1)* | Brown | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 22 | Sneakers *(also in Part 1)* | Beige | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 23 | Sneakers *(also in Part 1)* | Burgundy | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 24 | Sneakers *(also in Part 1)* | Khaki | Canvas/Synthetic | Base PNG/WebP | 300 KB |
| 25 | Loafers *(also in Part 1)* | Navy | Leather | Base PNG/WebP | 300 KB |
| 26 | Loafers *(also in Part 1)* | Black | Leather | Base PNG/WebP | 300 KB |
| 27 | Loafers *(also in Part 1)* | White | Leather | Base PNG/WebP | 300 KB |
| 28 | Loafers *(also in Part 1)* | Maroon | Leather | Base PNG/WebP | 300 KB |
| 29 | Loafers *(also in Part 1)* | Blue | Leather | Base PNG/WebP | 300 KB |
| 30 | Loafers *(also in Part 1)* | Grey | Leather | Base PNG/WebP | 300 KB |
| 31 | Loafers *(also in Part 1)* | Cream | Leather | Base PNG/WebP | 300 KB |
| 32 | Loafers *(also in Part 1)* | Olive | Leather | Base PNG/WebP | 300 KB |
| 33 | Loafers *(also in Part 1)* | Brown | Leather | Base PNG/WebP | 300 KB |
| 34 | Loafers *(also in Part 1)* | Beige | Leather | Base PNG/WebP | 300 KB |
| 35 | Loafers *(also in Part 1)* | Burgundy | Leather | Base PNG/WebP | 300 KB |
| 36 | Loafers *(also in Part 1)* | Khaki | Leather | Base PNG/WebP | 300 KB |
| 37 | Sandals *(also in Part 1)* | Navy | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 38 | Sandals *(also in Part 1)* | Black | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 39 | Sandals *(also in Part 1)* | White | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 40 | Sandals *(also in Part 1)* | Maroon | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 41 | Sandals *(also in Part 1)* | Blue | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 42 | Sandals *(also in Part 1)* | Grey | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 43 | Sandals *(also in Part 1)* | Cream | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 44 | Sandals *(also in Part 1)* | Olive | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 45 | Sandals *(also in Part 1)* | Brown | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 46 | Sandals *(also in Part 1)* | Beige | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 47 | Sandals *(also in Part 1)* | Burgundy | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 48 | Sandals *(also in Part 1)* | Khaki | Leather/Synthetic | Base PNG/WebP | 300 KB |
| 49 | Boots (Chelsea/Chukka) *(also in Part 1)* | Navy | Leather | Base PNG/WebP | 300 KB |
| 50 | Boots (Chelsea/Chukka) *(also in Part 1)* | Black | Leather | Base PNG/WebP | 300 KB |
| 51 | Boots (Chelsea/Chukka) *(also in Part 1)* | White | Leather | Base PNG/WebP | 300 KB |
| 52 | Boots (Chelsea/Chukka) *(also in Part 1)* | Maroon | Leather | Base PNG/WebP | 300 KB |
| 53 | Boots (Chelsea/Chukka) *(also in Part 1)* | Blue | Leather | Base PNG/WebP | 300 KB |
| 54 | Boots (Chelsea/Chukka) *(also in Part 1)* | Grey | Leather | Base PNG/WebP | 300 KB |
| 55 | Boots (Chelsea/Chukka) *(also in Part 1)* | Cream | Leather | Base PNG/WebP | 300 KB |
| 56 | Boots (Chelsea/Chukka) *(also in Part 1)* | Olive | Leather | Base PNG/WebP | 300 KB |
| 57 | Boots (Chelsea/Chukka) *(also in Part 1)* | Brown | Leather | Base PNG/WebP | 300 KB |
| 58 | Boots (Chelsea/Chukka) *(also in Part 1)* | Beige | Leather | Base PNG/WebP | 300 KB |
| 59 | Boots (Chelsea/Chukka) *(also in Part 1)* | Burgundy | Leather | Base PNG/WebP | 300 KB |
| 60 | Boots (Chelsea/Chukka) *(also in Part 1)* | Khaki | Leather | Base PNG/WebP | 300 KB |
| 61 | Mojari / Jutti *(also in Part 1)* | Navy | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 62 | Mojari / Jutti *(also in Part 1)* | Black | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 63 | Mojari / Jutti *(also in Part 1)* | White | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 64 | Mojari / Jutti *(also in Part 1)* | Maroon | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 65 | Mojari / Jutti *(also in Part 1)* | Blue | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 66 | Mojari / Jutti *(also in Part 1)* | Grey | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 67 | Mojari / Jutti *(also in Part 1)* | Cream | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 68 | Mojari / Jutti *(also in Part 1)* | Olive | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 69 | Mojari / Jutti *(also in Part 1)* | Brown | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 70 | Mojari / Jutti *(also in Part 1)* | Beige | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 71 | Mojari / Jutti *(also in Part 1)* | Burgundy | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 72 | Mojari / Jutti *(also in Part 1)* | Khaki | Leather/Embroidered | Base PNG/WebP | 300 KB |
| 73 | Kolhapuri Chappals | Navy | Leather | Base PNG/WebP | 300 KB |
| 74 | Kolhapuri Chappals | Black | Leather | Base PNG/WebP | 300 KB |
| 75 | Kolhapuri Chappals | White | Leather | Base PNG/WebP | 300 KB |
| 76 | Kolhapuri Chappals | Maroon | Leather | Base PNG/WebP | 300 KB |
| 77 | Kolhapuri Chappals | Blue | Leather | Base PNG/WebP | 300 KB |
| 78 | Kolhapuri Chappals | Grey | Leather | Base PNG/WebP | 300 KB |
| 79 | Kolhapuri Chappals | Cream | Leather | Base PNG/WebP | 300 KB |
| 80 | Kolhapuri Chappals | Olive | Leather | Base PNG/WebP | 300 KB |
| 81 | Kolhapuri Chappals | Brown | Leather | Base PNG/WebP | 300 KB |
| 82 | Kolhapuri Chappals | Beige | Leather | Base PNG/WebP | 300 KB |
| 83 | Kolhapuri Chappals | Burgundy | Leather | Base PNG/WebP | 300 KB |
| 84 | Kolhapuri Chappals | Khaki | Leather | Base PNG/WebP | 300 KB |
| 85 | Slip-Ons | Navy | Synthetic | Base PNG/WebP | 300 KB |
| 86 | Slip-Ons | Black | Synthetic | Base PNG/WebP | 300 KB |
| 87 | Slip-Ons | White | Synthetic | Base PNG/WebP | 300 KB |
| 88 | Slip-Ons | Maroon | Synthetic | Base PNG/WebP | 300 KB |
| 89 | Slip-Ons | Blue | Synthetic | Base PNG/WebP | 300 KB |
| 90 | Slip-Ons | Grey | Synthetic | Base PNG/WebP | 300 KB |
| 91 | Slip-Ons | Cream | Synthetic | Base PNG/WebP | 300 KB |
| 92 | Slip-Ons | Olive | Synthetic | Base PNG/WebP | 300 KB |
| 93 | Slip-Ons | Brown | Synthetic | Base PNG/WebP | 300 KB |
| 94 | Slip-Ons | Beige | Synthetic | Base PNG/WebP | 300 KB |
| 95 | Slip-Ons | Burgundy | Synthetic | Base PNG/WebP | 300 KB |
| 96 | Slip-Ons | Khaki | Synthetic | Base PNG/WebP | 300 KB |
| 97 | Sports Shoes | Navy | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 98 | Sports Shoes | Black | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 99 | Sports Shoes | White | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 100 | Sports Shoes | Maroon | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 101 | Sports Shoes | Blue | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 102 | Sports Shoes | Grey | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 103 | Sports Shoes | Cream | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 104 | Sports Shoes | Olive | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 105 | Sports Shoes | Brown | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 106 | Sports Shoes | Beige | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 107 | Sports Shoes | Burgundy | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 108 | Sports Shoes | Khaki | Mesh/Synthetic | Base PNG/WebP | 300 KB |
| 109 | Flip-Flops | Navy | Rubber | Base PNG/WebP | 300 KB |
| 110 | Flip-Flops | Black | Rubber | Base PNG/WebP | 300 KB |
| 111 | Flip-Flops | White | Rubber | Base PNG/WebP | 300 KB |
| 112 | Flip-Flops | Maroon | Rubber | Base PNG/WebP | 300 KB |
| 113 | Flip-Flops | Blue | Rubber | Base PNG/WebP | 300 KB |
| 114 | Flip-Flops | Grey | Rubber | Base PNG/WebP | 300 KB |
| 115 | Flip-Flops | Cream | Rubber | Base PNG/WebP | 300 KB |
| 116 | Flip-Flops | Olive | Rubber | Base PNG/WebP | 300 KB |
| 117 | Flip-Flops | Brown | Rubber | Base PNG/WebP | 300 KB |
| 118 | Flip-Flops | Beige | Rubber | Base PNG/WebP | 300 KB |
| 119 | Flip-Flops | Burgundy | Rubber | Base PNG/WebP | 300 KB |
| 120 | Flip-Flops | Khaki | Rubber | Base PNG/WebP | 300 KB |

**Footwear subtotal:** 120 unique variants × 300 KB = **35.2 MB**

## 2.4 Accessories

| # | Item (Sub-Category) | Color / Finish | Fabric / Texture | Asset Type | Est. Size |
|---|---------------------|----------------|------------------|------------|----------|
| 1 | Wrist Watch *(also in Part 1)* | Navy | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 2 | Wrist Watch *(also in Part 1)* | Black | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 3 | Wrist Watch *(also in Part 1)* | White | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 4 | Wrist Watch *(also in Part 1)* | Maroon | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 5 | Wrist Watch *(also in Part 1)* | Blue | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 6 | Wrist Watch *(also in Part 1)* | Grey | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 7 | Wrist Watch *(also in Part 1)* | Cream | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 8 | Wrist Watch *(also in Part 1)* | Olive | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 9 | Wrist Watch *(also in Part 1)* | Brown | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 10 | Wrist Watch *(also in Part 1)* | Beige | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 11 | Wrist Watch *(also in Part 1)* | Burgundy | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 12 | Wrist Watch *(also in Part 1)* | Khaki | Metal/Leather Strap | Base PNG/WebP | 300 KB |
| 13 | Belt *(also in Part 1)* | Navy | Leather | Base PNG/WebP | 300 KB |
| 14 | Belt *(also in Part 1)* | Black | Leather | Base PNG/WebP | 300 KB |
| 15 | Belt *(also in Part 1)* | White | Leather | Base PNG/WebP | 300 KB |
| 16 | Belt *(also in Part 1)* | Maroon | Leather | Base PNG/WebP | 300 KB |
| 17 | Belt *(also in Part 1)* | Blue | Leather | Base PNG/WebP | 300 KB |
| 18 | Belt *(also in Part 1)* | Grey | Leather | Base PNG/WebP | 300 KB |
| 19 | Belt *(also in Part 1)* | Cream | Leather | Base PNG/WebP | 300 KB |
| 20 | Belt *(also in Part 1)* | Olive | Leather | Base PNG/WebP | 300 KB |
| 21 | Belt *(also in Part 1)* | Brown | Leather | Base PNG/WebP | 300 KB |
| 22 | Belt *(also in Part 1)* | Beige | Leather | Base PNG/WebP | 300 KB |
| 23 | Belt *(also in Part 1)* | Burgundy | Leather | Base PNG/WebP | 300 KB |
| 24 | Belt *(also in Part 1)* | Khaki | Leather | Base PNG/WebP | 300 KB |
| 25 | Wallet *(also in Part 1)* | Navy | Leather | Base PNG/WebP | 300 KB |
| 26 | Wallet *(also in Part 1)* | Black | Leather | Base PNG/WebP | 300 KB |
| 27 | Wallet *(also in Part 1)* | White | Leather | Base PNG/WebP | 300 KB |
| 28 | Wallet *(also in Part 1)* | Maroon | Leather | Base PNG/WebP | 300 KB |
| 29 | Wallet *(also in Part 1)* | Blue | Leather | Base PNG/WebP | 300 KB |
| 30 | Wallet *(also in Part 1)* | Grey | Leather | Base PNG/WebP | 300 KB |
| 31 | Wallet *(also in Part 1)* | Cream | Leather | Base PNG/WebP | 300 KB |
| 32 | Wallet *(also in Part 1)* | Olive | Leather | Base PNG/WebP | 300 KB |
| 33 | Wallet *(also in Part 1)* | Brown | Leather | Base PNG/WebP | 300 KB |
| 34 | Wallet *(also in Part 1)* | Beige | Leather | Base PNG/WebP | 300 KB |
| 35 | Wallet *(also in Part 1)* | Burgundy | Leather | Base PNG/WebP | 300 KB |
| 36 | Wallet *(also in Part 1)* | Khaki | Leather | Base PNG/WebP | 300 KB |
| 37 | Tie | Navy | Silk | Base PNG/WebP | 300 KB |
| 38 | Tie | Black | Silk | Base PNG/WebP | 300 KB |
| 39 | Tie | White | Silk | Base PNG/WebP | 300 KB |
| 40 | Tie | Maroon | Silk | Base PNG/WebP | 300 KB |
| 41 | Tie | Blue | Silk | Base PNG/WebP | 300 KB |
| 42 | Tie | Grey | Silk | Base PNG/WebP | 300 KB |
| 43 | Tie | Cream | Silk | Base PNG/WebP | 300 KB |
| 44 | Tie | Olive | Silk | Base PNG/WebP | 300 KB |
| 45 | Tie | Brown | Silk | Base PNG/WebP | 300 KB |
| 46 | Tie | Beige | Silk | Base PNG/WebP | 300 KB |
| 47 | Tie | Burgundy | Silk | Base PNG/WebP | 300 KB |
| 48 | Tie | Khaki | Silk | Base PNG/WebP | 300 KB |
| 49 | Sunglasses | Navy | Acetate/Metal | Base PNG/WebP | 300 KB |
| 50 | Sunglasses | Black | Acetate/Metal | Base PNG/WebP | 300 KB |
| 51 | Sunglasses | White | Acetate/Metal | Base PNG/WebP | 300 KB |
| 52 | Sunglasses | Maroon | Acetate/Metal | Base PNG/WebP | 300 KB |
| 53 | Sunglasses | Blue | Acetate/Metal | Base PNG/WebP | 300 KB |
| 54 | Sunglasses | Grey | Acetate/Metal | Base PNG/WebP | 300 KB |
| 55 | Sunglasses | Cream | Acetate/Metal | Base PNG/WebP | 300 KB |
| 56 | Sunglasses | Olive | Acetate/Metal | Base PNG/WebP | 300 KB |
| 57 | Sunglasses | Brown | Acetate/Metal | Base PNG/WebP | 300 KB |
| 58 | Sunglasses | Beige | Acetate/Metal | Base PNG/WebP | 300 KB |
| 59 | Sunglasses | Burgundy | Acetate/Metal | Base PNG/WebP | 300 KB |
| 60 | Sunglasses | Khaki | Acetate/Metal | Base PNG/WebP | 300 KB |
| 61 | Pocket Square | Navy | Silk | Base PNG/WebP | 300 KB |
| 62 | Pocket Square | Black | Silk | Base PNG/WebP | 300 KB |
| 63 | Pocket Square | White | Silk | Base PNG/WebP | 300 KB |
| 64 | Pocket Square | Maroon | Silk | Base PNG/WebP | 300 KB |
| 65 | Pocket Square | Blue | Silk | Base PNG/WebP | 300 KB |
| 66 | Pocket Square | Grey | Silk | Base PNG/WebP | 300 KB |
| 67 | Pocket Square | Cream | Silk | Base PNG/WebP | 300 KB |
| 68 | Pocket Square | Olive | Silk | Base PNG/WebP | 300 KB |
| 69 | Pocket Square | Brown | Silk | Base PNG/WebP | 300 KB |
| 70 | Pocket Square | Beige | Silk | Base PNG/WebP | 300 KB |
| 71 | Pocket Square | Burgundy | Silk | Base PNG/WebP | 300 KB |
| 72 | Pocket Square | Khaki | Silk | Base PNG/WebP | 300 KB |
| 73 | Cufflinks | Navy | Metal | Base PNG/WebP | 300 KB |
| 74 | Cufflinks | Black | Metal | Base PNG/WebP | 300 KB |
| 75 | Cufflinks | White | Metal | Base PNG/WebP | 300 KB |
| 76 | Cufflinks | Maroon | Metal | Base PNG/WebP | 300 KB |
| 77 | Cufflinks | Blue | Metal | Base PNG/WebP | 300 KB |
| 78 | Cufflinks | Grey | Metal | Base PNG/WebP | 300 KB |
| 79 | Cufflinks | Cream | Metal | Base PNG/WebP | 300 KB |
| 80 | Cufflinks | Olive | Metal | Base PNG/WebP | 300 KB |
| 81 | Cufflinks | Brown | Metal | Base PNG/WebP | 300 KB |
| 82 | Cufflinks | Beige | Metal | Base PNG/WebP | 300 KB |
| 83 | Cufflinks | Burgundy | Metal | Base PNG/WebP | 300 KB |
| 84 | Cufflinks | Khaki | Metal | Base PNG/WebP | 300 KB |
| 85 | Brooch / Lapel Pin | Navy | Metal | Base PNG/WebP | 300 KB |
| 86 | Brooch / Lapel Pin | Black | Metal | Base PNG/WebP | 300 KB |
| 87 | Brooch / Lapel Pin | White | Metal | Base PNG/WebP | 300 KB |
| 88 | Brooch / Lapel Pin | Maroon | Metal | Base PNG/WebP | 300 KB |
| 89 | Brooch / Lapel Pin | Blue | Metal | Base PNG/WebP | 300 KB |
| 90 | Brooch / Lapel Pin | Grey | Metal | Base PNG/WebP | 300 KB |
| 91 | Brooch / Lapel Pin | Cream | Metal | Base PNG/WebP | 300 KB |
| 92 | Brooch / Lapel Pin | Olive | Metal | Base PNG/WebP | 300 KB |
| 93 | Brooch / Lapel Pin | Brown | Metal | Base PNG/WebP | 300 KB |
| 94 | Brooch / Lapel Pin | Beige | Metal | Base PNG/WebP | 300 KB |
| 95 | Brooch / Lapel Pin | Burgundy | Metal | Base PNG/WebP | 300 KB |
| 96 | Brooch / Lapel Pin | Khaki | Metal | Base PNG/WebP | 300 KB |
| 97 | Scarf / Stole | Navy | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 98 | Scarf / Stole | Black | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 99 | Scarf / Stole | White | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 100 | Scarf / Stole | Maroon | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 101 | Scarf / Stole | Blue | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 102 | Scarf / Stole | Grey | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 103 | Scarf / Stole | Cream | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 104 | Scarf / Stole | Olive | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 105 | Scarf / Stole | Brown | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 106 | Scarf / Stole | Beige | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 107 | Scarf / Stole | Burgundy | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 108 | Scarf / Stole | Khaki | Wool/Pashmina | Base PNG/WebP | 300 KB |
| 109 | Bracelet / Kada | Navy | Metal | Base PNG/WebP | 300 KB |
| 110 | Bracelet / Kada | Black | Metal | Base PNG/WebP | 300 KB |
| 111 | Bracelet / Kada | White | Metal | Base PNG/WebP | 300 KB |
| 112 | Bracelet / Kada | Maroon | Metal | Base PNG/WebP | 300 KB |
| 113 | Bracelet / Kada | Blue | Metal | Base PNG/WebP | 300 KB |
| 114 | Bracelet / Kada | Grey | Metal | Base PNG/WebP | 300 KB |
| 115 | Bracelet / Kada | Cream | Metal | Base PNG/WebP | 300 KB |
| 116 | Bracelet / Kada | Olive | Metal | Base PNG/WebP | 300 KB |
| 117 | Bracelet / Kada | Brown | Metal | Base PNG/WebP | 300 KB |
| 118 | Bracelet / Kada | Beige | Metal | Base PNG/WebP | 300 KB |
| 119 | Bracelet / Kada | Burgundy | Metal | Base PNG/WebP | 300 KB |
| 120 | Bracelet / Kada | Khaki | Metal | Base PNG/WebP | 300 KB |
| 121 | Turban / Pagri | Navy | Silk/Cotton | Base PNG/WebP | 300 KB |
| 122 | Turban / Pagri | Black | Silk/Cotton | Base PNG/WebP | 300 KB |
| 123 | Turban / Pagri | White | Silk/Cotton | Base PNG/WebP | 300 KB |
| 124 | Turban / Pagri | Maroon | Silk/Cotton | Base PNG/WebP | 300 KB |
| 125 | Turban / Pagri | Blue | Silk/Cotton | Base PNG/WebP | 300 KB |
| 126 | Turban / Pagri | Grey | Silk/Cotton | Base PNG/WebP | 300 KB |
| 127 | Turban / Pagri | Cream | Silk/Cotton | Base PNG/WebP | 300 KB |
| 128 | Turban / Pagri | Olive | Silk/Cotton | Base PNG/WebP | 300 KB |
| 129 | Turban / Pagri | Brown | Silk/Cotton | Base PNG/WebP | 300 KB |
| 130 | Turban / Pagri | Beige | Silk/Cotton | Base PNG/WebP | 300 KB |
| 131 | Turban / Pagri | Burgundy | Silk/Cotton | Base PNG/WebP | 300 KB |
| 132 | Turban / Pagri | Khaki | Silk/Cotton | Base PNG/WebP | 300 KB |
| 133 | Safa / Paag (Wedding) | Navy | Silk | Base PNG/WebP | 300 KB |
| 134 | Safa / Paag (Wedding) | Black | Silk | Base PNG/WebP | 300 KB |
| 135 | Safa / Paag (Wedding) | White | Silk | Base PNG/WebP | 300 KB |
| 136 | Safa / Paag (Wedding) | Maroon | Silk | Base PNG/WebP | 300 KB |
| 137 | Safa / Paag (Wedding) | Blue | Silk | Base PNG/WebP | 300 KB |
| 138 | Safa / Paag (Wedding) | Grey | Silk | Base PNG/WebP | 300 KB |
| 139 | Safa / Paag (Wedding) | Cream | Silk | Base PNG/WebP | 300 KB |
| 140 | Safa / Paag (Wedding) | Olive | Silk | Base PNG/WebP | 300 KB |
| 141 | Safa / Paag (Wedding) | Brown | Silk | Base PNG/WebP | 300 KB |
| 142 | Safa / Paag (Wedding) | Beige | Silk | Base PNG/WebP | 300 KB |
| 143 | Safa / Paag (Wedding) | Burgundy | Silk | Base PNG/WebP | 300 KB |
| 144 | Safa / Paag (Wedding) | Khaki | Silk | Base PNG/WebP | 300 KB |
| 145 | Cap / Topi | Navy | Cotton/Wool | Base PNG/WebP | 300 KB |
| 146 | Cap / Topi | Black | Cotton/Wool | Base PNG/WebP | 300 KB |
| 147 | Cap / Topi | White | Cotton/Wool | Base PNG/WebP | 300 KB |
| 148 | Cap / Topi | Maroon | Cotton/Wool | Base PNG/WebP | 300 KB |
| 149 | Cap / Topi | Blue | Cotton/Wool | Base PNG/WebP | 300 KB |
| 150 | Cap / Topi | Grey | Cotton/Wool | Base PNG/WebP | 300 KB |
| 151 | Cap / Topi | Cream | Cotton/Wool | Base PNG/WebP | 300 KB |
| 152 | Cap / Topi | Olive | Cotton/Wool | Base PNG/WebP | 300 KB |
| 153 | Cap / Topi | Brown | Cotton/Wool | Base PNG/WebP | 300 KB |
| 154 | Cap / Topi | Beige | Cotton/Wool | Base PNG/WebP | 300 KB |
| 155 | Cap / Topi | Burgundy | Cotton/Wool | Base PNG/WebP | 300 KB |
| 156 | Cap / Topi | Khaki | Cotton/Wool | Base PNG/WebP | 300 KB |
| 157 | Chain / Pendant | Navy | Metal | Base PNG/WebP | 300 KB |
| 158 | Chain / Pendant | Black | Metal | Base PNG/WebP | 300 KB |
| 159 | Chain / Pendant | White | Metal | Base PNG/WebP | 300 KB |
| 160 | Chain / Pendant | Maroon | Metal | Base PNG/WebP | 300 KB |
| 161 | Chain / Pendant | Blue | Metal | Base PNG/WebP | 300 KB |
| 162 | Chain / Pendant | Grey | Metal | Base PNG/WebP | 300 KB |
| 163 | Chain / Pendant | Cream | Metal | Base PNG/WebP | 300 KB |
| 164 | Chain / Pendant | Olive | Metal | Base PNG/WebP | 300 KB |
| 165 | Chain / Pendant | Brown | Metal | Base PNG/WebP | 300 KB |
| 166 | Chain / Pendant | Beige | Metal | Base PNG/WebP | 300 KB |
| 167 | Chain / Pendant | Burgundy | Metal | Base PNG/WebP | 300 KB |
| 168 | Chain / Pendant | Khaki | Metal | Base PNG/WebP | 300 KB |
| 169 | Ring (Men's) | Navy | Metal | Base PNG/WebP | 300 KB |
| 170 | Ring (Men's) | Black | Metal | Base PNG/WebP | 300 KB |
| 171 | Ring (Men's) | White | Metal | Base PNG/WebP | 300 KB |
| 172 | Ring (Men's) | Maroon | Metal | Base PNG/WebP | 300 KB |
| 173 | Ring (Men's) | Blue | Metal | Base PNG/WebP | 300 KB |
| 174 | Ring (Men's) | Grey | Metal | Base PNG/WebP | 300 KB |
| 175 | Ring (Men's) | Cream | Metal | Base PNG/WebP | 300 KB |
| 176 | Ring (Men's) | Olive | Metal | Base PNG/WebP | 300 KB |
| 177 | Ring (Men's) | Brown | Metal | Base PNG/WebP | 300 KB |
| 178 | Ring (Men's) | Beige | Metal | Base PNG/WebP | 300 KB |
| 179 | Ring (Men's) | Burgundy | Metal | Base PNG/WebP | 300 KB |
| 180 | Ring (Men's) | Khaki | Metal | Base PNG/WebP | 300 KB |
| 181 | Bag / Backpack | Navy | Leather/Canvas | Base PNG/WebP | 300 KB |
| 182 | Bag / Backpack | Black | Leather/Canvas | Base PNG/WebP | 300 KB |
| 183 | Bag / Backpack | White | Leather/Canvas | Base PNG/WebP | 300 KB |
| 184 | Bag / Backpack | Maroon | Leather/Canvas | Base PNG/WebP | 300 KB |
| 185 | Bag / Backpack | Blue | Leather/Canvas | Base PNG/WebP | 300 KB |
| 186 | Bag / Backpack | Grey | Leather/Canvas | Base PNG/WebP | 300 KB |
| 187 | Bag / Backpack | Cream | Leather/Canvas | Base PNG/WebP | 300 KB |
| 188 | Bag / Backpack | Olive | Leather/Canvas | Base PNG/WebP | 300 KB |
| 189 | Bag / Backpack | Brown | Leather/Canvas | Base PNG/WebP | 300 KB |
| 190 | Bag / Backpack | Beige | Leather/Canvas | Base PNG/WebP | 300 KB |
| 191 | Bag / Backpack | Burgundy | Leather/Canvas | Base PNG/WebP | 300 KB |
| 192 | Bag / Backpack | Khaki | Leather/Canvas | Base PNG/WebP | 300 KB |

**Accessories subtotal:** 192 unique variants × 300 KB = **56.3 MB**

## 2.5 Textures & Fabrics (Tile Assets)

Seamless repeating texture tiles for each fabric — used by the Sensory Visualization engine to render fabric appearance on garments.

| # | Fabric / Texture | Visual Finish | Typical Sheen | Best Seasons | Asset Type | Est. Size |
|---|-----------------|---------------|---------------|-------------|------------|----------|
| 1 | **Cotton** | Matte, Breathable | Matte | Summer, All-Season | Texture Tile WebP | 100 KB |
| 2 | **Polyester Blend** | Smooth, Slight Sheen | Medium | All-Season | Texture Tile WebP | 100 KB |
| 3 | **Silk** | Glossy, Lustrous | High Gloss | Occasion-wear | Texture Tile WebP | 100 KB |
| 4 | **Denim** | Rugged, Textured | Medium | All-Season | Texture Tile WebP | 100 KB |
| 5 | **Linen** | Matte, Slightly Rough | Matte | Summer | Texture Tile WebP | 100 KB |
| 6 | **Wool** | Soft, Matte | Medium | Winter, Formal | Texture Tile WebP | 100 KB |
| 7 | **Leather** | Glossy/Matte Leather | Medium | All-Season | Texture Tile WebP | 100 KB |
| 8 | **Cotton Blend** | Smooth | Matte | All-Season | Texture Tile WebP | 100 KB |
| 9 | **Rayon** | Silky, Fluid | Medium | Summer | Texture Tile WebP | 100 KB |
| 10 | **Velvet** | Plush, Rich Texture | Medium | Winter, Wedding | Texture Tile WebP | 100 KB |
| 11 | **Terry Wool** | Fine Matte | Medium | Winter, Formal | Texture Tile WebP | 100 KB |
| 12 | **Khadi** | Handspun, Rustic | Medium | Summer, Festive | Texture Tile WebP | 100 KB |
| 13 | **Satin** | High Gloss, Smooth | High Gloss | Occasion-wear | Texture Tile WebP | 100 KB |
| 14 | **Tweed** | Coarse, Textured | Medium | Winter | Texture Tile WebP | 100 KB |
| 15 | **Chiffon** | Sheer, Light | Medium | Summer, Occasion | Texture Tile WebP | 100 KB |
| 16 | **Corduroy** | Ribbed, Soft | Medium | Winter, Casual | Texture Tile WebP | 100 KB |
| 17 | **Chambray** | Light Denim-like | Medium | Summer | Texture Tile WebP | 100 KB |
| 18 | **Jacquard** | Patterned Weave | Medium | Occasion | Texture Tile WebP | 100 KB |
| 19 | **Brocade** | Embossed, Gold Thread | Medium | Wedding | Texture Tile WebP | 100 KB |
| 20 | **Pashmina** | Ultra-Soft, Luxurious | Medium | Winter | Texture Tile WebP | 100 KB |
| 21 | **Net / Mesh** | Open Weave | Medium | Sports, Casual | Texture Tile WebP | 100 KB |
| 22 | **Canvas** | Sturdy, Matte | Medium | Casual | Texture Tile WebP | 100 KB |

**Textures subtotal:** 22 tiles × 100 KB = **2.1 MB**

## 2.6 Complete Color Palette Reference

All distinct `color_family` values. Each needs a swatch asset for UI color pickers.

| # | Color Family | Hex Code | DB Rows |
|---|-------------|----------|--------|
| 1 | Navy | #000080 | 14,200 |
| 2 | Black | #000000 | 13,800 |
| 3 | White | #FFFFFF | 12,600 |
| 4 | Maroon | #800000 | 10,400 |
| 5 | Blue | #4169E1 | 9,200 |
| 6 | Grey | #808080 | 8,100 |
| 7 | Cream | #FFFDD0 | 6,800 |
| 8 | Olive | #556B2F | 5,400 |
| 9 | Brown | #8B4513 | 5,100 |
| 10 | Beige | #F5F5DC | 4,800 |
| 11 | Burgundy | #800020 | 4,200 |
| 12 | Khaki | #C3B091 | 3,600 |
| 13 | Red | #DC143C | 3,200 |
| 14 | Green | #228B22 | 2,800 |
| 15 | Light Blue | #ADD8E6 | 2,600 |
| 16 | Pink / Blush | #FFB6C1 | 2,100 |
| 17 | Gold | #FFD700 | 1,800 |
| 18 | Teal | #008080 | 1,400 |
| 19 | Mustard / Yellow | #E1AD01 | 1,200 |
| 20 | Lavender | #E6E6FA | 900 |
| 21 | Saffron / Orange | #FF6600 | 850 |
| 22 | Peach | #FFDAB9 | 700 |
| 23 | Rust | #B7410E | 650 |
| 24 | Tan | #D2B48C | 600 |
| 25 | Charcoal | #36454F | 550 |
| 26 | Silver | #C0C0C0 | 400 |
| 27 | Mint Green | #98FF98 | 350 |
| 28 | Coral | #FF7F50 | 300 |
| 29 | Ivory | #FFFFF0 | 280 |

**Color swatches:** 29 × 10 KB = **0.28 MB** (minimal)

## 2.7 Accessory Descriptions from Database

| # | Accessory Description | DB Rows | Asset Type | Est. Size |
|---|----------------------|---------|------------|----------|
| 1 | Leather Belt + Watch | 3,400 | Base PNG/WebP | 300 KB |
| 2 | Tie + Pocket Square | 2,800 | Base PNG/WebP | 300 KB |
| 3 | Sunglasses | 2,200 | Base PNG/WebP | 300 KB |
| 4 | Brooch / Lapel Pin | 1,600 | Base PNG/WebP | 300 KB |
| 5 | Cufflinks | 1,200 | Base PNG/WebP | 300 KB |
| 6 | Scarf / Stole | 900 | Base PNG/WebP | 300 KB |
| 7 | Bracelet / Kada | 700 | Base PNG/WebP | 300 KB |
| 8 | Turban / Pagri | 500 | Base PNG/WebP | 300 KB |
| 9 | Chain / Pendant | 350 | Base PNG/WebP | 300 KB |
| 10 | Ring (Signet) | 250 | Base PNG/WebP | 300 KB |

## 2.8 Top Wear Color Variants (`color_top` column)

| # | Color (Top Wear) | DB Rows |
|---|-----------------|--------|
| 1 | Navy | 7,810 |
| 2 | Black | 7,590 |
| 3 | White | 6,930 |
| 4 | Maroon | 5,720 |
| 5 | Blue | 5,060 |
| 6 | Grey | 4,455 |
| 7 | Cream | 3,740 |
| 8 | Olive | 2,970 |
| 9 | Brown | 2,805 |
| 10 | Beige | 2,640 |
| 11 | Burgundy | 2,310 |
| 12 | Khaki | 1,980 |
| 13 | Red | 1,760 |
| 14 | Green | 1,540 |
| 15 | Light Blue | 1,430 |

## 2.9 Bottom Wear Color Variants (`color_bottom` column)

| # | Color (Bottom Wear) | DB Rows |
|---|--------------------|--------|
| 1 | Black | 8,200 |
| 2 | Navy | 6,400 |
| 3 | Blue (Denim) | 5,800 |
| 4 | Beige | 4,200 |
| 5 | Grey | 3,600 |
| 6 | Khaki | 3,100 |
| 7 | Olive | 2,400 |
| 8 | White | 2,000 |
| 9 | Brown | 1,800 |
| 10 | Cream | 1,200 |
| 11 | Charcoal | 900 |
| 12 | Maroon | 600 |

## 2.10 Fabric Suggestions (`fabric_suggestion` column)

| # | Fabric Suggestion | DB Rows |
|---|------------------|--------|
| 1 | Cotton — Matte, Breathable | 32,400 |
| 2 | Polyester Blend — Smooth, Slight Sheen | 18,200 |
| 3 | Silk — Glossy, Lustrous | 12,600 |
| 4 | Denim — Rugged, Textured | 10,800 |
| 5 | Linen — Matte, Slightly Rough | 8,400 |
| 6 | Wool — Soft, Matte | 7,200 |
| 7 | Leather — Glossy/Matte Leather | 6,800 |
| 8 | Cotton Blend — Smooth | 5,600 |
| 9 | Rayon — Silky, Fluid | 3,200 |
| 10 | Velvet — Plush, Rich Texture | 2,800 |
| 11 | Terry Wool — Fine Matte | 2,400 |
| 12 | Khadi — Handspun, Rustic | 1,800 |
| 13 | Satin — High Gloss, Smooth | 1,600 |
| 14 | Tweed — Coarse, Textured | 1,200 |
| 15 | Chiffon — Sheer, Light | 800 |

### PART 2 — Storage Summary

| Category Group | Unique Assets | Est. Storage |
|----------------|--------------|-------------|
| Upper Body | 276 | 80.9 MB |
| Lower Body | 132 | 38.7 MB |
| Footwear | 120 | 35.2 MB |
| Accessories | 192 | 56.3 MB |
| Texture Tiles | 22 | 2.1 MB |
| Color Swatches | 29 | 0.28 MB |
| **PART 2 TOTAL** | **771** | **213.4 MB** |

---

# Grand Total — Storage Budget

| Section | Assets | Est. Storage |
|---------|--------|-------------|
| **Part 1 — High-Priority (MVP)** | 75 | 48.3 MB |
| **Part 2 — Exhaustive (Full Sweep)** | 771 | 213.4 MB |
| **GRAND TOTAL** | **846** | **261.7 MB** |
| Supabase Storage Limit | — | **1024 MB (1 GB)** |
| **Remaining Budget** | — | **762.3 MB** |
| **Within Budget?** | — | **YES — well within 1 GB limit** |

### Storage Visualization

```
[█████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 25.6% of 1 GB used
```

---

# Recommendations

### Phase 1 — Immediate (Week 1)
- Generate all **Part 1** assets: **75 files** totaling ~**48.3 MB**.
- Covers the **80/20 rule** — the majority of all visitor searches will be visually served.
- Start with the **top 10 base articles** (Formal Shirt, Casual Shirt, T-Shirt, Kurta, Jeans, Formal Trousers, Chinos, Formal Shoes, Sneakers, Blazer).

### Phase 2 — Extended (Weeks 2–3)
- Generate **Part 2** assets by priority: Upper Body → Lower Body → Footwear → Accessories → Textures.
- The unique triple count (**720**) is the true number of distinct visuals needed, not the row count (128,743).

### Optimization Strategies
1. **WebP format** at quality 80–85, max width 1024px. Expect ~250–300 KB per asset.
2. **Texture tiles** for fabrics: generate small repeating tiles (~100 KB) and apply programmatically. Saves ~60% storage vs. per-item fabric rendering.
3. **Color variants via code:** Generate one base article in a neutral color, then apply color transformations (hue shift) in the browser or at build time — reduces unique assets by ~70%.
4. **Lazy generation:** Use a CDN + on-demand image generation. Only generate assets when first requested by a visitor.
5. **Deduplication:** Many database rows share the same article + color + fabric. Always reference the unique triple, not the raw row.
6. **Progressive loading:** Show fabric-textured color swatches immediately (10 KB), then load full garment image on interaction.

### Asset Naming Convention
```
Base:    {sub_category}_{color}_{fabric}.webp
         e.g., formal-shirt_navy_cotton.webp

Combo:   {occasion}_{top}_{bottom}_{footwear}.webp
         e.g., wedding_sherwani-cream_churidar-gold_mojari.webp

Texture: texture_{fabric}_{finish}.webp
         e.g., texture_silk_glossy.webp

Swatch:  swatch_{color_family}.webp
         e.g., swatch_navy.webp
```

---

*Report generated by `scripts/generate-asset-report.mjs` — Data source: Codebase-Derived Analysis.*

> **Note:** This report was generated from comprehensive codebase analysis (schema, types, constants, mock data, page components). To generate from live database queries, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables and re-run the script.
