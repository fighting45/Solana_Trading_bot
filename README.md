Objective:
Build a JavaScript/TypeScript-based tool that interacts with the Solana blockchain and
Raydium DEX to monitor token prices and market caps, and automatically trigger buy orders
when certain market cap thresholds are met. Additionally, expose data via REST API
endpoints using FastAPI or Node.js frameworks.

Task Description
1- Track Token Price & Market Cap on Raydium
2- Monitor one or more SPL tokens (e.g., SOL, BONK, USDC) on Raydium's liquidity pools.
3- Use public APIs such as Raydium's API, Serum, or on-chain RPC via Solana
Web3.js library.
4- Fetch real-time token prices and calculate market cap based on circulating supply.
5- Trigger Buy Orders

When a token’s price hits a predefined market cap threshold:

1- Automatically execute a buy order on Raydium via Solana blockchain
transactions.
2- Handle wallet connection, transaction signing, and confirmation using web3
wallet adapters.
3- Store & Manage Data
4- Log token price changes, market cap, and buy order history.
5- Use lightweight storage (e.g., SQLite, JSON files, or local database).
6- Expose Data via REST API
7- Build RESTful endpoints using FastAPI (Python) or Express.js (Node.js):

GET /token-info — Latest price and market cap for tracked tokens.
GET /buy-orders — History of executed buy orders.
GET /chart-data — Pre-processed token price and market cap data for visualization.

Visualization Layer (Optional)

1- Create charts using Chart.js, D3.js, or integrate with React/Next.js frontend.
2- Display token price trends and buy order triggers.

Bonus Features
1- Build a lightweight front-end dashboard for real-time monitoring.
2- Host the API and dashboard on cloud services (e.g., Vercel, Heroku).

Deliverables
A GitHub repository named:
intern-assessment-[yourname]
Include:

1- All JavaScript/TypeScript code handling token tracking, buying logic, and API.

Documentation (README.md) covering:
Project overview
Setup instructions
How to run the application
API endpoint descriptions

Evaluation Criteria
Area Description
On-chain Integration Ability to fetch and interact with Raydium and Solana blockchain
Automated Trading Data Management API Design Visualization Code Quality Extra Features Correct implementation of buy orders based on market cap
triggers
Organized storage of price data and transaction logs
Clean, RESTful API endpoints
Meaningful charts reflecting token price & buy activity
Readable, modular, and well-documented code
Frontend dashboard, hosted service, advanced analytics

Submission Deadline:
3 July 2025