# Frontend API Reference

## Import

```typescript
import { api } from '@/lib/api';
```

## Properties

### Get All Properties
```typescript
const properties = await api.properties.getAll();

// With filters
const properties = await api.properties.getAll({
  city: 'Miami',
  status: 'For Sale',
  propertyType: 'Villa'
});
```

### Get Property by ID
```typescript
const property = await api.properties.getById('property-id');
```

## Agents

### Get All Agents
```typescript
const agents = await api.agents.getAll();

// With filters
const agents = await api.agents.getAll({
  specialty: 'Residential'
});
```

### Get Agent by ID
```typescript
const agent = await api.agents.getById('agent-id');
```

## Contacts

### Create Contact
```typescript
const contact = await api.contacts.create({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  message: 'I am interested in...'
});
```

## Authentication

### Signup
```typescript
const user = await api.auth.signup({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'securepassword',
  phone: '+1 (555) 123-4567',
  userType: 'buyer'
});
```

### Login
```typescript
const user = await api.auth.login({
  email: 'john@example.com',
  password: 'securepassword'
});
```

### Logout
```typescript
await api.auth.logout();
```

### Get Current User
```typescript
const currentUser = api.auth.getCurrentUser(); // Synchronous
```

## Using with React Query

### Query Example
```typescript
import { useQuery } from '@tanstack/react-query';

function MyComponent() {
  const { data: properties } = useQuery({
    queryKey: ['/api/properties'],
  });
  
  // Or with filters
  const { data: filteredProperties } = useQuery({
    queryKey: ['/api/properties', { city: 'Miami' }],
  });
}
```

### Mutation Example
```typescript
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

function ContactForm() {
  const mutation = useMutation({
    mutationFn: (data) => api.contacts.create(data),
    onSuccess: () => {
      console.log('Contact created!');
    }
  });
  
  const handleSubmit = (formData) => {
    mutation.mutate(formData);
  };
}
```

## Error Handling

All API methods throw errors that can be caught:

```typescript
try {
  const user = await api.auth.login({ email, password });
} catch (error) {
  console.error('Login failed:', error.message);
}
```

## Data Validation

All API methods use Zod schemas from `@shared/schema` for validation:
- `insertUserSchema`
- `insertPropertySchema`
- `insertAgentSchema`
- `insertContactSchema`
