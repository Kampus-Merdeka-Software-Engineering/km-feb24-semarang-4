import data from '../js/dataFix.json' with { type: "json" };

// Helper function to filter data from January to June
function sixMonthsFilter(sale) {
  const date = new Date(sale.transaction_date);
  return date.getMonth() >= 0 && date.getMonth() <= 5;
}

function getDataByFilter(filter) {
  let filteredData = data;

  if (filter === 'sixmonth') {
    filteredData = data.filter(sixMonthsFilter);
  }

  // Aggregate data by category and count unique transactions and products
  const categorySales = {};
  const uniqueTransactions = new Set();
  const uniqueProducts = new Set();

  filteredData.forEach(sale => {
    const category = sale.category;
    const lineTotal = parseFloat(sale.line_total) || 0;
    const transactionTotal = parseFloat(sale.trans_total) || 0;
    const productTotal = parseInt(sale.r_qty) || 0;
    const transactionId = sale.transaction;
    const productId = sale.product;

    if (!categorySales[category]) {
      categorySales[category] = {
        line_total: 0,
        total_transaction: 0,
        total_product: 0,
        unique_transactions: new Set(),
        unique_products: new Set()
      };
    }

    categorySales[category].line_total += lineTotal;
    categorySales[category].total_transaction += transactionTotal;
    categorySales[category].total_product += productTotal;
    categorySales[category].unique_transactions.add(transactionId);
    categorySales[category].unique_products.add(productId);
    uniqueTransactions.add(transactionId);
    uniqueProducts.add(productId);
  });

  const result = [];
  for (const category in categorySales) {
    result.push({
      category,
      ...categorySales[category],
      unique_transaction_count: categorySales[category].unique_transactions.size,
      unique_product_count: categorySales[category].unique_products.size
    });
  }

  return { result, uniqueTransactionCount: uniqueTransactions.size, uniqueProductCount: uniqueProducts.size };
}

// Function to update the cards with total values
function updateCards() {
  const totalLineTotal = salesData.result.reduce((acc, curr) => acc + curr.line_total, 0);
  const totalTransactions = salesData.uniqueTransactionCount;
  const totalProducts = salesData.uniqueProductCount;

  document.getElementById('totalLineTotal').textContent = totalLineTotal.toLocaleString();
  document.getElementById('totalTransactions').textContent = totalTransactions.toLocaleString();
  document.getElementById('totalProducts').textContent = totalProducts.toLocaleString();
}

// Initial data setup
let salesData = getDataByFilter('alltime');
updateCards();

// Event listener for filter
document.getElementById('categoryFilter').addEventListener('change', (event) => {
  const filter = event.target.value;
  salesData = getDataByFilter(filter);
  updateCards();
});

// Function to log the aggregated data for debugging
function logAggregatedData() {
  console.log('Sales Data:', salesData.result);
  salesData.result.forEach(data => {
    console.log(`Category: ${data.category}, Line Total: ${data.line_total}, Total Transactions: ${data.total_transaction}, Total Products: ${data.total_product}, Unique Transactions: ${data.unique_transaction_count}, Unique Products: ${data.unique_product_count}`);
  });
  console.log(`Total Unique Products: ${salesData.uniqueProductCount}`);
}

// Initial log for debugging
logAggregatedData();
