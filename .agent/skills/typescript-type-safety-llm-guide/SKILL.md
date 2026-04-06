---
name: typescript-type-safety-llm-guide
description: "Guia para LLMs gerarem código TypeScript type-safe, evitando 'any' e seguindo best practices atuais (2025)"
phases: [E]
mode: true
---

# TypeScript Type Safety - Guia para Geração de Código por LLM

## Overview

Esta skill é um **modo de operação** que instrui LLMs (Large Language Models) a gerar código TypeScript seguindo as melhores práticas de type safety de 2025. O foco principal é **eliminar o uso de `any`** e implementar padrões robustos que aproveitam o sistema de tipos do TypeScript ao máximo.

**Contexto:** LLMs tendem a gerar código com `any` porque aprenderam de bilhões de linhas de código público (GitHub, StackOverflow) onde `any` é comum. Este guia estabelece guardrails para geração de código type-safe por padrão.

## When to Use This Skill

### PREVC Phase Context

**This skill applies to the following phases:**

- [ ] **Planning (P)**: Use when designing, architecting, or planning features
- [ ] **Review (R)**: Use when reviewing code, PRs, or documentation
- [x] **Execution (E)**: Use when actively coding, implementing, or building
- [ ] **Validation (V)**: Use when testing, verifying, or ensuring quality
- [ ] **Confirmation (C)**: Use when documenting, committing, or finalizing work

### Specific Use Cases

Use this skill when:
- Gerando qualquer código TypeScript (APIs, componentes, funções, classes)
- Trabalhando com dados externos (APIs, formulários, arquivos)
- Criando tipos, interfaces, ou schemas
- **SEMPRE** que você for escrever código TypeScript

**Do NOT use this skill when:**
- Trabalhando com JavaScript puro (sem TypeScript)
- Migrando código legado onde `any` é temporariamente necessário (mas marque com `// TODO: fix type`)

---

## How It Works

### Prerequisites

Before using this skill, ensure:
- [x] Projeto usa TypeScript
- [x] `tsconfig.json` existe no projeto
- [x] Você entende a diferença entre `any` e `unknown`

### Core Principles

#### Princípio #1: NUNCA Use `any` - Use `unknown`

`any` deve ser evitado porque usando-o você perde a maioria dos benefícios do TypeScript. Use tipos explícitos: evite `any`. Sempre defina tipos explicitamente para legibilidade e segurança. Prefira `unknown` ao invés de `any`: para variáveis que podem conter qualquer valor, `unknown` oferece tratamento mais seguro.

**❌ NUNCA faça isso:**
```typescript
// ❌ ERRADO - perde type safety completamente
function processData(data: any) {
  return data.someMethod(); // Compila mas pode crashar em runtime
}

async function handleRequest(request: any, reply: any) {
  const body = request.body; // Sem autocomplete, sem validação
}
```

**✅ SEMPRE faça isso:**
```typescript
// ✅ CORRETO - use unknown e faça type narrowing
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'someMethod' in data) {
    return (data as { someMethod: () => void }).someMethod();
  }
  throw new Error('Invalid data format');
}

// ✅ CORRETO - use tipos específicos
interface RequestBody {
  userId: string;
  action: 'create' | 'update' | 'delete';
}

async function handleRequest(
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply
) {
  const { userId, action } = request.body; // ✅ Autocomplete funciona!
}
```

**Por quê?**
- `any` permite fazer qualquer coisa, `unknown` não permite fazer nada sem verificar o tipo primeiro
- `unknown` força você a realizar verificações necessárias antes de usar os dados, prevenindo problemas potenciais

---

#### Princípio #2: Habilite Strict Mode

A flag `strict` habilita uma ampla gama de comportamentos de verificação de tipos que resultam em garantias mais fortes de correção do programa.

**✅ SEMPRE configure isso em `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

**Por quê?**
- A configuração mais estrita deve ser obrigatória porque não há muito valor em usar TypeScript sem essas flags. Caso contrário, nossos tipos serão muito permissivos

---

#### Princípio #3: Use Type Guards e Type Narrowing

Type narrowing permite ao TypeScript automaticamente estreitar o intervalo de tipos de variáveis baseado em julgamentos condicionais. Usando operadores como `typeof`, `in` e `instanceof`, erros de runtime podem ser evitados.

**✅ Padrões de Type Narrowing:**
```typescript
// ✅ Type guard com typeof
function printLength(str: string | null) {
  if (str) {
    return str.length; // ✅ TypeScript sabe que é string aqui
  }
  return 0;
}

// ✅ Type guard com 'in' operator
interface Cat { meow: () => void; }
interface Dog { bark: () => void; }

function makeSound(animal: Cat | Dog) {
  if ('meow' in animal) {
    animal.meow(); // ✅ TypeScript sabe que é Cat
  } else {
    animal.bark(); // ✅ TypeScript sabe que é Dog
  }
}

// ✅ Type guard customizado
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function process(data: unknown) {
  if (isString(data)) {
    console.log(data.toUpperCase()); // ✅ Type-safe
  }
}
```

---

#### Princípio #4: Dados Externos Sempre Usam `unknown`

Quando você não tem certeza sobre o formato dos dados vindos de uma API, ou o formato pode assumir diferentes formas, `unknown` é uma escolha mais segura que `any`.

**✅ Pattern para API responses:**
```typescript
// ✅ CORRETO - validação explícita
interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data: unknown = await response.json(); // ✅ unknown primeiro
  
  // Validar estrutura
  if (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  ) {
    return data as User; // ✅ Safe cast após validação
  }
  
  throw new Error('Invalid user data');
}

// ✅ MELHOR - use biblioteca de validação (Zod)
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email()
});

async function fetchUserWithZod(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data: unknown = await response.json();
  
  return UserSchema.parse(data); // ✅ Validação automática + type inference
}
```

---

#### Princípio #5: Use Inference Quando Óbvio, Explicit Quando Complexo

Deixe o TypeScript inferir tipos quando o tipo é óbvio pela atribuição.

**✅ Quando inferir:**
```typescript
// ✅ Inference óbvia
const name = 'John'; // TypeScript infere string
const count = 42; // TypeScript infere number
const isActive = true; // TypeScript infere boolean

// ✅ Retorno de função simples
function add(a: number, b: number) {
  return a + b; // TypeScript infere number
}
```

**✅ Quando ser explícito:**
```typescript
// ✅ Tipo complexo - seja explícito
interface Config {
  apiKey: string;
  timeout?: number;
  retries?: number;
}

const config: Config = {
  apiKey: process.env.API_KEY || '',
  timeout: 5000
};

// ✅ Union types - seja explícito
type Status = 'pending' | 'approved' | 'rejected';
const status: Status = 'pending';

// ✅ Parâmetros de função - SEMPRE explícito
function processUser(user: User, options: ProcessOptions) {
  // ...
}
```

---

## Step-by-Step Instructions

### Step 1: Configurar tsconfig.json

**Action:** Sempre verifique e configure strict mode ANTES de gerar código.

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### Step 2: Definir Tipos/Interfaces Primeiro

**Action:** Antes de escrever lógica, defina os tipos que você vai usar.

```typescript
// ✅ Defina tipos primeiro
interface CreateUserRequest {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface CreateUserResponse {
  id: string;
  createdAt: Date;
}

// Depois implemente a lógica
async function createUser(
  data: CreateUserRequest
): Promise<CreateUserResponse> {
  // Implementação aqui
}
```

### Step 3: Validar Dados Externos com `unknown`

**Action:** Sempre que receber dados externos, use `unknown` + validação.

```typescript
// ✅ Pattern seguro
function parseConfig(raw: unknown): Config {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('Config must be an object');
  }
  
  // Type narrowing progressivo
  const obj = raw as Record<string, unknown>;
  
  if (typeof obj.apiKey !== 'string') {
    throw new Error('apiKey must be a string');
  }
  
  return {
    apiKey: obj.apiKey,
    timeout: typeof obj.timeout === 'number' ? obj.timeout : 5000
  };
}
```

### Step 4: Implementar Type Guards Quando Necessário

**Action:** Crie funções helper para type checking reutilizável.

```typescript
// ✅ Type guards reutilizáveis
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return isRecord(obj) && key in obj;
}

// Usar os type guards
function processData(data: unknown) {
  if (hasProperty(data, 'userId') && typeof data.userId === 'string') {
    console.log(data.userId); // ✅ Type-safe
  }
}
```

---

## Examples

### Example 1: API Route Handler (Fastify)

**Context:** Criar endpoint POST que recebe dados do usuário

**❌ ERRADO (como LLM geraria sem este guia):**
```typescript
// ❌ Type safety perdida completamente
fastify.post('/users', async (request: any, reply: any) => {
  const { name, email } = request.body; // Sem validação, sem tipos
  const user = await createUser(name, email);
  return user;
});
```

**✅ CORRETO (seguindo este guia):**
```typescript
import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

// 1. Definir schema Zod
const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']).default('user')
});

type CreateUserBody = z.infer<typeof CreateUserSchema>;

// 2. Implementar com tipos explícitos
fastify.post<{ Body: CreateUserBody }>(
  '/users',
  {
    schema: {
      body: CreateUserSchema
    }
  },
  async (
    request: FastifyRequest<{ Body: CreateUserBody }>,
    reply: FastifyReply
  ) => {
    // ✅ request.body é type-safe automaticamente
    const { name, email, role } = request.body;
    const user = await userService.create({ name, email, role });
    return reply.code(201).send(user);
  }
);
```

---

### Example 2: Processamento de Dados Externos

**Context:** Ler arquivo de configuração JSON

**❌ ERRADO:**
```typescript
// ❌ Perde type safety
function loadConfig(path: string): any {
  const raw = JSON.parse(fs.readFileSync(path, 'utf8'));
  return raw; // ❌ any escapa
}

const config = loadConfig('./config.json');
config.apiKey; // ❌ Sem autocomplete, sem validação
```

**✅ CORRETO:**
```typescript
// ✅ Type-safe com validação
interface Config {
  apiKey: string;
  timeout?: number;
  retries?: number;
}

function loadConfig(path: string): Config {
  const raw: unknown = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  if (!isRecord(raw)) {
    throw new Error('Config must be an object');
  }
  
  if (typeof raw.apiKey !== 'string') {
    throw new Error('apiKey is required and must be a string');
  }
  
  return {
    apiKey: raw.apiKey,
    timeout: typeof raw.timeout === 'number' ? raw.timeout : 5000,
    retries: typeof raw.retries === 'number' ? raw.retries : 3
  };
}

const config = loadConfig('./config.json');
config.apiKey; // ✅ Autocomplete funciona!
```

---

### Example 3: Error Handling

**Context:** Tratar erros de forma type-safe

**❌ ERRADO:**
```typescript
// ❌ catch com any implícito
try {
  await riskyOperation();
} catch (error) {
  console.log(error.message); // ❌ error é any por padrão
}
```

**✅ CORRETO:**
```typescript
// ✅ catch com unknown (TypeScript 4.0+)
try {
  await riskyOperation();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message); // ✅ Type-safe
  } else {
    console.log('Unknown error occurred');
  }
}

// ✅ Helper para erro type-safe
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
}

try {
  await riskyOperation();
} catch (error: unknown) {
  if (isErrorWithMessage(error)) {
    logger.error(error.message);
  } else {
    logger.error('Unknown error', { error });
  }
}
```

---

## Best Practices

### ✅ Do This

- **Use `unknown` para dados desconhecidos:** Use `unknown` quando você aceita dados de fontes externas (APIs, arquivos, mensagens)
- **Habilite strict mode:** Sempre habilite strict mode no seu tsconfig.json para máxima type safety
- **Use Type Guards:** Type narrowing com `typeof`, `in`, `instanceof` evita erros de runtime
- **Valide dados externos:** Sempre valide antes de usar (Zod, joi, etc)
- **Prefira bibliotecas type-safe:** Use `fastify-type-provider-zod`, não validação manual

### ❌ Avoid This

- **NUNCA use `any`:** Sempre declare variáveis com um tipo diferente de `any`
- **Não ignore strict mode:** Strict mode é essencial para TypeScript valer a pena
- **Não faça type assertions sem validação:** `data as Type` sem verificação é perigoso
- **Não confie em dados externos:** Nunca confie em mensagens de erro do cliente - sempre valide server-side

---

## Common Pitfalls & Solutions

### Pitfall 1: LLM Gera `request: any` Automaticamente

**Symptoms:**
- Código gerado tem `(request: any, reply: any) =>`
- Autocomplete não funciona
- Erros aparecem só em runtime

**Solution:**
```typescript
// ❌ Padrão que LLM gera
app.post('/endpoint', async (request: any, reply: any) => { ... })

// ✅ Corrija para
import { FastifyRequest, FastifyReply } from 'fastify';

interface RouteBody {
  // ... defina o schema
}

app.post('/endpoint', async (
  request: FastifyRequest<{ Body: RouteBody }>,
  reply: FastifyReply
) => { ... })
```

---

### Pitfall 2: JSON.parse() Retorna `any` Implícito

**Symptoms:**
- `const data = JSON.parse(...)` tem tipo `any` implicitamente
- TypeScript não reclama mas não há type safety

**Solution:**
```typescript
// ❌ any implícito
const data = JSON.parse(jsonString);

// ✅ Marque como unknown explicitamente
const data: unknown = JSON.parse(jsonString);

// Depois valide
if (isValidData(data)) {
  // use data type-safe
}
```

---

### Pitfall 3: Biblioteca Retorna `any`

**Symptoms:**
- Biblioteca antiga retorna `any` em métodos
- Exemplo: `localStorage.getItem()` retorna `string | null` mas outros storages podem retornar `any`

**Solution:**
```typescript
// ❌ Aceitar any da biblioteca
const stored = someLib.get('key'); // any

// ✅ Marcar como unknown imediatamente
const stored: unknown = someLib.get('key');

// Validar antes de usar
if (typeof stored === 'string') {
  const parsed: unknown = JSON.parse(stored);
  // ... continue validando
}
```

---

## Quality Checklist

Antes de gerar código, verifique:

- [ ] **Zero `any` types:** Código não contém `any` em lugar nenhum
- [ ] **Strict mode enabled:** `tsconfig.json` tem `"strict": true`
- [ ] **Dados externos validados:** Todo `unknown` tem type guard antes de uso
- [ ] **Tipos explícitos em funções:** Parâmetros e retornos têm tipos claros
- [ ] **Schemas definidos:** APIs usam Zod/outro validador com inferência de tipos

---

## Advanced Usage

### Pattern 1: Generic Type-Safe Fetch

```typescript
import { z, ZodSchema } from 'zod';

async function fetchTypeSafe<T>(
  url: string,
  schema: ZodSchema<T>
): Promise<T> {
  const response = await fetch(url);
  const data: unknown = await response.json();
  
  // Zod valida e infere o tipo automaticamente
  return schema.parse(data);
}

// Uso
const UserSchema = z.object({
  id: z.string(),
  name: z.string()
});

const user = await fetchTypeSafe('/api/user/1', UserSchema);
// ✅ user tem tipo inferido automaticamente
```

---

### Pattern 2: Discriminated Unions para Type Safety

```typescript
// ✅ Pattern poderoso para diferentes tipos de eventos
type ApiEvent =
  | { type: 'user.created'; data: { userId: string; email: string } }
  | { type: 'user.deleted'; data: { userId: string } }
  | { type: 'post.published'; data: { postId: string; authorId: string } };

function handleEvent(event: ApiEvent) {
  switch (event.type) {
    case 'user.created':
      // ✅ TypeScript sabe que event.data tem userId e email
      console.log(`User created: ${event.data.email}`);
      break;
    case 'user.deleted':
      // ✅ TypeScript sabe que event.data só tem userId
      console.log(`User deleted: ${event.data.userId}`);
      break;
    case 'post.published':
      // ✅ TypeScript sabe que event.data tem postId e authorId
      console.log(`Post published: ${event.data.postId}`);
      break;
    default:
      // ✅ Exhaustiveness checking
      const _exhaustive: never = event;
      throw new Error(`Unhandled event: ${_exhaustive}`);
  }
}
```

---

## Troubleshooting

### Issue: "Object is of type 'unknown'"

**Diagnosis:**
- Variável marcada como `unknown` mas você tentou usar sem verificar tipo

**Resolution:**
```typescript
// ❌ Erro
function process(data: unknown) {
  return data.someProperty; // ❌ Object is of type 'unknown'
}

// ✅ Solução
function process(data: unknown) {
  if (
    typeof data === 'object' &&
    data !== null &&
    'someProperty' in data
  ) {
    return (data as { someProperty: unknown }).someProperty;
  }
  throw new Error('Invalid data');
}
```

---

### Issue: Type assertion sem validação

**Quick Fix:**
```typescript
// ❌ Perigoso
const user = data as User; // Sem verificação!

// ✅ Seguro
const user = UserSchema.parse(data); // Com validação Zod
// ou
if (isUser(data)) {
  const user = data; // Type guard garantiu
}
```

---

## Notes & Tips

💡 **Pro Tip 1:** Quando código é difícil de tipar, geralmente é porque está desnecessariamente complexo. Simplificar para TypeScript entender tem o benefício adicional de simplificar para colegas entenderem também

💡 **Pro Tip 2:** Use ESLint rule `@typescript-eslint/no-explicit-any` para avisar quando `any` é usado

💡 **Pro Tip 3:** Use `unknown` quando aceita dados de fontes externas; use `type/interface` quando você cria e controla a estrutura de dados; use union types quando tem um conjunto finito de possibilidades

⚠️ **Warning:** O único caso válido para `any` é ao migrar codebase JavaScript para TypeScript. Para novos projetos, sempre prefira `unknown`

---

## References

- [TypeScript Handbook - Strict Mode](https://www.typescriptlang.org/tsconfig/strict.html)
- [TypeScript 3.0 - unknown type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html)
- [Zod Documentation](https://zod.dev)
- [fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod)

---

## Metadata

**Version:** 1.0.0  
**Last Updated:** 2025-02-01  
**Author:** Type Safety Team  
**Tags:** typescript, type-safety, best-practices, llm, code-generation, any, unknown  
**Complexity:** Intermediate  
**Mode:** true (Esta é uma skill de MODO - deve estar sempre ativa ao gerar código TypeScript)
