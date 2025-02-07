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
      "/propertypics/property1.jpg",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb",
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
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
      "https://images.unsplash.com/photo-1532926381893-7542290edf1d",
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
      "https://images.unsplash.com/photo-1566908829550-e6551b00979b",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35",
      "https://images.unsplash.com/photo-1507149833265-60c372daea22",
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
      "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    ],
  },
];

export const contactSchema = createInsertSchema(contacts);

export type Property = typeof properties.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof contactSchema>;
