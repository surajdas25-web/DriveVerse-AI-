# DriveVerse

A responsive vehicle simulation workspace built on the uploaded React application. Existing routes, Bootstrap components, Chart.js analytics, circular gauges, and simulator actions have been retained and improved.

## Run locally

Install a current Node.js LTS release with npm. Extract `DriveVerse-Updated.zip`, open a terminal inside its `DriveVerse` folder, and run:

```bash
npm ci
npm start
```

Open http://localhost:3000. No API keys or environment files are required for the local demo.

```bash
npm run build
npm test -- --watchAll=false
```

The production build is generated in `build/`. A deployment host must serve `index.html` for unknown paths so BrowserRouter routes work after refreshing.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Vehicle overview, controls, telemetry, insights, sample trip |
| `/digital-twin` | Shared simulation, gauges, tire pressure, health, score, clock |
| `/analytics` | Existing illustrative speed, fuel, battery, and driving charts |
| `/weather` | City weather search, temperature preference, retry and error states |
| `/maintenance` | Create, edit, complete, delete, search, and filter service records |
| `/settings` | Driver and vehicle names, theme, weather refresh, accessible announcements, units |

Unknown URLs display a recovery page.

## Behavior and data

- Overview and Digital Twin share one reducer-backed simulation during the session. Reloading resets vehicle values deliberately; the Reset button does the same.
- Acceleration requires a running engine; refueling requires a stopped engine. Speed, fuel, battery, temperature, and health have bounds. Empty fuel or battery stops the simulation.
- Preferences and maintenance records persist in this browser's localStorage. They are not synced across devices. Storage failures show a message and leave changes available for the session.
- Analytics and trip snapshots are explicitly labeled sample data. They do not pretend to be actual driving history.
- Vehicle insights are deterministic rules, not a connected AI service or actual vehicle diagnostics.
- Weather uses Open-Meteo geocoding and current modeled conditions. Requests have cancellation and 12-second timeouts. Search failure offers retry and a clearly labeled sample weather view.
- The refresh preference updates the selected city's weather every ten minutes. It does not fabricate telemetry.
- No backend, accounts, authentication, vehicle hardware interface, or real AI endpoint existed in the uploaded code. None is implied by the interface.

## Architecture

`src/state/model.js` owns simulator transitions and validated preference loading. `DriveContext.jsx` shares vehicle state and preferences. `src/services/weather.js` isolates network access. Existing gauges and charts remain reusable components; PageHeader, VehicleCard, and CarAnimation provide shared visual primitives. CSS variables power both themes with responsive breakpoints, visible focus states, and reduced-motion support.

## Validation

See `AUDIT.md` for the original findings, changes, test results, and deployment limitations. Screenshots are in `previews/`.

The original Create React App / react-scripts 5 toolchain is retained to avoid changing the project's local workflow. Its tooling prints deprecation notices on newer Node versions, although the build compiles successfully. This is a polished local demo, not a connected vehicle production service. Before a commercial release, review dependencies and the weather provider's current usage terms, configure hosting, and define backend/security requirements.

## Reproduce browser checks (optional)

The supplied Playwright script serves the production build locally, uses deterministic weather fixtures, exercises the main interactive flows, and checks all routes at six viewport widths. It creates screenshots in `previews/`.

```bash
npm run build
npx playwright install chromium
npm run test:browser
```

Weather requests are mocked in this suite to keep tests repeatable. A working internet connection is needed to check actual city weather in the app.
