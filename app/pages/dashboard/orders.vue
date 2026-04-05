<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="container">
        <h1>Orders</h1>
        
        <div v-if="pending" class="loading">Loading...</div>
        <div v-else-if="error" class="error">Failed to load orders</div>
        <div v-else>
          <table class="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>#{{ order.id }}</td>
                <td>{{ order.user?.name || order.user?.email }}</td>
                <td>${{ order.total.toFixed(2) }}</td>
                <td>
                  <span :class="`status-badge status-${order.status.toLowerCase()}`">
                    {{ order.status }}
                  </span>
                </td>
                <td>{{ formatDate(order.createdAt) }}</td>
                <td class="actions">
                  <select v-model="order.status" @change="updateStatus(order.id, order.status)">
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const { data: orders, pending, error, refresh } = await useFetch('/api/admin/orders', {
  headers: {
    Authorization: `Bearer ${process.client ? localStorage.getItem('token') : ''}`,
  },
})

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

async function updateStatus(orderId, status) {
  try {
    await $fetch(`/api/admin/orders/${orderId}`, {
      method: 'PUT',
      body: { status },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    alert('Order status updated')
  } catch (err) {
    alert('Failed to update status')
    refresh()
  }
}

useHead({
  title: 'Orders - Figo Admin',
})

definePageMeta({
  layout: 'dashboard',
})
</script>

<style scoped>
.data-table {
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  background: #f9fafb;
  font-weight: 600;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-processing {
  background: #dbeafe;
  color: #1e40af;
}

.status-shipped {
  background: #e0e7ff;
  color: #3730a3;
}

.status-delivered {
  background: #d1fae5;
  color: #065f46;
}

.status-cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.actions select {
  padding: 0.25rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
}
</style>
