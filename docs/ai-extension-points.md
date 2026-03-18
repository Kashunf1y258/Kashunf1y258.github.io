# AI Extension Points

Integration architecture and migration strategy for AI features.

## Current Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend                           │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────────┐ │
│  │ /ai     │  │ AIChat   │  │ Search (Pagefind)      │ │
│  │ Page    │  │ Component│  │                        │ │
│  └────┬─────┘  └────┬─────┘  └───────────┬────────────┘ │
│       │             │                     │             │
│       └─────────────┴─────────────────────┘             │
│                         │                               │
│              ┌──────────▼──────────┐                    │
│              │   AIService        │                    │
│              │   (Interface)      │                    │
│              └──────────┬──────────┘                    │
└─────────────────────────┼───────────────────────────────┘
                          │
              ┌───────────▼───────────┐
              │   Implementation    │
              │   - MockAIService   │
              │   - OpenAI          │
              │   - Anthropic       │
              └─────────────────────┘
```

## Extension Points

### 1. AI Assistant (`/ai`)

| Item | Path |
|------|------|
| Route | `/ai` |
| Page | `src/pages/ai.astro` |
| Component | `src/components/AIChat.astro` |
| Service | `src/services/ai-service.ts` |
| Feature Flag | `AI_FEATURE_ENABLED` |

### 2. Smart Search

| Item | Current | Future |
|------|---------|--------|
| Implementation | Pagefind (static) | AI semantic search |
| Integration | Search component | AIService.suggest() |

### 3. Content Recommendations

| Item | Description |
|------|-------------|
| Hook | Blog post layout |
| Service | AIService.suggest() |

### 4. Code Explanation

| Item | Description |
|------|-------------|
| Location | Tutorial pages |
| Service | AIService.explainCode() |

## Migration Strategy

### Phase 1: Client-side AI
- Third-party AI widgets (e.g., custom GPT, Claude)
- No backend required
- Limited customization
- Quick to deploy

### Phase 2: Server-side Proxy
- Edge functions for API key protection
- Custom prompts and context
- Rate limiting
- Requires: Cloudflare Workers, Vercel Edge, or similar

### Phase 3: Full Integration
- Custom AI models
- Content-aware responses
- User history and preferences
- Advanced features

## Implementation Checklist

When enabling AI features:

- [ ] Set `AI_FEATURE_ENABLED = true` in `src/services/ai-service.ts`
- [ ] Configure API keys in environment variables
- [ ] Update `createAIService()` to return real implementation
- [ ] Test all AI components with mock=false
- [ ] Verify rate limits and quotas
- [ ] Add error handling for AI failures
- [ ] Document privacy policy for AI data processing

## Provider Options

| Provider | Pros | Cons |
|----------|------|------|
| OpenAI | Best models, widely used | Cost, rate limits |
| Anthropic | Strong reasoning, safety | Limited model options |
| Cloudflare Workers AI | Edge deployment, fast | Limited models |
| Local LLM | Free, privacy | Hardware requirements |

## Dependencies

No AI dependencies currently installed. When implementing, consider:

- `openai` - OpenAI SDK
- `@anthropic-ai/sdk` - Anthropic SDK
- `@cloudflare/workers-types` - For Workers AI types
