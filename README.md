# **Accounting Solution for Eatery and Bar**

## **Overview**

This project is a robust accounting solution tailored for small-scale eateries and bars. It provides tools to manage inventory, track sales, monitor cash flow, and generate essential financial reports like profit and loss statements, balance sheets, and trial balances. The system is built using modern technologies, ensuring scalability, reliability, and user-friendliness.

---

## **Features**

### **Inventory Management**

- Add, update, and delete inventory items.
- Track stock levels in real-time.
- Low-stock alerts.

### **Sales Management**

- Record sales transactions with item details, quantity, and prices.
- Supports multiple payment methods: cash, POS, and bank transfers.
- Query total sales by item or date range.
- Real-time sales price fetching from the database.

### **Financial Reporting**

- Generate **Profit and Loss Statements**.
- Track **Gross** and **Net Profits**.
- Monitor **Cash Flow**, including operational and capital expenditures.
- Create a **Balance Sheet**, **Trial Balance**, and **General Ledger**.

### **Other Features**

- **Authentication**: Secure user access via NextAuth.
- **Validation**: Input validation using Zod schemas.
- **Real-Time**: Data storage and queries powered by PostgreSQL.

---

## **Technology Stack**

### **Backend**

- **Framework**: Next.js 15
- **Database**: PostgreSQL (Vercel's PostgreSQL)
- **ORM**: Custom SQL queries with `@vercel/postgres`
- **Validation**: Zod

### **Frontend**

- **UI Framework**: Tailwind CSS
- **Component Library**: shadcn/UI (Radix UI)
- **Form Management**: React Hook Form with Zod resolvers

### **Authentication**

- **Library**: NextAuth

---

## **Project Structure**

```plaintext
src/
├── components/          # Reusable UI components
├── data/                # Database actions and schemas
│   ├── actions/         # CRUD operations
│   ├── schema/          # Zod validation schemas
├── hooks/               # Custom React hooks
├── pages/               # Next.js pages
├── styles/              # Tailwind CSS configurations
├── utils/               # Helper functions and utilities
```

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/accounting-solution.git
cd accounting-solution
```

### **2. Install Dependencies**

```bash
pnpm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=your_vercel_postgres_connection_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### **4. Run the Application**

#### **Development**

```bash
pnpm dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

#### **Production**

```bash
pnpm build
pnpm start
```

### **5. Database Setup**

Ensure your PostgreSQL database has the required schema. Use the following SQL commands to create tables:

- **[Inventory Schema](#database-and-schema-for-inventory)**
- **[Sales Schema](#database-and-schema-for-sales)**

---

## **Usage Instructions**

### **Inventory**

1. Navigate to the Inventory page.
2. Add new items using the form.
3. Monitor stock levels and update item details as necessary.

### **Sales**

1. Navigate to the Sales page.
2. Record new sales by selecting items and inputting quantities and payment methods.
3. View sales reports and filter by date or payment method.

### **Reports**

1. Access the Reports section to generate financial statements.
2. Use filters to customize reports for specific time periods or categories.

---

## **Future Enhancements**

- Add user roles and permissions (e.g., admin, cashier).
- Integrate expense management with categories for operational and capital expenses.
- Enhance reporting with visual charts and graphs.
- Support multi-language and currency customization.

---

## **Contributing**

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## **Acknowledgments**

- Built with [Next.js](https://nextjs.org/) and [Vercel](https://vercel.com/).
- UI powered by [Tailwind CSS](https://tailwindcss.com/) and [shadcn/UI](https://shadcn.dev/).
- Authentication via [NextAuth](https://next-auth.js.org/).

---

## **Contact**

For questions, issues, or feature requests, reach out to [Eghaire Praise Jomavi](mailto:snaxxen@gmail.com).
