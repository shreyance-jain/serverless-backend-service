module.exports = [
  {
    name: 'CreateTenant',
    query: `
    mutation CreateTenant{
      createTenant(params: {
          tenant: "tenant_name"
          tenantType: "poc"
          timezone: "EST"
      }) {
          tenant
          tenantType
          active
          createdAt
          timezone
      }
    }`,
  },
  {
    name: 'GetTenant',
    query: `
    query GetTenant {
      getTenant(tenant: "tenant_name") {
          tenant
          tenantType
          active
          createdAt
          timezone
      }
    }`,
  },
  {
    name: 'UpdateTenant',
    query: `
    mutation UpdateTenant {
      updateTenant(params: {
          tenant: "tenant_name",
          tenantType: "production",
          timezone: "UTC"
      }) {
          tenant
          tenantType
          active
          timezone
      }
    }
    `,
  },
  {
    name: 'DeleteTenant',
    query: `
    mutation DeleteTenant{
      deleteTenant(tenant: "tenant_name") {
          tenant
          tenantType
          active
          createdAt
          timezone
      }
    }`,
  },
];
