import type { Project } from "../types/project";
import type { projectCaseStudies } from "./projectCaseStudies";

export const englishProjectCaseStudies = {
  "techball-web": {
    problem:
      "Finding suitable candidates in a large player pool by considering position, role, salary, and performance requirements together.",
    solution:
      "Multi-criteria filtering, a customizable table, a tactics board, and natural-language Scout AI searches share one research workspace.",
    decision:
      "The Python API accesses the SQLite database in read-only mode. AI commentary uses a limited summary of candidates returned by the local query; results appear alongside the criteria used.",
    limits:
      "A local prototype. Public demo and source code links are not available yet. A public release requires licensed sample data and a defined scope for external services.",
    evidence:
      "Two screenshots show the player table, tactics board, and Scout AI results. They do not replace a live demo or test results for query accuracy.",
  },
  yatatodo: {
    problem:
      "Organizing daily tasks into an order that fits the user’s available time, rather than simply recording them.",
    solution:
      "Task creation, editing, completion, and filtering are combined with a Gemini Flash-suggested order, duration, and rationale. The final decision stays with the user.",
    decision:
      "Tasks are managed with a pure reducer. Unknown and duplicate IDs in model responses are removed and missing tasks are added; durations are rescaled if their total exceeds the available time.",
    limits:
      "No accounts or cross-device synchronization. Tasks and the user’s API key are stored in the browser; key management needs separate consideration for a public release.",
    evidence:
      "The screenshot shows tasks and a daily plan together. The reducer and plan response validation can be inspected in the source code; no measured success rate or performance result is presented.",
  },
  yataquizing: {
    problem:
      "Creating a timed quiz session with different content without hardcoding questions into the application.",
    solution:
      "The flow starts with a preset quiz or JSON upload, followed by timed questions, answer tracking, and an explained results summary.",
    decision:
      "Question content and quiz flow are separate. Answers are stored in state by question position; restarting resets answers and timers. JSON files are read in the browser.",
    limits:
      "Results history is not persisted and there is no account system. Detailed test results for timer and back-navigation behavior have not been shared in this portfolio.",
    evidence:
      "Three screenshots show selection, questions, and results. The source link allows inspection of file validation and the quiz flow; a live demo has not been added yet.",
  },
  yataclimate: {
    problem:
      "Comparing weather conditions across cities and clearly reading hourly changes and weekly forecasts.",
    solution:
      "48 priority cities, city search, favorites, and detailed weather views present temperature, precipitation, and wind information in a single flow.",
    decision:
      "City summaries are fetched in a single batched Forecast request. Detailed hourly and weekly data loads when a city is opened; changing the search cancels the previous geocoding request.",
    limits:
      "Fresh weather data requires a connection. Some search and city errors do not clearly distinguish offline conditions from missing results. The cache is limited to page memory.",
    evidence:
      "Two screens show the city list and detail view. Batched requests, detail loading, and search cancellation can be inspected in the source; no measured reduction in requests is presented.",
  },
  "yata-market": {
    problem:
      "Building the shopping journey from product discovery to the cart with a React interface and Express API.",
    solution:
      "Search, category and price filters, product details, favorites, a cart, and demo product management work within one application.",
    decision:
      "Cart and favorites use separate Contexts and reducers. Cart totals are calculated from state; corrupted browser records are treated as an empty cart. The API has separate validation and error layers.",
    limits:
      "Products live in server memory, so management changes are lost on restart. The admin area has no access control; real payments, orders, inventory, and shipping are not included.",
    evidence:
      "Catalog and cart screens show the user flow. The source link allows inspection of the interface and REST endpoints. This is not presented as a live store or real payment system.",
  },
  "kisisel-kitaplik": {
    problem:
      "Organizing book and author catalogs, reading status, and book-related notes in one library flow.",
    solution:
      "Library and Authors interfaces are available. An Express API backend handles notes and quotations; the React reading journal screen has not been added yet.",
    decision:
      "The catalog is stored in PostgreSQL and notes and quotations in MongoDB. The application service checks the bookId relationship and rejects deletion when linked records exist. The two databases do not share a transaction.",
    limits:
      "A local, single-user learning application. The journal interface and access control are missing; checks before deletion can introduce a race condition during concurrent operations. The cost of splitting the data should also be evaluated.",
    evidence:
      "Two screens show book and author management. The source is available for inspecting data models and deletion rules; no journal interface or concurrency test results are shown.",
  },
  yataoil: {
    problem:
      "Evaluating vehicle listings and fuel costs in one research flow without producing misleading calculations from missing data.",
    solution:
      "A brand catalog and raw listing search are available. The cost screen shows estimated expenses using monthly distance, consumption, and price per liter.",
    decision:
      "Brand slugs are validated against the source catalog. Puppeteer runs on the server; catalog responses identify their source as live, cache, or fallback. Raw listing searches are not written to a persistent cache.",
    limits:
      "Access to live sources is not guaranteed. End-to-end completion of the detail service and CollectAPI fuel integration has not yet been verified; the calculation screenshot provides no such guarantee.",
    evidence:
      "Listing and cost screens have been shared. The project narrative describes fixture and mock checks; the available evidence does not yet confirm a working live detail and fuel integration.",
  },
} satisfies Record<
  keyof typeof projectCaseStudies,
  NonNullable<Project["caseStudy"]>
>;
