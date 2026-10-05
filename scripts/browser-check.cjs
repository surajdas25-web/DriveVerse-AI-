const { chromium } = require("playwright");
const fs = require("fs"),
  http = require("http"),
  path = require("path"),
  assert = require("assert");
(async () => {
  fs.mkdirSync(path.join(__dirname, "../previews"), { recursive: true });
  const root = path.join(__dirname, "../build");
  const server = http.createServer((req, res) => {
    const requested = path.join(
      root,
      decodeURIComponent(req.url.split("?")[0]),
    );
    const file =
      fs.existsSync(requested) && fs.statSync(requested).isFile()
        ? requested
        : path.join(root, "index.html");
    const types = {
      ".js": "application/javascript",
      ".css": "text/css",
      ".svg": "image/svg+xml",
      ".html": "text/html",
      ".json": "application/json",
    };
    res.setHeader(
      "Content-Type",
      types[path.extname(file)] || "application/octet-stream",
    );
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(3800, "127.0.0.1", r));
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.DRIVEVERSE_TEST_BROWSER
      ? {
          executablePath: process.env.DRIVEVERSE_TEST_BROWSER,
          args: ["--no-sandbox", "--no-zygote", "--disable-dev-shm-usage"],
        }
      : {}),
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1050 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  // deterministic API responses let us test failures, success, and ambiguous/missing cities.
  await page.route("https://geocoding-api.open-meteo.com/**", (route) =>
    route.fulfill({
      json: {
        results: [
          { name: "Mumbai", country: "India", latitude: 19, longitude: 72 },
        ],
      },
    }),
  );
  await page.route("https://api.open-meteo.com/**", (route) =>
    route.fulfill({
      json: {
        current: {
          temperature_2m: 28,
          weather_code: 61,
          relative_humidity_2m: 72,
          apparent_temperature: 31,
          wind_speed_10m: 14,
          surface_pressure: 1012,
          time: "2026-10-04T13:00",
        },
      },
    }),
  );
  await page.goto("http://127.0.0.1:3800");
  await page
    .getByRole("heading", { name: "A better view of every drive." })
    .waitFor();
  assert(
    !(await page
      .getByRole("button", { name: "Accelerate", exact: true })
      .isEnabled()),
  );
  await page.getByRole("button", { name: "Start engine", exact: true }).click();
  await page.getByRole("button", { name: "Accelerate", exact: true }).click();
  await page.getByRole("button", { name: "Accelerate", exact: true }).click();
  await page.getByRole("button", { name: "Brake", exact: true }).click();
  assert(
    (await page.locator(".metric-card").first().innerText()).includes("10"),
  );
  await page.getByRole("link", { name: "Digital twin", exact: true }).click();
  assert(
    (await page.locator(".CircularProgressbar").textContent()).includes(
      "10 km/h",
    ),
  );
  await page.getByRole("button", { name: "Stop engine", exact: true }).click();
  await page.getByRole("button", { name: "Refuel", exact: true }).click();
  await page.getByRole("button", { name: "Reset simulation" }).click();
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await page.getByLabel("Driver name").fill("Test Driver");
  await page.getByLabel("Vehicle name").fill("DriveVerse Test Sedan");
  await page.getByLabel("Temperature unit").selectOption("Fahrenheit");
  await page.getByRole("button", { name: "Save preferences" }).click();
  await page.reload();
  assert.equal(
    await page.getByLabel("Driver name").inputValue(),
    "Test Driver",
  );
  await page.getByRole("link", { name: "Overview", exact: true }).click();
  assert(
    (await page.locator(".metric-card").nth(3).innerText()).includes("86"),
  );
  await page.getByRole("link", { name: "Maintenance", exact: true }).click();
  await page.getByRole("button", { name: "Add service" }).click();
  await page.getByLabel("Service name").fill("Oil change");
  await page.getByLabel("Service date").fill("2026-10-15");
  await page.getByLabel("Notes", { exact: true }).fill("Use recommended oil");
  await page.getByRole("button", { name: "Save service" }).click();
  await page.reload();
  await page
    .getByRole("heading", { name: "Oil change", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Edit Oil change" }).click();
  await page.getByLabel("Service name").fill("Oil and filter");
  await page.getByRole("button", { name: "Save service" }).click();
  await page.getByRole("button", { name: "Complete Oil and filter" }).click();
  await page.getByLabel("Filter service status").selectOption("Planned");
  assert.equal(await page.locator(".service-record").count(), 0);
  await page.getByLabel("Filter service status").selectOption("All");
  await page.getByLabel("Search services").fill("nothing");
  assert.equal(await page.locator(".service-record").count(), 0);
  await page.getByLabel("Search services").fill("");
  await page.getByRole("button", { name: "Delete Oil and filter" }).click();
  await page.getByRole("button", { name: "Keep record" }).click();
  assert.equal(await page.locator(".service-record").count(), 1);
  await page.getByRole("button", { name: "Delete Oil and filter" }).click();
  await page.getByRole("button", { name: "Confirm delete" }).click();
  assert.equal(await page.locator(".service-record").count(), 0);
  await page.getByRole("link", { name: "Road weather", exact: true }).click();
  await page.getByRole("heading", { name: "Mumbai", exact: true }).waitFor();
  assert((await page.locator(".weather-temp").innerText()).includes("82"));
  await page.getByLabel("City or town").fill("");
  await page.getByRole("button", { name: "Search weather" }).click();
  await page.getByText("Enter a city name.", { exact: true }).waitFor();
  await page.unroute("https://geocoding-api.open-meteo.com/**");
  await page.route("https://geocoding-api.open-meteo.com/**", (route) =>
    route.fulfill({ json: { results: [] } }),
  );
  await page.getByLabel("City or town").fill("Missing City");
  await page.getByRole("button", { name: "Search weather" }).click();
  await page
    .getByText("City not found. Try a nearby city or a more specific name.", {
      exact: true,
    })
    .waitFor();
  await page.getByRole("button", { name: "Explore sample weather" }).click();
  await page.getByText("SAMPLE WEATHER · NOT LIVE", { exact: true }).waitFor();
  // Restore defaults for screenshots; no test profile remains in deliverable.
  await page.goto("http://127.0.0.1:3800/settings");
  await page.getByLabel("Driver name").fill("Suraj Das");
  await page.getByLabel("Vehicle name").fill("Toyota Camry 2025");
  await page.getByLabel("Temperature unit").selectOption("Celsius");
  await page.getByRole("button", { name: "Save preferences" }).click();
  const routes = [
    "/",
    "/digital-twin",
    "/analytics",
    "/weather",
    "/maintenance",
    "/settings",
    "/missing-route",
  ];
  const dimensions = [1440, 1920, 1024, 768, 390, 320];
  let checks = 0;
  for (const width of dimensions) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto("http://127.0.0.1:3800" + route);
      await page.locator("main h1").first().waitFor();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      assert(!overflow, `overflow ${width} ${route}`);
      checks++;
    }
    if (width === 1440) {
      await page.goto("http://127.0.0.1:3800/digital-twin");
      await page.screenshot({
        path: path.join(__dirname, "../previews/twin.png"),
        fullPage: true,
      });
      await page.goto("http://127.0.0.1:3800/analytics");
      await page.screenshot({
        path: path.join(__dirname, "../previews/analytics.png"),
        fullPage: true,
      });
    }
    if (width === 390) {
      await page.goto("http://127.0.0.1:3800");
      await page.getByRole("button", { name: "Toggle navigation" }).click();
      await page.keyboard.press("Escape");
      assert.equal(
        await page
          .getByRole("button", { name: "Toggle navigation" })
          .getAttribute("aria-expanded"),
        "false",
      );
      await page.getByRole("button", { name: "Toggle navigation" }).click();
      assert(
        await page
          .getByRole("navigation", { name: "Main navigation" })
          .getByRole("link", { name: "Analytics", exact: true })
          .isVisible(),
      );
      await page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Analytics", exact: true })
        .click();
      assert.equal(
        await page
          .getByRole("button", { name: "Toggle navigation" })
          .getAttribute("aria-expanded"),
        "false",
      );
    }
  }
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto("http://127.0.0.1:3800");
  await page.screenshot({
    path: path.join(__dirname, "../previews/desktop.png"),
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.screenshot({
    path: path.join(__dirname, "../previews/light.png"),
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: path.join(__dirname, "../previews/mobile.png"),
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify(
      {
        result: "PASS",
        responsiveRouteChecks: checks,
        runtimeErrors: errors,
        flows: [
          "vehicle controls",
          "shared state",
          "settings persistence",
          "temperature units",
          "maintenance CRUD",
          "search/filter",
          "weather success",
          "weather validation",
          "weather missing city",
          "weather sample",
          "theme toggle",
          "mobile navigation",
          "404",
        ],
      },
      null,
      2,
    ),
  );
  await browser.close();
  server.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
