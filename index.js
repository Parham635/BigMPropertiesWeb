// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  address: text("address").notNull(),
  price: integer("price").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  sqft: integer("sqft").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  images: text("images").array().notNull()
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  propertyId: integer("property_id").notNull()
});
var propertyData = [
  {
    id: 1,
    title: "2845 Tuebingen Pkwy",
    address: "Ann Arbor, MI 48105",
    price: 2400,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    description: "Stunning modern home minutes from campus with luxury finishes and ample natural light.",
    features: [
      "In-unit laundry",
      "Central AC",
      "Parking included",
      "Pet friendly"
    ],
    images: [
      "/propertypics/property1.jpg",
      "/propertypics/property1.jpg",
      "/propertypics/property1.jpg"
    ]
  },
  {
    id: 2,
    title: "1002 Myron Ct",
    address: "Ann Arbor, MI 48103",
    price: 3200,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2e3,
    description: "Spacious luxury apartment with stunning views of campus and premium amenities.",
    features: [
      "Rooftop deck",
      "Fitness center",
      "Study rooms",
      "24/7 security"
    ],
    images: [
      "/propertypics/property2.jpg",
      "/propertypics/property2.jpg",
      "/propertypics/property2.jpg"
    ]
  },
  {
    id: 3,
    title: "1010 S Forest Ave",
    address: "ANN ARBOR, MI 48104",
    price: 2800,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    description: "Beautifully renovated historic home combining classic charm with modern amenities.",
    features: [
      "Hardwood floors",
      "Gourmet kitchen",
      "Private yard",
      "Walk to campus"
    ],
    images: [
      "/propertypics/property3.jpg",
      "/propertypics/property3.jpg",
      "/propertypics/property3.jpg"
    ]
  },
  {
    id: 4,
    title: "1301 Jones Dr",
    address: "Ann Arbor, MI 48105",
    price: 2600,
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 1700,
    description: "Contemporary townhouse with excellent amenities in a prime location near campus.",
    features: [
      "Attached garage",
      "Smart home features",
      "Community pool",
      "Modern design"
    ],
    images: [
      "/propertypics/property4.jpg",
      "/propertypics/property4.jpg",
      "/propertypics/property4.jpg"
    ]
  }
];
var contactSchema = createInsertSchema(contacts);

// server/routes.ts
import { ZodError } from "zod";
function registerRoutes(app2) {
  app2.get("/api/properties", (_req, res) => {
    res.json(propertyData);
  });
  app2.get("/api/properties/:id", (req, res) => {
    const property = propertyData.find((p) => p.id === parseInt(req.params.id));
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const contact = contactSchema.parse(req.body);
      const property = propertyData.find((p) => p.id === contact.propertyId);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json({ message: "Contact request received" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],
  base: "/BigMPropertiesWeb/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const PORT = 5e3;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
