# Column Descriptions: SF Loved Reviews L14D.tsv

This document describes each column in the **SF Loved Reviews L14D.tsv** file. The file contains customer reviews from San Francisco restaurants over the last 14 days (L14D), filtered to reviews where the customer rated their experience as "Loved."

---

## Column Reference

| Column | Description |
|--------|-------------|
| **CONSUMER_ID** | Unique identifier for the consumer who wrote the review. |
| **CONSUMER_NAME** | First name and last initial of the customer who wrote the review. Displayed in a semi-anonymized format (e.g., "Marisol A", "Jessica D") for privacy while identifying reviewers. |
| **STORE_NAME** | Name of the restaurant or store where the order was placed. May include location details (e.g., street name, neighborhood) for multi-location businesses. |
| **RATING_REVIEW_DATE** | Date when the customer submitted their rating and review. Format: `YYYY-MM-DD`. |
| **RATING** | The emoji-style rating value the customer gave. In this file, all rows are **LOVED** (❤️), representing an exceptional experience. Other possible values in the broader ratings system: LIKED (👍), DISLIKED (👎). |
| **REVIEW_TEXT** | The free-text written review from the customer. May include feedback on food quality, service, portion size, and overall experience. Can span multiple lines; tabs and newlines within the text may be present. |
| **ITEMS_ORDERED** | Comma-separated list of menu items the customer ordered, with quantities. Format: `Item Name x<quantity>`. May include item IDs or menu numbers for some stores (e.g., "2. Shanghai Pan Fried Soup Dumpling 上海生煎包(4) x1"). |
| **GENAI_CX_PROFILE** | JSON object containing a detailed customer profile inferred from ordering behavior. Includes dietary preferences (strict and preferred), cuisine preferences, food preferences, taste preferences, reordering tendency, vertical orientation, price sensitivity, beverage preferences, and optional daypart breakdowns. The `dietary_preferences` nested object describes what we know about the customer's dietary habits based on their order history (e.g., vegan, vegetarian, gluten-free, none). |
| **LIFETIME_ORDERS_FROM_STORE** | Integer count of how many times the consumer has placed orders from this specific store over their lifetime. Indicates repeat-customer status (e.g., 1 = first-time reviewer, 5+ = regular). |

---

## File Format

- **Format:** TSV (Tab-Separated Values)
- **Encoding:** UTF-8 (supports international characters)
- **Header:** First row contains column names
- **Scope:** San Francisco submarket, last 14 days, LOVED ratings only

---

## Notes

- Reviews may contain special characters, line breaks, and quoted text; handle parsing accordingly.
- `ITEMS_ORDERED` is derived from order/checkout data and may not match the exact menu structure at time of reading.
