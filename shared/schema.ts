import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  address: text("address").notNull(),
  price: integer("price").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  sqft: integer("sqft").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  images: text("images").array().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  propertyId: integer("property_id").notNull(),
});

export const propertyData = [
  {
    id: 1,
    title: "2845 Tuebingen Pkwy",
    address: "Ann Arbor, MI 48105",
    price: 2400,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    description:
      "Stunning modern home minutes from campus with luxury finishes and ample natural light.",
    features: [
      "In-unit laundry",
      "Central AC",
      "Parking included",
      "Pet friendly",
    ],
    images: [
      "propertypics/property1.jpg",
      "propertypics/property1.jpg",
      "propertypics/property1.jpg",
    ],
  },
  {
    id: 2,
    title: "1002 Myron Ct",
    address: "Ann Arbor, MI 48103",
    price: 3200,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2000,
    description:
      "Spacious luxury apartment with stunning views of campus and premium amenities.",
    features: [
      "Rooftop deck",
      "Fitness center",
      "Study rooms",
      "24/7 security",
    ],
    images: [
      "propertypics/property2.jpg",
      "propertypics/property2.jpg",
      "propertypics/property2.jpg",
    ],
  },
  {
    id: 3,
    title: "1010 S Forest Ave",
    address: "ANN ARBOR, MI 48104",
    price: 2800,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    description:
      "Beautifully renovated historic home combining classic charm with modern amenities.",
    features: [
      "Hardwood floors",
      "Gourmet kitchen",
      "Private yard",
      "Walk to campus",
    ],
    images: [
      "propertypics/property3.jpg",
      "propertypics/property3.jpg",
      "propertypics/property3.jpg",
    ],
  },
  {
    id: 4,
    title: "1301 Jones Dr",
    address: "Ann Arbor, MI 48105",
    price: 2600,
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 1700,
    description:
      "Contemporary townhouse with excellent amenities in a prime location near campus.",
    features: [
      "Attached garage",
      "Smart home features",
      "Community pool",
      "Modern design",
    ],
    images: [
      "propertypics/property4.jpg",
      "propertypics/property4.jpg",
      "propertypics/property4.jpg",
    ],
  },
];

export const contactSchema = createInsertSchema(contacts);

export type Property = typeof properties.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof contactSchema>;